'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { experiences } from '@/data/experiences';

function ExperienceCard({ experience, index }) {
  const isCurrent = experience.type === 'current';

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className={`relative rounded-lg border p-6 transition-all ${
          isCurrent
            ? 'border-accent-green/50 bg-bg-secondary glow-green'
            : 'border-border bg-bg-secondary hover:border-text-secondary/30'
        }`}
      >
        {/* Green left accent for current roles */}
        {isCurrent && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-green rounded-l-lg" />
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              {isCurrent && <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />}
              <h3 className="text-lg font-semibold text-text-primary">{experience.role}</h3>
            </div>
            <p className="text-text-secondary text-sm">
              {experience.company} &middot; {experience.location}
            </p>
          </div>
          <span className="text-xs font-mono text-text-secondary whitespace-nowrap">
            {experience.dateRange}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4">{experience.description}</p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-secondary">
              <span className="text-accent-green mt-0.5 shrink-0">&#9655;</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded bg-accent-purple/15 text-accent-purple"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ cat experience.log" title="Experience" />
        </ScrollReveal>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
