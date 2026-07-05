'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'ml-ai', label: 'ML/AI' },
  { key: 'data', label: 'Data' },
  { key: 'cv', label: 'CV' },
  { key: 'finance', label: 'Finance' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const featured = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

  const filtered =
    activeFilter === 'all' ? featured : featured.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Selected projects"
            title="Built to answer a question"
            description="Each project exists because a number needed proving."
          />
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                  activeFilter === filter.key
                    ? 'border-accent text-accent'
                    : 'border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
