import * as t from 'drizzle-orm/pg-core';
import { SubscriptionTable } from './subscriptions.schema.js';
import { timestamps } from './schema-helper.js';

export const SubscriptionIncludedFeatureTable = t.pgTable(
  'subscription_included_features',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text().notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('includedFeature_subscriptionId_idx').on(table.subscriptionId),
  ],
);
