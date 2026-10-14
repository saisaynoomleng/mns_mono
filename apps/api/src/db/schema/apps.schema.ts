import * as t from 'drizzle-orm/pg-core';
import { appStatus, appType, timestamps } from './schema-helper.js';

export const AppTable = t.pgTable('apps', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  liveUrl: t.varchar('live_url', { length: 255 }).notNull(),
  demoUrl: t.varchar('demo_url', { length: 255 }).notNull(),
  status: appStatus('status').notNull().default('development'),
  isMyanmarOnly: t.boolean('is_myanmar_only').notNull().default(false),
  type: appType('type').notNull().default('generic'),
  excerpt: t.text().notNull(),
  body: t.text().notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  ...timestamps,
});
