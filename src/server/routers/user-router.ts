import { createRouter, protectedProcedure } from '@/server';

export const userRouter = createRouter({
  getAllUser: protectedProcedure.query(() => {
    return [];
  }),
});
