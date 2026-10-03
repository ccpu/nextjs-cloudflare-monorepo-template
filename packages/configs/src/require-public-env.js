/**
 * Browser-safe environment variables that every build must provide.
 *
 * These end up embedded in client bundles, so they are not secrets - but they
 * have no bundled fallback either. A missing value must fail the build loudly
 * rather than ship a client pointed at the wrong backend. Add a name here and
 * each build entry point that calls `assertPublicEnv` starts enforcing it.
 * @type {string[]}
 */
export const requiredPublicEnv = [];

/**
 * Lists the required variables that are absent or blank in `env`.
 *
 * @param {Record<string, string | undefined>} env
 * @param {readonly string[]} [names] Defaults to `requiredPublicEnv`.
 * @returns {string[]} The names of the missing variables, in declaration order.
 */
export function getMissingPublicEnv(env, names = requiredPublicEnv) {
  return names.filter((name) => {
    const value = env[name];
    return value == null || value.trim().length === 0;
  });
}

/**
 * Throws a directive error when a required browser-safe variable is absent.
 *
 * @param {Record<string, string | undefined>} env
 * @param {string} context Where the check ran, e.g. "apps/web (next build)".
 * @param {readonly string[]} [names] Defaults to `requiredPublicEnv`.
 * @returns {void}
 */
export function assertPublicEnv(env, context, names = requiredPublicEnv) {
  const missing = getMissingPublicEnv(env, names);

  if (missing.length === 0) return;

  throw new Error(
    [
      `${context}: missing required environment ${
        missing.length === 1 ? 'variable' : 'variables'
      }: ${missing.join(', ')}.`,
      '',
      '  Local          -> add them to .env.local (or .env) in the repository root.',
      '  GitHub Actions -> set them on the job environment as vars or secrets.',
      '',
      'See .env.example for the full list.',
    ].join('\n'),
  );
}
