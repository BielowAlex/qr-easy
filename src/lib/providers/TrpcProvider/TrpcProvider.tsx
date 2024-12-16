'use client';

import { makeQueryClient } from '@/lib/trpc/query-client';
import { AppRouter } from '@/server/api/root';
import { getUrl } from '@/server/api/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import React, { useState } from 'react';
import superjson from 'superjson';

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}

export const api = createTRPCReact<AppRouter>();
export function TRPCReactProvider(props: {
  children: React.ReactNode;
  cookies: string;
}) {
  const queryCli = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),

        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              'x-trpc-source': 'react',
              'client-version': process.env.NEXT_PUBLIC_CLIENT_VERSION,
            };
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryCli}>
      <api.Provider client={trpcClient} queryClient={queryCli}>
        {props.children}
      </api.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
