import type { NewsletterFormInput } from '@mns/utils';
import db from '../../db/index.js';
import { NewsletterTable } from '../../db/schema/index.js';

export const newsletterRepository = () => {
  return {
    insert: async ({ email }: NewsletterFormInput) => {
      try {
        const [data] = await db
          .insert(NewsletterTable)
          .values({
            email,
          })
          .onConflictDoNothing({ target: NewsletterTable.email })
          .returning();

        return data;
      } catch (error) {
        console.error(`Newsletter Insert DB Error`, error);
        throw error;
      }
    },
  };
};
