import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { env } from '@/lib/env/server';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: env.SANITY_READ_TOKEN,
  browserToken: env.SANITY_READ_TOKEN,
  strict: true,
});
