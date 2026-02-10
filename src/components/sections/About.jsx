'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import { siteConfig } from '@/data/site-config';

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ cat about.md" title="About" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="about.md">
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m an AI/ML engineer and full-stack developer at BITS Pilani, Hyderabad
                Campus. I build scalable LLM systems, financial AI platforms, and end-to-end ML
                pipelines.
              </p>
              <p>
                Currently leading a 20-member tech team at Zenalyst.ai, where we ship LLM analytics
                platforms on AWS, and researching Self-Supervised Learning for medical imaging at
                IEEE SPS.
              </p>
              <p>
                I care about shipping fast, writing clean code, and making AI systems that actually
                work in production.
              </p>
            </div>
          </TerminalWindow>
        </ScrollReveal>

        {/* Stats Row */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
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
    </section>
  );
}
