import Link from 'next/link';
import { createPageMetadata } from '../../../lib/page-metadata';

export const metadata = {
  ...createPageMetadata({
    title: 'Something went wrong',
    description: 'Get help recovering from an error.',
  }),
  robots: { index: false, follow: false },
};

/** A public recovery page for errors that redirect visitors to /error. */
export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <div className="border-border bg-card text-card-foreground w-full max-w-md rounded-xl border p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mt-4 text-center">
          We couldn’t complete your request. Please try again.
        </p>

        <div className="bg-muted mt-6 rounded-lg p-4">
          <p className="text-sm font-medium">This could be due to:</p>
          <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>An expired or invalid link</li>
            <li>A network connection issue</li>
            <li>A temporary service problem</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Go to Home
          </Link>
          <Link
            href="/contact"
            className="border-border hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Contact support
          </Link>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          If the problem persists, please contact support.
        </p>
      </div>
    </main>
  );
}
