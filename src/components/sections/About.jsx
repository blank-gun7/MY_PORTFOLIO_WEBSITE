'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const focus = [
  'LLM systems & RAG pipelines',
  'Financial AI & analytics',
  'Full-stack development',
  'Research — SSL, medical imaging',
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader eyebrow="About" title="The short version" />
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-10">
          <ScrollReveal delay={0.1} className="md:col-span-7">
            <div className="space-y-5 text-text-secondary leading-relaxed text-[17px]">
              <p>
                <span className="text-text-primary">
                  AI/ML engineer and full-stack developer at BITS Pilani, Hyderabad.
                </span>{' '}
                I build production LLM systems, financial AI platforms, and end-to-end ML pipelines.
              </p>
              <p>
                Currently leading a 20-member team at Zenalyst.ai shipping LLM analytics on AWS, and
                researching self-supervised learning for medical imaging at IEEE SPS.
              </p>
              <p>
                I care about shipping fast, writing clean code, and making AI systems that work in
                production — not just in notebooks.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-secondary mb-4">
              Focus
            </p>
            <ul className="divide-y divide-border border-t border-b border-border">
              {focus.map((area) => (
                <li key={area} className="py-3 text-text-primary flex items-baseline gap-3">
                  <span className="text-accent text-sm" aria-hidden="true">
                    —
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
