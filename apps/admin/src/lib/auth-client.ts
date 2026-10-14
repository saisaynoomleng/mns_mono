import { createAuthClient } from 'better-auth/react';
import { env } from './env/client';
import { adminClient, emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  fetchOptions: {
    credentials: 'include',
  },
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/auth`,
  plugins: [adminClient(), emailOTPClient()],
});
