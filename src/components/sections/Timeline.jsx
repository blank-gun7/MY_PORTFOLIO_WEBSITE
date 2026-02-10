'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TimelineNode from '@/components/ui/TimelineNode';
import { timeline } from '@/data/timeline';

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ git log --oneline --graph" title="Timeline" />
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {/* Timeline entries */}
          <div className="space-y-0">
            {timeline.map((entry, index) => {
              const side = index % 2 === 0 ? 'right' : 'left';
              return (
                <div
                  key={entry.id}
                  className={`relative pl-12 md:pl-0 ${
                    side === 'left'
                      ? 'md:pr-[calc(50%+1.5rem)] md:pl-0'
                      : 'md:pl-[calc(50%+1.5rem)]'
                  }`}
                >
                  {/* Dot positioned on the line — desktop */}
                  <div
                    className={`hidden md:block absolute top-4 ${
                      side === 'left' ? 'right-[calc(50%-0.5rem)]' : 'left-[calc(50%-0.5rem)]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        entry.status === 'present'
                          ? 'bg-accent-green animate-pulse glow-green'
                          : entry.status === 'future'
                            ? 'border-2 border-dashed border-text-secondary bg-bg-primary'
                            : 'bg-text-secondary'
                      }`}
                    />
                  </div>

                  <TimelineNode entry={entry} index={index} side={side} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
