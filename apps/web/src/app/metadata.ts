import type { Metadata } from 'next';
import { appConfig } from '@internal/configs';
import { OG_IMAGES } from '../lib/page-metadata';

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: appConfig.keywords,
  // `./` resolves against each route's own pathname, so every page gets its own
  // canonical URL without repeating it per page.
  alternates: {
    canonical: './',
  },
  authors: [{ name: appConfig.author.name, url: appConfig.author.url }],
  creator: appConfig.author.name,
  openGraph: {
    type: 'website',
    // Open Graph wants `en_US`, not the BCP 47 `en-US` the config holds.
    locale: appConfig.locale.replace('-', '_'),
    url: appConfig.siteUrl,
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
    images: OG_IMAGES,
  },
  // Only the card type is set; Next fills title, description and image from
  // each page's `openGraph` block.
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: '', // Add Google Search Console verification
    yandex: '', // Add Yandex verification if needed
  },
};
