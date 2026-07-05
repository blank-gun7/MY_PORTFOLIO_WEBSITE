import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="font-display text-7xl text-accent mb-4">404</p>
        <p className="font-display text-2xl text-text-primary mb-3">This page never shipped.</p>
        <p className="text-text-secondary text-sm mb-8">
          The address may have changed, or it never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-contrast font-medium rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
        >
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
