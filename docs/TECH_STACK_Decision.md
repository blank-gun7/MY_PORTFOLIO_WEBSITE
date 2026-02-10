# Tech Stack Decision Document
# Portfolio Website — Rana Raunitraz Singh

**Version:** 1.0  
**Date:** February 10, 2026  
**Status:** Draft — Awaiting Sign-off  
**Depends on:** PRD v1.0

---

## 1. Decision Summary

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14 (App Router) | SSG, file-based routing, SEO built-in, Vercel-native |
| **Language** | JavaScript (JSX) | Matches current skill level; TypeScript migration path later |
| **Styling** | Tailwind CSS v3 | Utility-first, fast prototyping, dark mode built-in |
| **Animations** | Framer Motion | React-native animation library, handles scroll reveals + typing |
| **Hosting** | Vercel (free tier) | Zero-config Next.js deployment, analytics included |
| **Analytics** | Vercel Analytics (free) | Cookieless, privacy-friendly, built-in |
| **Icons** | Lucide React | Lightweight, tree-shakeable, clean icons |
| **Fonts** | Google Fonts (JetBrains Mono + Inter) | Free, `next/font` optimized loading |
| **Particles** | tsparticles (react) | Lightweight particle background for hero |
| **PDF Viewer** | Native browser embed | Zero dependency, `<embed>` or `<iframe>` for resume |
| **Version Control** | Git + GitHub | Standard, connects to Vercel for auto-deploy |
| **Package Manager** | npm | Ships with Node.js, no extra install |
| **Linting** | ESLint (Next.js default) | Catches errors, enforces consistency |
| **Formatting** | Prettier | Auto-formatting, no style debates |

---

## 2. Detailed Decisions & Reasoning

### 2.1 Framework: Next.js 14 (App Router)

**What it is:**  
Next.js is a React framework by Vercel. Think of it as React with superpowers — it adds routing, server-side rendering, static site generation, image optimization, and SEO tools that React alone doesn't have. The "App Router" is their latest routing system (introduced in v13, stable in v14).

**Why Next.js over alternatives:**

| Feature | Next.js | Vite + React | Astro | Gatsby |
|---------|---------|-------------|-------|--------|
| Static Site Generation (SSG) | ✅ Built-in | ❌ Manual setup | ✅ Built-in | ✅ Built-in |
| File-based routing | ✅ Automatic | ❌ Need react-router | ✅ Automatic | ✅ Automatic |
| SEO (meta tags, sitemap) | ✅ First-class | ❌ Manual | ✅ Good | ✅ Good |
| Image optimization | ✅ `next/image` | ❌ Manual | ✅ Built-in | ✅ Built-in |
| Font optimization | ✅ `next/font` | ❌ Manual | ❌ Manual | ❌ Manual |
| Vercel deployment | ✅ Zero-config | ⚠️ Needs config | ⚠️ Needs config | ⚠️ Needs config |
| React ecosystem compatible | ✅ Full | ✅ Full | ⚠️ Partial | ✅ Full |
| Learning investment value | ✅ Industry standard | ⚠️ Just React | ⚠️ Niche | ❌ Declining |
| Community & jobs | ✅ Massive | ✅ Large | ⚠️ Growing | ❌ Shrinking |

**Why NOT Astro:**  
Astro is excellent for static sites and would technically be simpler. However, (a) it uses a non-standard component syntax you'd have to learn separately, (b) React component support is partial, (c) the job market value of Astro is much lower than Next.js. Since this is also a learning project, Next.js gives you more career ROI.

**Why NOT Gatsby:**  
Gatsby's ecosystem is declining. Its GraphQL data layer is overkill for a portfolio. Community support is dwindling. Not a good investment.

**Why App Router over Pages Router:**  
App Router is the future of Next.js. Pages Router still works but is in maintenance mode. Learning App Router now means you won't need to relearn later. Key concepts:
- `/app` directory for routes
- `layout.js` and `page.js` convention
- Server Components by default (better performance)
- `'use client'` directive for interactive components

**Key Concept — Static Site Generation (SSG):**  
At build time, Next.js pre-renders every page into static HTML. When someone visits your site, they get instant HTML — no server needed. This is why it's free to host and blazing fast. Your portfolio has no dynamic data that changes per-request, so SSG is perfect.

