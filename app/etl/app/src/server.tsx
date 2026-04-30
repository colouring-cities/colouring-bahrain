import pgConnect from 'connect-pg-simple';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

import apiServer from './api/api';
import db from './db';
import frontendRoute from './frontendRoute';
import tileserver from './tiles/tileserver';

const server = express();

/**
 * MUST BE FIRST
 */
server.set('trust proxy', true);

server.use(cors({
    origin: 'https://t8dr.com',
    credentials: true
}));

/**
 * BODY PARSER MUST BE BEFORE SESSION
 */
server.use(bodyParser.json());

/**
 * SESSION MUST BE BEFORE ROUTERS
 */
const pgSession = pgConnect(session);

server.use(session({
    name: 'cl.session',
    store: new pgSession({
        pgPromise: db,
        tableName: 'user_sessions'
    }),
    secret: process.env.APP_COOKIE_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: true, // 🔥 TEMP ONLY
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

/**
 * ROUTES AFTER SESSION
 */
server.use('/tiles', tileserver);
server.use('/api', apiServer);
server.use(frontendRoute);

export default server;
