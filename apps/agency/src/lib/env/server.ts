import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, { error: 'SANITY PROJECT ID is reuqired' }),
    SANITY_STUDIO_DATASET: z
      .enum(['development', 'production'])
      .default('production'),
    SANITY_READ_TOKEN: z
      .string()
      .min(1, { error: 'SANITY READ TOKEN is reuqired' }),
    API_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'APP URL is required' }),
  },
  runtimeEnv: {
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
    API_URL: process.env.API_URL,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
