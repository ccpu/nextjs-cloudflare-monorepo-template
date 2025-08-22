'use client';

import type { PageVisit } from '../../lib';

import { useEffect, useState } from 'react';

export default function Analytics() {
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits');
        const data: { visits?: PageVisit[]; error?: string } = await res.json();

        if (data.error != null) {
          setError(data.error);
        } else {
          setVisits(data.visits ?? []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits().catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error != null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Page Visit Analytics</h1>

        {visits.length === 0 ? (
          <p className="text-gray-500">No visits recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg border bg-white shadow">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Page</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">
                    Visits
                  </th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="border-b">
                    <td className="px-4 py-3">{visit.page_path}</td>
                    <td className="px-4 py-3">{visit.visit_date}</td>
                    <td className="px-4 py-3">{visit.visitor_country}</td>
                    <td className="px-4 py-3 font-mono">{visit.total_visits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Summary</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 shadow">
              <p className="text-sm text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold">
                {new Set(visits.map((v) => v.page_path)).size}
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow">
              <p className="text-sm text-gray-600">Total Days</p>
              <p className="text-2xl font-bold">
                {new Set(visits.map((v) => v.visit_date)).size}
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow">
              <p className="text-sm text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold">
                {visits.reduce((sum, v) => sum + v.total_visits, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
