'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader eyebrow="Toolbox" title="What I reach for" />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.category} delay={i * 0.05}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary border-b border-border pb-3 mb-4">
                {skill.category}
              </h3>
              <ul className="flex flex-wrap gap-x-2 gap-y-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 text-sm rounded-full border border-border text-text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
