import { CreateApplicationFormSchema, TRPCResponseSchema } from '@mns/utils';
import { organizationProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { AppTable } from '../db/schema/apps.schema.js';
import { TRPCError } from '@trpc/server';

export const applicationRouter = router({
  upsert: organizationProcedure
    .input(CreateApplicationFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input }) => {
      const { name, status, sanityId } = input;
      let application;

      try {
        [application] = await db
          .insert(AppTable)
          .values({
            name,
            status,
            sanityId,
          })
          .onConflictDoUpdate({
            target: AppTable.sanityId,
            set: {
              status,
            },
          })
          .returning({
            name: AppTable.name,
            id: AppTable.id,
          });
      } catch (error) {
        console.log('application.upsert error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to save the application',
        });
      }

      if (!application) {
        return {
          success: false,
          message: 'Application cannot be saved, try again later.',
        };
      }

      return {
        success: true,
        message: 'Application saved!',
      };
    }),
});
