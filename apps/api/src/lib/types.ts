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
export const PagniatedSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const SortOrderSchema = z.enum(['desc', 'asc']).default('desc');

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
  total: z.coerce.number().int().nonnegative(),
  totalPages: z.coerce.number().int().min(1).default(1),
});
export type ListContactOutputType = z.output<typeof ListContactOutputSchema>;

export const ListContactInputSchema = PagniatedSchema.extend({
  sortOrder: SortOrderSchema,
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  search: z.string().trim().default(''),
  filterBy: z
    .enum(['in_progress', 'new', 'resolved', 'spam', 'none'])
    .default('none'),
});
