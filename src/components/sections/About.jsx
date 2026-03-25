'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { siteConfig } from '@/data/site-config';

const focus = [
  'LLM Systems & RAG Pipelines',
  'Financial AI & Analytics',
  'Full-Stack Development',
  'Research — SSL, Medical Imaging',
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ cat about.md" title="About" />
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Bio — 3 columns */}
          <ScrollReveal delay={0.1} className="md:col-span-3">
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                AI/ML engineer and full-stack developer at BITS Pilani, Hyderabad.
                I build production LLM systems, financial AI platforms, and end-to-end ML pipelines.
              </p>
              <p>
                Currently leading a 20-member team at Zenalyst.ai shipping LLM analytics
                on AWS, and researching Self-Supervised Learning for medical imaging at IEEE SPS.
              </p>
              <p>
                I care about shipping fast, writing clean code, and making AI systems
                that work in production — not just in notebooks.
              </p>
            </div>

            {/* Focus areas */}
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
              {focus.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-accent-green text-xs">&#9655;</span>
                  {area}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Stats — 2 columns */}
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {siteConfig.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-bg-secondary p-4 text-center"
                >
                  <p className="text-2xl font-bold font-mono text-accent-green">{stat.value}</p>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
