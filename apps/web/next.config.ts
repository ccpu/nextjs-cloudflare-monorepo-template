import type { NextConfig } from 'next';

import { assertPublicEnv } from '@internal/configs/require-public-env';
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
// Loads the root `.env.local` / `.env` for `next dev` too, which runs without
// `pnpm with-env`. None of the imports above read env at module load.
import { restartDevServerOnRootEnvChange } from './load-root-env.mjs';

// eslint-disable-next-line no-restricted-properties, node/prefer-global/process
const isDev = process.env.NODE_ENV === 'development';

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
};

// 🔒 SAFETY CHECK: Only run this simulation in development
if (isDev) {
  // You can also pass options here to connect to REAL remote data
  // e.g. { experimental: { remoteBindings: true } }
  initOpenNextCloudflareForDev().catch(console.error);
}

export default nextConfig;
