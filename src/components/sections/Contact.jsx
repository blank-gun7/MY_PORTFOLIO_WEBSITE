'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Copy, Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { socials } from '@/data/socials';

const iconMap = { Github, Linkedin, Mail };
const EMAIL = 'ranacv2109@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-6">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary text-balance max-w-[20ch] mb-6">
            Building something that has to <em className="text-accent">work in production?</em>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-[48ch]">
            Always open to interesting conversations and opportunities.
          </p>

          {/* Email with copy */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-lg md:text-xl text-text-primary border-b border-accent pb-0.5 hover:text-accent transition-colors"
            >
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={copied ? 'Copied' : 'Copy email address'}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
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
                  {Icon && <Icon size={22} />}
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
