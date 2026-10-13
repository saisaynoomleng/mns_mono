import { SendEmailCommand } from '@aws-sdk/client-ses';
import { renderSignUpVerificationEmail } from '../../../../packages/email/dist/index.js';
import { emailClient } from '../lib/emailClient.js';
import env from '../lib/env.js';

type signUpVerificationProps = {
  email: string;
  url: string;
  expiresAt?: number;
};

export const signUpVerification = async ({
  email,
  url,
  expiresAt = 15,
}: signUpVerificationProps) => {
  try {
    const html = await renderSignUpVerificationEmail({ email, url, expiresAt });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_EMAIL,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Verify your account',
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
    console.error('Sign Up verification email error', error);
  }
};
