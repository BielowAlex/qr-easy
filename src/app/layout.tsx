import { config } from '@fortawesome/fontawesome-svg-core';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';

import { NextAuthProvider } from '@/lib';
import { TRPCReactProvider } from '@/lib/providers/TrpcProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React from 'react';
import '../styles/globals.scss';

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
        <NextAuthProvider>
          <TRPCReactProvider cookies={await cookies().toString()}>
            <div className="container">{children}</div>
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
