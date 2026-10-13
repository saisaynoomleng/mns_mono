import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { AppTable } from './apps.schema.js';
import { reportIssueStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ReportIssueTable = t.pgTable(
  'report_issues',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t
      .varchar('user_name_snapshot', { length: 255 })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    status: reportIssueStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.index('issue_userId_idx').on(table.userId),
    t.index('issue_appId_idx').on(table.appId),
    t
      .index('issue_appId_new_idx')
      .on(table.appId)
      .where(sql`${table.status} = 'new'`),
  ],
);
