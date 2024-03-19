import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header/header';
import { inter } from './fonts';
import clsx from 'clsx';
import { Footer } from '@/components/footer/footer';
import { AuthHeaderWrapper } from '@/components/auth-header-wrapperr/auth-header-wrapper';
import { SessionProvider } from 'next-auth/react';
import { ModalWrapper } from '@/components/modal-wrapper/modal-wrapper';
import { ModalProvider } from './contexts/modal-context/modal-context';

export const metadata: Metadata = {
  title: 'Miltotn.church',
  description: 'Uniting the Church of Milton for the flourishing of the city',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <ModalProvider>
          <AuthHeaderWrapper />
          <SessionProvider>{children}</SessionProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
