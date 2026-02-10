'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function Research() {
  return (
    <section id="research" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ cat research.md" title="Research" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="research.md">
            <div className="space-y-5">
              {/* Title */}
              <div>
                <p className="text-accent-green text-xs mb-1">$ cat --title</p>
                <h3 className="text-text-primary font-semibold">
                  Self-Supervised Learning for Medical Imaging
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  IEEE Signal Processing Society, Gujarat Section &middot; May 2025 &ndash; Present
                </p>
              </div>

              {/* Key Findings */}
              <div>
                <p className="text-accent-green text-xs mb-2">$ cat --findings</p>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-accent-green shrink-0">&#9655;</span>
                    <span>
                      Identified Barlow Twins 18-25% superior performance in low-data regimes vs
                      SimCLR/BYOL
                    </span>
                  </li>
                  <li className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-accent-green shrink-0">&#9655;</span>
                    <span>
                      Established baseline Faster R-CNN on VinDr-CXR (18K images) achieving 0.32 mAP
                    </span>
                  </li>
                  <li className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-accent-green shrink-0">&#9655;</span>
                    <span>
                      Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays
                    </span>
                  </li>
                </ul>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold font-mono text-accent-green">0.32</p>
                  <p className="text-xs text-text-secondary">mAP Baseline</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold font-mono text-accent-green">112K+</p>
                  <p className="text-xs text-text-secondary">Training Images</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold font-mono text-accent-green">20+</p>
                  <p className="text-xs text-text-secondary">Papers Reviewed</p>
                </div>
              </div>

              {/* Tech */}
              <div>
                <p className="text-accent-green text-xs mb-2">$ cat --tech-stack</p>
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'Barlow Twins', 'Faster R-CNN', 'CheXpert', 'VinDr-CXR', 'SSL'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono rounded bg-accent-purple/15 text-accent-purple"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </TerminalWindow>
        </ScrollReveal>
      </div>
    </section>
  );
}
