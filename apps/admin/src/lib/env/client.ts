import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_API_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'NEXT_PUBLIC_API_URL is required' }),
    NEXT_PUBLIC_AGENCY_URL: z
      .url({ error: 'Must be a valid URL' })
      .min(1, { error: 'NEXT_PUBLIC_AGENCY_URL is required' }),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AGENCY_URL: process.env.NEXT_PUBLIC_AGENCY_URL,
  },
});
