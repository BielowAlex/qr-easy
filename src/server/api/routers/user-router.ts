import {
  createTrpcRouter,
  InnerTRPCContext,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { userOutputSchema } from '@/types';
import { TRPCError } from '@trpc/server';

export const userRouter = createTrpcRouter({
  getUserById: protectedProcedure
    .output(userOutputSchema)
    .mutation(async ({ ctx }: { ctx: InnerTRPCContext }) => {
      try {
        const userId = ctx.session?.user?.id;

        const user = await ctx.db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: TRPC_ERROR_CODES.NOT_FOUND,
            message: 'User not found',
          });
        }

        return {
          ...user,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          avatar: user.avatar || '',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'Internal error',
        });
      }
    }),
});
