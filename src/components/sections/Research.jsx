'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const findings = [
  'Identified Barlow Twins as 18-25% superior in low-data regimes vs SimCLR/BYOL',
  'Established baseline Faster R-CNN on VinDr-CXR (18K images) achieving 0.32 mAP',
  'Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays',
];

const metrics = [
  { label: 'mAP baseline', value: '0.32' },
  { label: 'Training images', value: '112K+' },
  { label: 'Papers reviewed', value: '20+' },
];

const techStack = ['PyTorch', 'Barlow Twins', 'Faster R-CNN', 'CheXpert', 'VinDr-CXR'];

export default function Research() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Research"
            title="Where the papers meet the pixels"
            description="Ongoing work with the IEEE Signal Processing Society."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 rounded-xl border border-border bg-bg-secondary p-8 md:p-10">
            {/* Left: metrics */}
            <div className="md:col-span-4 flex md:flex-col gap-8 md:gap-6">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-3xl md:text-4xl text-accent tabular-nums leading-none">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-text-secondary">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: narrative */}
            <div className="md:col-span-8">
              <h3 className="font-display text-2xl md:text-3xl text-text-primary mb-1">
                Self-Supervised Learning for Medical Imaging
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                IEEE Signal Processing Society, Gujarat Section &middot; May 2025 &ndash; Present
              </p>

              <ul className="space-y-2.5 mb-6">
                {findings.map((finding, i) => (
                  <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                    <span className="text-accent shrink-0" aria-hidden="true">
                      —
                    </span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-bg-raised text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
