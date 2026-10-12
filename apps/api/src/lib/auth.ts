import { betterAuth } from 'better-auth';
import env from './env.js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '../db/index.js';
import { admin, emailOTP } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import {
  account,
  session,
  user,
  verification,
} from '../db/schema/auth-schema.js';

export const auth = betterAuth({
  appName: env.APP_NAME,

  plugins: [
    admin(),
    emailOTP({
      sendVerificationOTP: async ({ otp, type, email }) => {
        //
      },
      expiresIn: env.OTP_EXPIRES_IN,
    }),
    nextCookies(),
  ],

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: user,
      session: session,
      verification: verification,
      account: account,
    },
  }),
});
