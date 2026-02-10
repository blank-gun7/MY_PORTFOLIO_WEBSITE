# PRD — Portfolio Website
# Feed this to Claude Code as project context

## What We're Building

A personal portfolio website for **Rana Raunitraz Singh** — an AI/ML engineer and full-stack developer. Dark, terminal-themed, statically generated, deployed on Vercel for free.

**Stack:** Next.js 14 (App Router) + JavaScript + Tailwind CSS + Framer Motion + Vercel  
**Repo:** https://github.com/blank-gun7/portfolio

---

## Design System

### Theme: Dark Mode Primary (Terminal-Inspired)

**Colors (define in tailwind.config.js `theme.extend.colors`):**
```
bg-primary:      dark: '#0a0a0f'    light: '#fafafa'
bg-secondary:    dark: '#12121a'    light: '#f0f0f5'
bg-terminal:     dark: '#0d1117'    light: '#f6f8fa'
text-primary:    dark: '#e4e4e7'    light: '#18181b'
text-secondary:  dark: '#a1a1aa'    light: '#71717a'
accent-green:    '#4ade80'
accent-blue:     '#60a5fa'
accent-purple:   '#a78bfa'
border:          dark: '#27272a'    light: '#e4e4e7'
```

**Fonts (load via next/font/google):**
- Headings + terminal: `JetBrains Mono` → CSS variable `--font-mono`
- Body: `Inter` → CSS variable `--font-sans`

**Dark mode:** Controlled by `class="dark"` on `<html>`. Tailwind `darkMode: 'class'`.

### Terminal Aesthetic
- Section headers styled as terminal commands: `$ cat about.md`, `$ ls projects/`
- Terminal window chrome (red/yellow/green dots, title bar) on key content blocks
- Typing animation on hero tagline only
- Blinking cursor: CSS animation
- NOT overdone — terminal headers + terminal windows on select sections, rest is clean

### Responsive Breakpoints
- Mobile: < 640px (single column, hamburger nav)
- Tablet: 640-1024px (2-col grids)
- Desktop: > 1024px (full layout, max-w-6xl container)

---

## Site Structure

### Landing Page (app/page.js) — Sections in Order:

```
1. #hero        — Name, typed tagline, CTA buttons, social icons, particle background
2. #about       — Terminal window with bio, stats row (20+ team, 7-day POC, >99% uptime, 20+ papers)
3. #experience  — Professional work experience cards (Zenalyst, IEEE, Schiffer)
4. #projects    — Filterable project card grid (All | ML/AI | Data | CV | Finance)
5. #skills      — Terminal-style skill listing by category
6. #research    — IEEE SSL work, papers reviewed
7. #timeline    — Full journey: education → projects → experiences → present → future
8. #resume      — PDF embed (desktop) + download button
9. #contact     — Social links, email
```

### Project Detail Pages (app/project/[slug]/page.js):
Dynamic route — one page component generates all project pages from data.

### 404 Page (app/not-found.js):
Terminal-themed "command not found" page.

---

## Data Schemas

All content in `/data/` — components import, never hardcode content.

### data/site-config.js
```javascript
export const siteConfig = {
  name: 'Rana Raunitraz Singh',
  title: 'ML Engineer & Full-Stack Developer',
  description: 'AI/ML engineer building scalable LLM systems and financial AI platforms.',
  url: 'https://your-site.vercel.app',
  ogImage: '/images/og-image.png',

  typewriterPhrases: [
    '> building LLM systems that ship',
    '> ML engineer × full-stack developer',
    '> making financial AI reliable',
  ],

  stats: [
    { label: 'Team Size', value: '20+' },
    { label: 'POC Delivery', value: '7 days' },
    { label: 'System Uptime', value: '>99%' },
    { label: 'Papers Reviewed', value: '20+' },
  ],

  sections: {
    hero: true,
    about: true,
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
```

