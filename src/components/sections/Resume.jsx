'use client';

import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ open resume.pdf" title="Resume" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* PDF Embed — desktop only */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden mb-6">
            <embed
              src="/resume.pdf"
              type="application/pdf"
              className="w-full h-[600px]"
              title="Resume PDF"
            />
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden rounded-lg border border-border bg-bg-secondary p-6 text-center mb-6">
            <p className="text-text-secondary text-sm mb-4">
              PDF preview available on desktop. Download to view on mobile.
            </p>
          </div>

          {/* Download Button + Last Updated */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              <Download size={16} />
              Download Resume
            </a>
            <p className="text-xs text-text-secondary font-mono">Last updated: February 2026</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
