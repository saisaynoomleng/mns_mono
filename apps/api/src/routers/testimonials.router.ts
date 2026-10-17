import { TRPCError } from '@trpc/server';
import db from '../db/index.js';
import { organizationProcedure, router } from '../trpc/trpc.js';

export const testimonialRouter = router({
  list: organizationProcedure.query(async () => {
    try {
      const rows = await db.query.TestimonialTable.findMany({
        columns: {
          rating: true,
          status: true,
        },
        with: {
          user: {
            columns: {
              name: true,
            },
          },
        },
      });

      if (!rows) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to find the testimonials',
        });
      }
    } catch (error) {
      console.error('testimonialRouter.list error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unable to find the testimonials',
      });
    }
  }),
});
