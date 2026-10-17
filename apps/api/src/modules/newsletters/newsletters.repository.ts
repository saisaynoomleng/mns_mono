import type { NewsletterFormInput } from '@mns/utils';
import { NewsletterTable } from '../../db/schema/newsletters.schema.js';
import db from '../../db/index.js';

export const newsletterRepository = () => {
  return {
    insertSubscription: async ({ email }: NewsletterFormInput) => {
      const [data] = await db
        .insert(NewsletterTable)
        .values({
          email,
        })
        .onConflictDoNothing({ target: NewsletterTable.email })
        .returning({ email: NewsletterTable.email, id: NewsletterTable.id });

      return data;
    },

    findAll: async () => {
      const data = await db.query.NewsletterTable.findMany({
        columns: {
          email: true,
        },
      });

      return data;
    },
  };
};
