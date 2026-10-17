import { renderNewsletterEmail } from '@mns/email';
import { emailClient } from '../../lib/emailClient.js';
import type { NewsletterFormInput } from '@mns/utils';
import env from '../../lib/env.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';

export const newsletterService = () => {
  return {
    sendEmailToUser: async ({ email }: NewsletterFormInput) => {
      const html = await renderNewsletterEmail({
        email: email,
      });

      await emailClient.send(
        new SendEmailCommand({
          Source: env.NO_REPLY_EMAIL,

          Destination: {
            ToAddresses: [email],
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
    },
  };
};
