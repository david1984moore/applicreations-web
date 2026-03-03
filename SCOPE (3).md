# SCOPE.md — applicreations-web
## Applicreations Marketing Site — Complete Build Specification

**Version:** 1.0  
**Created:** February 2026  
**Purpose:** Full technical and design specification for the Applicreations marketing site redesign  
**Optimized for:** Cursor AI workflow with two-step prompt pattern (analyze → confirm → implement)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Philosophy & System](#2-design-philosophy--system)
3. [Layout Architecture — The 3-Scroll Rule](#3-layout-architecture--the-3-scroll-rule)
4. [Technical Stack](#4-technical-stack)
5. [Project Structure](#5-project-structure)
6. [Component Specifications](#6-component-specifications)
7. [Content Guidelines](#7-content-guidelines)
8. [Mobile Strategy](#8-mobile-strategy)
9. [Navigation](#9-navigation)
10. [Pricing Architecture](#10-pricing-architecture)
11. [Contact & Quote Flow](#11-contact--quote-flow)
12. [Performance & SEO](#12-performance--seo)
13. [Cursor Workflow Rules](#13-cursor-workflow-rules)
14. [Build Order](#14-build-order)
15. [Launch Checklist](#15-launch-checklist)

---

## 1. Project Overview

### What This Is
The Applicreations public marketing site. The site that a Delaware small business owner lands on, reads in under 2 minutes, and decides to get a quote. Nothing more. Nothing less.

### The Core Problem Being Solved (by this site, for visitors)
A local business owner needs a professional website. They've seen DIY options and don't want them. They want someone they can trust to handle it. This site must communicate trust, competence, and value — immediately, without making them scroll forever.

### What This Site Is NOT
- Not a portfolio showcase site (that's a separate page)
- Not a blog or content hub
- Not an application (no auth, no database, no complex state)
- Not Introspect (that's a separate product)

### Success Definition
A visitor can reach the bottom of the desktop site in **3 full scrolls or fewer**. They understand exactly what Applicreations does, what it costs (approximately), and how to get started — before they hit the footer.

### Business Context
Applicreations serves Delaware small business owners who value expertise over DIY. Positioning is strategic partner, not commodity vendor. Price point is premium relative to Wix/Squarespace but reasonable relative to agencies. The brand competes on trust, process clarity, and outcomes — not on price.

---

## 2. Design Philosophy & System

### Core Philosophy
**Density-first, not whitespace-first.** The previous site used generous whitespace as a design principle. This site treats whitespace as a tool, not a default. Every section earns its vertical real estate.

Inspired by Jobs/Ive principles applied honestly: invisible complexity, earned simplicity, progressive disclosure. Not Apple's aesthetic — Applicreations' aesthetic. Delaware-rooted, professional, warm but precise.

### Color System — OKLCH

```css
:root {
  /* Primary — Deep professional blue */
  --color-primary: oklch(35% 0.18 250);
  --color-primary-hover: oklch(30% 0.20 250);
  --color-primary-light: oklch(95% 0.06 250);

  /* Accent — Delaware amber/gold */
  --color-accent: oklch(72% 0.18 75);
  --color-accent-hover: oklch(65% 0.20 75);

  /* Neutral scale */
  --color-text-primary: oklch(15% 0.02 250);
  --color-text-secondary: oklch(45% 0.03 250);
  --color-text-muted: oklch(65% 0.02 250);
  --color-surface: oklch(99% 0.005 250);
  --color-surface-raised: oklch(97% 0.008 250);
  --color-border: oklch(90% 0.01 250);
  --color-border-strong: oklch(80% 0.015 250);
}
```

### Typography

```css
:root {
  /* Font family */
  --font-sans: 'Geist Sans', system-ui, sans-serif;

  /* Perfect Fourth scale (1.333 ratio) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px — minimum for mobile Safari auto-zoom prevention */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.333rem;     /* ~21px */
  --text-2xl: 1.777rem;    /* ~28px */
  --text-3xl: 2.369rem;    /* ~38px */
  --text-4xl: 3.157rem;    /* ~51px */

  /* Line heights */
  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.6;
}
```

### Spacing — 8-Point Grid

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Section Padding Rules — ENFORCED

```
Desktop: py-12 (48px) MAX. Never py-16, py-20, py-24.
Mobile:  py-8  (32px) MAX.
Container: max-w-5xl mx-auto px-6
```

These are hard constraints, not guidelines. Padding above these values will make the 3-scroll goal impossible.

### Shape Language
- Border radius: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for inputs/buttons
- No sharp corners anywhere except dividers
- Subtle shadows: `shadow-sm` for resting state, `shadow-md` for hover — never dramatic

### Animation Principles
- **Framer Motion** for all animation
- Duration: 200ms for micro-interactions, 350ms for reveals
- Easing: `[0.25, 0.1, 0.25, 1.0]` (ease-out cubic) for enters
- Scroll-triggered reveals: `viewport={{ once: true, margin: "-50px" }}` — conservative, never jarring
- Reduced motion: always respect `prefers-reduced-motion`

---

## 3. Layout Architecture — The 3-Scroll Rule

The entire page must fit in 3 full viewport scrolls on a 1440px desktop monitor at 100% zoom. This is the primary layout constraint. Every section decision is evaluated against it.

### Viewport Scroll Map (Desktop 1440px)

```
┌─────────────────────────────────────┐ ← top of page
│                                     │
│   SCROLL 1 — ABOVE THE FOLD        │
│   ─────────────────────────────     │
│   Nav (sticky, ~60px)               │
│   Hero (~280px)                     │
│   Pain Strip (~100px)               │
│   Process (~180px)                  │
│                                     │
├─────────────────────────────────────┤ ← 1 scroll down
│                                     │
│   SCROLL 2 — THE CASE              │
│   ─────────────────────────────     │
│   Pricing (~340px)                  │
│   FAQ Accordion (~240px)            │
│                                     │
├─────────────────────────────────────┤ ← 2 scrolls down
│                                     │
│   SCROLL 3 — CONVERSION            │
│   ─────────────────────────────     │
│   Final CTA (~160px)                │
│   Footer (~100px)                   │
│                                     │
└─────────────────────────────────────┘ ← bottom of page
```

### Section Inventory

| Section | Component File | Estimated Height | Scroll Zone |
|---|---|---|---|
| Nav | `nav.tsx` | 60px (fixed) | All |
| Hero | `hero.tsx` | ~280px | 1 |
| Pain Strip | `pain-strip.tsx` | ~100px | 1 |
| Process | `process.tsx` | ~180px | 1 |
| Pricing | `pricing.tsx` | ~340px | 2 |
| FAQ | `faq.tsx` | ~240px (closed) | 2 |
| Final CTA | `final-cta.tsx` | ~160px | 3 |
| Footer | `footer.tsx` | ~100px | 3 |

**Total estimated height: ~1,460px** (targeting ≤ 1,600px for comfortable 3-scroll)

---

## 4. Technical Stack

```yaml
framework: Next.js 15 (App Router)
ui-library: React 19
language: TypeScript (strict mode)
styling: Tailwind CSS v4
animations: Framer Motion
fonts: Geist Sans (next/font/google or local)
email: Resend API (for quote form submissions)
deployment: Vercel
analytics: Vercel Analytics (lightweight, no cookie banner needed)
```

### No Database Required
This is a static marketing site. No Supabase. No auth. No Zustand. No React Query. The only server-side logic is a single API route for the quote form submission.

### Package Installation

```bash
npx create-next-app@latest applicreations-web \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd applicreations-web

npm install framer-motion resend
npm install -D @types/node
```

### Environment Variables

```bash
# .env.local
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=david@applicreations.com
NEXT_PUBLIC_SITE_URL=https://applicreations.com
```

---

## 5. Project Structure

```
applicreations-web/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, analytics
│   ├── page.tsx                # Homepage: composes all sections
│   ├── globals.css             # Design tokens, base styles, Tailwind config
│   ├── not-found.tsx           # 404 page
│   └── api/
│       └── contact/
│           └── route.ts        # POST handler → Resend email
│
├── components/
│   ├── ui/                     # Reusable primitives
│   │   ├── button.tsx          # Button with variants
│   │   ├── accordion.tsx       # Accordion primitive (used by FAQ)
│   │   ├── badge.tsx           # Small label/tag component
│   │   └── nav.tsx             # Sticky navigation bar
│   │
│   └── sections/               # Page sections (one file per section)
│       ├── hero.tsx
│       ├── pain-strip.tsx
│       ├── process.tsx
│       ├── pricing.tsx
│       ├── faq.tsx
│       ├── final-cta.tsx
│       └── footer.tsx
│
├── lib/
│   ├── utils.ts                # cn() helper and utilities
│   └── animations.ts           # Shared animation constants
│
├── public/
│   └── images/
│       └── logo.svg            # Applicreations logo
│
├── .cursorrules                # Cursor AI behavior rules
├── SCOPE.md                    # This document
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. Component Specifications

### 6.1 — Nav (`components/ui/nav.tsx`)

**Behavior:**
- Fixed to top, full width
- Default: transparent background, no border
- After scrolling 80px past hero: transitions to `white/90` with `backdrop-blur-md` and a subtle bottom border
- Scroll transition uses `useScroll` from Framer Motion or a simple `useEffect` listener

**Layout:**
```
[Logo]          [Work · Process · Pricing · FAQ]          [Get a Quote →]
```

**Anchor Links:**
- `#process` — scrolls to process section
- `#pricing` — scrolls to pricing section  
- `#faq` — scrolls to FAQ section
- "Get a Quote" — scrolls to `#contact` or opens quote modal (decide at build time)

**Height:** 60px fixed. Never taller.

**Mobile:** Collapses to logo + hamburger at `md` breakpoint. Mobile menu opens as a full-width slide-down panel (not a sidebar — easier to implement, better on Safari).

```typescript
// Nav scroll state pattern
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 80)
  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}, [])
```

---

### 6.2 — Hero (`components/sections/hero.tsx`)

**Goal:** Immediate clarity. Visitor knows within 3 seconds: who this is for, what they do, what to do next.

**Layout (desktop):**
```
[centered, max-w-3xl]

EYEBROW: "Delaware Web Development"

H1: "Your website should work as hard as you do."

SUBHEAD: "We design and build custom websites for Delaware small businesses — 
          with hosting, support, and strategy included from day one."

[Get a Quote →]  [See Our Work]
```

**Sizing constraints:**
- H1: `text-4xl` on desktop, `text-3xl` on mobile
- Subhead: `text-lg`, `text-secondary`, max-width tighter than H1 (`max-w-xl`)
- Buttons inline, not stacked, on desktop
- **No full-viewport height.** `py-16` on desktop, `py-12` on mobile. Hero is not a billboard — it's a handshake.

**Animation:**
- Eyebrow fades in (opacity 0→1, y: 10→0, delay: 0ms)
- H1 fades in (delay: 80ms)
- Subhead (delay: 160ms)
- Buttons (delay: 240ms)
- All use `initial/animate`, not scroll-triggered (above fold)

---

### 6.3 — Pain Strip (`components/sections/pain-strip.tsx`)

**Goal:** In one horizontal row, confirm the visitor's pain and establish relevance. No body copy — just sharp phrases.

**Layout:**
```
[icon] DIY tools waste weekends   [icon] Agencies charge agency prices   [icon] Your site isn't converting
```

**Implementation:**
- 3-column flex row on desktop, stacks to 1-column on mobile
- Each item: small icon (16-20px) + short phrase, centered
- Subtle top/bottom border (1px `border-border`) to visually separate from hero and process
- Background: `surface-raised` (slightly off-white) to create separation without a full section break
- No heading. No body text. The phrases speak for themselves.
- Height target: **under 80px on desktop**

---

### 6.4 — Process (`components/sections/process.tsx`)

**Goal:** Answer "how does this work?" in the fastest possible format. 3 steps, visible at a glance.

**Layout (desktop, 3-column):**
```
[01]                    [02]                    [03]
5 minutes               2–3 weeks               Ongoing

Get Your Quote          We Build Your Site       Launch & Grow

Select features,        Custom design,           Hosting, security,
get instant pricing.    copy, and build.         and updates handled.
```

**Sizing:**
- Step number: `text-sm font-mono text-muted` — small and understated
- Timeframe label: `text-xs uppercase tracking-wider text-accent`
- Title: `text-xl font-semibold`
- Body: `text-sm text-secondary`, max 2 lines
- No connecting line between steps (adds complexity and height, cuts it)
- No giant circles. Numbers are inline, small.

**Height target: ~160px on desktop**

---

### 6.5 — Pricing (`components/sections/pricing.tsx`)

**Goal:** Two clear options. Hosting always included. Price is the number that matters — feature lists are secondary.

**Layout (2-column, desktop):**

```
┌─────────────────────────┐  ┌─────────────────────────────┐
│  STARTER                │  │  PRO              [POPULAR]  │
│                         │  │                             │
│  $X,XXX                 │  │  $X,XXX                     │
│  /project               │  │  /project                   │
│                         │  │                             │
│  ✓ Up to 5 pages        │  │  ✓ Up to 10 pages           │
│  ✓ Custom design        │  │  ✓ Custom design            │
│  ✓ Mobile-ready         │  │  ✓ Mobile-ready             │
│  ✓ SEO basics           │  │  ✓ Advanced SEO             │
│  ✓ Contact form         │  │  ✓ Email integration        │
│  ✓ Hosting included     │  │  ✓ Hosting included         │
│  ✓ 30 days support      │  │  ✓ 60 days support          │
│                         │  │  ✓ CMS for updates          │
│  [Get Started]          │  │  [Get Started →]            │
└─────────────────────────┘  └─────────────────────────────┘

* Prices include hosting, domain management, and ongoing security monitoring.
  Need just the site build without hosting? Ask about site-only pricing.
```

**Pricing card rules:**
- Pro card has `border-primary` and a subtle shadow — no garish highlights
- Feature list: max 8 items per card. If you need more, cut features not add lines.
- `text-sm` for features, `text-xs` for the asterisk note below cards
- Both CTAs scroll to `#contact` or open quote flow

**Height target: ~300px on desktop**

---

### 6.6 — FAQ (`components/sections/faq.tsx`)

**Goal:** Answer 5-6 objections without consuming vertical space. Accordion pattern — all closed by default.

**Suggested FAQ Items (write fresh copy):**
1. How long does a project take?
2. What do I need to provide?
3. Is hosting really included?
4. What if I need changes after launch?
5. Do you work with businesses outside Delaware?
6. How is this different from Wix or Squarespace?

**Accordion Behavior:**
- Only one item open at a time (close others when one opens)
- Open/close uses Framer Motion `AnimatePresence` with height animation
- Chevron icon rotates 180° when open
- Click the entire row to toggle (full-width tap target)

**Accordion Component Spec:**

```typescript
// components/ui/accordion.tsx
interface AccordionItem {
  id: string
  question: string
  answer: string
}

// Animation: height 0 → auto using layout animation
// Use Framer Motion AnimatePresence + motion.div with overflow-hidden
```

**Height target: ~200px (all closed), ~320px (one open) on desktop**

---

### 6.7 — Final CTA (`components/sections/final-cta.tsx`)

**Goal:** One clear closing statement. One button. End confidently.

**Layout:**
```
[centered]

"Ready to stop leaving money on the table?"

"Most Delaware businesses that need a website already know they need one.
 The only question is who builds it."

[Get Your Quote — It Takes 5 Minutes →]
```

**Design:**
- Dark background (`color-primary`) — creates visual contrast and signals "this is the end"
- White text
- Single large CTA button (white fill, primary text)
- No secondary links, no distractions
- `py-12` — compact and confident

**Height target: ~160px**

---

### 6.8 — Footer (`components/footer.tsx`)

**Layout:**
```
Applicreations                    Work · Process · Pricing · FAQ
Delaware Web Development          hello@applicreations.com

© 2026 Applicreations. All rights reserved.
```

**Rules:**
- 2-column on desktop, stacked on mobile
- No sitemap with 20 links. Only links that are on the page or in the nav.
- `text-sm text-muted` throughout
- `py-8` — minimal

---

## 7. Content Guidelines

### Voice & Tone
- **Confident, not arrogant.** We know what we're doing and we don't need to prove it.
- **Warm, not casual.** Professional without being corporate.
- **Direct.** No filler. No "we're passionate about helping businesses succeed." Say what you do.
- **First person plural.** "We build." "We handle." Not "Our team builds."

### Writing Rules
- No lorem ipsum anywhere at any point during development — write real copy from day one
- No bullet points inside body paragraphs — use sentence lists ("A, B, and C")
- Headlines: sentence case, not title case
- CTAs: action + outcome. "Get a Quote" is fine. "Get Your Quote — It Takes 5 Minutes" is better.
- Never mention competitors by name

### What NOT to Write
- "We're passionate about..." → cut
- "Best-in-class..." → cut
- "Leveraging synergies..." → cut
- "Your one-stop shop..." → cut
- Any claim you can't back up immediately

---

## 8. Mobile Strategy

### Philosophy
Mobile is not a shrunken desktop. It's a different context: thumb navigation, variable lighting, interrupted attention. Build mobile-first mentally, even if writing `md:` modifiers.

### Breakpoints (Tailwind v4)
```
default (mobile):  < 768px
md (tablet):       768px+
lg (desktop):      1024px+
xl (wide):         1280px+
```

### Mobile-Specific Rules

**Typography:**
- Minimum body font size: `16px` — this prevents Safari's auto-zoom on inputs, which breaks layouts
- H1 drops from `text-4xl` to `text-3xl`
- Line lengths: naturally constrained by viewport, no `max-w` needed on mobile

**Touch targets:**
- All interactive elements minimum `44px` tall (`min-h-[44px]`)
- Accordion rows must be at least 48px tall
- Buttons: full-width on mobile (`w-full md:w-auto`)

**Nav on mobile:**
- Logo left, hamburger right
- Menu opens as a full-width slide-down (not a sidebar)
- Menu items large and tappable (`py-4` each)
- Close on link tap

**Pain strip on mobile:**
- Stacks vertically, centered
- 3 items with minimal padding between

**Process on mobile:**
- Single column, stacked steps
- Number stays inline with title on one line

**Pricing on mobile:**
- Cards stack vertically
- Pro card first (lead with the recommended option)
- Features list collapsible: show top 4, "Show all features" tap reveals rest

**FAQ on mobile:**
- Same accordion, larger tap targets

**Scroll depth on mobile:**
- Mobile will require more scrolls than desktop — that's expected and acceptable
- Target: ≤ 6 scrolls on iPhone 14 Pro (390px width)

---

## 9. Navigation

### Anchor IDs (add to section wrappers)
```
id="process"   → Process section
id="pricing"   → Pricing section
id="faq"       → FAQ section
id="contact"   → Final CTA section
```

### Smooth Scroll
```css
/* globals.css */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Nav Active State
Highlight the current section's nav link as user scrolls using `IntersectionObserver`. Each section at 50% visibility triggers its nav link to become active (slightly bolder, accent color underline).

---

## 10. Pricing Architecture

### The Bundled Hosting Decision
Hosting is always included. This is a strategic positioning decision, not a technical one. The price shown is the total project price including hosting for year one.

**Implementation in copy:**
- Card price: shown as a single number (e.g., `$3,500`)
- Below the price: `"Includes hosting, domain management & security"`
- Below both cards (in small text): `"Hosting billed annually after year one. Site-build-only pricing available on request."`

### Do NOT show:
- Monthly hosting fee as a separate line item in the card
- A "hosting add-on" toggle
- Pricing math that requires the visitor to calculate

### Pricing Numbers
You'll fill in the actual dollar amounts. Leave placeholders `$X,XXX` in the SCOPE — finalize at build time. Ensure the numbers reflect the bundled value clearly.

---

## 11. Contact & Quote Flow

### For MVP: Simple Contact Form
A simple form that emails you when someone fills it out. No modal for now — the Final CTA section contains the form inline or a link to a dedicated `/contact` page.

**Form Fields:**
- Name
- Business name
- Email
- Phone (optional)
- One question: "What do you need?" (textarea, 3 rows)

**Submission:**
- POST to `/api/contact`
- API route sends email via Resend to `david@applicreations.com`
- Success state: inline confirmation message (no page redirect)
- Error state: friendly error, ask them to email directly

**API Route:**
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  
  await resend.emails.send({
    from: 'Applicreations Site <noreply@applicreations.com>',
    to: process.env.CONTACT_EMAIL!,
    subject: `New inquiry from ${body.businessName}`,
    text: `
      Name: ${body.name}
      Business: ${body.businessName}
      Email: ${body.email}
      Phone: ${body.phone || 'Not provided'}
      
      Message:
      ${body.message}
    `
  })
  
  return Response.json({ success: true })
}
```

**Future:** When Introspect is ready, the "Get a Quote" CTA points to Introspect instead of this form. Design the CTA button to be a simple href swap.

---

## 12. Performance & SEO

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 1.5s
- CLS (Cumulative Layout Shift): < 0.05
- INP (Interaction to Next Paint): < 100ms

### Implementation Rules
- All images use `next/image` with explicit `width` and `height`
- No layout shift from fonts: use `next/font` with `display: swap`
- No layout shift from images: all images have aspect ratios defined
- Framer Motion: import only what you use (`from 'framer-motion'`, not the whole bundle)
- Zero client-side data fetching on page load

### Metadata (app/layout.tsx)

```typescript
export const metadata: Metadata = {
  title: 'Applicreations | Delaware Web Development',
  description: 'Custom websites for Delaware small businesses. Design, development, and hosting — handled.',
  openGraph: {
    title: 'Applicreations | Delaware Web Development',
    description: 'Custom websites for Delaware small businesses.',
    url: 'https://applicreations.com',
    siteName: 'Applicreations',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Applicreations | Delaware Web Development',
    description: 'Custom websites for Delaware small businesses.',
  },
}
```

### Schema.org JSON-LD

```typescript
// Add to app/layout.tsx or page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Applicreations',
  description: 'Custom web development for Delaware small businesses',
  url: 'https://applicreations.com',
  areaServed: {
    '@type': 'State',
    name: 'Delaware'
  },
  serviceType: 'Web Development',
  priceRange: '$$',
}
```

---

## 13. Cursor Workflow Rules (`.cursorrules`)

```
# Applicreations Web — Cursor Rules

## Project
This is a static Next.js 15 marketing site for Applicreations.
No database. No authentication. No complex state management.
One API route: /api/contact for form submission.

## The 3-Scroll Rule
The entire page must be reachable in 3 full scrolls on a 1440px desktop.
Maximum section padding: py-12 on desktop, py-8 on mobile.
Never use py-16, py-20, py-24, or py-32 on section wrappers.
If a section is getting tall, compress — don't stretch.

## Code Style
- TypeScript strict mode always
- No `any` types — define proper interfaces
- Component files: kebab-case.tsx
- Component exports: PascalCase named exports (not default exports)
- All string content written as props, not hardcoded in JSX

## Component Rules
- No inline styles — use Tailwind classes only
- No arbitrary Tailwind values unless no token exists
- Animation constants live in lib/animations.ts — import from there
- The accordion.tsx primitive is the ONLY place accordion logic lives
- Do not reimplement accordion behavior inline in faq.tsx

## Styling Rules
- Mobile-first: write base styles for mobile, use md: for desktop
- Minimum font size: text-base (16px) — never smaller in body copy
- Touch targets: min-h-[44px] on all interactive elements
- Color values: use CSS variables (--color-primary etc), not Tailwind color names

## Two-Step Prompt Pattern
When implementing any component:
Step 1: Analyze — read the SCOPE spec for that component, confirm understanding
Step 2: Implement — write complete, production-ready code

Never implement without confirming the spec first.

## File Creation
When creating a new file, always:
1. Add the file path as a comment on line 1
2. Add a brief description comment on line 2
3. Import order: React → Next.js → third-party → internal → styles
```

---

## 14. Build Order

Follow this sequence. Each step produces a working, visible result before moving to the next.

```
Step 1: Project init
  - npx create-next-app@latest
  - Install dependencies
  - Set up globals.css with all design tokens
  - Verify dev server runs

Step 2: Design system validation
  - Create lib/utils.ts (cn helper)
  - Create lib/animations.ts (shared constants)
  - Test tokens render correctly in browser

Step 3: Nav
  - Build nav.tsx (sticky, transparent → frosted on scroll)
  - Build mobile hamburger menu
  - Test scroll behavior and anchor links

Step 4: Hero
  - Write real copy (not placeholder)
  - Build hero.tsx with entrance animations
  - Verify height is within target (~280px)

Step 5: Pain Strip
  - Build pain-strip.tsx
  - Verify single-row on desktop, stacked on mobile

Step 6: Process
  - Build process.tsx
  - 3 columns desktop, 1 column mobile
  - Real copy, not "Lorem ipsum"

Step 7: Accordion primitive
  - Build components/ui/accordion.tsx
  - Test open/close animation in isolation before using in FAQ

Step 8: FAQ
  - Build faq.tsx using accordion primitive
  - 5-6 real questions with real answers

Step 9: Pricing
  - Build pricing.tsx
  - 2 cards with placeholder price numbers
  - Asterisk note below cards

Step 10: Final CTA
  - Build final-cta.tsx with dark background
  - Add contact form or link to /contact

Step 11: Footer
  - Build footer.tsx — minimal

Step 12: Compose page
  - Assemble in app/page.tsx
  - Add all anchor IDs to section wrappers
  - Verify scroll depth (target: 3 scrolls desktop)

Step 13: API route
  - Build /api/contact/route.ts
  - Connect form to Resend
  - Test end-to-end

Step 14: Mobile pass
  - QA every section on 390px width (iPhone 14 Pro)
  - Fix any touch target, font size, or layout issues
  - Test in mobile Safari simulator (font size ≥ 16px critical)

Step 15: Performance pass
  - Run Lighthouse
  - Fix any CLS, LCP, or INP issues
  - Verify all images have explicit dimensions

Step 16: SEO
  - Finalize metadata in layout.tsx
  - Add JSON-LD schema
  - Submit sitemap to Google Search Console after deploy

Step 17: Deploy
  - Push to GitHub
  - Connect to Vercel
  - Set environment variables
  - Verify production build
```

---

## 15. Launch Checklist

```markdown
## Pre-Launch
- [ ] Real copy in every section (no placeholders)
- [ ] Real pricing numbers in pricing cards
- [ ] Contact form tested end-to-end (email received)
- [ ] All anchor links work correctly
- [ ] Nav scroll behavior works (transparent → frosted)
- [ ] Mobile hamburger menu opens and closes
- [ ] Mobile layout QA'd on 390px viewport
- [ ] FAQ accordion opens/closes smoothly
- [ ] Pricing asterisk note is accurate
- [ ] Footer links all work
- [ ] 404 page exists and looks on-brand
- [ ] Favicon set
- [ ] Open Graph image set (for social sharing)
- [ ] JSON-LD schema added
- [ ] Lighthouse score: Performance > 90, Accessibility > 95
- [ ] 3-scroll test passed on desktop 1440px

## Deployment
- [ ] Environment variables set in Vercel
- [ ] Custom domain connected
- [ ] HTTPS working
- [ ] www redirect to apex (or apex to www — pick one)
- [ ] Vercel Analytics enabled

## Post-Launch
- [ ] Google Search Console verified
- [ ] Test contact form in production
- [ ] Share with 2-3 trusted contacts for feedback
- [ ] Monitor Vercel Analytics for first 2 weeks
```

---

*Applicreations Web — SCOPE v1.0*  
*"Build the site that earns the client, then build the client's site."*
