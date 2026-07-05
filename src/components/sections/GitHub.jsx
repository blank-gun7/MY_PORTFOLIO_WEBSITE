import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ContributionGrid from '@/components/ui/ContributionGrid';
import { siteConfig } from '@/data/site-config';

const USERNAME = 'blank-gun7';

export default function GitHub({ contributions }) {
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
                {contributions ? (
                  <ContributionGrid days={contributions.days} />
                ) : (
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
              </div>
              {contributions && (
                <p className="mt-4 text-sm text-text-secondary">
                  <span className="font-mono text-accent font-bold">{contributions.total}</span>{' '}
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
