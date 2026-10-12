import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';

export const NewsletterTable = t.pgTable('newsletters', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});
