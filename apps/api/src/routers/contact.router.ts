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
import {
  ListContactByIdInputSchema,
  ListContactByIdOutputSchema,
  ListContactInputSchema,
  ListContactOutputSchema,
  MutateContactStatusInput,
  TRPCMutationSchema,
} from '../lib/types.js';
import { ContactMessageTable } from '../db/schema/contact-messages.schema.js';
import { count, eq, ilike } from 'drizzle-orm';
import { escapeLike } from '../lib/helpers.js';

export const contactRouter = router({
  sendContactForm: publicProcedure
    .input(ContactUsFormSchema)
    .output(TRPCMutationSchema)
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
          return {
            success: false,
            message: 'Cannot submit the form right now.',
          };
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
        } catch (error) {
          console.error('Contact Form SES error', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email was not sent!',
          });
        }

        return {
          success: true,
          message: `We received your message. Our team will be with you shortly!`,
        };
      } catch (error) {
        console.error('contactRouter.sendContactForm error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong, try again later.',
        });
      }
    }),

  list: organizationProcedure
    .input(ListContactInputSchema)
    .output(ListContactOutputSchema)
    .query(async ({ input }) => {
      const { sortBy, sortOrder, page, limit, search, filterBy } = input;

      const offset = (page - 1) * limit;

      const pattern = search ? `%${escapeLike(search)}%` : undefined;

      const orderBy = (() => {
        switch (sortBy) {
          case 'createdAt': {
            return {
              createdAt: sortOrder,
              name: 'asc',
              email: 'asc',
            } as const;
          }

          case 'email': {
            return {
              email: sortOrder,
              name: 'asc',
              createdAt: 'desc',
            } as const;
          }

          case 'name': {
            return {
              name: sortOrder,
              email: 'asc',
              createdAt: 'desc',
            } as const;
          }
        }
      })();

      try {
        const [row, [rowCount]] = await Promise.all([
          db.query.ContactTable.findMany({
            columns: {
              name: true,
              email: true,
              createdAt: true,
              status: true,
              id: true,
            },
            limit,
            offset,
            orderBy,
            where: pattern
              ? { name: { ilike: pattern } }
              : filterBy !== 'none'
                ? {
                    status: filterBy,
                  }
                : {},
          }),
          db.select({ total: count() }).from(ContactTable),
        ]);

        const total = rowCount?.total ?? 1;

        return {
          success: true,
          data: row,
          total,
          totalPages: Math.max(1, Math.ceil(total / limit)),
          page,
          limit,
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
          success: true,
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

  byId: organizationProcedure
    .input(ListContactByIdInputSchema)
    .output(ListContactByIdOutputSchema)
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const data = await db.query.ContactTable.findFirst({
          columns: {
            name: true,
            email: true,
            status: true,
            companyName: true,
            minBudget: true,
            maxBudget: true,
            message: true,
            createdAt: true,
            position: true,
          },
          where: { id },
          with: {
            messages: {
              columns: {
                id: true,
                direction: true,
                status: true,
                message: true,
                createdAt: true,
              },
            },
          },
        });

        if (!data) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        return {
          ...data,
        };
      } catch (error) {
        console.error('contactRouter.byId error');

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  changeContactStatus: organizationProcedure
    .input(MutateContactStatusInput)
    .output(TRPCMutationSchema)
    .mutation(async ({ input }) => {
      const { id, status } = input;

      try {
        const [data] = await db
          .update(ContactTable)
          .set({
            status,
          })
          .where(eq(ContactTable.id, id))
          .returning({ id: ContactTable.id });

        if (!data) {
          return {
            success: false,
            message: 'Something went wrong, try again.',
          };
        }

        return {
          success: true,
          message: 'Contact status Updated!',
        };
      } catch (error) {
        console.error('contactRouter.changeContactStatus error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
