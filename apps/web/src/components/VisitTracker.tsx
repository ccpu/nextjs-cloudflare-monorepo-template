'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();

    // Track page visit
    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagePath: pathname }),
      signal: controller.signal,
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) console.error(error);
    });

    return () => controller.abort();
  }, [pathname]);

  return null; // This component doesn't render anything
}
