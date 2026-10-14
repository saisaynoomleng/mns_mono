import * as t from 'drizzle-orm/pg-core';
import { SubscriptionPlanTable } from './subscription-plans.schema.js';
import { timestamps } from './schema-helper.js';

export const SubscriptionNotIncludedFeatureTable = t.pgTable(
  'subscription_plan_not_included_features',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionPlanTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text().notNull(),
    ...timestamps,
  },
  (table) => [
    t
      .index('notIncludedFeature_subscriptionPlanId_idx')
      .on(table.subscriptionId),
  ],
);
