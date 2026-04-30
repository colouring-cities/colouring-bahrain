import express from 'express';
import asyncController from '../routes/asyncController';
import * as passwordResetService from '../services/passwordReset';
import { TokenVerificationError } from '../services/passwordReset';
import * as userService from '../services/user';
import { ValidationError } from '../validation';

/**
 * CREATE USER + AUTO LOGIN
 */
const createUser = asyncController(async (req: express.Request, res: express.Response) => {
    if (req.session.user_id) {
        return res.status(400).json({ error: 'Already signed in' });
    }

    const user = req.body;

    if (user.email && user.email !== user.confirm_email) {
        return res.status(400).json({ error: 'Email did not match confirmation.' });
    }

    if (!user.email) {
        user.email = null;
    }

    const result = await userService.createUser(user);

    if (!result || !result.user_id) {
        return res.status(400).json({ error: result?.error ?? 'User creation failed' });
    }

    // ✅ CRITICAL: MODIFY SESSION
    req.session.user_id = result.user_id;

    // ✅ CRITICAL: FORCE SAVE SESSION BEFORE RESPONDING
    await new Promise<void>((resolve, reject) => {
        req.session.save(err => {
            if (err) return reject(err);
            resolve();
        });
    });

    return res.status(201).json({ success: true });
});

/**
 * GET CURRENT USER
 */
const getCurrentUser = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.status(401).json({ error: 'Must be logged in' });
    }

    const user = await userService.getUserById(req.session.user_id);
    return res.json(user);
});

/**
 * DELETE CURRENT USER + LOGOUT
 */
const deleteCurrentUser = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.session.user_id) {
        return res.status(401).json({ error: 'Must be logged in' });
    }

    await userService.deleteUser(req.session.user_id);

    // destroy session (removes cookie)
    await userService.logout(req.session);

    return res.json({ success: true });
});

/**
 * RESET PASSWORD
 */
const resetPassword = asyncController(async (req: express.Request, res: express.Response) => {
    if (!req.body || (!req.body.email && !req.body.token)) {
        return res.status(400).json({
            error: 'Expected email or reset token'
        });
    }

    if (req.body.email) {
        const origin = getWebAppOrigin();
        await passwordResetService.sendPasswordResetToken(req.body.email, origin);
        return res.status(202).json({ success: true });
    }

    if (!req.body.password) {
        return res.status(400).json({ error: 'Expected a new password' });
    }

    try {
        await passwordResetService.resetPassword(req.body.token, req.body.password);
    } catch (err) {
        if (err instanceof TokenVerificationError) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        if (err instanceof ValidationError) {
            return res.status(400).json({ error: err.message });
        }
        throw err;
    }

    return res.json({ success: true });
});

function getWebAppOrigin(): string {
    if (!process.env.WEBAPP_ORIGIN) {
        throw new Error('WEBAPP_ORIGIN not defined');
    }
    return process.env.WEBAPP_ORIGIN;
}

export default {
    createUser,
    getCurrentUser,
    deleteCurrentUser,
    resetPassword
};
