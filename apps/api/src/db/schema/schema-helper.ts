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
