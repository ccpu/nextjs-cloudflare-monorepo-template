import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import VisitTracker from '../components/VisitTracker';
import { metadata as siteMetadata } from './metadata';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
