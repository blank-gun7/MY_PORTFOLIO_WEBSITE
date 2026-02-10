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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ ls projects/" title="Projects" />
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 text-sm font-mono rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-green ${
                  activeFilter === filter.key
                    ? 'bg-accent-green/15 text-accent-green border border-accent-green/30'
                    : 'text-text-secondary border border-border hover:border-text-secondary/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
