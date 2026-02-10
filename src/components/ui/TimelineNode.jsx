'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Handshake,
  Code,
  Rocket,
  FlaskConical,
  Globe,
  GitBranch,
  FileText,
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Handshake,
  Code,
  Rocket,
  FlaskConical,
  Globe,
  GitBranch,
  FileText,
};

export default function TimelineNode({ entry, index, side }) {
  const Icon = iconMap[entry.icon];
  const isPast = entry.status === 'past';
  const isPresent = entry.status === 'present';
  const isFuture = entry.status === 'future';

  // Dot styling
  const dotClasses = isPresent
    ? 'bg-accent-green animate-pulse glow-green'
    : isFuture
      ? 'border-2 border-dashed border-text-secondary bg-transparent'
      : 'bg-text-secondary';

  // Card styling
  const cardClasses = isPresent
    ? 'border-accent-green/50 bg-accent-green/5'
    : isFuture
      ? 'border-dashed border-text-secondary/30 bg-transparent'
      : 'border-border bg-bg-secondary';

  const textOpacity = isFuture ? 'opacity-50' : '';
  const titleStyle = isFuture ? 'italic' : '';

  const content = (
    <div
      className={`rounded-lg border p-4 transition-all ${cardClasses} ${
        entry.link ? 'hover:border-accent-green/50 cursor-pointer' : ''
      }`}
    >
      {/* Date */}
      <span className="text-xs font-mono text-text-secondary">{entry.date}</span>

      {/* Title */}
      <h3 className={`text-sm font-semibold text-text-primary mt-1 ${titleStyle}`}>
        {entry.title}
        {isPresent && (
          <span className="ml-2 inline-flex items-center gap-1 text-xs font-mono text-accent-green">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            NOW
          </span>
        )}
      </h3>

      {/* Description */}
      <p className="text-xs text-text-secondary mt-1">{entry.description}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: isFuture ? 0.5 : 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative flex items-start gap-4 mb-8 ${textOpacity} ${
        side === 'left' ? 'md:flex-row-reverse md:text-right' : ''
      }`}
    >
      {/* Dot on the line */}
      <div
        className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${dotClasses}`}
      >
        {Icon && (
          <Icon
            size={14}
            className={
              isPresent ? 'text-bg-primary' : isFuture ? 'text-text-secondary' : 'text-bg-primary'
            }
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 min-w-0">
        {entry.link ? <Link href={entry.link}>{content}</Link> : content}
      </div>
    </motion.div>
  );
}
