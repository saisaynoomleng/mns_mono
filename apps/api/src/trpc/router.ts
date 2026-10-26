import { addressRouter } from '../routers/address.router.js';
import { applicationRouter } from '../routers/application.router.js';
import { contactRouter } from '../routers/contact.router.js';
import { featureRequestRouter } from '../routers/featureRequest.router.js';
import { newsletterRouter } from '../routers/newsletter.router.js';
import { testimonialRouter } from '../routers/testimonials.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  newsletters: newsletterRouter,
  contacts: contactRouter,
  applications: applicationRouter,
  address: addressRouter,
  testimonials: testimonialRouter,
  featureRequests: featureRequestRouter,
});

export type AppRouter = typeof appRouter;
