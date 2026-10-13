import {
  ContactUsFormSchema,
  ReplyToContactFormSchema,
  toTitleCase,
} from '@mns/utils';
import {
  organizationProcedure,
  publicProcedure,
  router,
} from '../trpc/trpc.js';
import db from '../db/index.js';
import { ContactTable } from '../db/schema/contacts.schema.js';
import { TRPCError } from '@trpc/server';
import {
  renderContactEmail,
  renderReplyToContactEmail,
} from '../../../../packages/email/dist/index.js';
import { emailClient } from '../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../lib/env.js';
import { ListContactOutputSchema } from '../lib/types.js';
import { ContactMessageTable } from '../db/schema/contact-messages.schema.js';
import { eq } from 'drizzle-orm';

export const contactRouter = router({
  sendContactForm: publicProcedure
    .input(ContactUsFormSchema)
    .mutation(async ({ input }) => {
      const {
        name,
        email,
        companyName,
        position,
        minBudget,
        maxBudget,
        message,
      } = input;

      try {
        const [data] = await db
          .insert(ContactTable)
          .values({
            name,
            email,
            companyName,
            position,
            minBudget,
            maxBudget,
            message,
            status: 'new',
          })
          .returning();

        if (!data) {
          console.error('Insert contact db error', data);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Cannot submit the form right now.',
          });
        }

        try {
          const html = await renderContactEmail({
            email: data.email,
            name: data.name,
          });

          await emailClient.send(
            new SendEmailCommand({
              Source: env.CONTACT_EMAIL,

              Destination: {
                ToAddresses: [data.email],
              },

              ReplyToAddresses: [env.REPLY_TO_EMAIL],

              Message: {
                Subject: {
                  Data: 'We received your message',
                  Charset: 'utf-8',
                },

                Body: {
                  Html: {
                    Data: html,
                    Charset: 'utf-8',
                  },
                },
              },
            }),
          );

          return {
            message: `We received your message. Our team will be with you shortly!`,
          };
        } catch (error) {
          console.error('Contact Form SES error', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email was not sent!',
          });
        }
      } catch (error) {
        console.error('Conctac Form TRPC error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong, try again later.',
        });
      }
    }),

  list: organizationProcedure
    .output(ListContactOutputSchema)
    .query(async () => {
      try {
        const data = await db.query.ContactTable.findMany({
          columns: {
            name: true,
            email: true,
            createdAt: true,
            status: true,
          },
        });

        return {
          data,
        };
      } catch (error) {
        console.error('Contacts list db error', error);

        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'No contacts in the system',
        });
      }
    }),

  replyToContact: organizationProcedure
    .input(ReplyToContactFormSchema)
    .mutation(async ({ input }) => {
      const { id, subject, message } = input;

      try {
        const user = await db.query.ContactTable.findFirst({
          columns: {
            id: true,
            email: true,
            name: true,
          },
          where: { id },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Contact not found',
          });
        }

        const [messageData] = await db
          .insert(ContactMessageTable)
          .values({
            contactId: user.id,
            direction: 'outbound',
            message,
            status: 'pending',
          })
          .returning();

        if (!messageData) {
          console.error('Insert into contact message table error', messageData);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Unable to create contact message.',
          });
        }

        let html;

        try {
          html = await renderReplyToContactEmail({
            name: user.name,
            email: user.email,
            subject,
            message,
          });

          await emailClient.send(
            new SendEmailCommand({
              Source: env.CONTACT_EMAIL,

              Destination: {
                ToAddresses: [user.email],
              },

              ReplyToAddresses: [env.REPLY_TO_EMAIL],

              Message: {
                Subject: {
                  Data: toTitleCase(subject),
                  Charset: 'utf-8',
                },

                Body: {
                  Html: {
                    Data: html,
                    Charset: 'utf-8',
                  },
                },
              },
            }),
          );
        } catch (error) {
          console.error('Reply to contact Email Error', error);

          try {
            await db
              .update(ContactMessageTable)
              .set({ status: 'failed' })
              .where(eq(ContactMessageTable.id, messageData.id));
          } catch (dbError) {
            console.error('Failed to update message status:', dbError);
          }

          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email was not sent',
          });
        }

        await db
          .update(ContactMessageTable)
          .set({ status: 'sent' })
          .where(eq(ContactMessageTable.id, messageData.id));

        return {
          message: 'Email sent to the contact.',
        };
      } catch (error) {
        console.error('Reply to contact procedure error: ', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong, try again later.',
        });
      }
    }),
});
