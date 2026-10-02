import type { NextConfig } from 'next';

import { assertPublicEnv } from '@internal/configs/require-public-env';
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { setupRootEnv } from '@pixpilot/next-env';
import { createSecurityHeaders } from '@pixpilot/next-security-headers';

// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
const isDev = process.env.NODE_ENV === 'development';

/*
 * Loads the root `.env.local` / `.env` for `next dev` too, which runs without
 * `pnpm with-env`. None of the imports above read env at module load.
 *
 * In dev it also restarts `next dev` when a root env file changes: Next only
 * watches env files inside apps/web, so this touches `next.config.ts` to hand
 * the change to Next's own config watcher.
 */
setupRootEnv({ watch: isDev });

/*
 * Fail here rather than in `@internal/configs`. This file only ever runs in
 * Node, so the check never reaches a browser bundle - whereas the shared config
 * is imported by client components, where unprefixed env vars are stripped and
 * a throw would fire on every page load.
 */
// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
assertPublicEnv(process.env, `apps/web (${isDev ? 'next dev' : 'next build'})`);

const nextConfig: NextConfig = {
  output: 'standalone',
  rewrites() {
    return [{ source: '/.well-known/security.txt', destination: '/security.txt' }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        // Extend the CSP via `contentSecurityPolicy.directives` when adding
        // third-party origins (APIs, analytics, image hosts).
        headers: createSecurityHeaders({ isDev }),
      },
    ];
  },
};

// 🔒 SAFETY CHECK: Only run this simulation in development
if (isDev) {
  // You can also pass options here to connect to REAL remote data
  // e.g. { experimental: { remoteBindings: true } }
  initOpenNextCloudflareForDev().catch(console.error);
}

export default nextConfig;
