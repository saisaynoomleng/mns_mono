import { createAuthClient } from 'better-auth/react';
import { env } from './env/client';
import { adminClient, emailOTPClient } from 'better-auth/client/plugins';

export const authClien = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/auth`,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [emailOTPClient(), adminClient()],
});
