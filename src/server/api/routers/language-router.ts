import { createTrpcRouter, protectedProcedure } from '@/server/api/trpc';

export const languageRouter = createTrpcRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.language.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error('Failed to fetch languages');
    }
  }),
});
