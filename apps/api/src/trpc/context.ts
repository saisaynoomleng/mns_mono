import * as trpcExpress from '@trpc/server/adapters/express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import type { BetterAuthUserProps } from '../lib/types.js';

type ContextUser = (BetterAuthUserProps & { roles: string[] }) | null;

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const user: ContextUser = session?.user
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

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
