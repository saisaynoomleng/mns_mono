import * as t from 'drizzle-orm/pg-core';
import { ServiceTable } from './services.schema.js';
import { subscriptionStauts, timestamps } from './schema-helper.js';

export const SubscriptionTable = t.pgTable(
  'subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    serviceId: t
      .uuid('service_id')
      .references(() => ServiceTable.id, { onDelete: 'cascade' })
      .notNull(),
    name: t.varchar('name', { length: 255 }).notNull().unique(),
    pricePerMonthInCent: t.integer('price_per_month_in_cents').notNull(),
    status: subscriptionStauts('status').notNull().default('active'),
    ...timestamps,
  },
  (table) => [t.index('subscription_serviceId_idx').on(table.serviceId)],
);
