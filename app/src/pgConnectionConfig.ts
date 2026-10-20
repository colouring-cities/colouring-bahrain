/**
 * Single source for Postgres settings used by pg-promise (API) and Mapnik (tile rendering).
 * Set PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD when running the app; defaults match db.ts comments.
 */
export interface PgConnectionOptions {
    host: string;
    database: string;
    user: string;
    password: string | undefined;
    port: number;
}

export function getPgConnectionOptions(): PgConnectionOptions {
    const port = parseInt(process.env.PGPORT || '5432', 10);
    return {
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || process.env.USER || 'postgres',
        user: process.env.PGUSER || process.env.USER || 'postgres',
        password:
            process.env.PGPASSWORD !== undefined && process.env.PGPASSWORD !== ''
                ? process.env.PGPASSWORD
                : undefined,
        port: Number.isFinite(port) ? port : 5432,
    };
}

/** Base keys merged into Mapnik postgis datasource (must be strings Mapnik accepts). */
export function getMapnikPostgisConnection(): Record<string, string> {
    const o = getPgConnectionOptions();
    const cfg: Record<string, string> = {
        host: o.host,
        dbname: o.database,
        user: o.user,
        port: String(o.port),
    };
    if (o.password !== undefined) {
        cfg.password = o.password;
    }
    return cfg;
}
