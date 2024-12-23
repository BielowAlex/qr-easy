import { pageRouter, qrCodeRouter, userRouter } from '@/server/api/routers';
import { createCallerFactory, createTrpcRouter } from '@/server/api/trpc';

export const appRouter = createTrpcRouter({
  users: userRouter,
  qr: qrCodeRouter,
  pages: pageRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
