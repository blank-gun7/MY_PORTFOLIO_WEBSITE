'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineNode from '@/components/ui/TimelineNode';
import { timeline } from '@/data/timeline';

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Timeline"
            title="How I got here"
            description="Education, work, and what comes next."
          />
        </ScrollReveal>

        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border" aria-hidden="true" />

          <div>
            {timeline.map((entry, index) => (
              <TimelineNode key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
