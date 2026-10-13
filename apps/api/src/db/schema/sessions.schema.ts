import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';

export const SessionTable = t.pgTable(
  'sessions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    expiresAt: t.timestamp('expires_at', { withTimezone: true }).notNull(),
    token: t.text('token').notNull().unique(),
    ipAddress: t.text('ip_address'),
    userAgent: t.text('user_agent'),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    impersonatedBy: t.text('impersonated_by'),
    ...timestamps,
  },
  (table) => [t.index('session_userId_idx').on(table.userId)],
);
