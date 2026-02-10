# Low-Level Design (LLD)
# Portfolio Website — Rana Raunitraz Singh

**Version:** 1.0  
**Date:** February 10, 2026  
**Status:** Draft — Awaiting Sign-off  
**Depends on:** PRD v1.0, Tech Stack v1.0, HLD v1.0

---

## 0. HLD Updates (Before LLD)

Two changes from HLD v1.0 based on feedback:

### 0.1 New Section: Experience

**Added between About and Projects.** Dedicated section for professional work experience (internships, roles). This is NOT the same as Projects — Experience shows roles, responsibilities, and impact at companies. Projects shows independent/personal builds.

**Updated section order on landing page:**
```
#hero → #about → #experience (NEW) → #projects → #skills → #research → #timeline (REWORKED) → #resume → #contact
```

### 0.2 Reworked: Timeline

Previously: Career roadmap (roles only).  
Now: **Full journey view** — past projects, milestones, education, and experiences woven together chronologically. Ends with "Present" node showing current activities (Zenalyst, IEEE, what you're building now).

```
Timeline flow:
  BITS Pilani (education)
    → Schiffer & Menezes internship
      → Banking Score project
        → Factor Investing project
          → Football CV project
            → SARC Events Head
              → SaFL Sponsorship Head
                → Zenalyst (Founding Dev) ← PRESENT (glowing)
                  → IEEE SSL Research ← PRESENT (glowing)
                    → Future plans (dimmed, aspirational)
```

### 0.3 Updated Site Map

```
/ (Landing Page)
├── #hero          — Name, tagline, CTAs, socials
├── #about         — Brief bio, current focus, stats
├── #experience    — Work experience cards (NEW)
├── #projects      — Project grid with filters
│   └── /project/[slug]  — Project detail pages
├── #skills        — Terminal-style skill listing
├── #research      — IEEE work, papers
├── #timeline      — Full journey (REWORKED)
├── #resume        — PDF preview + download
└── #contact       — Links to reach out
```

### 0.4 Updated Navigation

```
Navbar links:
[ About | Experience | Projects | Skills | Research | Timeline | Resume | Contact | ☀/🌙 ]
```

---

## 1. File-by-File Specification

This section defines EVERY file in the project — what it contains, what it exports, and how it connects to other files. This is your implementation blueprint.

---

### 1.1 Root Configuration Files

#### `next.config.js`
```
Purpose: Next.js framework configuration
Exports: nextConfig object

Settings:
  output: 'export'         → Generates static HTML (no server needed)
  images.unoptimized: true  → Required for static export (no server to optimize)
  trailingSlash: false      → Clean URLs (/project/slug not /project/slug/)
```

**Why `output: 'export'`?** By default Next.js expects a server. Setting this tells it to generate pure static HTML files — perfect for Vercel's CDN. No serverless functions, no API routes, just files.

#### `tailwind.config.js`
```
Purpose: Tailwind CSS theme customization
Exports: tailwind config object

Key customizations:
  darkMode: 'class'                    → Dark mode via class on <html>, not system preference
  content: ['./app/**', './components/**']  → Which files Tailwind scans for classes
  theme.extend:
    colors:
      bg:
        primary:    { dark: '#0a0a0f', light: '#fafafa' }
        secondary:  { dark: '#12121a', light: '#f0f0f5' }
        terminal:   { dark: '#0d1117', light: '#f6f8fa' }
      text:
        primary:    { dark: '#e4e4e7', light: '#18181b' }
        secondary:  { dark: '#a1a1aa', light: '#71717a' }
      accent:
        green:      '#4ade80'
        blue:       '#60a5fa'
        purple:     '#a78bfa'
      border:       { dark: '#27272a', light: '#e4e4e7' }
    fontFamily:
      mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace']
      sans: ['var(--font-sans)', 'Inter', 'sans-serif']
    animation:
      blink: 'blink 1s step-end infinite'
      fadeInUp: 'fadeInUp 0.5s ease-out'
    keyframes:
      blink: { '50%': { opacity: 0 } }
      fadeInUp: { from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 } }
```

#### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

#### `.eslintrc.json`
```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

---

### 1.2 Data Files

These are the files you'll edit to update content. **No component code changes needed.**

---

#### `data/site-config.js`

```javascript
Purpose: Global site configuration, SEO defaults, feature flags
Used by: layout.js (metadata), Navbar, Hero, all sections

Exports:
  siteConfig = {
    name: "Rana Raunitraz Singh",
    title: "ML Engineer & Full-Stack Developer",
    description: "AI/ML engineer building LLM systems...",
    url: "https://your-site.vercel.app",
    ogImage: "/images/og-image.png",
    
    typewriterPhrases: [
      "> building LLM systems that ship",
      "> ML engineer × full-stack developer",
      "> making financial AI reliable",
    ],
    
    // Feature flags — toggle sections without deleting code
    sections: {
      hero: true,
      about: true,
      experience: true,     // NEW
      projects: true,
      skills: true,
      research: true,
      timeline: true,
      resume: true,
      contact: true,
      blog: false,           // v2
    },
    
    // About section stats
    stats: [
      { label: "Team Size", value: "20+" },
      { label: "POC Delivery", value: "7 days" },
      { label: "System Uptime", value: ">99%" },
      { label: "Papers Reviewed", value: "20+" },
    ],
  }
```

---

#### `data/experiences.js` (NEW)

```javascript
Purpose: Professional work experience data
Used by: Experience section component

Exports:
  experiences = [
    {
      id: "zenalyst",
      role: "Founding Developer",
      company: "Zenalyst.ai",
      location: "Bangalore",
      dateRange: "May 2025 – Present",
      type: "current",                    // "current" | "past"
      description: "Led a 20-member tech team building an LLM analytics platform...",
      highlights: [
        "Delivered POC in 7 days and MVP in 15 days, accelerating GTM by ~3×",
        "Architected scalable LLM platform on AWS (EC2/ECS/EKS) with >99% uptime",
        "Built LLM caching layer, reducing monthly inference cost by 10%",
        "Engineered External KnowledgeBase system, increasing retrieval accuracy by ~25%",
        "Fine-tuned Financial LLMs (LoRA/QLoRA + SFT) for reasoning and SQL execution",
        "Integrated GraphRAG and structured retrieval pipelines for multi-hop reasoning",
      ],
      techStack: ["Python", "FastAPI", "AWS", "Docker", "LLMs", "RAG", "GraphRAG"],
    },
    {
      id: "ieee",
      role: "Summer Research Intern",
      company: "IEEE SPS, Gujarat Section",
      location: "Remote",
      dateRange: "May 2025 – Present",
      type: "current",
      description: "Research on Self-Supervised Learning for medical imaging...",
      highlights: [
        "Identified Barlow Twins' 18-25% superior performance in low-data regimes",
        "Established baseline Faster R-CNN on VinDr-CXR achieving 0.32 mAP",
        "Pretrained Barlow Twins encoder on 112,120 unlabeled CheXpert X-rays",
      ],
      techStack: ["PyTorch", "SSL", "Barlow Twins", "Faster R-CNN", "Medical Imaging"],
    },
    {
      id: "schiffer",
      role: "Data Analyst Intern",
      company: "Schiffer and Menezes",
      location: "Goa",
      dateRange: "May 2024 – July 2024",
      type: "past",
      description: "Predictive maintenance and equipment log analysis...",
      highlights: [
        "Increased machine uptime by 8% with predictive maintenance model using XGBoost",
        "Processed and analyzed 30,000+ equipment logs using Python",
      ],
      techStack: ["Python", "XGBoost", "Pandas", "NumPy", "Matplotlib"],
    },
  ]

Schema:
  Experience {
    id: string               — Unique identifier
    role: string             — Job title
    company: string          — Company name
    location: string         — City or "Remote"
    dateRange: string        — "May 2025 – Present"
    type: "current" | "past" — Determines styling (current = highlighted)
    description: string      — 1-2 sentence summary
    highlights: string[]     — Bullet points (key achievements)
    techStack: string[]      — Technologies used (for pills/tags)
  }
```

---

#### `data/projects.js`

```javascript
Purpose: All project data — feeds both project cards and detail pages
Used by: Projects section, ProjectCard, project/[slug]/page.js

Exports:
  projects = [
    {
      slug: "zenalyst-llm-platform",
      title: "Zenalyst LLM Analytics Platform",
      description: "Scalable LLM analytics platform serving financial insights across microservices",
      longDescription: "Full writeup for detail page... (can be multi-paragraph)",
      techStack: ["Python", "FastAPI", "AWS", "Docker", "LLMs", "RAG", "GraphRAG", "ChromaDB"],
      category: "ml-ai",
      status: "live",
      featured: true,
      githubUrl: null,                    // Private repo
      liveUrl: null,
      huggingfaceUrl: null,
      metrics: [
        { label: "Team Size", value: "20 members" },
        { label: "Uptime", value: ">99%" },
        { label: "Cost Reduction", value: "10%" },
        { label: "Retrieval Accuracy", value: "+25%" },
      ],
      images: [],
      dateRange: "May 2025 – Present",
      order: 1,
    },
    {
      slug: "factor-investing-analysis",
      title: "Momentum vs Value: Factor Investing for Indian Markets",
      description: "Statistical analysis comparing momentum vs value strategies across NSE stocks",
      longDescription: "...",
      techStack: ["Python", "Pandas", "NumPy", "SciPy", "Jupyter"],
      category: "finance",
      status: "completed",
      featured: true,
      githubUrl: "https://github.com/blank-gun7/...",
      liveUrl: null,
      huggingfaceUrl: null,
      metrics: [
        { label: "Data Points", value: "459,582" },
        { label: "Outperformance", value: "26.46%" },
        { label: "p-value", value: "0.0001" },
      ],
      images: [],
      dateRange: "2024",
      order: 2,
    },
    // ... banking-score, football-cv, ieee-ssl-research
  ]

Schema:
  Project {
    slug: string                         — URL-safe identifier (used in /project/[slug])
    title: string                        — Display name
    description: string                  — Short (1-2 sentences, for card)
    longDescription: string              — Full writeup (for detail page)
    techStack: string[]                  — Array of tech names
    category: string                     — "ml-ai" | "data" | "cv" | "finance" | "fullstack"
    status: "live" | "in-progress" | "completed"
    featured: boolean                    — Show on landing page
    githubUrl: string | null
    liveUrl: string | null
    huggingfaceUrl: string | null        — HF Space embed URL
    metrics: { label, value }[] | null
    images: string[]                     — Paths to screenshots
    dateRange: string
    order: number                        — Display order (lower = first)
  }
```

---

#### `data/skills.js`

```javascript
Purpose: Categorized skills for terminal-style display
Used by: Skills section

Exports:
  skills = [
    {
      category: "Programming",
      command: "$ skills --category programming",
      items: ["Python", "C++", "JavaScript (Node.js)", "PHP", "OOP"],
    },
    {
      category: "ML & AI",
      command: "$ skills --category ml-ai",
      items: ["Deep Learning", "NLP", "LLMs", "RAG/GraphRAG", "Financial QA",
              "SSL", "CNNs", "XGBoost", "Random Forest", "K-Means"],
    },
    {
      category: "Libraries & Frameworks",
      command: "$ skills --category frameworks",
      items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face",
              "spaCy", "OpenCV", "YOLO", "Pandas", "NumPy"],
    },
    {
      category: "Backend",
      command: "$ skills --category backend",
      items: ["FastAPI", "Flask", "Django", "Node.js", "REST APIs", "JWT Auth"],
    },
    {
      category: "Data & Databases",
      command: "$ skills --category data",
      items: ["SQL", "MySQL", "MongoDB", "Data Preprocessing", "EDA", "Feature Engineering"],
    },
    {
      category: "Cloud & DevOps",
      command: "$ skills --category devops",
      items: ["Docker", "GitHub Actions", "AWS (EC2/ECS/EKS)", "Azure", "Linux"],
    },
  ]

