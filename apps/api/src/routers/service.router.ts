import { CreateServiceFormSchema } from '@mns/utils';
import { organizationProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { ServiceTable } from '../db/schema/services.schema.js';
import { TRPCError } from '@trpc/server';

export const serviceRouter = router({
  create: organizationProcedure
    .input(CreateServiceFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, sanityId, status } = input;

      try {
        const [rows] = await db
          .insert(ServiceTable)
          .values({
            name,
            sanityId,
            status: 'active',
          })
          .onConflictDoUpdate({
            target: ServiceTable.sanityId,
            set: {
              name,
              status,
              updatedAt: new Date(),
            },
          })
          .returning({ id: ServiceTable.id });

        if (!rows) {
          return {
            success: false,
            message: 'Cannot create service right now, try again later.',
          };
        }

        return {
          success: true,
          message: 'Service created successfully!',
        };
      } catch (error) {
        console.error('serviceRouter.create error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  list: organizationProcedure.query(async () => {
    try {
      const rows = await db.query.ServiceTable.findMany({
        columns: {
          id: true,
          name: true,
          sanityId: true,
          createdAt: true,
        },

        with: {
          subscriptions: {
            columns: {
              id: true,
              name: true,
              pricePerMonthInCent: true,
              status: true,
            },
          },
        },
      });

      return {
        data: rows,
      };
    } catch (error) {
      console.error('serviceRouter.list error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),
});
