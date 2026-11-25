import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import defineConfig from '@pixpilot/dev-config/vitest';

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);
const setupFilePath = resolve(currentDir, 'react.setup.ts');

export default defineConfig({
  coverageOnCI: false,
  // Next.js needs `jsx: preserve` in tsconfig.json; tests compile JSX here.
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: [setupFilePath],
  },
});
