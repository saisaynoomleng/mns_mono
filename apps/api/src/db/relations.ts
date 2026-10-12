import { defineRelations } from 'drizzle-orm';
import * as schema from './schema/index.js';

export const relations = defineRelations(schema, (r) => ({
  ContactTable: {
    messages: r.many.ContactMessageTable({
      from: r.ContactTable.id,
      to: r.ContactMessageTable.contactId,
    }),
  },
}));
