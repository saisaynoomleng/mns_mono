import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { AppTable } from './apps.schema.js';
import { UserSubscriptionTable } from './user-subscriptions.schema.js';
import { timestamps } from './schema-helper.js';

export const WorkspaceTable = t.pgTable(
  'workspaces',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppTable.id, { onDelete: 'cascade' })
      .notNull(),
    userSubscriptionId: t
      .uuid('user_subscription_id')
      .references(() => UserSubscriptionTable.id, { onDelete: 'cascade' })
      .notNull(),
    name: t.varchar('name', { length: 255 }).default('My Workspace'),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex('user_app_workspace').on(table.userId, table.appId),
    t.index('workspace_appId_idx').on(table.appId),
  ],
);
