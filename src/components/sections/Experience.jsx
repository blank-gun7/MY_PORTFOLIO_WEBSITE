'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { experiences } from '@/data/experiences';

function CaseStudy({ experience, index }) {
  const isCurrent = experience.type === 'current';
  const metric = experience.headlineMetric;
  const caseNumber = String(index + 1).padStart(2, '0');

  return (
    <ScrollReveal delay={0.05}>
      <article className="grid md:grid-cols-12 gap-8 md:gap-12 py-12 border-t border-border">
        {/* Left: case number + headline metric */}
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary mb-6">
            Case {caseNumber} — {experience.company}
            {isCurrent && (
              <span className="ml-2 inline-flex items-center gap-1.5 text-accent normal-case tracking-normal">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                ongoing
              </span>
            )}
          </p>
          {metric && (
            <>
              <p className="font-display text-5xl md:text-6xl text-accent tabular-nums leading-none">
                {metric.value}
              </p>
              <p className="mt-3 text-sm text-text-secondary max-w-[26ch]">{metric.caption}</p>
            </>
          )}
          <p className="mt-6 font-mono text-xs text-text-secondary">
            {experience.dateRange} · {experience.location}
          </p>
        </div>

        {/* Right: narrative */}
        <div className="md:col-span-8">
          <h3 className="font-display text-2xl md:text-3xl text-text-primary mb-2">
            {experience.role}
          </h3>
          <p className="text-text-secondary leading-relaxed mb-6 max-w-[62ch]">
            {experience.description}
          </p>

          <ul className="space-y-2.5 mb-6">
            {experience.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                <span className="text-accent shrink-0" aria-hidden="true">
                  —
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-bg-raised text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Case studies"
            title="Work that had to hold up"
            description="Each engagement, told by its outcome."
          />
        </ScrollReveal>

        <div>
          {experiences.map((exp, index) => (
            <CaseStudy key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
