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
