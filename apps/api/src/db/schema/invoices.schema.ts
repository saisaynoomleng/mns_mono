import * as t from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserTable } from './users.schema.js';
import { SubscriptionPlanTable } from './subscription-plans.schema.js';
import { PaymentProviderTable } from './payment-providers.schema.js';
import { ServiceTable } from './services.schema.js';
import {
  currency,
  invoiceSource,
  invoiceStatus,
  timestamps,
} from './schema-helper.js';

export const InvoicesTable = t.pgTable(
  'invoices',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t
      .varchar('user_name_snapshot', { length: 255 })
      .notNull(),
    userEmailSnapshot: t
      .varchar('user_email_snapshot', { length: 255 })
      .notNull(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionPlanTable.id, { onDelete: 'set null' }),
    subscriptionNameSnapshot: t.varchar('subscription_name_snapshot', {
      length: 255,
    }),
    paymentProviderId: t
      .uuid('payment_provider_id')
      .references(() => PaymentProviderTable.id, { onDelete: 'set null' }),
    paymentProviderNameSnapshot: t
      .varchar('payment_provider_name_snapshot', { length: 255 })
      .notNull(),
    serviceId: t
      .uuid('service_id')
      .references(() => ServiceTable.id, { onDelete: 'set null' }),
    serviceNameSnapshot: t.varchar('service_name_snapshot', { length: 255 }),
    description: t.text('description').notNull(),
    sourceType: invoiceSource('source_type').notNull().default('subscription'),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', {
        length: 255,
      })
      .unique(),
    stripeInvoiceId: t.varchar('stripe_invoice_id', { length: 255 }).unique(),
    currency: currency('currency').notNull().default('usd'),
    status: invoiceStatus('status').notNull().default('draft'),
    subTotalSnapshotInCents: t.integer('sub_total_snapshot_in_cents').notNull(),
    taxSnapshotInCents: t.integer('tax_snapshot_in_cents').notNull(),
    totalInCents: t.integer('total_in_cents').notNull(),
    dueAt: t.timestamp('due_at', { withTimezone: true }).notNull(),
    paidAt: t.timestamp('paid_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    t.index('invoice_userId_idx').on(table.userId),
    t.check('subtotal_check', sql`${table.subTotalSnapshotInCents} > 0`),
    t.check('tax_check', sql`${table.taxSnapshotInCents} >= 0`),
    t.check('total_check', sql`${table.totalInCents} > 0`),
    t
      .index('invoice_refunded_idx')
      .on(table.status)
      .where(sql`${table.status} = 'refunded'`),
  ],
);
