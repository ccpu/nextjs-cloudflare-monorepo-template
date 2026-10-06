import defineConfig from '@pixpilot/eslint-config';
import commonConfig from './common.mjs';

/** @type {Awaited<import('eslint').Linter.Config[]>} */
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
  ...commonConfig,
);

export default baseConfig;
