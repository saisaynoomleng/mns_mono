import {
  CreateApplicationFormSchema,
  TRPCResponseSchema,
  UserReportAppIssueFormSchema,
} from '@mns/utils';
import {
  organizationProcedure,
  protectedProcedure,
  router,
} from '../trpc/trpc.js';
import db from '../db/index.js';
import { AppTable } from '../db/schema/apps.schema.js';
import { TRPCError } from '@trpc/server';
import { ReportIssueTable } from '../db/schema/report-issues.schema.js';

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

  reportIssue: protectedProcedure
    .input(UserReportAppIssueFormSchema)
    .output(TRPCResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { appId, body, imageUrl } = input;
      const { id, name } = ctx.user;
      let app: { id: string } | undefined;

      try {
        app = await db.query.AppTable.findFirst({
          columns: {
            id: true,
          },
          where: { sanityId: appId },
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      if (!app) {
        return { success: false, message: 'Cannot get the app' };
      }

      try {
        const [issue] = await db
          .insert(ReportIssueTable)
          .values({
            userId: id,
            userNameSnapshot: name,
            appId: app.id,
            body,
            imageUrl,
            status: 'new',
          })
          .returning({ id: ReportIssueTable.id });

        if (!issue) {
          return {
            success: false,
            message: 'Cannot report the issue right now, try again later',
          };
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return {
        success: true,
        message: 'Thank you for reporting, our team will review this ASAP!',
      };
    }),
});
