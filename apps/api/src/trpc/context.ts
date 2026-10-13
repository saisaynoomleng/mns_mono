import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth.js';
import type { BetterAuthUserProps } from '../lib/types.js';
import * as trpcExpress from '@trpc/server/adapters/express';

type UserProps = (BetterAuthUserProps & { roles: string[] }) | null;

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const user: UserProps = session?.user
    ? {
        ...session.user,
        roles: session.user?.role
          ? session.user.role
              .split(',')
              .map((r) => r.trim())
              .filter(Boolean)
          : [],
      }
    : null;

  return { req, res, user };
};

export type AppContext = Awaited<ReturnType<typeof createContext>>;
