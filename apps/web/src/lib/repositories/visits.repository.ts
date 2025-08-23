import type { Database } from '../../db';
import type { CreateVisitData, PageVisit } from '../types/visits.types';

import { and, eq, gte, lte, sql } from 'drizzle-orm';
import { z } from 'zod';

import { insertPageVisitSchema, pageVisits, selectPageVisitSchema } from '../../db/schema';

export class VisitsRepository {
  constructor(private db: Database) {}

  async findExistingVisit(
    pagePath: string,
    date: string,
    country: string,
  ): Promise<PageVisit | null> {
    // Validate inputs
    z.string().min(1).parse(pagePath);
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).parse(date);
    z.string().parse(country);

    const existing = await this.db
      .select()
      .from(pageVisits)
      .where(
        and(
          eq(pageVisits.page_path, pagePath),
          eq(pageVisits.visit_date, date),
          eq(pageVisits.visitor_country, country),
        ),
      )
      .limit(1);

    return existing[0] || null;
  }

  async incrementVisit(id: number): Promise<void> {
    z.number().int().positive().parse(id);

    await this.db
      .update(pageVisits)
      .set({
        total_visits: sql`${pageVisits.total_visits} + 1`,
        updated_at: new Date().toISOString(),
      })
      .where(eq(pageVisits.id, id));
  }

  async createVisit(data: CreateVisitData): Promise<void> {
    // Validate the data before insertion
    const validatedData = insertPageVisitSchema.parse({
      page_path: data.pagePath,
      visit_date: data.date,
      visitor_country: data.country,
      total_visits: 1,
    });

    await this.db.insert(pageVisits).values(validatedData);
  }

  async getAllVisits(): Promise<PageVisit[]> {
    const visits = await this.db
      .select()
      .from(pageVisits)
      .orderBy(pageVisits.visit_date);

    // Validate the returned data
    return z.array(selectPageVisitSchema).parse(visits);
  }

  async getVisitsByDateRange(startDate: string, endDate: string): Promise<PageVisit[]> {
    // Validate date inputs
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).parse(startDate);
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/u).parse(endDate);

    const visits = await this.db
      .select()
      .from(pageVisits)
      .where(
        and(
          gte(pageVisits.visit_date, startDate),
          lte(pageVisits.visit_date, endDate),
        ),
      )
      .orderBy(pageVisits.visit_date);

    return z.array(selectPageVisitSchema).parse(visits);
  }
}
