import { PageLoaderLayout } from '@/components/layouts';
import { MuiThemeProvider, NextAuthProvider } from '@/lib';
import { TRPCReactProvider } from '@/lib/providers/TrpcProvider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';
import React from 'react';

const montserratInit = Montserrat({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'T3 Online',
  description: 'TicTacToe online game',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratInit.variable}`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextAuthProvider>
            <MuiThemeProvider>
              <TRPCReactProvider cookies={await cookies().toString()}>
                <PageLoaderLayout>{children}</PageLoaderLayout>
              </TRPCReactProvider>
            </MuiThemeProvider>
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
