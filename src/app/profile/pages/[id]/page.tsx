import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { PagePanel } from '@/feature/PagePanel';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { notFound, redirect } from 'next/navigation';
import superjson from 'superjson';

export default async function Page({ params }: { params: { id: string } }) {
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

  const id = params.id;

  console.log(id);

  try {
    // Fetch the page data using tRPC
    const page = await ssg.pages.getById.fetch({ id });

    if (!page) {
      notFound();
    }

    return <PagePanel page={page} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
