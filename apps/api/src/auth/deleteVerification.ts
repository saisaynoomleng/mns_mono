import { renderDeleteAccountVerification } from '@mns/email';
import { emailClient } from '../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../lib/env.js';

type DeleteVerificationProps = {
  email: string;
  url: string;
  expiresAt?: number;
};

export const deleteVerification = async ({
  email,
  url,
  expiresAt = 15,
}: DeleteVerificationProps) => {
  try {
    const html = await renderDeleteAccountVerification({ url, expiresAt });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_EMAIL,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Confirm your account deletion',
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
    console.error('Delete Verification Email error', error);
  }
};
