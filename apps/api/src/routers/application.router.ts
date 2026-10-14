import { CreateApplicationFormSchema } from '@mns/utils';
import { organizationProcedure, router } from '../trpc/trpc.js';
import db from '../db/index.js';
import { AppTable } from '../db/schema/apps.schema.js';
import { TRPCError } from '@trpc/server';

export const applicationRouter = router({
  upsert: organizationProcedure
    .input(CreateApplicationFormSchema)
    .mutation(async ({ input }) => {
      const {
        name,
        liveUrl,
        demoUrl,
        status,
        isMyanmarOnly,
        type,
        excerpt,
        body,
        imageUrl,
      } = input;
      let application;

      try {
        [application] = await db
          .insert(AppTable)
          .values({
            name,
            liveUrl,
            demoUrl,
            status,
            isMyanmarOnly,
            type,
            excerpt,
            body,
            imageUrl,
          })
          .onConflictDoUpdate({
            target: AppTable.name,
            set: {
              liveUrl,
              demoUrl,
              status,
              isMyanmarOnly,
              type,
              excerpt,
              body,
              imageUrl,
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
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'The application could not be saved!',
        });
      }

      return {
        success: true,
        message: 'Application saved!',
        data: application,
      };
    }),
});
