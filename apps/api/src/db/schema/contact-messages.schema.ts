import * as t from 'drizzle-orm/pg-core';
import { ContactTable } from './contacts.schema.js';
import {
  contactMessageDirection,
  contactMessageStatus,
  timestamps,
} from './schema-helper.js';

export const ContactMessageTable = t.pgTable(
  'contact_messages',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    contactId: t
      .uuid('contact_id')
      .references(() => ContactTable.id, { onDelete: 'cascade' })
      .notNull(),
    direction: contactMessageDirection('direction')
      .notNull()
      .default('outbound'),
    status: contactMessageStatus('status').notNull().default('pending'),
    message: t.text('message').notNull(),
    ...timestamps,
  },
  (table) => [t.index('contactMessage_contactId_idx').on(table.contactId)],
);
