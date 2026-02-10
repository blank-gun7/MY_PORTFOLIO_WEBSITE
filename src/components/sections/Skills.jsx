'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';
import SkillCategory from '@/components/ui/SkillCategory';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader command="$ skills --list --all" title="Skills" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="skills">
            {skills.map((skill) => (
              <SkillCategory
                key={skill.category}
                category={skill.category}
                command={skill.command}
                items={skill.items}
              />
            ))}
          </TerminalWindow>
        </ScrollReveal>
      </div>
    </section>
  );
}
