import { siteConfig } from '@/data/site-config';
import { getContributionData } from '@/lib/githubContributions';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import GitHub from '@/components/sections/GitHub';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Research from '@/components/sections/Research';
import Timeline from '@/components/sections/Timeline';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';

// Re-render at most hourly so the GitHub contribution graph stays current
// without a redeploy. Requires a server/ISR-capable build (no `output: 'export'`).
export const revalidate = 3600;

export default async function Home() {
  const { sections } = siteConfig;
  const contributions = sections.github ? await getContributionData('blank-gun7') : null;

  return (
    <>
      {sections.hero && <Hero />}
      {sections.about && <About />}
      {sections.github && <GitHub contributions={contributions} />}
      {sections.experience && <Experience />}
      {sections.projects && <Projects />}
      {sections.skills && <Skills />}
      {sections.research && <Research />}
      {sections.timeline && <Timeline />}
      {sections.resume && <Resume />}
      {sections.contact && <Contact />}
    </>
  );
}
