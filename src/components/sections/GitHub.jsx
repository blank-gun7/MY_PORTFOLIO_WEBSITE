'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/data/site-config';

const USERNAME = 'blank-gun7';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;

// Warm apricot scale — matches the site accent instead of GitHub green
const calendarTheme = {
  light: ['#EDE7DA', '#E3C89C', '#CFA05C', '#B57C2E', '#8F5E14'],
  dark: ['#24262C', '#4A3722', '#7A5527', '#B57C39', '#E5A15A'],
};

export default function GitHub() {
  const { theme, mounted } = useTheme();
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [totalContributions, setTotalContributions] = useState(null);
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
        return import('react-github-calendar');
      })
      .then((mod) => {
        CalendarRef.current = mod.GitHubCalendar || mod.default;
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('[GitHub Calendar] API unreachable:', err.message);
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
  const { nowBuilding, stats } = siteConfig;

  return (
    <section id="github" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Proof of work"
            title="Continuously building"
            description="The graph, the numbers, and what is on the bench right now."
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          {/* Contribution calendar */}
          <ScrollReveal delay={0.1} className="col-span-2 md:col-span-8">
            <div className="h-full rounded-xl border border-border bg-bg-secondary p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary mb-5">
                GitHub activity — @{USERNAME}
              </p>
              <div className="overflow-x-auto">
                {status === 'loading' && (
                  <p className="text-text-secondary text-sm">Loading contributions…</p>
                )}

                {status === 'error' && (
                  <div className="py-4 space-y-2">
                    <p className="text-text-secondary text-sm">
                      Contribution data temporarily unavailable.
                    </p>
                    <a
                      href={`https://github.com/${USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-accent text-sm hover:underline"
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
                    blockSize={11}
                    blockMargin={4}
                    fontSize={13}
                    transformData={handleTransformData}
                    labels={{
                      totalCount: '{{count}} contributions in the last year',
                    }}
                  />
                )}
              </div>
              {totalContributions !== null && (
                <p className="mt-4 text-sm text-text-secondary">
                  <span className="font-mono text-accent font-bold">{totalContributions}</span>{' '}
                  contributions in the last year
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Now building */}
          <ScrollReveal delay={0.15} className="col-span-2 md:col-span-4">
            <div className="h-full rounded-xl border border-accent/40 bg-accent/5 p-6 flex flex-col">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Now building
              </p>
              <p className="font-display text-2xl text-text-primary mb-3">{nowBuilding.title}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{nowBuilding.detail}</p>
            </div>
          </ScrollReveal>

          {/* Stat tiles */}
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={0.2 + i * 0.05}
              className="col-span-1 md:col-span-3"
            >
              <div className="h-full rounded-xl border border-border bg-bg-secondary p-5">
                <p className="font-mono text-2xl md:text-3xl text-text-primary tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
