import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_APP_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'NEXT PUBLIC APP URL is required' }),
    NEXT_PUBLIC_API_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'NEXT PUBLIC API URL is required' }),
    NEXT_PUBLIC_ADMIN_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'NEXT PUBLIC ADMIN URL is required' }),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z
      .string()
      .min(1, { error: 'NEXT PUBLIC SANITY PROJECT ID is required' }),
    NEXT_PUBLIC_SANITY_DATASET: z
      .enum(['development', 'production'])
      .default('production'),
    NEXT_PUBLIC_SANITY_API_VERSION: z
      .string()
      .min(1, { error: 'NEXT PUBLIC SANITY API VERSION is required' }),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
});
