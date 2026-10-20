import { ITask } from 'pg-promise';

import db from '../../db';

// Create a transaction mode (serializable, read-write):
const serializableMode = new db.$config.pgp.txMode.TransactionMode({
    tiLevel: db.$config.pgp.txMode.isolationLevel.serializable,
    readOnly: false
});

/** Postgres serialization failure and deadlock - safe to retry the whole transaction */
const RETRYABLE_ERROR_CODES = ['40001', '40P01'];
const MAX_ATTEMPTS = 3;

function isRetryable(error): boolean {
    return RETRYABLE_ERROR_CODES.includes(error?.code) ||
        RETRYABLE_ERROR_CODES.includes(error?.detail?.code);
}

/**
 * Serializable transactions can abort when two edits to the same building overlap
 * (e.g. a double-clicked Save), so retry rather than failing the request.
 */
export async function startUpdateTransaction<T>(cb: (t: ITask<any>) => Promise<T>): Promise<T> {
    for (let attempt = 1; ; attempt++) {
        try {
            return await db.tx({mode: serializableMode}, cb);
        } catch (error) {
            if (attempt >= MAX_ATTEMPTS || !isRetryable(error)) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 50 * attempt));
        }
    }
}
