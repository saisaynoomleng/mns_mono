import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { AppTable } from './apps.schema.js';
import { featureRequestStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const FeatureRequestTable = t.pgTable(
  'feature_requests',
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
    body: t.text('body').notNull(),
    status: featureRequestStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t.index('featureRequest_userId_idx').on(table.userId),
    t.index('featureRequest_appId_idx').on(table.appId),
    t
      .index('featureRequest_appId_new_idx')
      .on(table.appId)
      .where(sql`${table.status} = 'new'`),
  ],
);
