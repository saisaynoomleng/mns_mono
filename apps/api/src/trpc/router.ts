import { contactRouter } from '../routers/contact.router.js';
import { newsletterRouter } from '../routers/newsletter.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  newsletters: newsletterRouter,
  contacts: contactRouter,
});

export type AppRouter = typeof appRouter;
