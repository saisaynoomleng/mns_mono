import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';

export const AddressTable = t.pgTable(
  'addresses',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    street1: t.varchar('street_1', { length: 255 }).notNull(),
    street2: t.varchar('street_2', { length: 255 }),
    city: t.varchar('city', { length: 255 }).notNull(),
    state: t.varchar('state', { length: 255 }).notNull(),
    zip: t.varchar('zip', { length: 100 }).notNull(),
    country: t.varchar('country', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('address_userId_idx').on(table.userId)],
);
