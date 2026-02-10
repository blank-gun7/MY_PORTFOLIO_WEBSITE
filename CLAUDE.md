# CLAUDE.md — Portfolio Website Project Rules

## Identity

This is a personal portfolio website for Rana Raunitraz Singh, an AI/ML engineer and full-stack developer. It uses Next.js 14 (App Router), JavaScript (NOT TypeScript), Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Critical Rules — NEVER Violate

### 1. NO GUESSING
- If you are unsure about ANY implementation detail, STOP and ask.
- Do NOT assume file paths, variable names, API signatures, or library behavior.
- Do NOT hallucinate package APIs. If unsure about a library's API, read its docs or check node_modules.
- If a task is ambiguous, ask for clarification before writing a single line.

### 2. NO TYPESCRIPT
- This project uses **JavaScript (.js, .jsx)** ONLY.
- Do NOT create .ts or .tsx files.
- Do NOT add TypeScript dependencies.
- Do NOT add type annotations, interfaces, or generics.
- If you accidentally create a .ts file, delete it and recreate as .js.

### 3. NO UNNECESSARY DEPENDENCIES
- Before installing ANY new package, state WHY it's needed and get approval.
- The approved dependency list is in the PRD. Do not add beyond this without explicit permission.
- Approved packages: `next`, `react`, `react-dom`, `tailwindcss`, `framer-motion`, `lucide-react`, `@tsparticles/react`, `@tsparticles/slim`, `@vercel/analytics`, `prettier`, `eslint-config-prettier`.

### 4. TEST AFTER EVERY CHANGE
- After creating or modifying ANY file, run `npm run build` to verify no build errors.
- After completing a component, visually verify it renders by checking in the browser.
- After modifying `tailwind.config.js`, verify custom classes work.
- After modifying `next.config.js`, restart the dev server.
- NEVER assume a change works — verify it.

### 5. NO SILENT FAILURES
- Every component that loads external resources (iframes, images, APIs) MUST have error handling and a fallback UI.
- Every dynamic import MUST have a loading state.
- Console errors are bugs. Fix them immediately.

### 6. ACCESSIBILITY IS NOT OPTIONAL
- Every `<img>` needs `alt` text.
- Every icon-only button needs `aria-label`.
- Every section needs a proper heading (can be `sr-only` behind terminal headers).
- All interactive elements must be keyboard accessible.
- Color contrast must pass WCAG AA (4.5:1 ratio).

## Project Structure

```
portfolio/
├── app/
│   ├── layout.js              # Root layout — fonts, metadata, theme, nav, footer
│   ├── page.js                # Landing page — all sections
│   ├── globals.css            # Tailwind imports + custom CSS
│   ├── not-found.js           # Custom 404
│   └── project/
│       └── [slug]/
│           └── page.js        # Dynamic project detail page
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Research.jsx
│   │   ├── Timeline.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx
│   ├── ui/
│   │   ├── TerminalWindow.jsx
│   │   ├── TypeWriter.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── TimelineNode.jsx
│   │   ├── SkillCategory.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── ParticleBackground.jsx
│   │   └── ScrollReveal.jsx
│   └── embeds/
│       └── HuggingFaceEmbed.jsx
├── data/
│   ├── projects.js
│   ├── experiences.js
│   ├── skills.js
│   ├── timeline.js
│   ├── socials.js
│   └── site-config.js
├── hooks/
│   ├── useTypewriter.js
│   └── useTheme.js
├── lib/
│   └── utils.js
├── public/
│   ├── resume.pdf
│   ├── images/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.js
├── next.config.js
├── package.json
└── CLAUDE.md (this file)
```

## Architecture Rules

### Server vs Client Components
- **Default is Server Component.** Do NOT add `'use client'` unless the component needs:
  - `useState`, `useEffect`, `useRef`, or other React hooks
  - Browser APIs (`window`, `localStorage`, `IntersectionObserver`)
  - Event handlers (`onClick`, `onHover`, `onChange`)
  - Third-party client libraries (Framer Motion, tsparticles)