Schema:
  SkillCategory {
    category: string      — Display name
    command: string        — Terminal command shown above items
    items: string[]        — List of skills in this category
  }
```

---

#### `data/timeline.js` (REWORKED)

```javascript
Purpose: Full journey — education, experiences, projects, milestones, future plans
Used by: Timeline section

Exports:
  timeline = [
    // ---- PAST ----
    {
      id: "bits-pilani",
      date: "2022",
      title: "BITS Pilani, Hyderabad Campus",
      description: "Started B.E. at Birla Institute of Technology and Science",
      type: "education",
      status: "past",
      icon: "GraduationCap",
    },
    {
      id: "schiffer-intern",
      date: "May 2024",
      title: "Data Analyst Intern @ Schiffer and Menezes",
      description: "Built predictive maintenance model, processed 30K+ equipment logs",
      type: "experience",
      status: "past",
      icon: "Briefcase",
    },
    {
      id: "sarc",
      date: "Jun 2024",
      title: "Events Head — SARC",
      description: "Managed 20+ events including alumni talks",
      type: "leadership",
      status: "past",
      icon: "Users",
    },
    {
      id: "banking-score",
      date: "Feb 2025",
      title: "Banking Score Prediction",
      description: "XGBoost classifier on 1,200 columns achieving 99% accuracy",
      type: "project",
      status: "past",
      icon: "Code",
      link: "/project/banking-score-prediction",   // Links to project detail
    },
    {
      id: "factor-investing",
      date: "2024",
      title: "Factor Investing Analysis",
      description: "Momentum vs Value strategy analysis across 459K+ NSE observations",
      type: "project",
      status: "past",
      icon: "TrendingUp",
      link: "/project/factor-investing-analysis",
    },
    {
      id: "football-cv",
      date: "2024",
      title: "Football Analysis — Computer Vision",
      description: "Real-time player tracking with YOLO, ball possession analysis",
      type: "project",
      status: "past",
      icon: "Eye",
      link: "/project/football-cv-analysis",
    },

    // ---- PRESENT (these glow/pulse) ----
    {
      id: "zenalyst",
      date: "May 2025 – Present",
      title: "Founding Developer @ Zenalyst.ai",
      description: "Leading 20-member team, building LLM analytics platform on AWS, fine-tuning financial LLMs, engineering RAG pipelines",
      type: "experience",
      status: "present",
      icon: "Rocket",
    },
    {
      id: "ieee-research",
      date: "May 2025 – Present",
      title: "Research Intern @ IEEE SPS",
      description: "Self-Supervised Learning for medical imaging, Barlow Twins pretraining on 112K+ chest X-rays",
      type: "experience",
      status: "present",
      icon: "FlaskConical",
    },
    {
      id: "portfolio",
      date: "Feb 2026",
      title: "Building This Portfolio",
      description: "Next.js + Tailwind, terminal-inspired design, open source",
      type: "project",
      status: "present",
      icon: "Globe",
    },

    // ---- FUTURE (dimmed, aspirational) ----
    {
      id: "future-opensource",
      date: "2026",
      title: "Open Source ML Tools",
      description: "Contributing to and publishing open-source ML tooling",
      type: "goal",
      status: "future",
      icon: "GitBranch",
    },
    {
      id: "future-research",
      date: "2026",
      title: "Published Research",
      description: "Targeting ML conference paper submission",
      type: "goal",
      status: "future",
      icon: "FileText",
    },
  ]

