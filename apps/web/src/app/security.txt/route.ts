import { appConfig } from '@internal/configs/app-config-public';

const EXPIRY_DAYS = 180;
const CACHE_MAX_AGE_SECONDS = 86_400;

export const dynamic = 'force-dynamic';

/** Serves RFC 9116 disclosure details with an expiry refreshed at request time. */
export function GET(): Response {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + EXPIRY_DAYS);
  const policyUrl = appConfig.security.policyUrl ?? '';

  const body = [
    `Contact: ${appConfig.security.contact}`,
    `Expires: ${expires.toISOString()}`,
    `Preferred-Languages: ${appConfig.locale}`,
    `Canonical: ${appConfig.siteUrl}/.well-known/security.txt`,
    `Canonical: ${appConfig.siteUrl}/security.txt`,
    ...(policyUrl !== '' ? [`Policy: ${policyUrl}`] : []),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `public, max-age=${String(CACHE_MAX_AGE_SECONDS)}`,
    },
  });
}
