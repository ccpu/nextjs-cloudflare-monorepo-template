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
    rules: {
      ...recommendedTurboRules,
    },
  },
  ...commonConfig,
);

/** @type {Awaited<import('eslint').Linter.Config[]>} */
export default baseConfig;
