import { initTRPC, TRPCError } from '@trpc/server';
import type { AppContext } from './context.js';
import superjson from 'superjson';

const t = initTRPC.context<AppContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const organizationProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const authorized = ctx.user.roles.some((r) =>
      ['admin', 'super_admin'].includes(r),
    );

    if (!authorized) {
      throw new TRPCError({
        code: 'FORBIDDEN',
      });
    }

    return next();
  },
);
