import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env, { isTest } from './lib/env.js';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health-check', (req, res) => {
  return res.status(200).json({ message: 'Health OK' });
});

// trpc

// error hander

export default app;
