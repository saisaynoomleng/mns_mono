import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations.js';
import env, { isDev, isProd } from '../lib/env.js';
import { remember } from '@epic-web/remember';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: env.DATABASE_POOL_MAX,
  });

  pool.on('error', (e) => {
    console.error('DB Pool error', e);
  });

  return pool;
};

let client: Pool;

if (isProd()) {
  client = createPool();
} else {
  client = remember('DB Pool', () => createPool());
}

const db = drizzle({ client, relations, logger: isDev() ? true : undefined });
export default db;
