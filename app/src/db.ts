/**
 * Expose query interface to database pool
 *
 * Connection: PGHOST (default localhost), PGPORT (default 5432), PGDATABASE, PGUSER, PGPASSWORD.
 * See pgConnectionConfig.ts (shared with Mapnik tile rendering).
 */
import pg from 'pg-promise';
import { getPgConnectionOptions } from './pgConnectionConfig';

const pgp = pg();
const opts = getPgConnectionOptions();
const db = pgp({
    host: opts.host,
    database: opts.database,
    user: opts.user,
    password: opts.password,
    port: opts.port,
});

export default db;
