import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { socials } from '@/data/socials';

const iconMap = { Github, Linkedin, Mail };

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
        {/* Eyebrow */}
        <p
          className="hero-reveal font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-accent mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          {hero.eyebrow}
        </p>

        {/* Headline */}
        <h1
          className="hero-reveal font-display text-5xl sm:text-6xl md:text-7xl text-text-primary leading-[1.05] tracking-tight max-w-[18ch] text-balance mb-8"
          style={{ animationDelay: '0.2s' }}
        >
          {hero.headline} <em className="text-accent">{hero.headlineAccent}</em>
        </h1>

        {/* Subline */}
        <p
          className="hero-reveal text-base sm:text-lg text-text-secondary leading-relaxed max-w-[54ch] mb-10"
          style={{ animationDelay: '0.35s' }}
        >
          {hero.subline}
        </p>

        {/* CTAs + socials */}
        <div
          className="hero-reveal flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-contrast font-medium rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
          >
            See the work
            <ArrowDown size={16} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 text-text-primary border-b border-accent pb-0.5 hover:text-accent transition-colors"
          >
            Resume
            <Download size={15} />
          </a>
          <span className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.platform === 'email' ? undefined : '_blank'}
                  rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                  className="text-text-secondary hover:text-accent transition-colors"
                  aria-label={social.platform}
                >
                  {Icon && <Icon size={19} />}
                </a>
              );
            })}
          </span>
        </div>
      </div>
    </section>
  );
}