```
Build time: Next.js generates HTML for every page
                ↓
Deploy: Static HTML + JS uploaded to Vercel CDN
                ↓
Visit: User gets pre-built HTML instantly (fast!)
                ↓
Hydration: React "wakes up" the page for interactivity
```

---

### 2.2 Language: JavaScript (JSX), NOT TypeScript

**Decision:** Use plain JavaScript with JSX syntax.

**Why not TypeScript (yet):**
- You know basics but haven't used it in a project
- Learning Next.js + TypeScript simultaneously doubles cognitive load
- Portfolio is content-heavy, not logic-heavy — TypeScript's benefits are smaller here
- You can migrate file-by-file later (rename `.js` → `.tsx`, add types gradually)

**Migration path (v2):**
```
v1: JavaScript (.js, .jsx)
      ↓ after site is live and stable
v2: Rename files to .tsx one at a time
      ↓ add types to data files first (projects.ts, skills.ts)
      ↓ then components
      ↓ then utility functions
```

**What you'll still learn:**
Even without TypeScript, Next.js App Router teaches you: file-based routing, layout patterns, server vs client components, metadata API, static generation, image optimization. These concepts carry over identically to TypeScript.

---

### 2.3 Styling: Tailwind CSS v3

**What it is:**  
A utility-first CSS framework. Instead of writing CSS in separate files, you apply small utility classes directly in your JSX. Sounds messy, but it's extremely fast for development and produces tiny CSS bundles.

**Example — traditional CSS vs Tailwind:**
```jsx
/* Traditional CSS */
// styles.css
.card { background: #12121a; border-radius: 8px; padding: 24px; }
// component.jsx
<div className="card">...</div>

/* Tailwind */
// No CSS file needed
<div className="bg-[#12121a] rounded-lg p-6">...</div>
```

**Why Tailwind:**
| Factor | Tailwind | Plain CSS | CSS Modules | Styled Components |
|--------|----------|-----------|-------------|-------------------|
| Speed of development | ✅ Fastest | ⚠️ Slow | ⚠️ Medium | ⚠️ Medium |
| Dark mode support | ✅ `dark:` prefix | ❌ Manual | ❌ Manual | ❌ Manual |
| Responsive design | ✅ `md:`, `lg:` prefixes | ❌ Media queries | ❌ Media queries | ❌ Media queries |
| Bundle size | ✅ Tiny (purges unused) | ⚠️ Depends | ⚠️ Medium | ❌ Runtime cost |
| Learning curve for you | ✅ You've used it | ⚠️ Already know | ⚠️ New concept | ⚠️ New concept |
| Next.js integration | ✅ First-class | ✅ Works | ✅ Works | ⚠️ SSR complications |

**Dark mode strategy with Tailwind:**
```jsx
// tailwind.config.js
module.exports = { darkMode: 'class', ... }

// In components — just prefix with dark:
<div className="bg-white dark:bg-[#0a0a0f] text-black dark:text-[#e4e4e7]">
```
When we toggle a `dark` class on `<html>`, every `dark:` prefixed style activates. Clean and maintainable.

**Custom Design Tokens:**  
We'll extend Tailwind's config with our color palette from the PRD:
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      terminal: {
        bg: '#0d1117',
        green: '#4ade80',
        text: '#e4e4e7',
        muted: '#a1a1aa',
      }
    },
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
      sans: ['Inter', 'sans-serif'],
    }
  }
}
```

---

### 2.4 Animations: Framer Motion

**What it is:**  
The most popular React animation library. Declarative — you describe what you want, not how to do it.

**Why Framer Motion over alternatives:**

| Library | Pros | Cons | Verdict |
|---------|------|------|---------|
| Framer Motion | Declarative, scroll-triggered, layout animations, React-native | 40kb bundle | ✅ Best for React |
| GSAP | Powerful, industry standard | Imperative, learning curve, licensing | ❌ Overkill |
| CSS animations only | Zero bundle cost | Hard to do scroll-triggered, no orchestration | ❌ Too limited |
| Anime.js | Lightweight | Not React-native, imperative | ❌ Friction with React |
| AOS (Animate on Scroll) | Simple scroll reveals | Limited, jQuery-era feel | ❌ Outdated |

**What we'll use it for:**
```
Hero:       Typewriter effect (custom hook + Framer Motion for cursor blink)
Sections:   Fade-in-up on scroll (IntersectionObserver + motion.div)
Cards:      Hover lift + border glow
Timeline:   Staggered node reveals on scroll
Navigation: Smooth scroll-spy indicator
Theme:      Smooth color transitions
```

**Bundle concern:**  
Framer Motion is ~40kb gzipped. For a portfolio this is acceptable. We'll tree-shake unused features and lazy-load it only for interactive sections.

**Example — scroll reveal:**
```jsx
import { motion } from 'framer-motion';

