import type { Metadata } from 'next';
import { appConfig } from '@internal/configs';

/**
 * The Open Graph card every page shares.
 *
 * Exported for the root metadata, which is a full `Metadata` object rather than
 * a page and so builds its `openGraph` block directly.
 */
export const OG_IMAGES = [
  {
    url: appConfig.ogImage,
    width: 1200,
    height: 630,
    alt: appConfig.name,
  },
];

interface PageMetadataInput {
  title: string;
  description: string;
  /** Social-specific overrides. The shared image is always applied. */
  openGraph?: Metadata['openGraph'];
}

/**
 * Builds a page's metadata with the social preview image already attached.
 *
 * Next replaces a parent's `openGraph` outright instead of deep-merging it, so
 * a page that declares its own block would otherwise drop the root image.
 */
export function createPageMetadata({
  title,
  description,
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...openGraph,
      images: OG_IMAGES,
    },
  };
}
