/*
 * Runs a `next` subcommand on the shared dev port from `@internal/configs`, so
 * the server port and the site's dev URL can't drift apart.
 *
 * Usage: node ./scripts/next.mjs <dev|start> [args...]
 */
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import process from 'node:process';

import { DEV_SERVER_PORT } from '@internal/configs/public-urls';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');

const [, , command, ...args] = process.argv;

if (command == null) {
  throw new Error('Usage: node ./scripts/next.mjs <dev|start> [args...]');
}

const result = spawnSync(
  process.execPath,
  [nextBin, command, '--port', String(DEV_SERVER_PORT), ...args],
  { stdio: 'inherit' },
);

process.exit(result.status ?? 1);