// Component fades in and slides up when it enters viewport
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  <ProjectCard />
</motion.div>
```

---

### 2.5 Hosting: Vercel (Free Tier)

**What it is:**  
Vercel is the company that made Next.js. Their free "Hobby" tier hosts personal projects at zero cost. Deploying a Next.js app to Vercel is literally: connect GitHub repo → done.

**Free tier limits (more than enough):**

| Resource | Limit | Your Expected Usage |
|----------|-------|-------------------|
| Bandwidth | 100 GB/month | ~1-2 GB (portfolio) |
| Builds | 6000 min/month | ~50 min (rare deploys) |
| Serverless functions | 100 GB-hrs/month | 0 (fully static site) |
| Domains | Unlimited subdomains | 1 (`your-name.vercel.app`) |
| Analytics | Free tier included | ✅ |
| SSL/HTTPS | ✅ Automatic | ✅ |
| CDN | ✅ Global edge network | ✅ |

**Why NOT GitHub Pages:**
- GitHub Pages serves static HTML only — no Next.js SSG features, no `next/image` optimization, no analytics
- You'd have to use `next export` which loses several Next.js features
- Vercel gives you everything for free with zero tradeoff

**Why NOT Netlify:**
- Very similar to Vercel, but Next.js is a Vercel product — they'll always have the best integration
- Netlify's Next.js adapter sometimes lags behind

**Deployment flow:**
```
You push code to GitHub
        ↓ (automatic webhook)
Vercel detects the push
        ↓
Vercel runs `next build` (generates static HTML)
        ↓
Deploys to global CDN
        ↓