Schema:
  TimelineEntry {
    id: string                                    — Unique identifier
    date: string                                  — Display date
    title: string                                 — Event title
    description: string                           — Brief description
    type: "education" | "experience" | "project" | "leadership" | "goal"
    status: "past" | "present" | "future"         — Determines visual styling
    icon: string                                  — Lucide icon name
    link?: string                                 — Optional link to project detail page
  }

Visual styling per status:
  past:     Normal opacity, solid dot, muted colors
  present:  Full opacity, pulsing/glowing dot, accent green border
  future:   Reduced opacity (0.5), dashed line, italic text
```

---

#### `data/socials.js`

```javascript
Exports:
  socials = [
    { platform: "github",   url: "https://github.com/blank-gun7",           icon: "Github" },
    { platform: "linkedin", url: "https://linkedin.com/in/rrrs-024a94250/", icon: "Linkedin" },
    { platform: "email",    url: "mailto:ranacv2109@gmail.com",              icon: "Mail" },
  ]
```

---

## 2. Component Specifications

Each component defined with: purpose, props, internal state, rendering logic, and styling approach.

---

### 2.1 Layout Components

---

#### `app/layout.js` — Root Layout

```
Purpose: Wraps EVERY page. Sets up fonts, theme, navbar, footer, analytics.
Type: Server Component (with client children)

What it does:
  1. Loads fonts (JetBrains Mono, Inter) via next/font
  2. Sets metadata (title, description, OG tags)
  3. Injects theme script in <head> (prevents flash)
  4. Renders Navbar, main content, Footer, Analytics

Structure:
  <html lang="en" className={fontVariables} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={themeScript} />    ← Flash prevention
    </head>
    <body>
      <ThemeProvider>
        <Navbar />
        <main>{children}</main>                           ← Page content goes here
        <Footer />
      </ThemeProvider>
      <Analytics />                                       ← Vercel analytics
    </body>
  </html>

Theme flash prevention script (inline in <head>):
  Runs BEFORE React loads:
  1. Read localStorage('theme')
  2. If 'dark' or no preference → add class="dark" to <html>
  3. If 'light' → remove class="dark"
  Result: Correct theme applied before first paint

Metadata export:
  title: "Rana Raunitraz Singh | ML Engineer & Full-Stack Developer"
  description: "AI/ML engineer building scalable LLM systems..."
  openGraph: { title, description, url, image, type: "website" }
  twitter: { card: "summary_large_image", title, description, image }
  icons: { icon: "/favicon.ico" }
  robots: { index: true, follow: true }
```

---

#### `app/globals.css` — Global Styles

```
Purpose: Tailwind imports + custom CSS that can't be done with utilities

Contents:
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    /* Smooth scrolling for anchor links */
    html { scroll-behavior: smooth; }
    
    /* Custom scrollbar styling (dark theme) */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0a0a0f; }
    ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
    
    /* Selection color */
    ::selection { background: #4ade8040; }
  }

  @layer components {
    /* Terminal cursor blink */
    .cursor-blink {
      animation: blink 1s step-end infinite;
    }
    
    /* Terminal window base styles */
    .terminal-window {
      @apply bg-terminal-dark rounded-lg border border-border-dark overflow-hidden;
    }
    
    /* Glow effect for present timeline nodes */
    .glow-green {
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.3);
    }
  }
```

---

#### `app/page.js` — Landing Page

```
Purpose: The main landing page — renders all sections in order
Type: Server Component

What it does:
  1. Imports site-config for feature flags
  2. Conditionally renders each section based on flags
  3. Each section has an id for scroll navigation

Structure:
  import { siteConfig } from '@/data/site-config'
  
  // Import all sections
  import Hero from '@/components/sections/Hero'
  import About from '@/components/sections/About'
  import Experience from '@/components/sections/Experience'
  ...

  export default function Home() {
    const { sections } = siteConfig;
    return (
      <>
        {sections.hero       && <Hero />}
        {sections.about      && <section id="about"><About /></section>}
        {sections.experience && <section id="experience"><Experience /></section>}
        {sections.projects   && <section id="projects"><Projects /></section>}
        {sections.skills     && <section id="skills"><Skills /></section>}
        {sections.research   && <section id="research"><Research /></section>}
        {sections.timeline   && <section id="timeline"><Timeline /></section>}
        {sections.resume     && <section id="resume"><Resume /></section>}
        {sections.contact    && <section id="contact"><Contact /></section>}
      </>
    );
  }

Why feature flags matter:
  - You add a Blog section in v2 → set blog: true → it appears
  - You want to temporarily hide Research → set research: false → gone
  - ZERO code changes to page.js
