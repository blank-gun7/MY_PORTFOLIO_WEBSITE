export const siteConfig = {
  name: 'Rana Raunitraz Singh',
  title: 'ML Engineer & Full-Stack Developer',
  description: 'ML engineer building production LLM systems and financial AI platforms.',
  url: 'https://my-portfolio-website-green-eta.vercel.app',
  ogImage: '/images/og-image.png',

  // Hero copy — the editorial thesis
  hero: {
    eyebrow: 'Machine Learning · Financial AI · Full-Stack',
    headline: 'Production ML, built end to end',
    headlineAccent: '— research to revenue.',
    subline:
      'Founding developer at Zenalyst.ai. I take LLM systems from whiteboard to deployed product, and I stay for the part where it has to keep working.',
  },

  availability: {
    status: 'available',
    message: 'Open to opportunities',
  },

  // Shown in the "Proof of work" tile grid
  nowBuilding: {
    title: 'Zenalyst LLM Platform',
    detail:
      'Financial LLM fine-tuning, GraphRAG retrieval, and the eval harness that keeps it honest.',
  },

  stats: [
    { label: 'System uptime', value: '>99%' },
    { label: 'POC → MVP', value: '15 days' },
    { label: 'Team led', value: '20+' },
    { label: 'Papers reviewed', value: '20+' },
  ],

  sections: {
    hero: true,
    about: true,
    github: true,
    experience: true,
    projects: true,
    skills: true,
    research: true,
    timeline: true,
    resume: true,
    contact: true,
    blog: false,
  },
};
