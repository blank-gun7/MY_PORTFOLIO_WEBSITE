'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TimelineNode({ entry, index }) {
  const isPresent = entry.status === 'present';
  const isFuture = entry.status === 'future';

  const dotClasses = isPresent
    ? 'bg-accent'
    : isFuture
      ? 'border border-dashed border-text-secondary bg-transparent'
      : 'bg-text-secondary/60';

  const content = (
    <div className={`pb-10 ${entry.link ? 'group cursor-pointer' : ''}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
        {entry.date}
        {isPresent && <span className="ml-2 text-accent tracking-normal normal-case">· now</span>}
        {isFuture && <span className="ml-2 tracking-normal normal-case">· planned</span>}
      </p>
      <h3
        className={`mt-1.5 text-base text-text-primary ${
          entry.link ? 'group-hover:text-accent transition-colors' : ''
        } ${isFuture ? 'italic text-text-secondary' : ''}`}
      >
        {entry.title}
      </h3>
      <p className="mt-1 text-sm text-text-secondary leading-relaxed max-w-[60ch]">
        {entry.description}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="relative pl-8"
    >
      {/* Dot on the line */}
      <span
        className={`absolute left-0 top-1 h-[11px] w-[11px] rounded-full ${dotClasses} ${
          isPresent ? 'ring-4 ring-accent/20' : ''
        }`}
        aria-hidden="true"
      />
      {entry.link ? <Link href={entry.link}>{content}</Link> : content}
    </motion.div>
  );
}
