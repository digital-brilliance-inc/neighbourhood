import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milton.Church: Memorize Scripture',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
