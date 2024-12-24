import {
  languageRouter,
  pageRouter,
  qrCodeRouter,
  userRouter,
} from '@/server/api/routers';
import { createCallerFactory, createTrpcRouter } from '@/server/api/trpc';

export const appRouter = createTrpcRouter({
  users: userRouter,
  qr: qrCodeRouter,
  pages: pageRouter,
  language: languageRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
