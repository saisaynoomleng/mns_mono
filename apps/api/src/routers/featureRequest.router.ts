import { TRPCResponseSchema, UserFeatureRequestFormSchema } from '@mns/utils';
import { protectedProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { TRPCError } from '@trpc/server';
import { FeatureRequestTable } from '../db/schema/feature-requests.schema.js';

export const featureRequestRouter = router({
  request: protectedProcedure
    .input(UserFeatureRequestFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { body, appId } = input;
      const { id, name } = ctx.user;
      let app: { id: string } | undefined;

      try {
        app = await db.query.AppTable.findFirst({
          columns: {
            id: true,
          },
        });
      } catch (error) {
        console.error('featureRequestRouter.request get app db error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      if (!app) {
        return {
          success: false,
          message: 'Cannot submit a feature request, try again later.',
        };
      }

      try {
        const [request] = await db
          .insert(FeatureRequestTable)
          .values({
            userId: id,
            appId: app.id,
            body,
            status: 'new',
          })
          .returning({ id: FeatureRequestTable.id });

        if (!request) {
          return {
            success: false,
            message: 'Cannot submit a feature request, try again later.',
          };
        }
      } catch (error) {
        console.error('featureRequestRouter.request insert db error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return {
        success: true,
        message: 'Thank you for your idea, out team will look into it!',
      };
    }),

  listByUser: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;

    try {
      const requests = await db.query.FeatureRequestTable.findMany({
        columns: {
          status: true,
          body: true,
          createdAt: true,
        },
        where: { userId: id },
        orderBy: { createdAt: 'desc' },
      });

      return {
        success: true,
        data: requests,
      };
    } catch (error) {
      console.error('featureRequestRouter.listByUser db error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
});
