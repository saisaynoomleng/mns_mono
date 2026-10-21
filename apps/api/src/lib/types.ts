import * as z from 'zod';
import type { auth } from './auth.js';
import { UserAddressFormSchema } from '@mns/utils';

//========================//
//======Helper types======//
//========================//

export type BetterAuthSessionProps = typeof auth.$Infer.Session;
export type BetterAuthUserProps = typeof auth.$Infer.Session.user;
export type { AppRouter } from '../trpc/router.js';

//========================//
//====== Schema ==========//
//========================//
export const PaginatedSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const SortOrderSchema = z.enum(['desc', 'asc']).default('desc');

export const TRPCMutationSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type TRPCMutationType = z.infer<typeof TRPCMutationSchema>;

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

export const ListContactInputSchema = PaginatedSchema.extend({
  sortOrder: SortOrderSchema,
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  search: z.string().trim().default(''),
  filterBy: z
    .enum(['in_progress', 'new', 'resolved', 'spam', 'none'])
    .default('none'),
});

export const ListContactByIdInputSchema = z.object({
  id: z.uuid(),
});

export const ListContactByIdOutputSchema = z.object({
  name: z.string(),
  email: z.string(),
  status: z.enum(['in_progress', 'new', 'resolved', 'spam']),
  companyName: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  minBudget: z.coerce.number().nonnegative(),
  maxBudget: z.coerce.number().nonnegative(),
  message: z.string(),
  createdAt: z.coerce.date(),
  messages: z.array(
    z.object({
      id: z.uuid(),
      direction: z.enum(['outbound', 'inbound']),
      status: z.enum(['pending', 'sent', 'failed']),
      message: z.string(),
      createdAt: z.coerce.date(),
    }),
  ),
});
export type ListContactByIdOutputType = z.output<
  typeof ListContactByIdOutputSchema
>;

export const MutateContactStatusInput = z.object({
  id: z.uuid(),
  status: z.enum(['new', 'resolved', 'spam']),
});
export type MutateContactStatusInputType = z.infer<
  typeof MutateContactStatusInput
>['status'];
