import { defineRelations } from 'drizzle-orm';
import * as schema from './schema/index.js';

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),

    accounts: r.many.AccountTable({
      from: r.UserTable.id,
      to: r.AccountTable.userId,
    }),

    subscriptions: r.many.SubscriptionTable({
      from: r.UserTable.id.through(r.UserSubscriptionTable.userId),
      to: r.SubscriptionTable.id.through(
        r.UserSubscriptionTable.subscriptionId,
      ),
    }),

    workspaces: r.many.AppTable({
      from: r.UserTable.id.through(r.WorkspaceTable.userId),
      to: r.AppTable.id.through(r.WorkspaceTable.appId),
    }),

    testimonials: r.many.TestimonialTable({
      from: r.UserTable.id,
      to: r.TestimonialTable.userId,
    }),

    reports: r.many.ReportIssueTable({
      from: r.UserTable.id,
      to: r.ReportIssueTable.userId,
    }),

    featureRequests: r.many.FeatureRequestTable({
      from: r.UserTable.id,
      to: r.FeatureRequestTable.userId,
    }),

    invoices: r.many.InvoicesTable({
      from: r.UserTable.id,
      to: r.InvoicesTable.userId,
    }),
  },

  SessionTable: {
    user: r.one.UserTable({
      from: r.SessionTable.userId,
      to: r.UserTable.id,
    }),
  },

  AccountTable: {
    uesr: r.one.UserTable({
      from: r.AccountTable.userId,
      to: r.UserTable.id,
    }),
  },

  ServiceTable: {
    subscriptions: r.many.SubscriptionTable({
      from: r.ServiceTable.id,
      to: r.SubscriptionTable.serviceId,
    }),
  },

  SubscriptionTable: {
    includedFeatures: r.many.SubscriptionIncludedFeatureTable({
      from: r.SubscriptionTable.id,
      to: r.SubscriptionIncludedFeatureTable.subscriptionId,
    }),

    notIncludedFeatures: r.many.SubscriptionNotIncludedFeatureTable({
      from: r.SubscriptionTable.id,
      to: r.SubscriptionNotIncludedFeatureTable.subscriptionId,
    }),

    users: r.many.UserTable({
      from: r.SubscriptionTable.id.through(
        r.UserSubscriptionTable.subscriptionId,
      ),
      to: r.UserTable.id.through(r.UserSubscriptionTable.userId),
    }),

    service: r.one.ServiceTable({
      from: r.SubscriptionTable.serviceId,
      to: r.ServiceTable.id,
    }),
  },

  ContactTable: {
    messages: r.many.ContactMessageTable({
      from: r.ContactTable.id,
      to: r.ContactMessageTable.contactId,
    }),
  },

  AppTable: {
    users: r.many.UserTable({
      from: r.AppTable.id.through(r.WorkspaceTable.appId),
      to: r.UserTable.id.through(r.WorkspaceTable.userId),
    }),

    reports: r.many.ReportIssueTable({
      from: r.AppTable.id,
      to: r.ReportIssueTable.appId,
    }),

    featureRequests: r.many.FeatureRequestTable({
      from: r.AppTable.id,
      to: r.FeatureRequestTable.appId,
    }),
  },

  PaymentProviderTable: {
    invoices: r.many.InvoicesTable({
      from: r.PaymentProviderTable.id,
      to: r.InvoicesTable.paymentProviderId,
    }),
  },
}));
