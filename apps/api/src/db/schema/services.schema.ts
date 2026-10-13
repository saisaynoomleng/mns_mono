import * as t from 'drizzle-orm/pg-core';
import { serviceStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ServiceTable = t.pgTable(
  'services',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    priceInCent: t.integer('price_in_cent').notNull(),
    slogan: t.text('slogan').notNull(),
    excerpt: t.text('excerpt').notNull(),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    status: serviceStatus('status').notNull().default('active'),
    ...timestamps,
  },
  (table) => [t.check('price_check', sql`${table.priceInCent} > 0`)],
);
