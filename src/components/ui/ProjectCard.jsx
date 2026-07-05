'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const statusConfig = {
  live: { label: 'Live', color: 'bg-accent-green/15 text-accent-green' },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-accent-blue/15 text-accent-blue',
  },
  completed: {
    label: 'Completed',
    color: 'bg-text-secondary/15 text-text-secondary',
  },
};

const gradients = [
  'from-accent-green/20 to-accent-blue/20',
  'from-accent-purple/20 to-accent-green/20',
  'from-accent-blue/20 to-accent-purple/20',
  'from-accent-green/15 to-accent-purple/15',
  'from-accent-blue/15 to-accent-green/15',
];

function getInitials(title) {
  return title
    .split(/[\s—-]+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function ProjectCard({ project }) {
  const status = statusConfig[project.status] || statusConfig.completed;
  const maxTags = 5;
  const visibleTags = project.techStack.slice(0, maxTags);
  const overflowCount = project.techStack.length - maxTags;
  const gradient = gradients[project.order % gradients.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="rounded-lg border border-border bg-bg-secondary overflow-hidden hover:border-accent-green/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.1)] transition-colors"
    >
      <Link
        href={`/project/${project.slug}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-inset rounded-lg"
      >
        {/* Thumbnail / Gradient Placeholder */}
        <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-3xl font-bold text-text-primary/20">
              {getInitials(project.title)}
            </span>
          )}
          {/* Status Badge — overlaid on thumbnail */}
          <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-mono rounded ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h3>

          {/* Description */}
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">{project.description}</p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {visibleTags.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono rounded bg-accent-purple/15 text-accent-purple"
              >
                {tech}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-bg-terminal text-text-secondary">
                +{overflowCount}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              {project.githubUrl && <Github size={16} className="text-text-secondary" />}
              {project.liveUrl && <ExternalLink size={16} className="text-text-secondary" />}
            </div>
            <span className="text-xs text-accent-green flex items-center gap-1">
              Details <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
