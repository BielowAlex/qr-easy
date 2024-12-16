import { options } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/lib';
import { appRouter } from '@/server/api/root';
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import { DefaultSession, getServerSession, Session } from 'next-auth';

const handler = async (request: Request) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: async function (
      opts: FetchCreateContextFnOptions
    ): Promise<any> {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      opts.resHeaders;
      const untypedSession = await getServerSession(
        //@ts-ignore
        opts.req,
        {
          getHeader: (name) => opts.resHeaders.get(name),
          setHeader: () => {},
        },
        options
      );

      const session = untypedSession as Session & {
        user: DefaultSession['user'] & {
          id: number;
        };
      };
      return {
        session,
        db,
      };
    },
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }: any) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error?.message}`
            );
          }
        : undefined,
  });

  response.headers.set('Content-Type', 'application/json');
  response.headers.set('x-service-version', process.env.APP_VERSION || '');
  return response;
};

export { handler as GET, handler as POST };
