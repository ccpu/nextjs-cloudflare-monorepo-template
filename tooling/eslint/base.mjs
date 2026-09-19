import defineConfig from '@pixpilot/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';
import commonConfig from './common.mjs';

const recommendedTurboConfig = turboPlugin.configs?.recommended;
const recommendedTurboRules =
  recommendedTurboConfig &&
  !Array.isArray(recommendedTurboConfig) &&
  'rules' in recommendedTurboConfig
    ? recommendedTurboConfig.rules
    : {};

// eslint-disable-next-line antfu/no-top-level-await
const baseConfig = await defineConfig(
  {
    type: 'app',
    turbo: true,
    test: true,
    typescript: {
      parserOptions: {
        allowDefaultProject: true,
      },
    },
  },
  // { ignores: ['**/*.config.*'] },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      ...recommendedTurboRules,
      'no-restricted-imports': [
        'error',
        {
          name: 'zod',
          message: "Use `import { z } from 'zod/v4'` instead to ensure v4.",
        },
      ],
    },
  },
  ...commonConfig,
);

/**
 * All packages that leverage t3-env should use this rule
 */
/** @type {Awaited<import('typescript-eslint').Config>} */
export default baseConfig;
