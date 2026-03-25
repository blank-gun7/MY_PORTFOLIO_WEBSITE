'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Copy, Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
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
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeader command="$ ping rana" title="Contact" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h3 className="text-2xl font-sans font-semibold text-text-primary mb-3">
            Get in touch
          </h3>
          <p className="text-text-secondary mb-8">
            Always open to interesting conversations and opportunities.
          </p>

          {/* Email with copy */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg font-mono text-accent-green hover:underline"
            >
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="p-2 rounded-lg text-text-secondary hover:text-accent-green hover:bg-bg-secondary transition-colors"
              aria-label={copied ? 'Copied' : 'Copy email address'}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
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
