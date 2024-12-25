import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import type { AppRouter } from '@/server/api/root';
import { inferRouterOutputs, initTRPC, TRPCError } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, Session } from 'next-auth';
import superjson from 'superjson';
import { ZodError } from 'zod';

export type AppUserSession = Session & {
  user: DefaultSession['user'] & {
    id: string;
  };
};

type CreateContextOptions = {
  session: AppUserSession | null;
};

/**
 * 1. CONTEXT
 *
 * This section defines the "context" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export type InnerTRPCContext = {
  session: AppUserSession | null;
  db: typeof db;
};

const createInnerTRPCContext = (
  opts: CreateContextOptions
): InnerTRPCContext => {
  return {
    session: opts.session,
    db,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: {
  req?: NextApiRequest;
  res?: NextApiResponse;
  session?: AppUserSession | null;
}): Promise<InnerTRPCContext> => {
  const { req, res, session } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const currentSession =
    session || ((await getServerAuthSession(req!, res!)) as AppUserSession);

  return createInnerTRPCContext({
    session: currentSession,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<InnerTRPCContext>().create({
  transformer: superjson,
  allowOutsideOfServer: true,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTrpcRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(
  ({ next, ctx }: { next: any; ctx: InnerTRPCContext }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        session: ctx.session,
      },
    });
  }
);

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const createCallerFactory = t.createCallerFactory;

export const transformer = superjson;

export function getBaseUrl() {
  return `${process.env.NEXT_PUBLIC_LOCAL_ONLY_TRPC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL}`;
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const TRPC_ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_SUPPORTED: 'METHOD_NOT_SUPPORTED',
  TIMEOUT: 'TIMEOUT',
  CONFLICT: 'CONFLICT',
  PRECONDITION_FAILED: 'PRECONDITION_FAILED',
  PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export type TRPCErrorCode =
  (typeof TRPC_ERROR_CODES)[keyof typeof TRPC_ERROR_CODES];
