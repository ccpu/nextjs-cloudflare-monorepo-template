import config from './app-config-public.js';

/*
 * Server-only environment. Import this from server code and build tools only;
 * secrets read from `process.env` here must never reach a client bundle.
 */
export const serverEnv = {
  SITE_URL: config.siteUrl,
};
