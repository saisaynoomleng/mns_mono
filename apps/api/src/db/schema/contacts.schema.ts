import * as t from 'drizzle-orm/pg-core';
import { contactStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ContactTable = t.pgTable(
  'contacts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    companyName: t.varchar('companyName', { length: 255 }),
    position: t.varchar('position', { length: 255 }),
    minBudget: t.integer('min_budget').notNull(),
    maxBudget: t.integer('max_budget').notNull(),
    message: t.text('message').notNull(),
    status: contactStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.check('budget_check', sql`${table.maxBudget} > ${table.minBudget}`),
    t
      .index('contact_status_idx')
      .on(table.status)
      .where(sql`${table.status} = 'new'`),
  ],
);
