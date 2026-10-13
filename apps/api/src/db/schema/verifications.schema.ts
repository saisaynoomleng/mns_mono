import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';

export const VerificationTable = t.pgTable(
  'verifications',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    identifier: t.text('identifier').notNull(),
    value: t.text('value').notNull(),
    expiresAt: t.timestamp('expires_at', { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (table) => [t.index('verifications_identifier_idx').on(table.identifier)],
);
