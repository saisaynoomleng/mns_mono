import {
  NewsletterFormSchema,
  SendProductUpdateEmailFormSchema,
  toTitleCase,
  TRPCResponseSchema,
} from '@mns/utils';
import {
  organizationProcedure,
  publicProcedure,
  router,
} from '../trpc/trpc.js';
import db from '../db/index.js';
import { NewsletterTable } from '../db/schema/newsletters.schema.js';
import { emailClient } from '../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../lib/env.js';
import {
  renderNewsletterEmail,
  renderProductUpdateEmail,
} from '../../../../packages/email/dist/index.js';
import { TRPCError } from '@trpc/server';
import { ListNewsletterOutputSchema } from '../lib/types.js';

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(NewsletterFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input }) => {
      try {
        const { email } = input;

        const [subscription] = await db
          .insert(NewsletterTable)
          .values({
            email,
          })
          .onConflictDoNothing({ target: NewsletterTable.email })
          .returning({ email: NewsletterTable.email, id: NewsletterTable.id });

        if (!subscription) {
          return {
            success: false,
            message: `You are already subscribed!`,
          };
        }

        try {
          const html = await renderNewsletterEmail({
            email: subscription.email,
          });

          await emailClient.send(
            new SendEmailCommand({
              Source: env.NO_REPLY_EMAIL,

              Destination: {
                ToAddresses: [subscription.email],
              },

              Message: {
                Subject: {
                  Data: `You’re subscribed`,
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
          console.error(`Newsletter subscription SES error`, error);

          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
          });
        }

        return {
          success: true,
          message: `Thanks for joining our newsletters.`,
        };
      } catch (error) {
        console.error('Newsletter subscription trpc error', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to subscribe right now.',
        });
      }
    }),

  list: organizationProcedure
    .output(ListNewsletterOutputSchema)
    .query(async () => {
      try {
        const data = await db.query.NewsletterTable.findMany({
          columns: {
            email: true,
            createdAt: true,
            id: true,
          },
        });

        if (data.length === 0) {
          console.error('List newsletter db error', data);
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'There are no subscribers to email',
          });
        }

        return {
          success: true,
          data: data,
        };
      } catch (error) {
        console.error(`List newsletter trpc error`, error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  sendProductUpdateEmail: organizationProcedure
    .input(SendProductUpdateEmailFormSchema)
    .mutation(async ({ input }) => {
      const { subject, message } = input;

      try {
        const subscribers = await db.query.NewsletterTable.findMany({
          columns: {
            email: true,
          },
        });

        for (const subscriber of subscribers) {
          const html = await renderProductUpdateEmail({
            email: subscriber.email,
            subject,
            message,
          });

          await emailClient.send(
            new SendEmailCommand({
              Source: env.NO_REPLY_EMAIL,

              Destination: {
                ToAddresses: [subscriber.email],
              },

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
        }

        return {
          success: true,
          message: 'Message sent to the subscribers!',
        };
      } catch (error) {
        console.error('Newsletter send product email error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
