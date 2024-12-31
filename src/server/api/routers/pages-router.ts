import {
  createTrpcRouter,
  protectedProcedure,
  TRPC_ERROR_CODES,
} from '@/server/api/trpc';
import { pageSchema } from '@/types';
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
          message: 'MyPage not found',
        });
      }

      return currentPage;
    }),
  getByPathname: protectedProcedure
    .input(
      z.object({
        pathname: z.string(),
      })
    )
    .output(pageSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      const { pathname } = input;

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
            pathname,
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
          message: 'MyPage not found',
        });
      }

      return currentPage;
    }),
  create: protectedProcedure
    .input(
      z.object({
        currency: z.string().min(1).max(3),
        langCode: z.string().min(2).max(5),
        name: z.string().min(1).max(38),
        description: z.string().min(1).max(255),
        brandName: z.string().min(1).max(38),
        brandDescription: z.string().min(1).max(255),
        country: z.string().optional(),
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

      const {
        currency,
        langCode,
        name,
        description,
        brandName,
        brandDescription,
      } = input;

      const language = await ctx.db.language.findFirst({
        where: { code: langCode },
      });

      if (!language) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.BAD_REQUEST,
          message: `Language with code "${langCode}" not found.`,
        });
      }

      const isExist = await ctx.db.page.count({
        where: {
          name: brandName,
        },
      });

      if (isExist) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.BAD_REQUEST,
          message: `Page with same brand Name already exist.`,
        });
      }

      const pathname = brandName.toLowerCase().replace(' ', '-');

      try {
        const newPage = await ctx.db.page.create({
          data: {
            name: brandName,
            pathname,
            description: brandDescription,
            defaultLangId: language.id,
            ownerId: userId,
            translations: {
              create: {
                langId: language.id,
                name,
                currency,
                description: description || '',
              },
            },
          },
          include: {
            translations: true,
            location: true,
            defaultLang: true,
            owner: true,
          },
        });

        if (input.country) {
          await ctx.db.location.create({
            data: {
              country: input.country,
              pageId: newPage.id,
            },
          });
        }

        return newPage;
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
          message: 'MyPage not found',
        });
      }

      try {
        await ctx.db.page.delete({
          where: { id: input.id },
        });

        return { success: true, message: 'MyPage deleted successfully' };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete page',
        });
      }
    }),
  isPathnameExist: protectedProcedure
    .input(
      z.object({
        pathname: z.string(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      const { pathname } = input;

      if (!userId) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.UNAUTHORIZED,
          message: 'User not authenticated',
        });
      }

      const currentPage = await ctx.db.page
        .count({
          where: {
            pathname,
          },
        })
        .catch((e) => {
          console.error(e);
          throw new TRPCError({
            code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
            message: 'Failed to retrieve pages',
          });
        });

      return !!currentPage;
    }),
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        pathname: z.string().optional(),
        backgroundUrl: z.string().nullable().optional(),
        logoUrl: z.string().nullable().optional(),
        favicon: z.string().nullable().optional(),
        description: z.string().optional(),
        defaultLangId: z.string().optional(),
        currency: z.string().optional(),
        langCode: z.string().optional(),
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

      const { id, ...fieldsToUpdate } = input;

      const existingPage = await ctx.db.page.findFirst({
        where: { id, ownerId: userId },
      });

      if (!existingPage) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES.NOT_FOUND,
          message: 'MyPage not found',
        });
      }

      if (fieldsToUpdate?.pathname) {
        const isPathnameExist = await ctx.db.page.count({
          where: {
            pathname: fieldsToUpdate.pathname,
            NOT: { id },
          },
        });

        if (isPathnameExist) {
          throw new TRPCError({
            code: TRPC_ERROR_CODES.BAD_REQUEST,
            message: `Pathname "${fieldsToUpdate.pathname}" already exists.`,
          });
        }
      }

      try {
        return await ctx.db.page.update({
          where: { id },
          data: fieldsToUpdate,
          include: {
            translations: {
              include: {
                lang: true,
              },
            },
            defaultLang: true,
            location: true,
            owner: true,
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: TRPC_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: 'Failed to update page',
        });
      }
    }),
});
