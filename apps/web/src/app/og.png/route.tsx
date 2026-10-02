import { appConfig } from '@internal/configs/app-config-public';
import { ImageResponse } from 'next/og';

const SIZE = { width: 1200, height: 630 };
const CACHE_MAX_AGE_SECONDS = 86_400;

/** Generates the shared social preview from the template's public branding. */
export function GET(): Response {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px 72px',
        background: 'linear-gradient(135deg, #09090B 0%, #18181B 65%, #172554 100%)',
        color: '#FAFAFA',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 64,
          height: 6,
          borderRadius: 3,
          background: '#3B82F6',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          {appConfig.name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: '#A1A1AA',
          }}
        >
          {appConfig.description}
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#93C5FD' }}>
        {appConfig.siteBaseUrl}
      </div>
    </div>,
    {
      ...SIZE,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': `public, max-age=${String(CACHE_MAX_AGE_SECONDS)}`,
      },
    },
  );
}
