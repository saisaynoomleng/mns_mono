import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';

export const PaymentProviderTable = t.pgTable('payment_providers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  ...timestamps,
});
