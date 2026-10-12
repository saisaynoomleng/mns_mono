import { SESClient } from '@aws-sdk/client-ses';
import env from './env.js';

export const emailClient = new SESClient({
  region: env.AWS_REGION,
  ...(env.NODE_ENV === 'development' && {
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  }),
});
