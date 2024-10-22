import { procedure, protectedProcedure } from './trpc';

export const appRouter = protectedProcedure({
  users: procedure.query(() => {
    return [];
  }),
});

export type AppRouter = typeof appRouter;
