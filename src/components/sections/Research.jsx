'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const findings = [
  'Identified Barlow Twins as 18-25% superior in low-data regimes vs SimCLR/BYOL',
  'Established baseline Faster R-CNN on VinDr-CXR (18K images) achieving 0.32 mAP',
  'Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays',
];

const metrics = [
  { label: 'mAP Baseline', value: '0.32' },
  { label: 'Training Images', value: '112K+' },
  { label: 'Papers Reviewed', value: '20+' },
];

const techStack = ['PyTorch', 'Barlow Twins', 'Faster R-CNN', 'CheXpert', 'VinDr-CXR'];

export default function Research() {
  return (
    <section id="research" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ cat research.md" title="Research" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-lg border border-border bg-bg-secondary p-6 md:p-8">
            {/* Title */}
            <h3 className="text-xl font-sans font-semibold text-text-primary mb-1">
              Self-Supervised Learning for Medical Imaging
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              IEEE Signal Processing Society, Gujarat Section &middot; May 2025 &ndash; Present
            </p>

            {/* Findings */}
            <ul className="space-y-3 mb-8">
              {findings.map((finding, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-accent-green shrink-0 mt-0.5">&#9655;</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-lg font-bold font-mono text-accent-green">{metric.value}</p>
                  <p className="text-xs text-text-secondary">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
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
      </div>
    </section>
  );
}
