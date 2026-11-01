import * as t from 'drizzle-orm/pg-core';
import { serviceStatus, timestamps } from './schema-helper.js';

export const ServiceTable = t.pgTable('services', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  status: serviceStatus('status').notNull().default('active'),
  ...timestamps,
});
