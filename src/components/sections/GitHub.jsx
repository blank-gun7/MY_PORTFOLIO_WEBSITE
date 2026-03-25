'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import { useTheme } from '@/hooks/useTheme';

const USERNAME = 'blank-gun7';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;

const calendarTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#4ade80'],
};

export default function GitHub() {
  const { theme, mounted } = useTheme();
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [totalContributions, setTotalContributions] = useState(null);
  const [errorDetail, setErrorDetail] = useState(null);
  const CalendarRef = useRef(null);
  const totalRef = useRef(null);

  // Preflight: check if the API is reachable before rendering the calendar
  useEffect(() => {
    if (!mounted) return;

    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then(() => {
        // API is reachable — dynamically import the calendar component
        return import('react-github-calendar');
      })
      .then((mod) => {
        CalendarRef.current = mod.GitHubCalendar || mod.default;
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('[GitHub Calendar] API unreachable:', err.message);
        setErrorDetail(err.message);
        setStatus('error');
      });

    return () => controller.abort();
  }, [mounted]);

  const handleTransformData = useCallback((contributions) => {
    const total = contributions.reduce((sum, day) => sum + day.count, 0);
    totalRef.current = total;
    return contributions;
  }, []);

  useEffect(() => {
    if (totalRef.current !== null && totalContributions === null) {
      setTotalContributions(totalRef.current);
    }
  });

  const Calendar = CalendarRef.current;

  return (
    <section id="github" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            command={`$ gh contributions --user ${USERNAME}`}
            title="GitHub Contributions"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="contributions.log">
            <div className="overflow-x-auto">
              {status === 'loading' && (
                <p className="text-text-secondary font-mono text-sm">
                  Loading contributions...
                </p>
              )}

              {status === 'error' && (
                <div className="text-center py-4 space-y-2">
                  <p className="text-text-secondary font-mono text-sm">
                    Contribution data temporarily unavailable.
                  </p>
                  {errorDetail && (
                    <p className="text-text-secondary/50 font-mono text-xs">
                      {errorDetail}
                    </p>
                  )}
                  <a
                    href={`https://github.com/${USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-accent-green font-mono text-sm hover:underline"
                  >
                    View on GitHub &rarr;
                  </a>
                </div>
              )}

              {status === 'ready' && Calendar && (
                <Calendar
                  username={USERNAME}
                  theme={calendarTheme}
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  transformData={handleTransformData}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              )}
            </div>
            {totalContributions !== null && (
              <p className="mt-4 text-sm text-text-secondary font-mono">
                <span className="text-accent-green font-bold">{totalContributions}</span>{' '}
                contributions in the last year
              </p>
            )}
          </TerminalWindow>
        </ScrollReveal>
      </div>
    </section>
  );
}