### data/experiences.js
```javascript
export const experiences = [
  {
    id: 'zenalyst',
    role: 'Founding Developer',
    company: 'Zenalyst.ai',
    location: 'Bangalore',
    dateRange: 'May 2025 – Present',
    type: 'current', // 'current' | 'past'
    description: 'Led a 20-member tech team building an LLM analytics platform for financial insights.',
    highlights: [
      'Delivered POC in 7 days and MVP in 15 days, accelerating GTM by ~3×',
      'Architected scalable LLM platform on AWS (EC2/ECS/EKS) with >99% uptime',
      'Built LLM caching layer, reducing monthly inference cost by 10%',
      'Engineered External KnowledgeBase system, increasing retrieval accuracy by ~25%',
      'Fine-tuned Financial LLMs (LoRA/QLoRA + SFT) for reasoning and SQL execution',
      'Integrated GraphRAG and structured retrieval pipelines for multi-hop reasoning',
      'Conducted company-wide hackathon resulting in 6+ strong candidate leads',
    ],
    techStack: ['Python', 'FastAPI', 'AWS', 'Docker', 'LLMs', 'RAG', 'GraphRAG', 'ChromaDB'],
  },
  {
    id: 'ieee',
    role: 'Summer Research Intern',
    company: 'IEEE SPS, Gujarat Section',
    location: 'Remote',
    dateRange: 'May 2025 – Present',
    type: 'current',
    description: 'Research on Self-Supervised Learning for medical imaging applications.',
    highlights: [
      'Identified Barlow Twins 18-25% superior performance in low-data regimes vs SimCLR/BYOL',
      'Established baseline Faster R-CNN on VinDr-CXR (18K images) achieving 0.32 mAP',
      'Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays',
    ],
    techStack: ['PyTorch', 'SSL', 'Barlow Twins', 'Faster R-CNN', 'Medical Imaging'],
  },
  {
    id: 'schiffer',
    role: 'Data Analyst Intern',
    company: 'Schiffer and Menezes',
    location: 'Goa',
    dateRange: 'May 2024 – July 2024',
    type: 'past',
    description: 'Predictive maintenance and equipment log analysis for manufacturing.',
    highlights: [
      'Increased machine uptime by 8% with predictive maintenance model using XGBoost',
      'Processed and analyzed 30,000+ equipment logs using Python (Pandas, NumPy, Matplotlib)',
    ],
    techStack: ['Python', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib'],
  },
];
```

