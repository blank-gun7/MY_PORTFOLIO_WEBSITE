'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import { useTheme } from '@/hooks/useTheme';

const calendarTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#4ade80'],
};

export default function GitHub() {
  const { theme, mounted } = useTheme();
  const [totalContributions, setTotalContributions] = useState(null);
  const totalRef = useRef(null);

  const handleTransformData = useCallback((contributions) => {
    const total = contributions.reduce((sum, day) => sum + day.count, 0);
    totalRef.current = total;
    return contributions;
  }, []);

  useEffect(() => {
    if (totalRef.current !== null) {
      setTotalContributions(totalRef.current);
    }
  });

  return (
    <section id="github" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            command="$ gh contributions --user blank-gun7"
            title="GitHub Contributions"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="contributions.log">
            <div className="overflow-x-auto">
              {mounted ? (
                <GitHubCalendar
                  username="blank-gun7"
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
              ) : (
                <p className="text-text-secondary font-mono text-sm">
                  Loading contributions...
                </p>
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
