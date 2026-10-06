import nextConfig from '@pixpilot/eslint-config-next';
import commonConfig from './common.mjs';

// eslint-disable-next-line antfu/no-top-level-await
const eslintConfig = await nextConfig({ turbo: true },...commonConfig);

export default eslintConfig;
