'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import { socials } from '@/data/socials';

const iconMap = { Github, Linkedin, Mail };

const displayUrls = {
  github: 'github.com/blank-gun7',
  linkedin: 'linkedin.com/in/rrrs-024a94250',
  email: 'ranacv2109@gmail.com',
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ ping rana" title="Contact" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="contact">
            <div className="space-y-1 mb-6">
              <p className="text-accent-green text-xs">$ ping rana</p>
              <p className="text-text-secondary text-sm">
                PING rana — 3 endpoints found. All reachable.
              </p>
            </div>

            <div className="space-y-4">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target={social.platform === 'email' ? undefined : '_blank'}
                    rel={social.platform === 'email' ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-3 text-text-secondary hover:text-accent-green transition-colors group"
                  >
                    {Icon && <Icon size={18} />}
                    <span className="text-sm font-mono">{displayUrls[social.platform]}</span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-accent-green">
                      &#8599;
                    </span>
                  </a>
                );
              })}
            </div>
          </TerminalWindow>
        </ScrollReveal>
      </div>
    </section>
  );
}
