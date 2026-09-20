import nextjsConfig from '@internal/eslint-config/nextjs';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextjsConfig,
  {
    ignores: ['.next/**'],
  },
];

export default config;
