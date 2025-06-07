import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milton.Church: Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
