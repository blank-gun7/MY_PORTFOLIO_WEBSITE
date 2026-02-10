'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import TypeWriter from '@/components/ui/TypeWriter';
import { siteConfig } from '@/data/site-config';
import { socials } from '@/data/socials';

const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), {
  ssr: false,
});

const iconMap = { Github, Linkedin, Mail };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        {/* Name */}
        <motion.h1
          variants={item}
          className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Title */}
        <motion.p variants={item} className="text-lg text-text-secondary mb-6">
          {siteConfig.title}
        </motion.p>

        {/* TypeWriter */}
        <motion.div variants={item} className="mb-8 text-base sm:text-lg">
          <TypeWriter phrases={siteConfig.typewriterPhrases} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            View Projects
            <ArrowDown size={16} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary rounded-lg hover:border-accent-green hover:text-accent-green transition-colors focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            Download Resume
            <Download size={16} />
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div variants={item} className="flex items-center justify-center gap-5">
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.platform}
                href={social.url}
                target={social.platform === 'email' ? undefined : '_blank'}
                rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                className="text-text-secondary hover:text-accent-green transition-colors"
                aria-label={social.platform}
              >
                {Icon && <Icon size={20} />}
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
