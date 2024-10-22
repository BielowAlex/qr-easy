import { NextAuthProvider } from '@/lib';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.scss';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'T3 Online',
  description: 'TicTacToe online game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextAuthProvider>
          <div className="container">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