```

---

#### `app/project/[slug]/page.js` — Project Detail Page

```
Purpose: Individual project page with full details + optional demo embed
Type: Server Component (with client children for embeds)

How dynamic routing works:
  [slug] in the folder name means Next.js treats it as a variable.
  /project/banking-score → slug = "banking-score"
  /project/factor-investing → slug = "factor-investing"

What it does:
  1. Receives slug from URL params
  2. Finds matching project in data/projects.js
  3. If not found → triggers not-found.js (404)
  4. Renders full project detail layout

Key functions:

  generateStaticParams():
    Purpose: Tells Next.js ALL possible slugs at build time
    Returns: [{ slug: "banking-score" }, { slug: "factor-investing" }, ...]
    Next.js pre-builds an HTML file for EACH slug
    
  generateMetadata({ params }):
    Purpose: Dynamic SEO tags per project
    Returns: { title: "Banking Score | Rana Singh", description: project.description, ... }

Structure:
  ← Back to Projects (link to /#projects)
  
  <article>
    <header>
      Title
      Status badge (🟢 Live | 🔵 In Progress | ⚪ Completed)
      Date range
      Tech stack pills
    </header>
    
    <section — Description>
      Long description text (from project.longDescription)
    </section>
    
    <section — Metrics>  (if project.metrics exists)
      Grid of metric cards: [ Accuracy: 99% ] [ Data Points: 459K ] ...
    </section>
    
    <section — Demo>  (if project.huggingfaceUrl exists)
      <HuggingFaceEmbed url={project.huggingfaceUrl} />
    </section>
    
    <section — Images>  (if project.images.length > 0)
      Screenshot gallery / carousel
    </section>
    
    <footer>
      [View on GitHub] button  (if project.githubUrl exists)
      [Live Demo] button       (if project.liveUrl exists)
    </footer>
  </article>
  
  <aside — Related Projects>
    2-3 other project cards from same category
  </aside>
```

---

#### `app/not-found.js` — 404 Page

```
Purpose: Custom "page not found" page
Type: Server Component

Structure:
  Terminal-themed 404:
  
  ┌─────────────────────────────────────────┐
  │  $ cd /requested-page                   │
  │  bash: cd: /requested-page: No such     │
  │  file or directory                      │
  │                                         │
  │  404 — Page not found                   │
  │                                         │
  │  [← Back to Home]                       │
  └─────────────────────────────────────────┘
```

---

### 2.2 Layout Components (Persistent UI)

---

#### `components/layout/Navbar.jsx`

```
Purpose: Fixed top navigation bar — always visible
Type: Client Component ('use client')
Why client: Needs useState (mobile menu), scroll spy (IntersectionObserver), theme toggle

Props: None (reads data from imports)

Internal State:
  isMenuOpen: boolean      — Mobile hamburger menu state
  activeSection: string    — Currently visible section id (e.g., "projects")
  isScrolled: boolean      — Has user scrolled past hero (changes navbar background)

Behavior:
  1. On mount: Set up IntersectionObserver on all section elements
  2. As user scrolls: Update activeSection based on which section is in viewport
  3. On scroll > 50px: Add background blur/color to navbar (transparent when at top)
  4. On mobile: Hamburger icon toggles full-screen menu overlay

Structure:
  <nav className="fixed top-0 w-full z-50 transition-all duration-300
                  {isScrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b' : 'bg-transparent'}">
    
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      
      <!-- Logo/Name (left) -->
      <a href="#hero" className="font-mono text-accent-green">
        rana@dev:~$
      </a>
      
      <!-- Desktop Nav Links (center) -->
      <div className="hidden md:flex gap-6">
        {navLinks.map(link =>
          <a href={`#${link.id}`}
             className={activeSection === link.id ? 'text-accent-green' : 'text-text-secondary'}>
            {link.label}
          </a>
        )}
      </div>
      
      <!-- Right side -->
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="md:hidden" onClick={toggleMenu}>  <!-- Hamburger -->
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    {isMenuOpen && (
      <div className="fixed inset-0 bg-bg-primary/95 backdrop-blur-lg z-40 md:hidden">
        <nav links, each closes menu on click>
      </div>
    )}
  </nav>

navLinks array:
  [
    { id: "about",      label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects",   label: "Projects" },
    { id: "skills",     label: "Skills" },
    { id: "research",   label: "Research" },
    { id: "timeline",   label: "Timeline" },
    { id: "resume",     label: "Resume" },
    { id: "contact",    label: "Contact" },
  ]

Scroll Spy Logic:
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }  // Triggers when section is centered
  );
  
  // Observe all sections
  navLinks.forEach(link => {
    const el = document.getElementById(link.id);
    if (el) observer.observe(el);
  });
```

---

#### `components/layout/ThemeToggle.jsx`

```
Purpose: Sun/Moon icon button to switch dark/light mode
Type: Client Component ('use client')
Why client: Reads/writes localStorage, toggles class on <html>

Props: None

Internal State:
  theme: 'dark' | 'light'

Behavior:
  1. On mount: Read theme from localStorage (or default to 'dark')
  2. On click: Toggle theme
  3. Update: class on <html> + localStorage
  4. Icon: Sun (☀) when dark (clicking switches to light), Moon (🌙) when light

Implementation:
  function ThemeToggle() {
    const [theme, setTheme] = useState('dark');
    
    useEffect(() => {
      // Read saved preference on mount
      const saved = localStorage.getItem('theme') || 'dark';
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }, []);
    
    function toggle() {
      const next = theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
    }
    
    return (
      <button onClick={toggle} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }
```

---

#### `components/layout/Footer.jsx`

```
Purpose: Bottom bar with social links + copyright
Type: Server Component

Structure:
  <footer className="border-t border-border py-8">
    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
      
      <p className="text-text-secondary text-sm font-mono">
        © 2026 Rana Raunitraz Singh
      </p>
      
      <div className="flex gap-4">
        {socials.map(s => <a href={s.url}><Icon name={s.icon} /></a>)}
      </div>
      
    </div>
  </footer>
```

---

### 2.3 Section Components

---

#### `components/sections/Hero.jsx`

```
Purpose: First impression — name, typed tagline, CTAs, particles
Type: Client Component ('use client')
Why client: Typewriter animation, particles, Framer Motion

Props: None (reads from site-config)

Structure:
  <section id="hero" className="relative min-h-screen flex items-center justify-center">
    
    <!-- Particle Background (lazy loaded, behind content) -->
    <ParticleBackground />
    
    <!-- Content (on top of particles) -->
    <div className="relative z-10 text-center">
      
      <!-- Name -->
      <motion.h1 initial={fadeIn} animate={visible}>
        <span className="font-mono text-5xl font-bold">RANA RAUNITRAZ SINGH</span>
      </motion.h1>
      
      <!-- Typed Tagline -->
      <div className="font-mono text-xl text-accent-green mt-4">
        <TypeWriter phrases={siteConfig.typewriterPhrases} />
      </div>
      
      <!-- CTAs -->
      <motion.div className="mt-8 flex gap-4 justify-center" initial={fadeIn} animate={visible} delay={0.5}>
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="/resume.pdf" download className="btn-secondary">Download Resume</a>
      </motion.div>
      
      <!-- Social Icons -->
      <motion.div className="mt-6 flex gap-4 justify-center" delay={0.7}>
        {socials.map(s => <SocialIcon {...s} />)}
      </motion.div>
      
    </div>
  </section>

Button Styles:
  btn-primary: bg-accent-green text-black font-mono px-6 py-3 rounded-lg hover:scale-105
  btn-secondary: border border-accent-green text-accent-green font-mono px-6 py-3 rounded-lg hover:bg-accent-green/10
```

---

#### `components/sections/About.jsx`

```
Purpose: Brief bio + current role + key stats
Type: Client Component (for scroll reveal animation)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ cat about.md" title="About" />
    
    <TerminalWindow title="about.md">
      <p>Bio text — 3-4 sentences about who you are, what you're building,
         what drives you. Mention BITS Pilani, Zenalyst, ML/AI focus.</p>
    </TerminalWindow>
    
    <!-- Stats Row -->
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {siteConfig.stats.map(stat =>
        <div className="text-center">
          <p className="text-3xl font-bold font-mono text-accent-green">{stat.value}</p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
        </div>
      )}
    </div>
  </ScrollReveal>
```

---

#### `components/sections/Experience.jsx` (NEW)

```
Purpose: Professional work experience — internships and roles
Type: Client Component (for scroll reveal + hover effects)

Props: None (reads from data/experiences.js)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ cat experience.log" title="Experience" />
    
    <div className="space-y-6">
      {experiences.map(exp =>
        <ExperienceCard key={exp.id} experience={exp} />
      )}
    </div>
  </ScrollReveal>

ExperienceCard — Sub-component:
  
  Structure:
    <motion.div
      className="border border-border rounded-lg p-6
                 {exp.type === 'current' ? 'border-accent-green/50 glow-green' : ''}"
      whileHover={{ scale: 1.01 }}
    >
      <!-- Header Row -->
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{exp.role}</h3>
          <p className="text-accent-blue">{exp.company} · {exp.location}</p>
        </div>
        <div className="flex items-center gap-2">
          {exp.type === 'current' && <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />}
          <span className="text-text-secondary font-mono text-sm">{exp.dateRange}</span>
        </div>
      </div>
      
      <!-- Description -->
      <p className="text-text-secondary mt-3">{exp.description}</p>
      
      <!-- Highlights -->
      <ul className="mt-4 space-y-2">
        {exp.highlights.map(h =>
          <li className="text-sm text-text-primary flex items-start gap-2">
            <span className="text-accent-green mt-1">▹</span>
            {h}
          </li>
        )}
      </ul>
      
      <!-- Tech Stack Tags -->
      <div className="flex flex-wrap gap-2 mt-4">
        {exp.techStack.map(tech =>
          <span className="text-xs font-mono px-2 py-1 rounded bg-accent-purple/10 text-accent-purple">
            {tech}
          </span>
        )}
      </div>
    </motion.div>

  Visual distinction:
    Current roles: Green left border + subtle glow + pulsing green dot
    Past roles:    Normal border, no glow, no dot
```

---

#### `components/sections/Projects.jsx`

```
Purpose: Grid of project cards with category filters
Type: Client Component (for filter state + hover effects)

Internal State:
  activeFilter: string — "all" | "ml-ai" | "data" | "cv" | "finance" | "fullstack"

Structure:
  <ScrollReveal>
    <SectionHeader command="$ ls projects/" title="Projects" />
    
    <!-- Filter Tabs -->
    <div className="flex gap-3 mb-8 overflow-x-auto">
      {["all", "ml-ai", "data", "cv", "finance"].map(cat =>
        <button
          onClick={() => setActiveFilter(cat)}
          className={activeFilter === cat ? 'active-tab' : 'inactive-tab'}
        >
          {cat === 'all' ? 'All' : categoryLabels[cat]}
        </button>
      )}
    </div>
    
    <!-- Project Grid -->
    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredProjects.map(project =>
          <motion.div key={project.slug} layout animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProjectCard project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </ScrollReveal>

Filter logic:
  const filteredProjects = activeFilter === 'all'
    ? projects.filter(p => p.featured).sort((a,b) => a.order - b.order)
    : projects.filter(p => p.category === activeFilter).sort((a,b) => a.order - b.order);
```

---

#### `components/sections/Skills.jsx`

```
Purpose: Terminal-style skill display
Type: Client Component (for scroll reveal)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ skills --list --all" title="Skills" />
    
    <TerminalWindow title="skills">
      {skills.map(category =>
        <SkillCategory key={category.category} {...category} />
      )}
    </TerminalWindow>
  </ScrollReveal>

SkillCategory renders as:
  ┌─────────────────────────────────────────────────────┐
  │ $ skills --category ml-ai                           │
  │                                                     │
  │ Deep Learning · NLP · LLMs · RAG/GraphRAG ·         │
  │ Financial QA · SSL · CNNs · XGBoost ·               │
  │ Random Forest · K-Means                             │
  │                                                     │
  └─────────────────────────────────────────────────────┘
  
  Each category's command in green monospace
  Items as inline text separated by " · " in primary text color
  Categories separated by blank line
```

---

#### `components/sections/Research.jsx`

```
Purpose: IEEE research work and paper reviews
Type: Client Component (for scroll reveal)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ cat research.md" title="Research" />
    
    <!-- IEEE Card -->
    <TerminalWindow title="ieee-sps-research">
      <h3>Self-Supervised Learning for Medical Imaging</h3>
      <p>IEEE SPS, Gujarat Section · May 2025 – Present</p>
      
      Key findings:
      - Barlow Twins: 18-25% superior in low-data regimes vs SimCLR/BYOL
      - Faster R-CNN baseline: 0.32 mAP on VinDr-CXR
      - Pretrained on 112,120 unlabeled CheXpert X-rays
      
      Tech: PyTorch, Barlow Twins, Faster R-CNN, CheXpert, VinDr-CXR
    </TerminalWindow>
    
    <!-- Papers Reviewed -->
    <div className="mt-6">
      <p className="font-mono text-accent-green">$ wc -l papers_reviewed.txt</p>
      <p>20+ research papers across LLM reasoning, tabular QA, financial modelling</p>
    </div>
  </ScrollReveal>
```

---

#### `components/sections/Timeline.jsx` (REWORKED)

```
Purpose: Full journey view — education, projects, experiences, future goals
Type: Client Component (for scroll-triggered staggered reveal)

Props: None (reads from data/timeline.js)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ git log --oneline --graph" title="My Journey" />
    
    <div className="relative">
      
      <!-- Vertical Line -->
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
      
      {timeline.map((entry, i) =>
        <TimelineNode
          key={entry.id}
          entry={entry}
          index={i}
          side={i % 2 === 0 ? 'left' : 'right'}   // Alternating sides on desktop
        />
      )}
      
    </div>
  </ScrollReveal>

TimelineNode — Sub-component:

  Props:
    entry: TimelineEntry object
    index: number (for stagger delay)
    side: 'left' | 'right' (desktop layout)

  Structure:
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: entry.status === 'future' ? 0.5 : 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <!-- Dot on the line -->
      <div className={`
        w-4 h-4 rounded-full absolute
        ${entry.status === 'present' ? 'bg-accent-green glow-green animate-pulse' : ''}
        ${entry.status === 'past' ? 'bg-text-secondary' : ''}
        ${entry.status === 'future' ? 'bg-border border-2 border-dashed' : ''}
      `} />
      
      <!-- Content Card -->
      <div className={`
        p-4 rounded-lg border
        ${entry.status === 'present' ? 'border-accent-green/40 bg-accent-green/5' : ''}
        ${entry.status === 'past' ? 'border-border bg-bg-secondary' : ''}
        ${entry.status === 'future' ? 'border-dashed border-border/50 bg-transparent italic' : ''}
      `}>
        <!-- Type Icon + Date -->
        <div className="flex items-center gap-2 text-sm text-text-secondary font-mono">
          <Icon name={entry.icon} size={14} />
          <span>{entry.date}</span>
          {entry.status === 'present' && <span className="text-accent-green text-xs">● NOW</span>}
        </div>
        
        <!-- Title -->
        <h3 className={entry.status === 'future' ? 'text-text-secondary' : 'text-text-primary font-semibold'}>
          {entry.link ? <a href={entry.link}>{entry.title}</a> : entry.title}
        </h3>
        
        <!-- Description -->
        <p className="text-sm text-text-secondary mt-1">{entry.description}</p>
      </div>
    </motion.div>

  Responsive:
    Mobile: All nodes on the right, line on the left
    Desktop: Alternating left/right with line in center

  Type color coding:
    education:   Blue accent icon
    experience:  Green accent icon
    project:     Purple accent icon
    leadership:  Yellow accent icon
    goal:        Muted/gray icon
```

---

#### `components/sections/Resume.jsx`

```
Purpose: Resume preview + download button
Type: Client Component (for scroll reveal)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ open resume.pdf" title="Resume" />
    
    <!-- PDF Preview -->
    <div className="rounded-lg overflow-hidden border border-border">
      <embed
        src="/resume.pdf"
        type="application/pdf"
        className="w-full h-[600px] hidden md:block"    <!-- Hide on mobile -->
      />
      <!-- Mobile: Show message instead of embed -->
      <div className="md:hidden p-8 text-center">
        <p>PDF preview available on desktop</p>
      </div>
    </div>
    
    <!-- Download Button -->
    <div className="mt-4 text-center">
      <a href="/resume.pdf" download
         className="inline-flex items-center gap-2 btn-primary">
        <Download size={18} />
        Download Resume (PDF)
      </a>
      <p className="text-text-secondary text-xs mt-2">Last updated: February 2026</p>
    </div>
  </ScrollReveal>
```

---

#### `components/sections/Contact.jsx`

```
Purpose: Simple contact links
Type: Client Component (for scroll reveal)

Structure:
  <ScrollReveal>
    <SectionHeader command="$ ping rana" title="Get in Touch" />
    
    <TerminalWindow title="contact">
      <p className="font-mono text-accent-green">$ echo "Let's connect"</p>
      <p className="mt-4 text-text-primary">
        I'm open to opportunities, collaborations, and conversations
        about ML systems and financial AI.
      </p>
      
      <div className="mt-6 space-y-3">
        {socials.map(s =>
          <a href={s.url} className="flex items-center gap-3 text-text-secondary hover:text-accent-green">
            <Icon name={s.icon} size={20} />
            <span className="font-mono">{s.url.replace('mailto:', '').replace('https://', '')}</span>
          </a>
        )}
      </div>
    </TerminalWindow>
  </ScrollReveal>
```

---

### 2.4 UI Components (Reusable Building Blocks)

---

#### `components/ui/SectionHeader.jsx`

```
Purpose: Terminal-style section header used by all sections
Type: Server Component (no interactivity)

Props:
  command: string   — Terminal command to display (e.g., "$ ls projects/")
  title: string     — Section title for accessibility (screen readers)

Structure:
  <div className="mb-8">
    <p className="font-mono text-accent-green text-sm">{command}</p>
    <h2 className="sr-only">{title}</h2>    <!-- Hidden visually, read by screen readers -->
  </div>

Note: The visible header IS the terminal command.
      The <h2> is hidden but exists for accessibility and SEO.
```

---

#### `components/ui/TerminalWindow.jsx`

```
Purpose: Terminal window chrome — dots, title bar, dark background
Type: Server Component

Props:
  title: string       — Window title text
  children: ReactNode  — Content inside the terminal

Structure:
  <div className="terminal-window">
    <!-- Title Bar -->
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-secondary/50">
      <!-- Traffic light dots -->
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="ml-2 text-text-secondary text-xs font-mono">{title}</span>
    </div>
    <!-- Content Area -->
    <div className="p-6 font-mono text-sm leading-relaxed">
      {children}
    </div>
  </div>
```

---

#### `components/ui/TypeWriter.jsx`

```
Purpose: Typing animation that cycles through phrases
Type: Client Component ('use client')

Props:
  phrases: string[]    — Array of phrases to type
  speed: number        — Typing speed in ms (default: 80)
  deleteSpeed: number  — Deleting speed in ms (default: 40)
  pauseDuration: number — Pause after complete phrase in ms (default: 2000)

Internal State:
  currentPhrase: number  — Index of current phrase
  currentChar: number    — Current character position
  isDeleting: boolean    — Currently deleting?
  displayText: string    — What's currently shown

Behavior:
  1. Type characters one by one (speed ms between each)
  2. When phrase complete → pause (pauseDuration ms)
  3. Delete characters one by one (deleteSpeed ms)
  4. When empty → move to next phrase (loop)
  5. Repeat forever

Structure:
  <span className="text-accent-green">
    {displayText}
    <span className="cursor-blink text-accent-green">▌</span>
  </span>

Accessibility:
  - Wrap in aria-label with full current phrase
  - Respect prefers-reduced-motion → show static first phrase, no animation
```

---

#### `components/ui/ProjectCard.jsx`

```
Purpose: Card displaying a project summary in the grid
Type: Client Component (hover effects)

Props:
  project: Project object

Structure:
  <motion.a
    href={`/project/${project.slug}`}
    className="block border border-border rounded-lg p-6 bg-bg-secondary
               hover:border-accent-green/50 transition-all duration-300"
    whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(74, 222, 128, 0.1)' }}
  >
    <!-- Status Badge -->
    <div className="flex items-center justify-between mb-3">
      <span className={statusBadgeClass[project.status]}>
        {statusLabel[project.status]}
      </span>
      <span className="text-text-secondary text-xs font-mono">{project.dateRange}</span>
    </div>
    
    <!-- Title -->
    <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
    
    <!-- Description -->
    <p className="text-text-secondary text-sm mt-2 line-clamp-2">{project.description}</p>
    
    <!-- Tech Tags -->
    <div className="flex flex-wrap gap-2 mt-4">
      {project.techStack.slice(0, 5).map(tech =>
        <span className="text-xs font-mono px-2 py-1 rounded bg-accent-purple/10 text-accent-purple">
          {tech}
        </span>
      )}
      {project.techStack.length > 5 &&
        <span className="text-xs text-text-secondary">+{project.techStack.length - 5}</span>
      }
    </div>
    
    <!-- Footer Links -->
    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
      {project.githubUrl && <Github size={16} className="text-text-secondary" />}
      {project.liveUrl && <ExternalLink size={16} className="text-text-secondary" />}
      <span className="ml-auto text-accent-green text-sm font-mono">Details →</span>
    </div>
  </motion.a>

Status badges:
  live:        🟢 green dot + "Live"
  in-progress: 🔵 blue dot + "In Progress"
  completed:   ⚪ gray dot + "Completed"
```

---

#### `components/ui/ScrollReveal.jsx`

```
Purpose: Wrapper that animates children when they scroll into view
Type: Client Component ('use client')

Props:
  children: ReactNode
  direction: 'up' | 'down' | 'left' | 'right' (default: 'up')
  delay: number (default: 0)
  className: string (optional)

Structure:
  <motion.div
    initial={{
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, margin: '-100px' }}
    className={className}
  >
    {children}
  </motion.div>

Accessibility:
  Check prefers-reduced-motion:
  If reduced → render children directly without motion wrapper
```

---

#### `components/ui/ParticleBackground.jsx`

```
Purpose: Neural network particle animation on hero background
Type: Client Component ('use client')

Props: None

Behavior:
  1. Dynamically import tsparticles (code splitting — don't load until needed)
  2. Check if mobile → don't render (save battery)
  3. Check prefers-reduced-motion → don't render
  4. Render particles with neural network config

Structure:
  'use client';
  import { useCallback, useMemo } from 'react';
  import dynamic from 'next/dynamic';
  
  // Dynamic import — only loads when component mounts
  const Particles = dynamic(() => import('@tsparticles/react'), { ssr: false });
  
  export default function ParticleBackground() {
    // Don't render on mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);
    
    if (isMobile) return null;
    
    return (
      <Particles
        className="absolute inset-0 z-0"
        options={particleConfig}
      />
    );
  }

Particle Config:
  particles:
    number: 50
    color: accent-green (#4ade80)
    opacity: 0.3
    size: 2
    links:
      enable: true
      color: accent-green
      opacity: 0.15
      distance: 150
    move:
      enable: true
      speed: 0.5
  interactivity:
    onHover: grab (connects nearby particles to cursor)
  background:
    color: transparent (inherits from parent)
```

---

#### `components/embeds/HuggingFaceEmbed.jsx`

```
Purpose: Lazy-loaded HuggingFace Space iframe with loading state + fallback
Type: Client Component ('use client')

Props:
  url: string            — HuggingFace Space URL
  title: string          — For accessibility
  fallbackImage: string  — Screenshot to show if iframe fails (optional)

Internal State:
  isLoaded: boolean
  hasError: boolean

Structure:
  <div className="rounded-lg border border-border overflow-hidden">
    {!isLoaded && !hasError && (
      <!-- Loading Skeleton -->
      <div className="h-[500px] bg-bg-secondary animate-pulse flex items-center justify-center">
        <Loader className="animate-spin text-accent-green" />
        <span className="ml-2 font-mono text-text-secondary">Loading demo...</span>
      </div>
    )}
    
    {hasError && (
      <!-- Fallback -->
      <div className="h-[300px] bg-bg-secondary flex flex-col items-center justify-center">
        {fallbackImage && <img src={fallbackImage} alt={title} />}
        <a href={url} target="_blank" className="btn-primary mt-4">
          Open in HuggingFace →
        </a>
      </div>
    )}
    
    <iframe
      src={url}
      title={title}
      className={isLoaded && !hasError ? 'w-full h-[500px]' : 'hidden'}
      loading="lazy"                    <!-- Browser-native lazy loading -->
      sandbox="allow-scripts allow-same-origin"
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  </div>
```

---

### 2.5 Custom Hooks

---

#### `hooks/useTypewriter.js`

```
Purpose: Reusable typing animation logic
Type: Custom React hook

Parameters:
  phrases: string[]        — Phrases to cycle through
  typingSpeed: number      — ms between characters (default: 80)
  deletingSpeed: number    — ms between deleting (default: 40)
  pauseDuration: number    — ms to wait after phrase complete (default: 2000)

Returns:
  {
    displayText: string,   — Current visible text
    isTyping: boolean,     — Currently typing or deleting
    currentPhrase: number, — Index of current phrase
  }

Logic:
  useEffect(() => {
    let timeout;
    
    if (isDeleting) {
      // Remove one character
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }
      }, deletingSpeed);
    } else {
      const fullPhrase = phrases[currentPhrase];
      if (displayText === fullPhrase) {
        // Phrase complete — pause then start deleting
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        // Type one more character
        timeout = setTimeout(() => {
          setDisplayText(fullPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  Accessibility: Check prefers-reduced-motion
    If true → return { displayText: phrases[0], isTyping: false }
    (shows static first phrase, no animation)
```

---

#### `hooks/useTheme.js`

```
Purpose: Theme state management (extracted from ThemeToggle for reuse)
Type: Custom React hook

Returns:
  {
    theme: 'dark' | 'light',
    toggleTheme: () => void,
    setTheme: (theme) => void,
  }

Logic:
  1. On mount: Read from localStorage, fallback to 'dark'
  2. Sync class on <html> element
  3. toggleTheme: Flip between dark/light, persist to localStorage
```

---

## 3. Responsive Design Specifications

### 3.1 Breakpoint Behavior

```
                    Mobile (<640px)       Tablet (640-1024px)    Desktop (>1024px)
───────────────────────────────────────────────────────────────────────────────────
Navbar              Hamburger menu        Full nav links         Full nav links
Hero text           text-3xl              text-4xl               text-5xl
Hero particles      Hidden                Hidden                 Visible
About stats         2-col grid            4-col grid             4-col grid
Experience cards    Full width, stacked   Full width, stacked    Full width, stacked
Project grid        1 column              2 columns              3 columns
Skills terminal     Full width            Full width             Full width
Timeline            Left-aligned line     Left-aligned line      Center line, alternating
Resume PDF          Download only         Embed + download       Embed + download
Contact             Stacked links         Inline links           Inline links
Section padding     48px vertical         64px vertical          80px vertical
```

### 3.2 Typography Scale

```
              Mobile          Desktop
──────────────────────────────────────
H1 (name)     text-3xl (30px) text-5xl (48px)
H2 (section)  text-xl (20px)  text-2xl (24px)
H3 (card)     text-lg (18px)  text-xl (20px)
Body          text-sm (14px)  text-base (16px)
Terminal      text-xs (12px)  text-sm (14px)
Tags          text-xs (12px)  text-xs (12px)
```

---

## 4. Accessibility Specifications

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All interactive elements focusable with Tab, Enter activates |
| Skip-to-content | Hidden link at top: "Skip to main content" → jumps to `<main>` |
| ARIA labels | All icon-only buttons have `aria-label` |
| Heading hierarchy | One `<h1>` (name), `<h2>` per section (sr-only behind terminal headers) |
| Color contrast | All text passes WCAG AA (4.5:1 ratio minimum) |
| Focus indicators | Visible focus ring: `focus:ring-2 focus:ring-accent-green` |
| Reduced motion | `prefers-reduced-motion: reduce` → disable all animations |
| Alt text | All `<img>` tags have descriptive alt text |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Screen reader | Section headers have hidden `<h2>` with readable titles |

---

## 5. SEO Implementation Details

### 5.1 Per-Page Metadata

```
Landing Page (/):
  <title>Rana Raunitraz Singh | ML Engineer & Full-Stack Developer</title>
  <meta name="description" content="AI/ML engineer building scalable LLM systems.
    Founding Developer at Zenalyst.ai. BITS Pilani." />
  <meta property="og:title" content="Rana Raunitraz Singh" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/images/og-image.png" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://your-site.vercel.app" />

Project Pages (/project/[slug]):
  <title>{project.title} | Rana Raunitraz Singh</title>
  <meta name="description" content="{project.description}" />
  <meta property="og:image" content="{project screenshot or default}" />
  <link rel="canonical" href="https://your-site.vercel.app/project/{slug}" />
```

### 5.2 Structured Data (JSON-LD)

```json
Injected in layout.js <head>:
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rana Raunitraz Singh",
  "url": "https://your-site.vercel.app",
  "jobTitle": "ML Engineer & Full-Stack Developer",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "BITS Pilani, Hyderabad Campus"
  },
  "sameAs": [
    "https://github.com/blank-gun7",
    "https://linkedin.com/in/rrrs-024a94250/"
  ]
}
```

### 5.3 Static Files

```
public/robots.txt:
  User-agent: *
  Allow: /
  Sitemap: https://your-site.vercel.app/sitemap.xml

public/sitemap.xml:
  Lists all pages:
    - https://your-site.vercel.app/
    - https://your-site.vercel.app/project/zenalyst-llm-platform
    - https://your-site.vercel.app/project/factor-investing-analysis
    - ... (one entry per project)
  
  Updated manually or auto-generated via next-sitemap package
```

---

## 6. Implementation Order

Build in this order — each step is independently testable and deployable:

```
Phase 1: Foundation (Day 1-2)
  ├── 1. Project setup (create-next-app, install deps)
  ├── 2. tailwind.config.js (colors, fonts, custom theme)
  ├── 3. globals.css (base styles, scrollbar, selection)
  ├── 4. layout.js (fonts, metadata, theme script)
  ├── 5. ThemeToggle (dark/light switching)
  ├── 6. Navbar (static version first, no scroll spy)
  └── 7. Footer
  
  Checkpoint: Empty dark page with working navbar + theme toggle ✓

Phase 2: Hero + About (Day 2-3)
  ├── 8. SectionHeader component
  ├── 9. TerminalWindow component
  ├── 10. TypeWriter component + useTypewriter hook
  ├── 11. Hero section (without particles)
  ├── 12. About section
  └── 13. ParticleBackground (add to hero)
  
  Checkpoint: Landing page with hero typing + about section ✓

Phase 3: Experience + Projects (Day 3-4)
  ├── 14. data/experiences.js
  ├── 15. Experience section + ExperienceCard
  ├── 16. data/projects.js
  ├── 17. ProjectCard component
  ├── 18. Projects section (with filters)
  ├── 19. Project detail page (app/project/[slug]/page.js)
  └── 20. HuggingFaceEmbed component
  
  Checkpoint: All experiences + projects visible, detail pages work ✓

Phase 4: Skills + Research + Timeline (Day 4-5)
  ├── 21. data/skills.js
  ├── 22. Skills section (terminal style)
  ├── 23. Research section
  ├── 24. data/timeline.js
  ├── 25. Timeline section + TimelineNode
  └── 26. ScrollReveal wrapper
  
  Checkpoint: All content sections complete ✓

Phase 5: Resume + Contact + Polish (Day 5-6)
  ├── 27. Resume section (PDF embed + download)
  ├── 28. Contact section
  ├── 29. 404 page
  ├── 30. Navbar scroll spy (IntersectionObserver)
  ├── 31. SEO (metadata, JSON-LD, sitemap, robots.txt)
  ├── 32. OG image creation
  └── 33. Analytics setup
  
  Checkpoint: Complete site, all sections, SEO ready ✓

Phase 6: Deploy + Test (Day 6-7)
  ├── 34. Push to GitHub
  ├── 35. Connect to Vercel
  ├── 36. Lighthouse audit (target ≥90 all categories)
  ├── 37. Cross-browser testing
  ├── 38. Mobile testing
  ├── 39. Fix issues from testing
  └── 40. Submit sitemap to Google Search Console
  
  Checkpoint: LIVE ON THE INTERNET ✓
```

---

## 7. Sign-off

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | Rana Raunitraz Singh | | Pending |
| Developer | Rana Raunitraz Singh | | Pending |
| Architect | Claude (AI Pair) | Feb 10, 2026 | Drafted |

---

*Next Steps: Implementation (Phase 1: Foundation)*
