'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

const statusLabels = {
  live: 'In production',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export default function ProjectCard({ project }) {
  const statusLabel = statusLabels[project.status] || statusLabels.completed;
  const leadMetric = project.metrics[0];
  const maxTags = 5;
  const visibleTags = project.techStack.slice(0, maxTags);
  const overflowCount = project.techStack.length - maxTags;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="group rounded-xl border border-border bg-bg-secondary hover:border-accent/50 transition-colors"
    >
      <Link
        href={`/project/${project.slug}`}
        className="flex flex-col h-full p-6 md:p-7 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset rounded-xl"
      >
        {/* Status + date */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary">
            {statusLabel}
          </span>
          <span className="font-mono text-[11px] text-text-secondary">{project.dateRange}</span>
        </div>

        {/* Lead metric */}
        {leadMetric && (
          <div className="mb-5">
            <p className="font-display text-4xl text-accent tabular-nums leading-none">
              {leadMetric.value}
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">{leadMetric.label}</p>
          </div>
        )}

        {/* Title + description */}
        <h3 className="font-display text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">{project.description}</p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-bg-raised text-text-secondary"
              >
                {tech}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="px-2 py-0.5 text-[11px] font-mono rounded text-text-secondary">
                +{overflowCount}
              </span>
            )}
          </div>
          <span className="flex items-center gap-2 shrink-0 ml-3 text-text-secondary group-hover:text-accent transition-colors">
            {project.githubUrl && <Github size={15} aria-hidden="true" />}
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
