import {
  createTrpcRouter,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const locationRouter = createTrpcRouter({
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        changes: z.object({
          address: z.string().optional().nullable(),
          city: z.string().optional().nullable(),
          country: z.string().optional(),
          googleUrl: z.string().optional().nullable(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.UNAUTHORIZED,
          message: 'User not authenticated',
        });
      }

      const isExist = await ctx.db.location.count({
        where: {
          id: input.id,
        },
      });

      if (!isExist) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'Location not found',
        });
      }

      return await ctx.db.location.update({
        where: {
          id: input.id,
        },
        data: input.changes,
      });
    }),
});
