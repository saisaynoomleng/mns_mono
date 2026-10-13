import * as t from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const contactStatus = t.pgEnum('contactStatus', [
  'new',
  'spam',
  'in_progress',
  'resolved',
]);

export const contactMessageDirection = t.pgEnum('contactMessageDirection', [
  'inbound',
  'outbound',
]);

export const contactMessageStatus = t.pgEnum('contactMessageStatus', [
  'pending',
  'sent',
  'failed',
]);

export const userRole = t.pgEnum('userRole', ['user', 'admin', 'super_admin']);

export const appStatus = t.pgEnum('appStatus', [
  'production',
  'development',
  'test',
]);

export const appType = t.pgEnum('appType', [
  'health_care',
  'retail_and_commerce',
  'restaurant',
  'creative_and_media',
  'generic',
]);

export const serviceStatus = t.pgEnum('serviceStatus', [
  'active',
  'no_longer_available',
]);

export const subscriptionStauts = t.pgEnum('subscriptionStatus', [
  'active',
  'no_longer_available',
]);

export const billingInterval = t.pgEnum('billingInterval', [
  'monthly',
  'yearly',
  'quarterly',
]);

export const userSubscriptionStatus = t.pgEnum('userSubscriptionStatus', [
  'active',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'past_due',
  'canceled',
  'paused',
  'unpaid',
]);

export const testimonialStatus = t.pgEnum('testimonialStatus', [
  'reviewed',
  'new',
  'spam',
]);

export const reportIssueStatus = t.pgEnum('reportIssueStatus', [
  'new',
  'in_progress',
  'awaiting_approval',
  'resolved',
  'reopen',
  'critical',
]);

export const featureRequestStatus = t.pgEnum('featureRequestStatus', [
  'under_review',
  'new',
  'planned',
  'beta_testing',
  'in_progress',
  'declined',
]);

export const invoiceSource = t.pgEnum('invoiceSource', [
  'subscription',
  'project_deposit',
  'project_balance',
  'one_off',
]);

export const currency = t.pgEnum('currency', ['usd', 'mmk']);

export const invoiceStatus = t.pgEnum('invoiceStatus', [
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible',
  'refunded',
]);
