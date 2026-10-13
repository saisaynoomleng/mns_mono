import { renderOTPValidationEmail } from '@mns/email';
import { emailClient } from '../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../lib/env.js';

type ForgetPasswordVerification = {
  email: string;
  otp: string;
  expiresAt?: number;
};

export const otpVerification = async ({
  email,
  otp,
  expiresAt = 15,
}: ForgetPasswordVerification) => {
  try {
    const html = await renderOTPValidationEmail({ otp, expiresAt });

    await emailClient.send(
      new SendEmailCommand({
        Source: env.NO_REPLY_EMAIL,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Use this code to Continue. It expires in 15 minutes',
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
    console.error('OTP verification email error', error);
  }
};
