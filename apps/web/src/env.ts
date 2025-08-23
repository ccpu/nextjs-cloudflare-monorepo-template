// src/env.ts

import { SITE_CONFIG } from './config';

// Type-safe environment loader for next-sitemap config
export const env = {
  SITE_URL: SITE_CONFIG.url,
};
