import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { SubscriptionPlanTable } from './subscription-plans.schema.js';
import { AppTable } from './apps.schema.js';
import { PaymentProviderTable } from './payment-providers.schema.js';
import {
  billingInterval,
  timestamps,
  userSubscriptionStatus,
} from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const UserSubscriptionTable = t.pgTable(
  'user_subscription',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionPlanTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppTable.id, { onDelete: 'cascade' })
      .notNull(),
    paymentProviderId: t
      .uuid('payment_provider_id')
      .references(() => PaymentProviderTable.id, { onDelete: 'cascade' })
      .notNull(),
    stripeSubscriptionId: t
      .varchar('stripe_subscription_id', { length: 255 })
      .unique(),
    currentPeriodStart: t
      .timestamp('current_period_start', { withTimezone: true })
      .notNull()
      .defaultNow(),
    currentPeriodEnd: t
      .timestamp('current_period_end', { withTimezone: true })
      .notNull(),
    billingIntervalSnapshot: billingInterval('billing_interval_snapshot')
      .notNull()
      .default('monthly'),
    status: userSubscriptionStatus('status').notNull().default('incomplete'),
    totalSnapshotInCent: t.integer('total_snapshot').notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('userSubscription_userId_idx').on(table.userId),
    t.index('userSubscription_subscriptionId_idx').on(table.subscriptionId),
    t.index('userSubscription_appId_idx').on(table.appId),
    t
      .uniqueIndex('userSubscription_active_idx')
      .on(table.userId, table.appId)
      .where(sql`${table.status} = 'active'`),
    t.check(
      'period_check',
      sql`${table.currentPeriodEnd} > ${table.currentPeriodStart}`,
    ),
    t.check('total_check', sql`${table.totalSnapshotInCent} > 0`),
  ],
);
