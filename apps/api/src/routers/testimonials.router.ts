import { TRPCError } from '@trpc/server';
import db from '../db/index.js';
import {
  organizationProcedure,
  protectedProcedure,
  router,
} from '../trpc/trpc.js';
import { TestimonialFormSchema, TRPCResponseSchema } from '@mns/utils';
import { TestimonialTable } from '../db/schema/testimonials.schema.js';

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

  insert: protectedProcedure
    .input(TestimonialFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, body } = input;
      const { id, name } = ctx.user;

      try {
        const [review] = await db
          .insert(TestimonialTable)
          .values({
            userId: id,
            userNameSnapshot: name,
            title,
            body,
            status: 'new',
          })
          .returning({ id: TestimonialTable.id });

        if (!review) {
          return {
            success: false,
            message: 'Cannot leave a review this time,please try again later.',
          };
        }

        return {
          success: true,
          message:
            "Thank you for your comments, we'll review it shortly and have a nice day!",
        };
      } catch (error) {
        console.error('testimonialRouter.insert error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