- Components that MUST be client: Navbar, ThemeToggle, TypeWriter, ParticleBackground, ProjectCard, ScrollReveal, HuggingFaceEmbed, Experience (hover effects), Projects (filter state), Timeline (scroll animations)
- Components that MUST be server: SectionHeader, TerminalWindow, Footer, layout.js, page.js

### Data Flow
- ALL content lives in `/data/*.js` files.
- Components IMPORT data — they do NOT hardcode content.
- To add a new project: edit `data/projects.js` ONLY. No component changes.
- To toggle a section: edit `data/site-config.js` ONLY.

### Styling
- Use Tailwind utility classes. Do NOT write custom CSS unless absolutely necessary.
- Dark mode: Use `dark:` prefix classes. Theme is controlled by `class` on `<html>`.
- Use design tokens defined in `tailwind.config.js` — do NOT hardcode colors.
- Correct: `text-accent-green`, `bg-bg-primary`
- Wrong: `text-[#4ade80]`, `bg-[#0a0a0f]` (unless the token doesn't exist yet)

### Routing
- Landing page: `app/page.js` — all sections rendered with anchor IDs
- Project detail: `app/project/[slug]/page.js` — dynamic route
- 404: `app/not-found.js`
- NO other routes in v1.

## Code Style

### File Conventions
- Components: PascalCase (`ProjectCard.jsx`)
- Data files: kebab-case or camelCase (`site-config.js`, `projects.js`)
- Hooks: camelCase with `use` prefix (`useTypewriter.js`)
- One component per file. No barrel exports (no `index.js` re-exports).

### Component Template
```jsx
// For client components:
'use client';

import { useState } from 'react';

export default function ComponentName({ prop1, prop2 }) {
  // State
  // Effects
  // Handlers
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// For server components (no 'use client', no hooks):
export default function ComponentName({ prop1, prop2 }) {
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Import Order
```jsx
// 1. React/Next.js imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party libraries
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

// 3. Local components
import SectionHeader from '@/components/ui/SectionHeader';
import TerminalWindow from '@/components/ui/TerminalWindow';

// 4. Data/hooks/utils
import { projects } from '@/data/projects';
import { useTypewriter } from '@/hooks/useTypewriter';
```

## Testing Checklist — Run Before Every Commit

```bash
# 1. Build succeeds
npm run build

# 2. No lint errors
npm run lint

# 3. Dev server runs without console errors
npm run dev
# Open http://localhost:3000 — check browser console for errors

# 4. Visual checks
# - All sections render
# - Dark mode works
# - Light mode works
# - Mobile layout (resize browser to 375px width)
# - All links/buttons clickable
# - No text overflow or clipping
```

## Common Pitfalls — Avoid These

1. **`'use client'` placement**: Must be the VERY FIRST LINE of the file. Not after imports.
2. **`next/image` with static export**: We use `output: 'export'` so `images.unoptimized` must be `true` in `next.config.js`. Use standard `<img>` tags or `next/image` with `unoptimized` prop.
3. **Hydration mismatches**: Do NOT conditionally render based on `window` or `localStorage` during initial render. Use `useEffect` to read browser-only values AFTER mount.
4. **Theme flash**: The inline script in `layout.js` `<head>` prevents white flash. Do NOT remove it.
5. **Framer Motion + Server Components**: Framer Motion components (`motion.div`) can only be used inside `'use client'` components. Do NOT use them directly in server components.
6. **Dynamic imports**: Use `next/dynamic` with `{ ssr: false }` for browser-only libraries like tsparticles.
7. **Link component**: Use `<Link>` from `next/link` for internal navigation, plain `<a>` for external links and anchor scrolling.
8. **generateStaticParams**: Required in `app/project/[slug]/page.js` for static export. Must return all possible slugs from `data/projects.js`.

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 90 |
| Lighthouse Best Practices | ≥ 90 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Initial JS bundle | < 150kb gzipped |

## When Stuck

1. Read the error message carefully — it usually tells you exactly what's wrong.
2. Check if it's a Server vs Client component issue.
3. Check if it's a hydration mismatch (browser vs server rendering difference).
4. Run `npm run build` — build errors are more descriptive than dev server errors.
5. If truly stuck, describe the exact error and what you've tried. Do not guess at fixes.
