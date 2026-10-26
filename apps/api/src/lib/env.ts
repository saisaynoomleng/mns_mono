import dotenv from 'dotenv';
import * as z from 'zod';

const appStage = process.env.APP_STAGE ?? 'dev';

dotenv.config({
  path: appStage === 'dev' ? '.env' : '.env.test',
});

const schema = z.object({
  // Database
  DATABASE_URL: z
    .url({ error: 'Must be a valid URL' })
    .startsWith('postgresql://'),
  DATABASE_POOL_MAX: z.coerce.number().min(2).max(30).default(20),

  // Redis
  UPSTASH_REDIS_REST_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Upstash redis REST URL is required' }),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, { error: 'Upstash redis token is required' }),

  // Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(1, { error: 'Better auth secret is required' }),
  BETTER_AUTH_URL: z
    .url({ error: 'Must be a valid URL' })
    .min(1, { error: 'Better auth URL is required' }),
  OTP_EXPIRES_IN: z.coerce.number().nonnegative().default(900),
  SESSION_EXPIRES_IN: z.coerce.number().nonnegative().default(604800),
  SESSION_UPDATE_AGE: z.coerce.number().nonnegative().default(86400),
  SESSION_COOKIE_CACHE_MAX_AGE: z.coerce.number().nonnegative().default(300),
  IMPERSONATE_SESSION_DURATION: z.coerce.number().nonnegative().default(86400),
  ADMIN_USER_IDS: z.string().optional(),

  // Social Providers
  GOOGLE_CLIENT_ID: z
    .string()
    .min(1, { error: 'Goolge client ID is required' }),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, { error: 'Goolge client secret is required' }),

  // CORS
  ALLOWED_ORIGINS: z.string(),

  // Server
  PORT: z.coerce.number().nonnegative().default(8000),
  NODE_ENV: z
    .enum(['production', 'development', 'test'])
    .default('development'),
  APP_STAGE: z.enum(['dev', 'prod', 'test']).default('dev'),
  APP_NAME: z.string().min(1, { error: 'App name is required' }),

  // Rate limit
  RATE_LIMIT_WINDOW: z.coerce.number().nonnegative().default(90),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().nonnegative().default(90000),
  RATE_LIMIT_REQUESTS: z.coerce.number().nonnegative().default(50),

  // AWS
  AWS_REGION: z.string().min(1, { error: 'AWS region is required' }),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .min(1, { error: 'AWS secret accesss key is required' }),
  AWS_ACCESS_KEY_ID: z
    .string()
    .min(1, { error: 'AWS accesss key id is required' }),

  // Email Addressses
  NO_REPLY_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'No reply email is required' }),
  CONTACT_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Contact email is required' }),
  REPLY_TO_EMAIL: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Reply to email is required' }),

  // Logging
  LOG_LEVEL: z.string(),
});

type Env = z.infer<typeof schema>;

let env: Env;

try {
  env = schema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('Invalid env vars');
    console.log(
      `${error.issues[0]?.path.join('.')}: ${error.issues[0]?.message}`,
    );

    process.exit(1);
  }

  throw error;
}

export default env;
export const isProd = () => process.env.APP_STAGE === 'prod';
export const isDev = () => process.env.APP_STAGE === 'dev';
export const isTest = () => process.env.APP_STAGE === 'test';
