/**
 * Server-side Express application
 * - API methods
 * - entry-point to shared React App
 *
 */
import pgConnect from 'connect-pg-simple';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import apiServer from './api/api';
import db from './db';
import frontendRoute from './frontendRoute';
import tileserver from './tiles/tileserver';

// create server
const server = express();

// Enable trust proxy for use behind NGINX/Cloudflare
server.set('trust proxy', true); 

// Configure CORS for local development and specific production domains
server.use(
    cors({
        origin: [
            "https://t8dr.com",
            "https://www.t8dr.com",
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:8080",
            "http://localhost",
        ],
        credentials: true,
    })
);

// disable header
server.disable('x-powered-by');

// In dev, webpack serves bundles on PORT_DEV; proxy them through the app port
// so CSS/JS load when only one port is forwarded (e.g. localhost:3001).
if (process.env.NODE_ENV === 'development' && process.env.PORT_DEV) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const proxy = require('http-proxy-middleware');
    const webpackDevUrl = `http://127.0.0.1:${process.env.PORT_DEV}`;

    for (const path of ['/static', '/map_styles', '/sockjs-node']) {
        server.use(path, proxy({
            target: webpackDevUrl,
            changeOrigin: true,
            ws: path === '/sockjs-node',
        }));
    }
}

// serve static files
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// handle user sessions
const pgSession = pgConnect(session);

// If PostgreSQL env vars are not set, fall back to the default in-memory
// session store to avoid crashing the server in development when the DB
// is not available. In production you should always configure a real store.
let sessionStore: any = undefined;
if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
    sessionStore = new pgSession({
        pgPromise: db,
        tableName: 'user_sessions'
    });
} else {
    console.warn('Postgres session store not configured; using in-memory session store');
    sessionStore = new session.MemoryStore();
}

const sess: any = {
    name: 'cl.session',
    store: sessionStore,
    // Provide a safe default secret for local development so the server
    // does not crash when `APP_COOKIE_SECRET` is not set in environment.
    secret: process.env.APP_COOKIE_SECRET || 'dev-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // Only set secure cookies in production where HTTPS is used.
        secure: (process.env.NODE_ENV === 'production'),
        sameSite: "lax"
    }
};

server.use(session(sess));

// Handle geometries requests - return 404 as JSON instead of HTML
// This must be before frontendRoute to catch /geometries/* requests
server.get('/geometries/*', (req: express.Request, res: express.Response) => {
    res.status(404).json({ error: 'Geometry file not found', path: req.path });
});

server.use('/tiles', tileserver);
server.use('/api', apiServer);
server.use(frontendRoute);

export default server;