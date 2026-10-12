import { newsletterRouter } from '../modules/newsletters/newsletter.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  newsletters: newsletterRouter(),
});

export type AppRouter = typeof appRouter;