Live at your-name.vercel.app in ~60 seconds
```

**Custom domain (future):**  
When you're ready to buy a domain (e.g., `ranasingh.dev`), Vercel lets you connect it in 2 clicks. No migration needed.

---

### 2.6 Analytics: Vercel Analytics

**What it is:**  
Built-in, cookieless, privacy-friendly analytics that come free with Vercel hosting.

**What it tracks:**
- Page views & unique visitors
- Top pages (which projects get most clicks)
- Referral sources (where visitors come from — LinkedIn? GitHub? Google?)
- Geography
- Device types
- Web Vitals (real performance metrics from real users)

**Why NOT Google Analytics:**
- Requires cookie consent banner (GDPR)
- Heavy script (~45kb) hurts performance
- Overkill for a portfolio
- Privacy concerns

**Why NOT Plausible/Umami:**
- Great tools, but require self-hosting (or paid plan) for full features
- Vercel Analytics is already there for free, zero setup

**Setup:** Literally one line:
```bash
npm install @vercel/analytics
```
```jsx
// app/layout.js
import { Analytics } from '@vercel/analytics/react';
export default function Layout({ children }) {
  return <html><body>{children}<Analytics /></body></html>;
}
```

---

### 2.7 Particle Background: tsparticles

**What it is:**  
A lightweight library for particle animations. The React wrapper (`@tsparticles/react`) integrates cleanly with Next.js.

**Why tsparticles over particles.js:**
- `particles.js` is abandoned (last update 2018)
- `tsparticles` is its actively maintained successor
- Better performance (requestAnimationFrame optimized)
- React component available
- Smaller bundle with modular imports

**Configuration:** Neural network / connected dots style:
```jsx
// Particles configured for subtle network graph effect
{
  particles: {
    number: { value: 50 },
    links: { enable: true, color: "#4ade80", opacity: 0.15 },
    move: { enable: true, speed: 0.5 },
    color: { value: "#4ade80" },
    opacity: { value: 0.3 },
    size: { value: 2 },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" }  // Connects to cursor
    }
  }
}
```

**Performance safeguard:**
- Only render on hero section (not full page)
- Disable on mobile (save battery, reduce jank)
- Respect `prefers-reduced-motion`
- Lazy load the library

---

### 2.8 Fonts: JetBrains Mono + Inter

**JetBrains Mono** (headings, terminal elements, code):
- Designed for developers, monospaced
- Excellent ligatures
- Reinforces the terminal aesthetic
- Free, open source

**Inter** (body text):
- Designed for screens, highly readable at small sizes
- Variable font (one file, all weights)
- Industry standard for tech products
- Free, open source

**Loading strategy — `next/font`:**  
Next.js has a built-in font optimization system. It downloads fonts at build time and self-hosts them — no external requests, no layout shift.

```jsx
// app/layout.js
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function Layout({ children }) {
  return (
    <html className={`${jetbrains.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Then in Tailwind: `font-mono` → JetBrains Mono, `font-sans` → Inter.

---

### 2.9 Icons: Lucide React

**What it is:**  
A fork of Feather Icons with more icons, actively maintained, and tree-shakeable (only imports what you use).

**Why NOT Font Awesome:**
- Massive bundle (even with tree shaking)
- Over-styled, doesn't match minimal aesthetic

**Why NOT Heroicons:**
- Good option too, but Lucide has more variety and is slightly more maintained

**Usage:**
```jsx
import { Github, Linkedin, Mail, Moon, Sun, ExternalLink } from 'lucide-react';

<Github size={20} className="text-terminal-green" />
```

---

### 2.10 PDF Resume: Native Browser Embed

**Decision:** No external PDF library. Use browser's native `<embed>` tag.

**Why:**
- Zero bundle cost
- Works in all modern browsers
- Scroll and zoom built-in
- Download button via `<a download>` attribute

```jsx
// Resume section
<embed src="/resume.pdf" type="application/pdf" width="100%" height="600px" />
<a href="/resume.pdf" download className="...">Download Resume</a>
```

**If native embed looks bad on mobile** (it sometimes does), we fallback to a screenshot preview + download button. This is a v1 decision we can revisit.

---

## 3. Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout (fonts, theme, nav, footer, analytics)
│   ├── page.js                   # Landing page (all sections)
│   ├── project/
│   │   └── [slug]/
│   │       └── page.js           # Dynamic project detail page
│   ├── globals.css               # Tailwind imports + custom CSS variables
│   └── not-found.js              # Custom 404 page
│
├── components/                   # Reusable UI components
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   ├── sections/                 # Landing page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Research.jsx
│   │   ├── Timeline.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx
│   ├── ui/                       # Small reusable components
│   │   ├── TerminalWindow.jsx    # Terminal chrome wrapper (dots, title bar)
│   │   ├── TypeWriter.jsx        # Typing animation component
│   │   ├── ProjectCard.jsx
│   │   ├── TimelineNode.jsx
│   │   ├── SkillCategory.jsx
│   │   ├── SectionHeader.jsx     # Terminal-style $ headers
│   │   ├── ParticleBackground.jsx
│   │   └── ScrollReveal.jsx      # Framer Motion scroll wrapper
│   └── embeds/
│       └── HuggingFaceEmbed.jsx  # Lazy-loaded HF Space iframe
│
├── data/                         # Content-as-data (EDIT THESE to update site)
│   ├── projects.js               # All project data
│   ├── skills.js                 # Categorized skills
│   ├── timeline.js               # Career timeline entries
│   ├── socials.js                # Social links
│   └── site-config.js            # Feature flags, metadata, SEO defaults
│
├── hooks/                        # Custom React hooks
│   ├── useTypewriter.js          # Typing animation logic
│   └── useTheme.js               # Dark/light mode logic
│
├── lib/                          # Utility functions
│   ├── utils.js                  # Helper functions
│   └── constants.js              # Shared constants
│
├── public/                       # Static files (served as-is)
│   ├── resume.pdf                # Downloadable resume
│   ├── images/
│   │   ├── projects/             # Project screenshots
│   │   └── og-image.png          # Social sharing preview image
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml               # Auto-generated or manual
│
├── tailwind.config.js            # Tailwind theme, colors, fonts
├── next.config.js                # Next.js configuration
├── package.json
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

**Key principle:** To add a new project, you ONLY touch `data/projects.js`. No component code changes. The `[slug]` dynamic route auto-generates the page.

---

## 4. Development Environment Setup

### 4.1 Prerequisites
```bash
# Required
node --version    # v18.17+ (LTS recommended: v20.x)
npm --version     # v9+
git --version     # any recent version

# Your Mac should have these. If not:
# Install Node.js via: https://nodejs.org (LTS version)
```

### 4.2 Project Initialization
```bash
# Create Next.js project (we'll run this together)
npx create-next-app@latest portfolio --js --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Install dependencies
cd portfolio
npm install framer-motion lucide-react @tsparticles/react @tsparticles/slim
npm install @vercel/analytics

# Dev dependencies
npm install -D prettier eslint-config-prettier
```

### 4.3 VSCode Extensions (Recommended)
```
- Tailwind CSS IntelliSense     # Autocomplete for Tailwind classes
- ESLint                        # Error highlighting
- Prettier                      # Auto-formatting
- ES7+ React/Redux Snippets     # Component boilerplate shortcuts
- Auto Rename Tag               # HTML tag pairing
```

### 4.4 Git + Vercel Setup
```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial setup: Next.js + Tailwind + Framer Motion"
git remote add origin https://github.com/blank-gun7/portfolio.git
git push -u origin main

# Then on vercel.com:
# 1. Sign in with GitHub
# 2. Import the portfolio repo
# 3. Click Deploy
# Done — auto-deploys on every push to main
```

---

## 5. Dependency Budget

| Package | Size (gzipped) | Purpose | Essential? |
|---------|---------------|---------|-----------|
| next | ~90kb (framework) | Core framework | ✅ Yes |
| react + react-dom | ~42kb | UI library | ✅ Yes |
| tailwindcss | 0kb runtime (build tool) | Styling | ✅ Yes |
| framer-motion | ~40kb | Animations | ✅ Yes (core to UX) |
| lucide-react | ~2kb (tree-shaken) | Icons | ✅ Yes |
| @tsparticles/react + slim | ~25kb | Hero particles | ⚠️ Lazy-loaded |
| @vercel/analytics | ~1kb | Analytics | ✅ Yes |
| **Total initial JS** | **~175kb** | | Target: <150kb* |

*We'll hit <150kb by lazy-loading particles and Framer Motion for below-fold sections. The critical path (hero HTML + CSS) loads in <100kb.

---

## 6. Key Technical Decisions Log

| Decision | Chosen | Rejected | Rationale |
|----------|--------|----------|-----------|
| Framework | Next.js 14 | Vite+React, Astro, Gatsby | SSG + SEO + routing + career ROI |
| Language | JavaScript | TypeScript | Reduce learning surface; migrate later |
| Styling | Tailwind CSS | CSS Modules, Styled Components | Speed, dark mode, responsive utilities |
| Animations | Framer Motion | GSAP, CSS-only, AOS | Declarative, React-native, scroll support |
| Hosting | Vercel | GitHub Pages, Netlify | Zero-config Next.js, free analytics |
| Analytics | Vercel Analytics | Google Analytics, Plausible | Free, cookieless, zero setup |
| Particles | tsparticles | particles.js, custom canvas | Maintained, React wrapper, modular |
| PDF | Native embed | PDF.js, react-pdf | Zero bundle cost, good enough for v1 |
| Icons | Lucide React | Font Awesome, Heroicons | Lightweight, tree-shakeable, clean |
| Fonts | JetBrains Mono + Inter | Fira Code, Roboto Mono | Best mono for terminals + best sans for screens |

---

## 7. Risk Assessment (Tech-Specific)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Next.js learning curve slows development | Medium | Medium | I'll guide step-by-step; portfolio is simple scope |
| Framer Motion bundle bloats performance | Low | Medium | Lazy load, tree shake, measure with Lighthouse |
| tsparticles causes mobile jank | Medium | Medium | Disable on mobile, lazy load, test on real device |
| Vercel free tier limits | Low | Low | 100GB bandwidth is 50x what a portfolio needs |
| Dependency updates break things | Low | Low | Pin versions in package.json, update deliberately |
| `next/font` loading issues | Low | Low | Fallback fonts defined in Tailwind config |

---

## 8. Sign-off

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Owner | Rana Raunitraz Singh | | Pending |
| Developer | Rana Raunitraz Singh | | Pending |
| Technical Advisor | Claude (AI Pair) | Feb 10, 2026 | Drafted |

---

*Next Steps: High-Level Design (HLD) → Low-Level Design (LLD) → Implementation*
