import type { Metadata } from 'next';
import siteConfig from '../../site.config';
import { OG_IMAGES } from '../lib/page-metadata';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['developer', 'portfolio', 'nextjs', 'react', 'typescript'],
  // `./` resolves against each route's own pathname, so every page gets its own
  // canonical URL without repeating it per page.
  alternates: {
    canonical: './',
  },
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