### data/projects.js
```javascript
export const projects = [
  {
    slug: 'zenalyst-llm-platform',
    title: 'Zenalyst LLM Analytics Platform',
    description: 'Scalable LLM analytics platform serving financial insights across microservices with >99% uptime.',
    longDescription: 'Architected and deployed a scalable LLM analytics platform on AWS (EC2/ECS/EKS) serving financial insights across microservices. Built and integrated an LLM caching layer reducing monthly inference cost by 10%. Engineered the External KnowledgeBase system that scraped, cleaned, and structured unbounded external sources into RAG-ready datasets, increasing retrieval accuracy by ~25%. Integrated GraphRAG, knowledge-graph relationships, and structured retrieval pipelines enabling multi-hop reasoning over financial documents.',
    techStack: ['Python', 'FastAPI', 'AWS', 'Docker', 'LLMs', 'RAG', 'GraphRAG', 'ChromaDB', 'PostgreSQL', 'MongoDB'],
    category: 'ml-ai',
    status: 'live',
    featured: true,
    githubUrl: null,
    liveUrl: null,
    huggingfaceUrl: null,
    metrics: [
      { label: 'Team Size', value: '20 members' },
      { label: 'Uptime', value: '>99%' },
      { label: 'Cost Reduction', value: '10%' },
      { label: 'Retrieval Accuracy', value: '+25%' },
    ],
    images: [],
    dateRange: 'May 2025 – Present',
    order: 1,
  },
  {
    slug: 'factor-investing-analysis',
    title: 'Momentum vs Value: Factor Investing for Indian Markets',
    description: 'Statistical analysis comparing momentum vs value strategies across 459K+ NSE stock observations.',
    longDescription: 'Analyzed 459,582 stock price observations and 5,910 fundamental metrics across NSE stocks to compare momentum vs value strategies. Demonstrated that momentum outperforms value by 26.46% with p = 0.0001. Engineered complete data pipelines for cleaning, feature generation, and portfolio construction. Validated findings using two independent methodologies (122-stock and 2,217-stock datasets).',
    techStack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Jupyter', 'Git'],
    category: 'finance',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/blank-gun7/factor-investing',
    liveUrl: null,
    huggingfaceUrl: null,
    metrics: [
      { label: 'Data Points', value: '459,582' },
      { label: 'Outperformance', value: '26.46%' },
      { label: 'p-value', value: '0.0001' },
      { label: 'Market Cap', value: '₹4+ Trillion' },
    ],
    images: [],
    dateRange: '2024',
    order: 2,
  },
  {
    slug: 'banking-score-prediction',
    title: 'Banking Score from Imbalanced Dataset',
    description: 'XGBoost classifier achieving 99% accuracy on 1,200-column banking dataset with SMOTE rebalancing.',
    longDescription: 'Performed data cleaning and imputation using KNN with GPU acceleration. Applied Random Forest Feature Selection and SMOTE to address feature relevance and class imbalance. Trained XGBoost classifier on dataset with 1,200 columns and 97,000 rows.',
    techStack: ['Python', 'XGBoost', 'Scikit-Learn', 'SMOTE', 'KNN', 'GPU'],
    category: 'ml-ai',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/blank-gun7/banking-score',
    liveUrl: null,
    huggingfaceUrl: null,
    metrics: [
      { label: 'Accuracy', value: '99%' },
      { label: 'Features', value: '1,200' },
      { label: 'Samples', value: '97,000' },
    ],
    images: [],
    dateRange: 'Feb 2025 – Mar 2025',
    order: 3,
  },
  {
    slug: 'football-cv-analysis',
    title: 'Football Analysis — Computer Vision',
    description: 'Real-time player detection and tracking using YOLO with ball possession and motion analysis.',
    longDescription: 'Developed a robust Computer Vision pipeline to detect and track players, referees, and football in real-time video using YOLO. Quantified team performance by calculating ball possession percentage and identifying key playmakers using OpenCV. Employed K-means clustering for pixel-wise segmentation and optical flow for motion analysis.',
    techStack: ['Python', 'YOLO', 'OpenCV', 'K-Means', 'Optical Flow'],
    category: 'cv',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/blank-gun7/football-analysis',
    liveUrl: null,
    huggingfaceUrl: null,
    metrics: [],
    images: [],
    dateRange: '2024',
    order: 4,
  },
  {
    slug: 'ieee-ssl-research',
    title: 'Self-Supervised Learning for Medical Imaging',
    description: 'Barlow Twins pretraining on 112K+ chest X-rays achieving 15-25% improvement over random init.',
    longDescription: 'Conducted literature review of 8-10 research papers on Self-Supervised Learning. Established baseline Faster R-CNN model on VinDr-CXR dataset achieving 0.32 mAP. Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays using domain-relevant augmentations.',
    techStack: ['PyTorch', 'Barlow Twins', 'Faster R-CNN', 'CheXpert', 'VinDr-CXR', 'SSL'],
    category: 'ml-ai',
    status: 'in-progress',
    featured: true,
    githubUrl: null,
    liveUrl: null,
    huggingfaceUrl: null,
    metrics: [
      { label: 'mAP', value: '0.32' },
      { label: 'Training Images', value: '112,120' },
      { label: 'Improvement', value: '15-25%' },
    ],
    images: [],
    dateRange: 'May 2025 – Present',
    order: 5,
  },
];
```

### data/skills.js
```javascript
export const skills = [
  {
    category: 'Programming',
    command: '$ skills --category programming',
    items: ['Python', 'C++', 'JavaScript (Node.js)', 'PHP', 'OOP'],
  },
  {
    category: 'ML & AI',
    command: '$ skills --category ml-ai',
    items: ['Deep Learning', 'NLP', 'LLMs', 'RAG/GraphRAG', 'Financial QA', 'SSL', 'CNNs', 'XGBoost', 'Random Forest', 'K-Means', 'KNN Imputation', 'SMOTE'],
  },
  {
    category: 'Libraries & Frameworks',
    command: '$ skills --category frameworks',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face Transformers', 'spaCy', 'OpenCV', 'YOLO', 'Pandas', 'NumPy'],
  },
  {
    category: 'Backend',
    command: '$ skills --category backend',
    items: ['FastAPI', 'Flask', 'Django', 'Node.js', 'REST APIs', 'JWT Auth'],
  },
  {
    category: 'Web',
    command: '$ skills --category web',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
  },
  {
    category: 'Data & Databases',
    command: '$ skills --category data',
    items: ['SQL', 'MySQL', 'MongoDB', 'Data Preprocessing', 'Data Cleaning', 'EDA', 'Feature Engineering'],
  },
  {
    category: 'Cloud & DevOps',
    command: '$ skills --category devops',
    items: ['Docker', 'GitHub Actions (CI/CD)', 'AWS (EC2/ECS/EKS)', 'Azure', 'Linux', 'Ubuntu'],
  },
];
```

