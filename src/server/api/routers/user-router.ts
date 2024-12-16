import {
  createTrpcRouter,
  InnerTRPCContext,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const userOutputSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  nickname: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isOnline: z.boolean(),
  authUserId: z.string().nullable(),
});

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
