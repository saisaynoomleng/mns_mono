import {
  NewsletterFormSchema,
  SendProductUpdateEmailFormSchema,
  TRPCMutationSchema,
} from '@mns/utils';
import {
  organizationProcedure,
  publicProcedure,
  router,
} from '../../trpc/trpc.js';
import { newsletterRepository } from './newsletters.repository.js';
import { TRPCError } from '@trpc/server';
import { newsletterService } from './newsletters.service.js';

const repository = newsletterRepository();
const service = newsletterService();

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(NewsletterFormSchema)
    .output(TRPCMutationSchema)
    .mutation(async ({ input }) => {
      const { email } = input;

      let subscription;

      try {
        subscription = await repository.insertSubscription({ email });

        if (!subscription) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'You are already subscribed!',
          });
        }
      } catch (error) {
        console.error('newsletterRouter.subscribe DB error', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to subscribe right now.',
        });
      }

      try {
        await service.sendEmailToUser({ email: subscription.email });
      } catch (error) {
        console.error(`newsletterRouter.subscribe SES error`, error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Email was not sent.',
        });
      }

      return {
        success: true,
        message: `Thanks for joining our newsletter.`,
        data: subscription,
      };
    }),

  sendProductUpdateEmail: organizationProcedure
    .input(SendProductUpdateEmailFormSchema)
    .output(TRPCMutationSchema)
    .mutation(async ({ input }) => {
      const { subject, message } = input;

      let subscribers;

      try {
        subscribers = await repository.findAll();

        if (!subscribers) {
          return {
            success: false,
            message: 'Unable to get the subscribers',
          };
        }
      } catch (error) {
        console.error('newslettersRouter.sendProductEmail DB error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to get the subscribers',
        });
      }
    }),
});
