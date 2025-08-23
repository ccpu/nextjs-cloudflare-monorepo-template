import type { PageVisit, VisitStats } from '../types/visits.types';

import { useEffect, useState } from 'react';
import { z } from 'zod';

const visitsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    visits: z.array(z.object({
      id: z.number(),
      page_path: z.string(),
      visit_date: z.string(),
      visitor_country: z.string().nullable(),
      total_visits: z.number(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
    })),
  }).optional(),
  error: z.string().optional(),
});

const statsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    totalPages: z.number(),
    totalDays: z.number(),
    totalVisits: z.number(),
  }).optional(),
  error: z.string().optional(),
});

export function useVisits(): {
  visits: PageVisit[];
  loading: boolean;
  error: string | null;
} {
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits');
        const rawData = await res.json();
        
        // Validate response with Zod
        const validatedData = visitsResponseSchema.parse(rawData);
        
        if (validatedData.error != null) {
          setError(validatedData.error);
        } else {
          setVisits(validatedData.data?.visits ?? []);
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(`Invalid response format: ${err.issues.map((issue) => issue.message).join(', ')}`);
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVisits().catch(console.error);
  }, []);

  return { visits, loading, error };
}

export function useVisitStats(): {
  stats: VisitStats | null;
  loading: boolean;
  error: string | null;
} {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/visits/stats');
        const rawData = await res.json();
        
        // Validate response with Zod
        const validatedData = statsResponseSchema.parse(rawData);
        
        if (validatedData.error != null) {
          setError(validatedData.error);
        } else {
          setStats(validatedData.data ?? null);
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(`Invalid response format: ${err.issues.map((issue) => issue.message).join(', ')}`);
        } else {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats().catch(console.error);
  }, []);

  return { stats, loading, error };
}
