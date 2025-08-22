import type { NextRequest } from 'next/server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

import { getDb } from '../../../db';
import { createVisitsService } from '../../../lib';

/**
 * Edge runtime cannot be enabled in this file due to OpenNext Cloudflare limitations.
 * See: https://opennext.js.org/cloudflare#supported-nextjs-runtimes
 */
// export const runtime = 'edge';

function isValidEnv(env: unknown): env is { DB: D1Database } {
  return env !== null && typeof env === 'object' && 'DB' in env && env.DB !== null;
}

function getVisitsService() {
  const { env } = getCloudflareContext();
  
  if (!isValidEnv(env)) {
    throw new Error('Database not configured');
  }
  
  const db = getDb({ DB: env.DB });
  return createVisitsService(db);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const visitsService = getVisitsService();
    
    const body = await request.json();
    const { pagePath } = body as { pagePath: string };

    if (!pagePath) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 });
    }

    const country = request.headers.get('CF-IPCountry') ?? 'Unknown';
    
    await visitsService.recordVisit(pagePath, country);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visit recording error:', error);
    return NextResponse.json(
      { error: 'Failed to record visit' }, 
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const visitsService = getVisitsService();
    
    const visits = await visitsService.getAllVisits();
    
    return NextResponse.json({ visits });
  } catch (error) {
    console.error('Visits fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visits' }, 
      { status: 500 }
    );
  }
}
