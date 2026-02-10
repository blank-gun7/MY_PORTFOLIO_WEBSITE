# High-Level Design (HLD)
# Portfolio Website — Rana Raunitraz Singh

**Version:** 1.0  
**Date:** February 10, 2026  
**Status:** Draft — Awaiting Sign-off  
**Depends on:** PRD v1.0, Tech Stack Decision v1.0

---

## 1. System Overview

The portfolio is a **statically generated website** — meaning every page is pre-built as HTML at build time, then served from a CDN. There is **no backend server**, no database, no API calls from the site itself. All content lives in local data files within the codebase.

### 1.1 Architecture Style: Jamstack (Static Site)

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT TIME                         │
│                                                             │
│   data/*.js ──→ Components ──→ next build ──→ Static HTML   │
│   (content)     (React JSX)    (build tool)   (output)      │
│                                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼ git push
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL PLATFORM                           │
│                                                             │
│   GitHub Webhook ──→ Build ──→ Deploy to CDN ──→ Live Site  │
│   (auto-trigger)     (~60s)    (global edge)     (fast!)    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼ user visits
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                            │
│                                                             │
│   Static HTML ──→ React Hydration ──→ Interactive Site      │
│   (instant)       (JS loads)          (animations work)     │
│                                                             │
│   External Loads (lazy):                                    │
│   ├── HuggingFace Space (iframe)                            │
│   ├── GitHub Stats (API or static image)                    │
│   └── Particles (JS library)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key insight:** Nothing runs on a server at request time. The "server" is just a CDN serving pre-built files. This is why it's free, fast, and secure.

---

## 2. Routing Architecture

### 2.1 How Next.js App Router Works

In Next.js, **the folder structure IS the routing**. Every folder inside `/app` that contains a `page.js` becomes a URL route. You don't configure routes manually.

```
File System                          URL
─────────────────────────────────────────────────
app/
├── page.js                    →    /                  (landing page)
├── layout.js                  →    (wraps ALL pages)
├── not-found.js               →    /any-invalid-url   (404 page)
└── project/
    └── [slug]/
        └── page.js            →    /project/zenalyst-llm-platform
                                    /project/factor-investing
                                    /project/banking-score
                                    /project/football-cv-analysis
                                    /project/ieee-ssl-research
                                    (auto-generated from data)
```

### 2.2 Route Details

| Route | File | Type | Purpose |
|-------|------|------|---------|
| `/` | `app/page.js` | Static (SSG) | Landing page with all sections |
| `/project/[slug]` | `app/project/[slug]/page.js` | Static (SSG) | Individual project detail page |
| `/*` (404) | `app/not-found.js` | Static | Custom "page not found" |

### 2.3 Dynamic Route Generation

The `[slug]` in the folder name means it's a **dynamic route** — one component that generates multiple pages. Next.js needs to know all possible slugs at build time (since we're doing SSG). We tell it using `generateStaticParams`:

```
Build time:
                                    ┌──→ /project/zenalyst-llm-platform
data/projects.js ──→ generateStatic │──→ /project/factor-investing
(has 5 projects)     Params()       │──→ /project/banking-score
                                    │──→ /project/football-cv-analysis
                                    └──→ /project/ieee-ssl-research

Each becomes a separate HTML file on the CDN.
```

### 2.4 Navigation Flow

```
User lands on /
│
├── Scrolls through sections (smooth scroll, single page)
│   ├── #hero
│   ├── #about
│   ├── #projects ──→ Clicks project card ──→ /project/[slug]
│   │                                              │
│   │                  ← Back to Projects ──────────┘
│   ├── #skills
│   ├── #research
│   ├── #timeline
│   ├── #resume ──→ Downloads PDF
│   └── #contact ──→ Opens email client / LinkedIn
│
├── Navbar (always visible)
│   ├── Section links → smooth scroll to #section
│   ├── Theme toggle → dark/light switch
│   └── Logo/Name → scroll to top
│
└── 404 → Custom "not found" page with link back to /
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
app/layout.js (Root Layout)
│
├── <ThemeProvider>                    ← Manages dark/light mode state
│   ├── <Navbar />                    ← Fixed top bar, always visible
│   │   ├── Logo/Name
│   │   ├── NavLinks (scroll to sections)
│   │   ├── ThemeToggle (sun/moon icon)
│   │   └── MobileMenu (hamburger, full-screen overlay)
│   │
│   ├── <main>
│   │   ├── [page content]            ← Either landing page or project page
│   │   └── ...
│   │
│   ├── <Footer />                    ← Bottom bar with socials + copyright
│   └── <Analytics />                 ← Vercel analytics (invisible)
│
│
app/page.js (Landing Page "/" )
│
├── <Hero />
│   ├── <ParticleBackground />        ← Neural network particles (lazy)
│   ├── Name + <TypeWriter />         ← Typing animation
│   ├── CTA Buttons
│   └── Social Icons
│
├── <About />
│   ├── <SectionHeader />             ← "$ cat about.md"
│   ├── <TerminalWindow />            ← Terminal chrome wrapper
│   ├── Bio text
│   └── Stats row
│
├── <Projects />
│   ├── <SectionHeader />             ← "$ ls projects/"
│   ├── Filter tabs (All | ML/AI | Data | CV | Finance)
│   └── <ProjectCard /> × N           ← Grid of cards
│       ├── Title, description
│       ├── Tech tags
│       ├── Status badge
│       └── Links (GitHub, Demo, Details →)
│
├── <Skills />
│   ├── <SectionHeader />             ← "$ skills --list"
│   └── <TerminalWindow />
│       └── <SkillCategory /> × N     ← Terminal-style output per category
│
├── <Research />
│   ├── <SectionHeader />             ← "$ cat research.md"
│   └── Research cards/entries
│
├── <Timeline />
│   ├── <SectionHeader />             ← "$ git log --oneline"
│   └── <TimelineNode /> × N          ← Vertical timeline with scroll reveal
│       ├── Date
│       ├── Title
│       ├── Description
│       └── Status (past / present / future)
│
├── <Resume />
│   ├── <SectionHeader />
│   ├── PDF embed/preview
│   └── Download button
│
└── <Contact />
    ├── <SectionHeader />             ← "$ ping rana"
    └── Social links + email


app/project/[slug]/page.js (Project Detail Page)
│
├── Back button (← Back to Projects)
├── Title + Status badge
├── Description (long form)
├── Tech stack pills
├── Metrics cards (if available)
├── <HuggingFaceEmbed />              ← Lazy-loaded iframe (if project has demo)
├── Screenshots/images (if available)
├── GitHub link button
└── Related projects
```

### 3.2 Component Classification

Components fall into 3 categories based on how they render:

| Type | What it means | Examples |
|------|--------------|---------|
| **Server Component** (default) | Renders on the server at build time. No JavaScript shipped. Best for static content. | SectionHeader, Footer, About text, Research entries |
| **Client Component** (`'use client'`) | Renders in the browser. Has interactivity (state, effects, event handlers). Ships JavaScript. | Navbar (scroll spy), ThemeToggle, TypeWriter, ParticleBackground, ProjectCard (hover), HuggingFaceEmbed |
| **Hybrid** | Server component that wraps client components | Projects section (server) containing ProjectCard (client) |

**Rule of thumb:** Keep components as Server Components unless they need:
- `useState` or `useEffect` (React hooks)
- Browser APIs (`window`, `localStorage`, `IntersectionObserver`)
- Event handlers (`onClick`, `onHover`)
- Third-party client libraries (Framer Motion, tsparticles)

**Why this matters:** Server Components ship zero JavaScript. The more you keep on the server, the faster your site loads. Only send JS for things that actually need interactivity.

```
                    ┌─────────────────────────┐
                    │   Server Components      │
                    │   (0 KB JS to browser)    │
                    │                          │
                    │   Layout, About text,    │
                    │   Research, Resume embed, │
                    │   Footer, SectionHeader   │
                    └────────────┬─────────────┘
                                 │ wraps
                    ┌────────────▼─────────────┐
                    │   Client Components       │
                    │   (JS shipped to browser) │
                    │                          │
                    │   Navbar, ThemeToggle,    │
                    │   TypeWriter, Particles,  │
                    │   ProjectCard, Timeline,  │
                    │   HuggingFaceEmbed        │
                    └──────────────────────────┘
```

---

## 4. Data Architecture

### 4.1 Content-as-Data Flow

There is NO database. All content lives in JavaScript files in the `/data` folder. Components import and render this data.

```
data/projects.js                   components/sections/Projects.jsx
┌──────────────────┐              ┌────────────────────────────┐
│ export const      │   import    │                            │
│ projects = [      │ ──────────→ │ projects.map(p =>          │
│   {               │              │   <ProjectCard             │
│     slug: "...",  │              │     title={p.title}        │
│     title: "...", │              │     tags={p.techStack}     │
│     ...           │              │     ...                    │
│   },              │              │   />                       │
│   { ... },        │              │ )                          │
│ ]                 │              │                            │
└──────────────────┘              └────────────────────────────┘
```

### 4.2 Data File Schemas

Each data file exports a structured array. Here's what each contains:

**`data/projects.js`**
```
[
  {
    slug              →  URL path (/project/this-value)
    title             →  Display name
    description       →  Short (1-2 sentences, for card)
    longDescription   →  Full writeup (for detail page)
    techStack         →  Array of tech names (for pills/tags)
    category          →  "ml-ai" | "data" | "cv" | "finance" | "fullstack"
    status            →  "live" | "in-progress" | "completed"
    featured          →  true/false (show on landing page)
    githubUrl         →  Link to repo
    liveUrl           →  Link to live demo (if any)
    huggingfaceUrl    →  HuggingFace Space URL (for embed)
    metrics           →  [{ label: "Accuracy", value: "99%" }, ...]
    images            →  Array of screenshot paths
    dateRange         →  "Feb 2025 - Mar 2025"
    order             →  Number for display ordering
  },
  ...
]
```

**`data/skills.js`**
```
[
  {
    category    →  "Programming" | "ML & AI" | "Libraries" | etc.
    command     →  Terminal command display ("$ skills --category ml")
    items       →  ["Python", "PyTorch", "XGBoost", ...]
  },
  ...
]
```

**`data/timeline.js`**
```
[
  {
    date        →  "May 2025"
    title       →  "Founding Developer @ Zenalyst"
    description →  Brief description
    type        →  "past" | "present" | "future"
    tags        →  ["LLMs", "RAG", "AWS"]
  },
  ...
]
```

**`data/socials.js`**
```
[
  { platform: "github", url: "https://github.com/blank-gun7", icon: "Github" },
  { platform: "linkedin", url: "https://linkedin.com/in/...", icon: "Linkedin" },
  { platform: "email", url: "mailto:ranacv2109@gmail.com", icon: "Mail" },
]
```

**`data/site-config.js`**
```
{
  name              →  "Rana Raunitraz Singh"
  title             →  "ML Engineer & Full-Stack Developer"
  description       →  SEO description
  url               →  "https://your-site.vercel.app"
  ogImage           →  "/images/og-image.png"
  sections          →  { hero: true, about: true, blog: false, ... }
  typewriterPhrases →  ["> building LLM systems...", "> ML engineer...", ...]
}
```

### 4.3 Data Flow for Project Detail Pages

```
User clicks ProjectCard for "banking-score"
          │
          ▼
Browser navigates to /project/banking-score
          │
          ▼
app/project/[slug]/page.js receives slug = "banking-score"
          │
          ▼
Imports data/projects.js
          │
          ▼
Finds project where slug === "banking-score"
          │
          ▼
Renders full project detail page with that project's data
```

At **build time**, Next.js has already pre-rendered all these pages as static HTML. The browser just receives the pre-built file — no computation needed.

---

## 5. State Management

### 5.1 State Map

This site has very little state (most content is static). Here's everything that needs to be managed:

| State | Scope | Storage | Trigger |
|-------|-------|---------|---------|
| Theme (dark/light) | Global | `localStorage` + `class` on `<html>` | User clicks toggle |
| Active nav section | Global | React state (Navbar) | Scroll position changes |
| Mobile menu open/closed | Navbar only | React state | User clicks hamburger |
| Project filter (active category) | Projects section only | React state | User clicks filter tab |
| Typewriter current phrase | Hero only | React state (hook) | Timer interval |
| HuggingFace iframe loaded | Per embed | React state | iframe onLoad event |

### 5.2 State Flow Diagram

```
Theme State:
┌──────────┐    click     ┌──────────────┐    update    ┌──────────┐
│ Toggle   │ ──────────→  │ useTheme()   │ ──────────→  │ <html    │
│ Button   │              │ hook         │              │ class=   │
│ (☀/🌙)  │              │              │              │ "dark">  │
└──────────┘              │ Reads/writes │              └──────────┘
                          │ localStorage │                    │
                          └──────────────┘                    │
                                                              ▼
                                                    Tailwind dark: classes
                                                    activate everywhere

Scroll Spy State:
┌──────────┐   scroll    ┌───────────────┐   update   ┌──────────┐
│ User     │ ─────────→  │ Intersection  │ ─────────→ │ Navbar   │
│ scrolls  │             │ Observer on   │            │ highlight│
│          │             │ each section  │            │ active   │
└──────────┘             └───────────────┘            │ link     │
                                                      └──────────┘
```

### 5.3 No State Management Library Needed

No Redux, no Zustand, no Context API (except for theme). The site is too simple to justify a state management library. Each component manages its own local state with `useState`.

---

## 6. Theme System Architecture

### 6.1 How Dark/Light Mode Works

```
Step 1: First visit
┌────────────────────────────────────────────┐
│ Browser: Does localStorage have a theme?   │
│   ├── YES → Use saved preference           │
│   └── NO → Check prefers-color-scheme      │
│            ├── dark → Set dark mode         │
│            └── light → Set dark mode anyway │
│                   (our default is dark)     │
└────────────────────────────────────────────┘

Step 2: Apply theme
┌────────────────────────────────────────────┐
│ Set class on <html>:                       │
│   <html class="dark">  or  <html class=""> │
│                                            │
│ Tailwind picks it up automatically:        │
│   bg-white dark:bg-[#0a0a0f]               │
│   ↑ light mode   ↑ dark mode               │
└────────────────────────────────────────────┘

Step 3: Toggle
┌────────────────────────────────────────────┐
│ User clicks ☀/🌙 button:                  │
│   1. Flip the class on <html>              │
│   2. Save new preference to localStorage   │
│   3. All dark: classes update instantly     │
└────────────────────────────────────────────┘
```

### 6.2 Flash Prevention (Important!)

**Problem:** On page load, if the browser renders HTML before JavaScript runs, users see a white flash before dark mode kicks in. This is called FOUC (Flash of Unstyled Content).

**Solution:** Inject a tiny inline script in `<head>` that runs BEFORE React:

```
Page load sequence:
  1. HTML starts parsing
  2. <head> inline script runs → reads localStorage → sets class="dark" on <html>
  3. CSS loads → dark mode styles apply immediately
  4. User sees dark page (no flash!)
  5. React hydrates → ThemeToggle becomes interactive
```

This is a common pattern and we'll implement it in the Root Layout.

---

## 7. Animation Architecture

### 7.1 Animation Inventory

| Element | Animation Type | Library | Load Strategy |
|---------|---------------|---------|---------------|
| Hero tagline | Typewriter (character by character) | Custom hook + CSS | Immediate (above fold) |
| Hero cursor | Blink (CSS) | Pure CSS | Immediate |
| Hero particles | Floating connected dots | tsparticles | Lazy load, disable on mobile |
| Section reveals | Fade-in + slide up on scroll | Framer Motion | Per-section, `viewport.once` |
| Project cards | Lift + border glow on hover | Tailwind + Framer Motion | On interaction |
| Timeline nodes | Staggered reveal on scroll | Framer Motion | Per-node |
| Nav active indicator | Smooth slide to active section | CSS transition | On scroll |
| Theme transition | Color fade (200ms) | CSS transition | On toggle |
| Page transitions | Fade between landing ↔ project page | Framer Motion | On navigation |

### 7.2 Animation Strategy

```
Above the fold (Hero):
┌─────────────────────────────────────┐
│ Load immediately, animate on mount  │
│ ├── TypeWriter: starts typing       │
│ ├── Cursor: CSS blink               │
│ ├── Particles: lazy load after hero │
│ └── CTA buttons: fade in with delay │
└─────────────────────────────────────┘

Below the fold (all other sections):
┌─────────────────────────────────────┐
│ Animate on scroll into viewport     │
│ ├── Each section: fade-in-up        │
│ ├── Cards: staggered fade-in        │
│ ├── Timeline: sequential reveal     │
│ └── viewport={{ once: true }}       │
│     (animate only first time)       │
└─────────────────────────────────────┘

On interaction:
┌─────────────────────────────────────┐
│ ├── Cards: scale(1.02) + glow      │
│ ├── Buttons: subtle press effect    │
│ ├── Links: color transition         │
│ └── Nav items: underline slide      │
└─────────────────────────────────────┘
```

### 7.3 Performance Guardrails

```
Accessibility check:
┌─────────────────────────────────────────┐
│ if (prefers-reduced-motion: reduce) {   │
│   ├── Disable typewriter → show static  │
│   ├── Disable particles → hide          │
│   ├── Disable scroll reveals → show all │
│   └── Keep hover effects (subtle)       │
│ }                                       │
└─────────────────────────────────────────┘

Mobile check:
┌─────────────────────────────────────────┐
│ if (screen < 640px) {                   │
│   ├── Disable particles (battery)       │
│   ├── Reduce animation durations        │
│   └── Simplify hover → tap states       │
│ }                                       │
└─────────────────────────────────────────┘
```

---

## 8. SEO Architecture

### 8.1 Metadata Strategy

Next.js App Router has a built-in Metadata API. Each page exports a `metadata` object or `generateMetadata` function.

```
Landing page (/):
┌──────────────────────────────────────────────────────┐
│ title: "Rana Raunitraz Singh | ML Engineer"           │
│ description: "AI/ML engineer building LLM systems..." │
│ og:image: "/images/og-image.png"                     │
│ og:type: "website"                                   │
│ twitter:card: "summary_large_image"                  │
│ canonical: "https://your-site.vercel.app"            │
└──────────────────────────────────────────────────────┘

Project pages (/project/[slug]):
┌──────────────────────────────────────────────────────┐
│ title: "Banking Score Prediction | Rana Singh"        │
│ description: (from project.description)              │
│ og:image: (project screenshot or default)            │
│ canonical: "https://your-site.vercel.app/project/..." │
│                                                      │
│ Generated dynamically per project using              │
│ generateMetadata() function                          │
└──────────────────────────────────────────────────────┘
```

### 8.2 SEO Checklist (Built Into Architecture)

```
Technical SEO:
├── ✅ Static HTML (search engines love it)
├── ✅ Semantic HTML (<header>, <main>, <nav>, <section>, <article>)
├── ✅ Heading hierarchy (one H1 per page, H2 for sections)
├── ✅ Meta tags on every page (via Metadata API)
├── ✅ OpenGraph tags (social sharing previews)
├── ✅ robots.txt (in /public)
├── ✅ sitemap.xml (auto-generated or manual in /public)
├── ✅ Canonical URLs (prevent duplicate content)
├── ✅ Alt text on all images
├── ✅ Fast load times (SSG + CDN)
└── ✅ Mobile-friendly (responsive design)

Structured Data (JSON-LD):
├── Person schema (name, job title, social links)
└── Embedded in <head> via Metadata API
```

---

## 9. External Integrations

### 9.1 Integration Map

```
Your Portfolio Site
│
├── HuggingFace Spaces (iframe embeds)
│   ├── Direction: Inbound (loads their page in your iframe)
│   ├── When: User visits a project detail page with a demo
│   ├── How: <iframe src="https://huggingface.co/spaces/..." />
│   ├── Lazy loaded: Yes (only when scrolled into view)
│   └── Fallback: Screenshot + "Open in HuggingFace" link
│
├── GitHub (stats display)
│   ├── Direction: Inbound (loads stats image)
│   ├── When: About section renders
│   ├── How: <img src="https://github-readme-stats.vercel.app/api?username=blank-gun7" />
│   ├── Lazy loaded: Yes
│   └── Fallback: Static text showing repo count / stars
│
├── Vercel Analytics (tracking)
│   ├── Direction: Outbound (sends anonymous page view data to Vercel)
│   ├── When: Every page load
│   ├── How: <Analytics /> component (1kb script)
│   └── Fallback: Site works fine without it
│
├── Google Fonts (via next/font)
│   ├── Direction: None at runtime (fonts downloaded at BUILD time)
│   ├── When: Build only — self-hosted after build
│   └── Fallback: System monospace / sans-serif
│
└── Resume PDF
    ├── Direction: Outbound (browser downloads from your CDN)
    ├── When: User clicks download
    ├── How: <a href="/resume.pdf" download>
    └── Stored: /public/resume.pdf
```

### 9.2 GitHub Stats — Decision: Static Image Approach

**Option A: API calls at runtime**  
- Pros: Always fresh data
- Cons: GitHub API rate limits (60/hour unauthenticated), loading delay, can fail

**Option B: Static image via github-readme-stats** ✅ Chosen  
- Pros: Cached, fast, no API key needed, never fails
- Cons: Updates on a delay (cached by service)
- URL: `https://github-readme-stats.vercel.app/api?username=blank-gun7&theme=dark`

We go with Option B — simpler, more reliable, fits the "ships fast, reliable" brand.

---

## 10. Build & Deployment Pipeline

### 10.1 Development Workflow

```
Local Development:
┌─────────────────────────────────────────────────┐
│                                                 │
│   1. Edit code in VSCode                        │
│              │                                  │
│              ▼                                  │
│   2. npm run dev (starts local server)          │
│      → Opens http://localhost:3000              │
│      → Hot reload (changes appear instantly)    │
│              │                                  │
│              ▼                                  │
│   3. Test in browser                            │
│      → Check all sections                       │
│      → Test dark/light mode                     │
│      → Test mobile (browser dev tools)          │
│              │                                  │
│              ▼                                  │
│   4. git add . && git commit && git push        │
│              │                                  │
│              ▼                                  │
│   5. Vercel auto-deploys (preview URL first)    │
│              │                                  │
│              ▼                                  │
│   6. Merge to main → production deploy          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 10.2 Git Branching Strategy

For a solo portfolio project, keep it simple:

```
main (production — what's live on the internet)
│
├── feature/hero-section
├── feature/projects-grid
├── feature/project-detail-page
├── feature/dark-mode
├── fix/mobile-nav
└── content/add-new-project

Workflow:
1. Create branch: git checkout -b feature/hero-section
2. Make changes, commit
3. Push: git push origin feature/hero-section
4. Vercel creates a preview deployment (unique URL to test)
5. If happy → merge to main
6. Vercel auto-deploys to production
```

### 10.3 Deployment Architecture

```
┌──────────┐     push     ┌──────────┐    webhook    ┌──────────────┐
│  Local   │ ──────────→  │  GitHub   │ ──────────→  │   Vercel     │
│  Dev     │              │  Repo     │              │   Platform   │
└──────────┘              └──────────┘               │              │
                                                     │  1. Clone    │
                                                     │  2. Install  │
                                                     │  3. Build    │
                                                     │  4. Deploy   │
                                                     └──────┬───────┘
                                                            │
                                                            ▼
                                                     ┌──────────────┐
                                                     │  Vercel CDN  │
                                                     │  (Global     │
                                                     │   Edge)      │
                                                     │              │
                                                     │  your-site.  │
                                                     │  vercel.app  │
                                                     └──────────────┘
                                                            │
                                                            ▼
                                                     ┌──────────────┐
                                                     │  User loads  │
                                                     │  static HTML │
                                                     │  from nearest│
                                                     │  edge node   │
                                                     └──────────────┘
```

### 10.4 Build Process Detail

```
npm run build
│
├── 1. Read all files in /app
├── 2. Read all data files in /data
├── 3. Generate static HTML for /
├── 4. Generate static HTML for each /project/[slug]
│      (reads projects.js → creates one HTML per project)
├── 5. Generate 404 page
├── 6. Optimize images (next/image)
├── 7. Inline critical CSS
├── 8. Tree-shake unused JS (remove dead code)
├── 9. Generate sitemap.xml
├── 10. Output to /.next/ directory
│
└── Result: A folder of static HTML, CSS, JS files
            ready to serve from any CDN
```

---

## 11. Performance Architecture

### 11.1 Loading Strategy

```
Critical Path (what loads FIRST):
┌───────────────────────────────────────┐
│ 1. HTML (pre-rendered, instant)       │
│ 2. Critical CSS (inlined by Next.js)  │
│ 3. Fonts (self-hosted via next/font)  │
│ 4. Hero content visible               │
│                                       │
│ Target: < 1.2s FCP                    │
└───────────────────────────────────────┘

Deferred (loads AFTER page is interactive):
┌───────────────────────────────────────┐
│ 5. Framer Motion JS                  │
│ 6. Particles JS (hero background)    │
│ 7. Below-fold section JS             │
│                                       │
│ Target: < 2.5s LCP                   │
└───────────────────────────────────────┘

Lazy (loads only WHEN NEEDED):
┌───────────────────────────────────────┐
│ 8. HuggingFace iframe (on scroll)    │
│ 9. GitHub stats image (on scroll)    │
│ 10. Project detail page JS (on nav)  │
│                                       │
│ Loaded via: dynamic import or         │
│ IntersectionObserver                  │
└───────────────────────────────────────┘
```

### 11.2 Image Optimization

```
All images go through next/image:
┌─────────────┐         ┌──────────────────────┐
│ Original    │  build  │ Optimized outputs:   │
│ screenshot  │ ──────→ │ ├── .webp (smaller)  │
│ .png (2MB)  │         │ ├── Multiple sizes   │
│             │         │ │   (640, 768, 1024)  │
│             │         │ ├── Lazy loaded       │
│             │         │ └── Blur placeholder  │
└─────────────┘         └──────────────────────┘
```

---

## 12. Error Handling

### 12.1 Error Boundaries

```
What could go wrong:             How we handle it:
─────────────────────────────────────────────────────
HuggingFace Space fails to load  → Show fallback screenshot + link
GitHub stats image fails         → Show static text alternative
Particles crash on old browser   → Catch error, hide particles
Invalid project slug in URL      → Next.js not-found.js (404 page)
JavaScript fails to load         → Static HTML still readable (SSG!)
User has JS disabled             → Static HTML still readable (SSG!)
```

### 12.2 Graceful Degradation Principle

```
Full experience (modern browser + JS):
  Particles + Typing + Scroll animations + Embeds

JS disabled or fails:
  Static HTML still shows ALL content
  No animations, no embeds
  Still fully functional and readable

Old browser:
  Modern CSS may break slightly
  Content still accessible
  Tailwind handles fallbacks
```

---

## 13. Security Considerations

| Concern | Risk | Mitigation |
|---------|------|-----------|
| XSS via project data | Low (data is local, not user-input) | Data files are developer-controlled, no user input |
| iframe risks (HuggingFace) | Low | `sandbox` attribute on iframes, CSP headers |
| Dependency vulnerabilities | Medium | `npm audit` regularly, pin versions |
| Email harvesting (contact section) | Medium | Use `mailto:` link (no exposed text), consider obfuscation |
| DDoS | Low | Vercel has built-in DDoS protection on CDN |

---

## 14. Testing Strategy

| Level | What | Tool | When |
|-------|------|------|------|
| Visual | Does it look right? | Browser + DevTools | During development |
| Responsive | Works on mobile/tablet? | Chrome DevTools device mode | Per component |
| Performance | Lighthouse scores ≥ 90? | Chrome Lighthouse | Before each deploy |
| Accessibility | WCAG AA compliant? | Chrome Lighthouse + axe | Before each deploy |
| Cross-browser | Chrome, Firefox, Safari? | Manual testing | Before v1 launch |
| Links | All links work? | Manual click-through | Before v1 launch |
| Dark/Light mode | Both modes look correct? | Manual toggle test | Per component |

---

## 15. Content Update Workflow

How you'll maintain the site after v1 launch:

```
Adding a new project:
┌─────────────────────────────────────────────────┐
│ 1. Open data/projects.js                        │
│ 2. Add new project object to the array          │
│ 3. (Optional) Add screenshots to public/images/ │
│ 4. git add, commit, push                        │
│ 5. Vercel auto-deploys (~60 seconds)            │
│ 6. New project appears on site ✅                │
│                                                 │
│ Time: ~10-15 minutes                            │
│ Code changes: ZERO (only data file)             │
└─────────────────────────────────────────────────┘

Updating resume:
┌─────────────────────────────────────────────────┐
│ 1. Replace public/resume.pdf with new version   │
│ 2. git add, commit, push                        │
│ 3. Done ✅                                       │
│                                                 │
│ Time: ~2 minutes                                │
└─────────────────────────────────────────────────┘

Toggling a section on/off:
┌─────────────────────────────────────────────────┐
│ 1. Open data/site-config.js                     │
│ 2. Set sections.blog = true (or false)          │
│ 3. git add, commit, push                        │
│ 4. Section appears/disappears ✅                 │
│                                                 │
│ Time: ~5 minutes                                │
└─────────────────────────────────────────────────┘
```

---

## 16. Sign-off

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | Rana Raunitraz Singh | | Pending |
| Developer | Rana Raunitraz Singh | | Pending |
| Architect | Claude (AI Pair) | Feb 10, 2026 | Drafted |

---

*Next Steps: Low-Level Design (LLD) → Implementation*
