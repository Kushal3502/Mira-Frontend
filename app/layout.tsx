import ProvidersWrapper from '@/components/Providers';
import type { Metadata } from 'next';
import { Figtree, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mira — AI Knowledge Assistant for Your Website',
  description:
    'Mira is a SaaS AI knowledge assistant that lets you chat with your documents using Retrieval-Augmented Generation for accurate, context-aware answers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
