import { defineRelations } from 'drizzle-orm';
import * as schema from './schema/index.js';

export const relations = defineRelations(schema, (r) => ({
  ContactTable: {
    messages: r.many.ContactMessageTable({
      from: r.ContactTable.id,
      to: r.ContactMessageTable.contactId,
    }),
  },

  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),

    accounts: r.many.AccountTable({
      from: r.UserTable.id,
      to: r.AccountTable.userId,
    }),
  },
}));
