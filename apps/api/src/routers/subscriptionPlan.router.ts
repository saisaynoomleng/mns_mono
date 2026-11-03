import { CreateSubscriptionFormSchema } from '@mns/utils';
import { organizationProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { SubscriptionPlanTable } from '../db/schema/subscription-plans.schema.js';
import { TRPCError } from '@trpc/server';

export const subscriptionPlanRouter = router({
  create: organizationProcedure
    .input(CreateSubscriptionFormSchema)
    .mutation(async ({ input }) => {
      const { name, sanityId, serviceId, pricePerMonthInCents, status } = input;

      try {
        await db
          .insert(SubscriptionPlanTable)
          .values({
            name,
            sanityId,
            serviceId,
            pricePerMonthInCent: pricePerMonthInCents,
            status: 'active',
          })
          .onConflictDoUpdate({
            target: SubscriptionPlanTable.sanityId,
            set: {
              name,
              pricePerMonthInCent: pricePerMonthInCents,
              status,
              updatedAt: new Date(),
            },
          });

        return {
          success: true,
          message: 'Subscription plan created!',
        };
      } catch (error) {
        console.error('subscriptionPlanRouter.list error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  list: organizationProcedure.query(async () => {
    try {
      const rows = await db.query.SubscriptionPlanTable.findMany({
        columns: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
        },
        with: {
          service: {
            columns: {
              name: true,
            },
          },
        },
      });

      return {
        data: rows,
      };
    } catch (error) {
      console.error('subscriptionPlanRouter.list error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
});
