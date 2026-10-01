import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { config as loadEnv } from 'dotenv';

/*
 * Loads the repository-root env files so every app shares one set of values.
 *
 * Highest precedence first, and never overriding: variables already set by the
 * shell, CI or Next's own app-level `.env*` loading win.
 */
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

for (const file of ['.env.local', '.env']) {
  const envPath = path.join(repoRoot, file);

  if (fs.existsSync(envPath)) {
    loadEnv({ path: envPath, override: false, quiet: true });
  }
}
