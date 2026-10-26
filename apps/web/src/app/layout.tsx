import type { Metadata } from 'next';
import { appConfig } from '@internal/configs';

import { cn } from '@internal/utils';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextThemesNamePolyfill } from '../components/theme/NextThemesNamePolyfill';
import { ThemeProvider } from '../components/ThemeProvider';

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
  const defaultTheme = appConfig.theme?.defaultTheme ?? 'system';

  return (
    <html
      lang={appConfig.locale}
      className={cn(geistSans.variable, geistMono.variable, defaultTheme)}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader" content="NO-DARKREADER-PLUGIN" />
        <NextThemesNamePolyfill />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="bg-background text-foreground min-h-screen transition-colors">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
