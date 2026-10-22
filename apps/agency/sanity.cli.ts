import { env } from '@/lib/env/client';
import { defineCliConfig } from '@sanity/cli';

export default defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: './src/**/*.{js,tsx,ts,jsx}',
    schema: './src/sanity/extract.json',
    generates: './src/sanity/types.ts',
  },
});
