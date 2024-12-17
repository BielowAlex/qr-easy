import { userRouter } from '@/server/api/routers';
import { qrCodeRouter } from '@/server/api/routers/qr-router';
import { createCallerFactory, createTrpcRouter } from '@/server/api/trpc';

export const appRouter = createTrpcRouter({
  users: userRouter,
  qr: qrCodeRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
