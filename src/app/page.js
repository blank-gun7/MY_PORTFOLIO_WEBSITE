import { siteConfig } from '@/data/site-config';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Research from '@/components/sections/Research';
import Timeline from '@/components/sections/Timeline';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const { sections } = siteConfig;

  return (
    <>
      {sections.hero && <Hero />}
      {sections.about && <About />}
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
