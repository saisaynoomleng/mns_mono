import { addressRouter } from '../routers/address.router.js';
import { applicationRouter } from '../routers/application.router.js';
import { contactRouter } from '../routers/contact.router.js';
import { newsletterRouter } from '../routers/newsletter.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  newsletters: newsletterRouter,
  contacts: contactRouter,
  applications: applicationRouter,
  address: addressRouter,
});

export type AppRouter = typeof appRouter;
