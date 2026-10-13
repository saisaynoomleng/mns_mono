import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env, { isTest } from './lib/env.js';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router.js';
import { createContext } from './trpc/context.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: env.ALLOWED_ORIGINS.split(','),
  }),
);
app.use(
  morgan('dev', {
    skip: () => isTest(),
  }),
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  return res.status(200).json({ message: 'Health OK' });
});

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export default app;
