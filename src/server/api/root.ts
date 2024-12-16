import { userRouter } from '@/server/api/routers';
import { createCallerFactory, createTrpcRouter } from '@/server/api/trpc';

export const appRouter = createTrpcRouter({
  users: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
