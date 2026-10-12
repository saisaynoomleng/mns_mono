import { TRPCError } from '@trpc/server';
import { NewsletterFormSchema } from '@mns/utils';
import { publicProcedure } from '../../trpc/trpc.js';
import { newsletterRepository } from './newsletter.repository.js';
import { emailClient } from '../../lib/emailClient.js';
import { renderNewsletterEmail } from '@mns/email';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

export const newsletterRouter = () => {
  const repository = newsletterRepository();

  return {
    subscribe: publicProcedure
      .input(NewsletterFormSchema)
      .mutation(async ({ input }) => {
        try {
          const data = await repository.insert(input);

          if (!data) {
            return {
              success: true,
              message: 'You are already subscribed.',
            };
          }

          try {
            const html = await renderNewsletterEmail({ email: data.email });

            await emailClient.send(
              new SendEmailCommand({
                Source: env.NO_REPLY_EMAIL,

                Destination: {
                  ToAddresses: [data.email],
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
            console.error('SES Newsletter error', error);

            return {
              success: false,
              message: 'Something went wrong. Please try again.',
            };
          }

          return {
            success: true,
            message: 'Thanks for joining our newsletter.',
          };
        } catch (error) {
          console.error('Newsletter Subscribe Error', error);

          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong. Please try again.',
          });
        }
      }),
  };
};
