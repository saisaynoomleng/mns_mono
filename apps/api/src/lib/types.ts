import * as z from 'zod';
import type { auth } from './auth.js';

//========================//
//======Helper types======//
//========================//

export type BetterAuthSessionProps = typeof auth.$Infer.Session;
export type BetterAuthUserProps = typeof auth.$Infer.Session.user;
export type { AppRouter } from '../trpc/router.js';

//========================//
//====== Schema ==========//
//========================//
export const ListNewsletterOutputSchema = z.object({
  data: z.array(
    z.object({
      email: z.email(),
      createdAt: z.coerce.date(),
      id: z.uuid(),
    }),
  ),
});
export type ListNewsletterOutputType = z.output<
  typeof ListNewsletterOutputSchema
>;

export const ListContactOutputSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      email: z.string(),
      createdAt: z.coerce.date(),
      status: z.enum(['in_progress', 'new', 'spam', 'resolved']),
      id: z.uuid(),
    }),
  ),
});
export type ListContactOutputType = z.output<typeof ListContactOutputSchema>;
