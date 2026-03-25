'use client';

import { useState } from 'react';
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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  const [imgError, setImgError] = useState(false);

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
        className="relative z-10 px-4 max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
      >
        {/* Photo */}
        <motion.div variants={item} className="shrink-0">
          {!imgError ? (
            <img
              src="/images/profile.jpg"
              alt={siteConfig.name}
              width={160}
              height={160}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-border hover:border-accent-green/50 transition-colors"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center">
              <span className="font-mono text-2xl md:text-3xl text-accent-green font-bold">
                RR
              </span>
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="text-center md:text-left">
          {/* Name */}
          <motion.h1
            variants={item}
            className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-2"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Title */}
          <motion.p variants={item} className="text-lg text-text-secondary mb-3">
            {siteConfig.title}
          </motion.p>

          {/* Bio line */}
          <motion.p variants={item} className="text-text-secondary mb-4 max-w-lg">
            {siteConfig.description}
          </motion.p>

          {/* TypeWriter — dev personality accent */}
          <motion.div variants={item} className="mb-5 text-sm font-mono">
            <TypeWriter phrases={siteConfig.typewriterPhrases} />
          </motion.div>

          {/* Availability */}
          {siteConfig.availability && (
            <motion.div variants={item} className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green" />
              </span>
              <span className="text-sm text-text-secondary">
                {siteConfig.availability.message}
              </span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 mb-6 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-green text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              View Work
              <ArrowDown size={16} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary rounded-lg hover:border-accent-green hover:text-accent-green transition-colors focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              Resume
              <Download size={16} />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={item} className="flex items-center gap-5 justify-center md:justify-start">
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
        </div>
      </motion.div>
    </section>
  );
}
