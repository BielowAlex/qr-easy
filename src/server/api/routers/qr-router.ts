import {
  createTrpcRouter,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const qrCodeRouter = createTrpcRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: TRPC_ERROR_CODES.UNAUTHORIZED,
        message: 'User not authenticated',
      });
    }

    try {
      return await ctx.db.qRCode.findMany({
        where: { ownerId: userId },
      });
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Failed to create QR Code',
      });
    }
  }),
  createQRCode: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1),
        imageBase64: z.string().min(1),
        title: z.string().min(1).max(255),
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

      const existingQRCode = await ctx.db.qRCode.findFirst({
        where: {
          ownerId: userId,
          OR: [{ title: input.title }, { value: input.value }],
        },
      });

      if (existingQRCode) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.CONFLICT,
          message: 'QR Code with this title or value already exists.',
        });
      }

      const newQr = {
        value: input.value,
        imageBase64: input.imageBase64,
        title: input.title,
        ownerId: userId,
      };

      try {
        return await ctx.db.qRCode.create({
          data: newQr,
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to create QR Code',
        });
      }
    }),

  deleteQRCodeById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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

      const qrCode = await ctx.db.qRCode
        .findFirst({
          where: {
            id: input.id,
            ownerId: userId,
          },
        })
        .catch((e) => {
          console.error(e);
          throw new TRPCError({
            code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete QR Code',
          });
        });

      if (!qrCode) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'QR Code not found or unauthorized',
        });
      }

      try {
        await ctx.db.qRCode.delete({
          where: {
            id: input.id,
          },
        });

        return { success: true, message: 'QR Code deleted successfully' };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete QR Code',
        });
      }
    }),
});
