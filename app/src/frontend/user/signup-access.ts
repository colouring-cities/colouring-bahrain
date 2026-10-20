/**
 * Internal signup unlock (not shown in public UI).
 * Unlock by clicking the "Log in" heading 7 times within 5 seconds.
 */
import { SIGNUP_ACCESS_HEADER, SIGNUP_ACCESS_TOKEN } from '../../signup-gate';

export { SIGNUP_ACCESS_HEADER, SIGNUP_ACCESS_TOKEN };

export const SIGNUP_UNLOCK_STORAGE_KEY = 'cb_internal_signup_unlock';

const CLICK_TARGET = 7;
const CLICK_WINDOW_MS = 5000;

let clickCount = 0;
let windowStartedAt = 0;

export function isSignupUnlocked(): boolean {
    try {
        return sessionStorage.getItem(SIGNUP_UNLOCK_STORAGE_KEY) === '1';
    } catch {
        return false;
    }
}

export function unlockSignup(): void {
    try {
        sessionStorage.setItem(SIGNUP_UNLOCK_STORAGE_KEY, '1');
    } catch {
        // ignore storage failures
    }
}

/** Returns true when this click completes the unlock sequence. */
export function registerSecretUnlockClick(): boolean {
    const now = Date.now();
    if (!windowStartedAt || now - windowStartedAt > CLICK_WINDOW_MS) {
        windowStartedAt = now;
        clickCount = 1;
        return false;
    }

    clickCount += 1;
    if (clickCount < CLICK_TARGET) {
        return false;
    }

    clickCount = 0;
    windowStartedAt = 0;
    unlockSignup();
    return true;
}
