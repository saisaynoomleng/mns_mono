import { betterAuth } from 'better-auth';
import env from './env.js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '../db/index.js';
import { admin, emailOTP } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { UserTable } from '../db/schema/users.schema.js';
import { SessionTable } from '../db/schema/sessions.schema.js';
import { AccountTable } from '../db/schema/accounts.schema.js';
import { VerificationTable } from '../db/schema/verifications.schema.js';
import { ac, admin as adminAC, super_admin, user } from './access-control.js';
import { signUpVerification } from '../auth/signUpVerification.js';
import { otpVerification } from '../auth/otpVerification.js';
import { deleteVerification } from '../auth/deleteVerification.js';

const origins = env.ALLOWED_ORIGINS.split(',');
const adminIds = env.ADMIN_USER_IDS?.split(',');

export const auth = betterAuth({
  plugins: [
    admin({
      ac,
      defaultRole: 'user',
      roles: {
        admin: adminAC,
        super_admin,
        user,
      },
      bannedUserMessage: `You've been banned for spamming the account`,
      impersonationSessionDuration: env.IMPERSONATE_SESSION_DURATION,
      adminUserIds: adminIds ? [...adminIds] : [],
      defaultBanReason: 'Spamming',
    }),
    emailOTP({
      sendVerificationOTP: async ({ otp, type, email }) => {
        if (type === 'forget-password') {
          void otpVerification({ otp, email });
        }
        if (type === 'change-email') {
          void otpVerification({ otp, email });
        }
      },
      expiresIn: env.OTP_EXPIRES_IN,
      changeEmail: {
        enabled: true,
      },
    }),
    nextCookies(),
  ],

  appName: env.APP_NAME,

  baseURL: env.BETTER_AUTH_URL,

  basePath: '/api/auth',

  trustedOrigins: [...origins, 'https://*.mnsart.com'],

  secret: env.BETTER_AUTH_SECRET,

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void signUpVerification({ email: user.email, url });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: env.OTP_EXPIRES_IN,
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    modelName: 'users',
    fields: {
      name: 'name',
      email: 'email',
    },
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
        input: true,
        returned: true,
      },
      companyName: {
        type: 'string',
        required: false,
        input: true,
        returned: true,
      },
      position: {
        type: 'string',
        required: false,
        input: true,
        returned: true,
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        void deleteVerification({ email: user.email, url });
      },
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'userId',
    },
    expiresIn: env.SESSION_EXPIRES_IN,
    updateAge: env.SESSION_UPDATE_AGE,
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: env.SESSION_COOKIE_CACHE_MAX_AGE,
    },
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    accountLinking: {
      enabled: true,
      trustedProviders: [
        'google',
        'facebook',
        'email-password',
        'tiktok',
        'linkedin',
      ],
      allowDifferentEmails: false,
    },
  },

  verification: {
    modelName: 'verifications',
    disableCleanup: false,
    storeIdentifier: 'hashed',
    storeInDatabase: true,
  },

  rateLimit: {
    modelName: 'rate_limits',
    enabled: true,
    window: env.RATE_LIMIT_WINDOW,
    max: env.RATE_LIMIT_REQUESTS,
    customRules: {
      '/get-session': false,
    },
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: UserTable,
      sessions: SessionTable,
      accounts: AccountTable,
      verifications: VerificationTable,
    },
  }),

  advanced: {
    database: {
      generateId: 'uuid',
    },
    useSecureCookies: true,
    disableOriginCheck: false,
    disableCSRFCheck: false,
    ...(env.NODE_ENV === 'production'
      ? {
          crossSubDomainCookies: {
            enabled: true,
            domain: 'mnsart.com',
          },
        }
      : {}),
  },
});
