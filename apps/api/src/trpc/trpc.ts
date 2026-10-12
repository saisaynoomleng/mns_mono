import { initTRPC, TRPCError } from '@trpc/server';
import type { TRPCContext } from './context.js';
import superjson from 'superjson';

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'FORBIDDEN',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const authenticated = ctx.user.roles.some((r) =>
    ['admin', 'super_admin'].includes(r),
  );

  if (!authenticated) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next();
});
