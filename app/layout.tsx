import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header/header';
import { inter } from './fonts';
import clsx from 'clsx';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Footer } from '@/components/footer/footer';
import { AuthHeaderWrapper } from '@/components/auth-header-wrapperr/auth-header-wrapper';
import { SessionProvider } from 'next-auth/react';
import { ModalWrapper } from '@/components/modal-wrapper/modal-wrapper';
import { ModalProvider } from './contexts/modal-context/modal-context';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Milton.church',
  description: "Let's saturate every neighbourhood in Milton with the practical love of Jesus.",
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      url: '/favicon-16x16.png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        {/* <SSRProvider> */}
        <ModalProvider>
          <AuthHeaderWrapper />
          <SessionProvider>{children}</SessionProvider>
        </ModalProvider>
        {/* </SSRProvider> */}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG!} />
    </html>
  );
}
