import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import { UserTable } from './users.schema.js';

export const AccountTable = t.pgTable(
  'accounts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    accountId: t.text('account_id').notNull(),
    providerId: t.text('provider_id').notNull(),
    userId: t
      .uuid('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    accessToken: t.text('access_token'),
    refreshToken: t.text('refresh_token'),
    idToken: t.text('id_token'),
    accessTokenExpiresAt: t.timestamp('access_token_expires_at', {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at', {
      withTimezone: true,
    }),
    scope: t.text('scope'),
    password: t.text('password'),
    ...timestamps,
  },
  (table) => [t.index('account_userId_idx').on(table.userId)],
);
