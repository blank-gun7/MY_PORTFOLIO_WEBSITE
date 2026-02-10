import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '@/data/socials';

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">&copy; 2026 Rana Raunitraz Singh</p>
        <div className="flex items-center gap-4">
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
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
