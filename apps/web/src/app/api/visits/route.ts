import type { NextRequest } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { getDb } from '../../../db';
import { pageVisits } from '../../../db/schema';

/**
 * Edge runtime cannot be enabled in this file due to OpenNext Cloudflare limitations.
 * See: https://opennext.js.org/cloudflare#supported-nextjs-runtimes
 */
// export const runtime = 'edge';

function isValidEnv(env: unknown): env is { DB: D1Database } {
  return env !== null && typeof env === 'object' && 'DB' in env && env.DB !== null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the Cloudflare environment from OpenNext Cloudflare context
    const { env } = getCloudflareContext();

    if (!isValidEnv(env)) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const db = getDb({ DB: env.DB });
    const body = await request.json();
    const { pagePath } = body as { pagePath: string };

    if (!pagePath) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0] ?? '';
    const country = request.headers.get('CF-IPCountry') ?? 'Unknown';

    // Check if record exists for today
    const existing = await db
      .select()
      .from(pageVisits)
      .where(
        and(
          eq(pageVisits.page_path, pagePath),
          eq(pageVisits.visit_date, today),
          eq(pageVisits.visitor_country, country),
        ),
      )
      .limit(1);

    if (existing.length > 0 && existing[0]) {
      // Update existing record
      await db
        .update(pageVisits)
        .set({
          total_visits: existing[0].total_visits + 1,
          updated_at: new Date().toISOString(),
        })
        .where(eq(pageVisits.id, existing[0].id));
    } else {
      // Insert new record
      await db.insert(pageVisits).values({
        page_path: pagePath,
        visit_date: today,
        visitor_country: country,
        total_visits: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
  }
}

// Get analytics data
export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    // Get the Cloudflare environment from OpenNext Cloudflare context
    const { env } = getCloudflareContext();

    if (!isValidEnv(env)) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const db = getDb({ DB: env.DB });

    const visits = await db.select().from(pageVisits).orderBy(pageVisits.visit_date);

    return NextResponse.json({ visits });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
  }
}
