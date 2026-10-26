import { TRPCError } from '@trpc/server';
import db from '../db/index.js';
import { protectedProcedure, router } from '../trpc/trpc.js';
import { ReportIssueTable } from '../db/schema/report-issues.schema.js';
import { TRPCResponseSchema, UserReportAppIssueFormSchema } from '@mns/utils';

export const reportIssueRouter = router({
  listByUser: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;

    try {
      const issues = await db.query.ReportIssueTable.findMany({
        columns: {
          appId: true,
          body: true,
          status: true,
          createdAt: true,
        },
        where: {
          userId: id,
        },
        with: {
          app: {
            columns: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!issues) {
        return {
          success: false,
          message: 'Cannot get the issues log',
        };
      }

      return {
        success: true,
        data: issues,
      };
    } catch (error) {
      console.error('applicationRouter.listByUser error', error);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  report: protectedProcedure
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
