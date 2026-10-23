import * as t from 'drizzle-orm/pg-core';
import { appStatus, timestamps } from './schema-helper.js';

export const AppTable = t.pgTable('apps', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  sanityId: t.varchar('sanity_id').notNull().unique(),
  status: appStatus('status').notNull().default('inactive'),
  ...timestamps,
});
