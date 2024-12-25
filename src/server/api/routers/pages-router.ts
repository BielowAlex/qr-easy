import {
  createTrpcRouter,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const pageRouter = createTrpcRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: TRPC_ERROR_CODES.UNAUTHORIZED,
        message: 'User not authenticated',
      });
    }

    try {
      return await ctx.db.page.findMany({
        where: {
          ownerId: userId,
        },
        include: {
          translations: {
            include: {
              lang: true,
            },
          },
          defaultLang: true,
          location: true,
          owner: true,
          qrCodes: true,
        },
      });
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Failed to retrieve pages',
      });
    }
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      const { id } = input;

      if (!userId) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.UNAUTHORIZED,
          message: 'User not authenticated',
        });
      }

      const currentPage = await ctx.db.page
        .findFirst({
          where: {
            ownerId: userId,
            id,
          },
          include: {
            translations: {
              include: {
                lang: true,
              },
            },
            defaultLang: true,
            location: true,
            owner: true,
            qrCodes: true,
          },
        })
        .catch((e) => {
          console.error(e);
          throw new TRPCError({
            code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
            message: 'Failed to retrieve pages',
          });
        });

      if (!currentPage) {
        console.log('currentPage', currentPage);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'Page not found',
        });
      }

      return currentPage;
    }),

  create: protectedProcedure
    .input(
      z.object({
        currency: z.string().min(1).max(3),
        langCode: z.string().min(2).max(5),
        name: z.string().min(1).max(255),
        description: z.string().optional(),
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

      const { currency, langCode, name, description } = input;

      const language = await ctx.db.language.findUnique({
        where: { code: langCode },
      });

      if (!language) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.BAD_REQUEST,
          message: `Language with code "${langCode}" not found.`,
        });
      }

      try {
        return await ctx.db.page.create({
          data: {
            currency,
            defaultLangId: language.id,
            ownerId: userId,
            translations: {
              create: {
                langId: language.id,
                name,
                description: description || '',
              },
            },
          },
          include: {
            translations: true,
            defaultLang: true,
            owner: true,
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to create page',
        });
      }
    }),

  deleteById: protectedProcedure
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

      const page = await ctx.db.page.findUnique({
        where: { id: input.id },
      });

      if (!page) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'Page not found',
        });
      }

      try {
        await ctx.db.page.delete({
          where: { id: input.id },
        });

        return { success: true, message: 'Page deleted successfully' };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete page',
        });
      }
    }),
});
