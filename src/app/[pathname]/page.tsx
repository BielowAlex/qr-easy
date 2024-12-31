import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { MyPage } from '@/feature';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { IPage } from '@/types';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { notFound, redirect } from 'next/navigation';
import superjson from 'superjson';

export default async function CurrentPage({
  params,
}: {
  params: { pathname: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/login');
  }

  // Create tRPC helpers
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext({
      req: undefined, // App Router does not directly provide `req`/`res`
      res: undefined,
      session, // Manually pass the session
    }),
    transformer: superjson,
  });

  const pathname = params.pathname;

  try {
    // Fetch the page data using tRPC
    const page = await ssg.pages.getByPathname.fetch({ pathname });

    if (!page) {
      notFound();
    }

    return <MyPage page={page as IPage} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: { pathname: string };
}) => {
  const pathname = params.pathname;

  const session = await getServerAuthSession();
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext({
      req: undefined,
      res: undefined,
      session,
    }),
    transformer: superjson,
  });

  try {
    const page = await ssg.pages.getByPathname.fetch({ pathname });

    if (page) {
      return {
        title: page.name || 'QrEASY',
        description: page.description || 'Default description for this page.',
        icons: {
          icon: page?.favicon || '/favicon.ico',
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.',
      icons: {
        icon: '/default-favicon.ico',
      },
    };
  }
};
