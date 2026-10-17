import { env } from '@/lib/env/client';
import { createClient } from 'next-sanity';

export const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});