### data/timeline.js
```javascript
export const timeline = [
  // PAST
  {
    id: 'bits-pilani',
    date: '2022',
    title: 'BITS Pilani, Hyderabad Campus',
    description: 'Started B.E. at Birla Institute of Technology and Science',
    type: 'education',
    status: 'past',
    icon: 'GraduationCap',
    link: null,
  },
  {
    id: 'schiffer-intern',
    date: 'May 2024',
    title: 'Data Analyst Intern @ Schiffer and Menezes',
    description: 'Built predictive maintenance model, processed 30K+ equipment logs',
    type: 'experience',
    status: 'past',
    icon: 'Briefcase',
    link: null,
  },
  {
    id: 'sarc',
    date: 'Jun 2024',
    title: 'Events Head — SARC',
    description: 'Managed 20+ events including alumni talks',
    type: 'leadership',
    status: 'past',
    icon: 'Users',
    link: null,
  },
  {
    id: 'football-cv',
    date: '2024',
    title: 'Football Analysis — Computer Vision',
    description: 'Real-time player tracking with YOLO, ball possession analysis',
    type: 'project',
    status: 'past',
    icon: 'Eye',
    link: '/project/football-cv-analysis',
  },
  {
    id: 'factor-investing',
    date: '2024',
    title: 'Factor Investing Analysis',
    description: 'Momentum vs Value across 459K+ NSE observations, 26.46% outperformance',
    type: 'project',
    status: 'past',
    icon: 'TrendingUp',
    link: '/project/factor-investing-analysis',
  },
  {
    id: 'safl',
    date: 'Aug 2024',
    title: 'Sponsorship Head — SaFL',
    description: 'Secured sponsorship deals worth Rs. 2.5 Lakhs',
    type: 'leadership',
    status: 'past',
    icon: 'Handshake',
    link: null,
  },
  {
    id: 'banking-score',
    date: 'Feb 2025',
    title: 'Banking Score Prediction',
    description: 'XGBoost on 1,200 columns, 99% accuracy with SMOTE rebalancing',
    type: 'project',
    status: 'past',
    icon: 'Code',
    link: '/project/banking-score-prediction',
  },
  // PRESENT
  {
    id: 'zenalyst',
    date: 'May 2025 – Present',
    title: 'Founding Developer @ Zenalyst.ai',
    description: 'Leading 20-member team building LLM analytics platform on AWS. Fine-tuning financial LLMs. Engineering RAG pipelines. Shipping fast.',
    type: 'experience',
    status: 'present',
    icon: 'Rocket',
    link: '/project/zenalyst-llm-platform',
  },
  {
    id: 'ieee-research',
    date: 'May 2025 – Present',
    title: 'Research Intern @ IEEE SPS',
    description: 'Self-Supervised Learning for medical imaging. Barlow Twins pretraining on 112K+ chest X-rays.',
    type: 'experience',
    status: 'present',
    icon: 'FlaskConical',
    link: '/project/ieee-ssl-research',
  },
  {
    id: 'portfolio',
    date: 'Feb 2026',
    title: 'Building This Portfolio',
    description: 'Next.js + Tailwind, terminal-inspired, open source',
    type: 'project',
    status: 'present',
    icon: 'Globe',
    link: null,
  },
  // FUTURE
  {
    id: 'future-opensource',
    date: '2026',
    title: 'Open Source ML Tools',
    description: 'Publishing open-source ML tooling and frameworks',
    type: 'goal',
    status: 'future',
    icon: 'GitBranch',
    link: null,
  },
  {
    id: 'future-research',
    date: '2026',
    title: 'Published Research',
    description: 'Targeting ML conference paper submission',
    type: 'goal',
    status: 'future',
    icon: 'FileText',
    link: null,
  },
];
```

### data/socials.js
```javascript
export const socials = [
  { platform: 'github', url: 'https://github.com/blank-gun7', icon: 'Github' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/rrrs-024a94250/', icon: 'Linkedin' },
  { platform: 'email', url: 'mailto:ranacv2109@gmail.com', icon: 'Mail' },
];
```

---

## Component Specifications

### Navbar (components/layout/Navbar.jsx)
- Client component (`'use client'`)
- Fixed top, transparent at top → blurred bg on scroll
- Logo: `rana@dev:~$` in green monospace
- Desktop: Inline nav links (About, Experience, Projects, Skills, Research, Timeline, Resume, Contact)
- Mobile: Hamburger → full-screen overlay menu
- Scroll spy: IntersectionObserver highlights active section
- Includes ThemeToggle

