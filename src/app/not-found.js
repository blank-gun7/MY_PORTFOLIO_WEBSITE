import Link from 'next/link';
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <TerminalWindow title="terminal">
          <div className="space-y-3">
            <p className="text-accent-green">$ cd /requested-page</p>
            <p className="text-red-400">bash: cd: /requested-page: No such file or directory</p>
            <p className="text-text-secondary">Error 404: Page not found</p>
            <div className="pt-4">
              <Link
                href="/"
                className="text-accent-green hover:underline focus:outline-none focus:ring-2 focus:ring-accent-green rounded"
              >
                $ cd ~ <span className="text-text-secondary">(go home)</span>
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