### ThemeToggle (components/layout/ThemeToggle.jsx)
- Client component
- Sun icon (when dark, click → light), Moon icon (when light, click → dark)
- Reads/writes `localStorage('theme')`
- Toggles `class="dark"` on `<html>`

### Footer (components/layout/Footer.jsx)
- Server component
- `© 2026 Rana Raunitraz Singh` + social icons

### Hero (components/sections/Hero.jsx)
- Client component
- Full viewport height, centered content
- ParticleBackground behind (lazy loaded, hidden on mobile)
- Name in large monospace bold
- TypeWriter cycling through `siteConfig.typewriterPhrases`
- CTA: `View Projects` (scrolls to #projects) + `Download Resume` (downloads PDF)
- Social icons row

### About (components/sections/About.jsx)
- Client component (ScrollReveal wrapper)
- SectionHeader: `$ cat about.md`
- TerminalWindow with 3-4 sentence bio
- Stats row: 4 stat cards from `siteConfig.stats`

### Experience (components/sections/Experience.jsx)
- Client component (ScrollReveal + hover)
- SectionHeader: `$ cat experience.log`
- Stacked ExperienceCards from `data/experiences.js`
- Current roles: green left border, pulsing dot, subtle glow
- Past roles: normal border, no effects
- Each card: role, company, date, description, highlight bullets, tech tags

### Projects (components/sections/Projects.jsx)
- Client component (filter state + hover)
- SectionHeader: `$ ls projects/`
- Filter tabs: All | ML/AI | Data | CV | Finance
- Grid: 1 col mobile, 2 col tablet, 3 col desktop
- ProjectCards from `data/projects.js` (featured only, sorted by order)
- Cards link to `/project/[slug]`

### ProjectCard (components/ui/ProjectCard.jsx)
- Client component (hover animation)
- Status badge (🟢 Live, 🔵 In Progress, ⚪ Completed)
- Title, description (2-line clamp), tech tags (max 5 + overflow count)
- Footer: GitHub icon, external link icon, `Details →`
- Hover: lift + green border glow

### Project Detail Page (app/project/[slug]/page.js)
- Server component (with client children for embeds)
- `generateStaticParams()` — returns all slugs from projects.js
- `generateMetadata()` — dynamic title/description per project
- Back button, title, status, date, tech pills
- Long description, metrics grid, HuggingFace embed (if URL exists), images, GitHub link
- Related projects at bottom (same category)

### Skills (components/sections/Skills.jsx)
- Client component (ScrollReveal)
- SectionHeader: `$ skills --list --all`
- TerminalWindow containing SkillCategory components
- Each category: green command text + items separated by ` · `

### Research (components/sections/Research.jsx)
- Client component (ScrollReveal)
- SectionHeader: `$ cat research.md`
- IEEE work in TerminalWindow with key findings + metrics
- Papers reviewed count

### Timeline (components/sections/Timeline.jsx)
- Client component (scroll-triggered staggered reveal)
- SectionHeader: `$ git log --oneline --graph`
- Vertical line: left on mobile, center on desktop
- TimelineNodes alternate left/right on desktop
- Visual styling per status:
  - past: muted, solid dot
  - present: full color, pulsing green dot + glow, `● NOW` badge
  - future: dimmed (opacity 0.5), dashed border, italic text
- Project nodes link to their detail pages

### Resume (components/sections/Resume.jsx)
- Client component (ScrollReveal)
- SectionHeader: `$ open resume.pdf`
- PDF embed (desktop only, hidden on mobile)
- Download button with icon
- "Last updated" date

### Contact (components/sections/Contact.jsx)
- Client component (ScrollReveal)
- SectionHeader: `$ ping rana`
- TerminalWindow with social links
- Each link: icon + URL text, hover → green

### Shared UI Components
- **SectionHeader**: Terminal command (`$ ...`) in green mono + hidden `<h2>` for SEO/a11y
- **TerminalWindow**: Red/yellow/green dots title bar + dark content area
- **TypeWriter**: Typing/deleting animation loop with blinking cursor. Respects prefers-reduced-motion.
- **ScrollReveal**: Framer Motion wrapper — fade-in-up on scroll into view, `viewport.once: true`
- **ParticleBackground**: tsparticles neural network effect, dynamic import with `ssr: false`, disabled on mobile

---

## Configuration Details

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
```

### Theme Flash Prevention (in layout.js `<head>`)
Inline script that runs before React:
```javascript
(function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
})();
```

### SEO
- Root layout: default metadata (title, description, OG tags)
- Project pages: `generateMetadata()` for per-page title/description
- JSON-LD Person schema in layout
- `public/robots.txt` and `public/sitemap.xml`

### Analytics
```javascript
// app/layout.js
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> before closing </body>
```

---

## Visual Reference — Page Layout

```
┌─────────────────────────────────────────────────┐
│ rana@dev:~$     About Experience Projects ... ☀️ │ ← Navbar (fixed)
├─────────────────────────────────────────────────┤
│                                                 │
│         RANA RAUNITRAZ SINGH                    │ ← Hero
│         > building LLM systems that ship_       │    (particles behind)
│         [View Projects] [Download Resume]       │
│         🔗 🔗 📧                                │
│                                                 │
├─────────────────────────────────────────────────┤
│ $ cat about.md                                  │ ← About
│ ┌─────────────────────────────────────────┐     │
│ │ ● ● ● about.md                         │     │    (terminal window)
│ │ Bio text here...                        │     │
│ └─────────────────────────────────────────┘     │
│    20+        7 days      >99%       20+        │    (stats row)
│   Team Size   POC        Uptime     Papers      │
├─────────────────────────────────────────────────┤
│ $ cat experience.log                            │ ← Experience
│                                                 │
│ ┌─ Founding Developer — Zenalyst.ai ── NOW ─┐  │    (green border = current)
│ │ May 2025 – Present · Bangalore             │  │
│ │ ▹ Delivered POC in 7 days...               │  │
│ │ ▹ Architected LLM platform on AWS...      │  │
│ │ [Python] [FastAPI] [AWS] [LLMs]            │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ ┌─ Research Intern — IEEE SPS ──── NOW ──────┐  │
│ │ ...                                        │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ ┌─ Data Analyst — Schiffer & Menezes ────────┐  │    (normal border = past)
│ │ ...                                        │  │
│ └────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────┤
│ $ ls projects/                                  │ ← Projects
│ [All] [ML/AI] [Data] [CV] [Finance]            │    (filter tabs)
│                                                 │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐         │    (3-col grid)
│ │ 🟢 Live  │ │ ⚪ Done  │ │ ⚪ Done  │         │
│ │ Zenalyst │ │ Factor   │ │ Banking  │         │
│ │ LLM Plat │ │ Invest.  │ │ Score    │         │
│ │ [tags]   │ │ [tags]   │ │ [tags]   │         │
│ │ Detail → │ │ Detail → │ │ Detail → │         │
│ └──────────┘ └──────────┘ └──────────┘         │
├─────────────────────────────────────────────────┤
│ $ skills --list --all                           │ ← Skills
│ ┌─────────────────────────────────────────┐     │
│ │ ● ● ● skills                            │     │
│ │ $ skills --category ml-ai               │     │
│ │ Deep Learning · NLP · LLMs · RAG · ...  │     │
│ │                                         │     │
│ │ $ skills --category backend             │     │
│ │ FastAPI · Flask · Django · Node.js · ... │     │
│ └─────────────────────────────────────────┘     │
├─────────────────────────────────────────────────┤
│ $ cat research.md                               │ ← Research
│ IEEE SPS work + papers reviewed                 │
├─────────────────────────────────────────────────┤
│ $ git log --oneline --graph                     │ ← Timeline
│                                                 │
│    ○ 2022 — BITS Pilani                         │
│    │                                            │
│    ○ May 2024 — Schiffer Intern                 │
│    │                                            │
│    ○ 2024 — Football CV Project                 │
│    │                                            │
│    ◉ May 2025 — Zenalyst (NOW) ← glowing       │
│    │                                            │
│    ◉ May 2025 — IEEE Research (NOW)             │
│    │                                            │
│    ◌ 2026 — Open Source ML Tools  ← dimmed      │
│                                                 │
├─────────────────────────────────────────────────┤
│ $ open resume.pdf                               │ ← Resume
│ [PDF Preview]                                   │
│ [Download Resume (PDF)]                         │
├─────────────────────────────────────────────────┤
│ $ ping rana                                     │ ← Contact
│ ┌─────────────────────────────────────────┐     │
│ │ 🔗 github.com/blank-gun7               │     │
│ │ 🔗 linkedin.com/in/rrrs-024a94250/     │     │
│ │ 📧 ranacv2109@gmail.com                │     │
│ └─────────────────────────────────────────┘     │
├─────────────────────────────────────────────────┤
│ © 2026 Rana Raunitraz Singh    🔗 🔗 📧        │ ← Footer
└─────────────────────────────────────────────────┘
```
