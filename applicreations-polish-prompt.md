# Applicreations — Polish & Craft Details
**For Cursor / Composer — Full Implementation**

---

## Overview

This prompt implements a series of craft-level details that individually appear minor but collectively signal professional expertise to developer visitors. Execute in the exact order below — each phase builds on the previous and some have dependencies.

**Do not batch all phases into one pass.** Complete each phase, verify it, then proceed to the next.

---

## Phase 1: Functional Fixes (Highest Priority — Broken UX)

These are things that are visibly wrong to any visitor, not just developers.

### 1A — Scroll Behavior & Anchor Offset

**Problem:** Clicking nav links (Work, Process, Pricing, FAQ) causes an instant jump and the destination section lands partially or fully behind the sticky navbar.

**Files to open:** `app/globals.css`

**Implementation:**

Add to the `html` element styles in `globals.css`:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 88px; /* Match your exact navbar height — measure it in DevTools first */
}
```

**Snag to watch for:** If the navbar height changes at mobile breakpoints (likely shorter or taller), add a responsive override:

```css
@media (max-width: 768px) {
  html {
    scroll-padding-top: 72px; /* Adjust to actual mobile navbar height */
  }
}
```

**Verify:** Click every nav link. Each section should slide smoothly into view with the section heading fully visible below the navbar, not hidden behind it.

---

### 1B — Image Performance (Layout Shift Prevention)

**Problem:** Project screenshots in the Work section and any other images without explicit dimensions cause Cumulative Layout Shift (CLS) — the page jumps as images load. This directly tanks the Lighthouse score developers will check.

**Files to open:** All component files that render images — specifically the Work/portfolio section component and any component using `<img>` tags directly.

**Implementation rules:**

1. Every `<Image>` from `next/image` must have explicit `width` and `height` props — no exceptions. If the image is in a fluid container, use `fill` prop with a positioned parent instead, never omit dimensions.

2. The hero logo mark (above the fold): add `priority` prop to force eager loading:
```tsx
<Image src="/logo.png" alt="Applicreations" width={40} height={40} priority />
```

3. All below-fold images (work screenshots, thumbnails): ensure NO `priority` prop (default lazy loading is correct for these).

4. For the work section phone mockup which is likely large: confirm it has explicit dimensions set. If it's using `fill`, its parent container must have `position: relative` and an explicit height.

**Snag to watch for:** Next.js App Router sometimes surfaces a hydration warning when `<Image>` is inside a `<motion.div>` with `whileInView`. This is fine — it's a known non-breaking warning. Do not "fix" it by removing the Image optimization.

**Verify:** Run Lighthouse in Chrome DevTools (mobile preset). CLS score should be 0 or near-0.

---

## Phase 2: Developer Signals (Noticed Immediately by Technical Visitors)

### 2A — Console Cleanliness

**Problem:** Any console warnings or errors visible to a developer opening DevTools will undercut the crafted impression. Address before adding new features.

**Files to open:** Open the browser DevTools console first. Screenshot or note every warning/error present.

**Common Next.js 15 / React 19 warnings to resolve:**

1. **Missing `key` props on lists** — Any `.map()` that renders elements without a unique `key` prop. Fix by adding `key={item.id}` or `key={index}` (prefer a stable id over index if available).

2. **Hydration mismatch warnings** — Often caused by browser extensions injecting attributes, or by using `Math.random()` / `Date.now()` in render. If the warning references your own code: find any value computed differently on server vs client and move it into a `useEffect` or `useMemo`.

3. **`useLayoutEffect` on server** — If any component uses `useLayoutEffect` without a client boundary (`'use client'`), add the directive.

4. **Deprecated prop warnings** — Framer Motion occasionally surfaces these on version updates. Check `motion.div` with `layout` prop for any `layoutId` conflicts.

**Snag to watch for:** Do NOT suppress warnings with `console.error = () => {}` or similar hacks. Fix the actual root cause. Suppression gets detected and signals worse craftsmanship than the warning itself.

**Verify:** Full page load with DevTools console open. Zero errors. Zero warnings authored by your code (browser extension warnings are acceptable and expected).

---

### 2B — Custom Scrollbar

**Problem:** The browser default scrollbar is gray and generic. On a dark-themed site it looks disconnected.

**Files to open:** `app/globals.css`

**Implementation — add after existing base styles:**

```css
/* Custom scrollbar — webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-surface-dark);
}

::-webkit-scrollbar-thumb {
  background: oklch(62% 0.22 280 / 0.5);
  border-radius: 3px;
  transition: background 200ms ease;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(62% 0.22 280 / 0.8);
}

/* Firefox — limited but worth setting */
* {
  scrollbar-width: thin;
  scrollbar-color: oklch(62% 0.22 280 / 0.5) var(--color-surface-dark);
}
```

**Snag to watch for:** The `*` selector for Firefox scrollbar will apply to ALL scrollable elements including any overflow containers (the work section thumbnails, any modals). This is generally fine and desired. If a specific inner scroll container looks wrong, scope it explicitly.

**Verify:** Scroll the full page. The thin purple scrollbar should be visible on the right edge. Hover it — it should brighten slightly.

---

### 2C — Focus States

**Problem:** Browser default focus outlines are either invisible (Chrome removed them on click) or the wrong style for the brand. Keyboard navigation either shows nothing or an ugly blue ring. Developers tab through sites as habit.

**Files to open:** `app/globals.css` AND `components/ui/button.tsx`

**Implementation — globals.css:**

First, remove all instances of `outline: none` or `outline: 0` that aren't paired with a `focus-visible` replacement. Search the codebase for these and audit each one.

Add the global focus-visible system:

```css
/* Remove default outline universally, replace with branded focus-visible */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid oklch(62% 0.22 280);
  outline-offset: 3px;
  border-radius: 4px; /* Slightly rounded to match button radius */
}
```

**Implementation — button.tsx:**

Ensure all button variants have this Tailwind class applied:
```
focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none
```

The `focus-visible:outline-none` suppresses the CSS rule above for buttons specifically (since the ring is more visually appropriate than an outline for buttons). Both the CSS approach and Tailwind approach are needed — CSS covers all non-button interactive elements (links, accordion triggers, tab switchers), Tailwind refines the button specifically.

**Snag to watch for:** The `ring-offset` color defaults to white in Tailwind. On the dark navbar, the offset will show a white gap around focused buttons. Fix with:
```
focus-visible:ring-offset-surface-dark
```
Or in the navbar specifically, add `ring-offset-[var(--color-surface-dark)]` as an arbitrary value.

**For the accordion FAQ rows and work section tabs:** These are likely `<button>` elements or `<div>` with `onClick`. Ensure they are actual `<button>` elements (not divs) for proper keyboard focus behavior. If they're divs, add `tabIndex={0}` and `onKeyDown` handlers for Enter/Space, or convert to buttons.

**Verify:** Tab through the entire page using only the keyboard. Every interactive element should receive a visible purple focus ring. No element should be unreachable by keyboard. No ugly browser-default outlines visible.

---

## Phase 3: Typography Refinement

### 3A — Typographic Micro-Details

**Problem:** Large display type at hero scale has optical imperfections — uneven letter spacing, missing ligatures — that are invisible at body size but register subconsciously at display size.

**Files to open:** `app/globals.css`

**Implementation — add to globals.css:**

```css
/* Optimize display text rendering */
h1, h2, h3 {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

/* Body text — prioritize speed over legibility optimization (correct tradeoff) */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
}
```

**Snag to watch for:** `optimizeLegibility` on body text causes performance issues in long lists. This is why it's scoped to headings only. Do not apply it globally.

---

### 3B — Smart Quotes and Em Dashes in Copy

**Problem:** Straight quotes (`"text"`) and double hyphens (`--`) in rendered HTML copy signal that the developer didn't care about typographic correctness. These are noticed by designers and senior developers alike.

**Files to open:** Every component file that renders hardcoded string content (section components, FAQ content, pricing copy, etc.)

**Audit and replace:**

Search the entire codebase for these patterns and replace:

| Find | Replace | Name |
|------|---------|------|
| `"` (straight double quote opening) | `"` | Left double quotation mark |
| `"` (straight double quote closing) | `"` | Right double quotation mark |
| `'` (straight apostrophe) | `'` | Right single quotation mark (apostrophe) |
| ` -- ` (double hyphen with spaces) | ` — ` | Em dash with spaces |
| ` - ` (single hyphen used as dash) | ` — ` | Em dash (only when used as punctuation, not hyphenation) |
| `...` (three periods) | `…` | Horizontal ellipsis character |

**Snag to watch for:** Do NOT replace hyphens in:
- CSS class names (`text-sm`, `flex-row`, etc.)
- Hyphenated compound words ("mobile-ready", "SEO-optimized")
- Code strings, URL slugs, or any programmatic values

Only replace hyphens used as punctuation dashes in rendered prose copy.

**Snag to watch for (apostrophes):** JSX will require escaping or using the HTML entity. In JSX, write `&rsquo;` or use the Unicode character directly `'` — do NOT write a raw `'` in JSX string content or it will cause a linting error. Alternatively, wrap the string in `{" "}` template or use `&apos;` — but `&apos;` is not valid in HTML4. Safest: use the actual Unicode character `'` directly in the JSX string.

---

### 3C — Text Selection Color

**Problem:** Default browser text selection is a generic blue that clashes with the brand.

**Files to open:** `app/globals.css`

**Implementation:**

```css
::selection {
  background-color: oklch(62% 0.22 280 / 0.25);
  color: var(--color-text-primary);
}

/* For dark sections — the selection color needs to be visible on dark bg */
.dark-section ::selection,
[data-theme="dark"] ::selection {
  background-color: oklch(62% 0.22 280 / 0.40);
  color: var(--color-text-on-dark);
}
```

**Snag to watch for:** If your dark sections don't have a class or data attribute, the scoped rule won't apply. In that case, use a single `::selection` rule with a slightly higher opacity (0.35) that works reasonably on both light and dark backgrounds, rather than trying to scope it.

**Verify:** Click and drag to select text in both the hero (dark) and a body section (light). The highlight should appear in a soft purple tint.

---

## Phase 4: Cursor Behavior

### 4A — Intentional Pointer States

**Problem:** Interactive elements that should signal clickability don't always show the pointer cursor. Some non-interactive styled elements may incorrectly show it.

**Files to open:** All section components with interactive elements.

**Audit every interactive element type and apply:**

```
nav links:              cursor-pointer  (likely already present via <a> tags)
all <button> elements:  cursor-pointer  (always)
FAQ accordion rows:     cursor-pointer
work section tabs:      cursor-pointer
work thumbnail images:  cursor-pointer
pricing CTA buttons:    cursor-pointer  (should be inherited from button)
hosting period toggle:  cursor-pointer
external links (↗):     cursor-pointer
logo mark in nav:       cursor-pointer  (it's a link to home)
footer links:           cursor-pointer
```

**Elements that should NOT have cursor-pointer:**
```
decorative elements (the ambient orb)
static text
section containers
static card wrappers with no onClick
```

**Snag to watch for:** Tailwind's `cursor-pointer` class may be purged if not present in any template file. If it disappears in production build, add it to the `safelist` in `tailwind.config.ts`:
```ts
safelist: ['cursor-pointer', 'cursor-not-allowed', 'cursor-zoom-in']
```

---

## Phase 5: Metadata, SEO & Browser Identity

### 5A — Page Metadata

**Problem:** The browser tab, search results, and link previews (Slack, iMessage, Twitter) all show default Next.js metadata. Every developer who bookmarks or shares the site will see this.

**Files to open:** `app/layout.tsx`

**Implementation — replace the existing metadata export:**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Applicreations — Custom Web Apps & Websites',
    template: '%s | Applicreations',
  },
  description: 'Delaware-based custom web development. We build fast, SEO-optimized websites and web apps that turn visitors into customers. No templates. No agencies.',
  keywords: ['web development', 'custom website', 'web app', 'Delaware', 'Next.js', 'small business website'],
  authors: [{ name: 'Applicreations' }],
  creator: 'Applicreations',

  // Open Graph — controls how links preview in Slack, iMessage, LinkedIn, etc.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://applicreations.com',
    siteName: 'Applicreations',
    title: 'Applicreations — Custom Web Apps & Websites',
    description: 'Delaware-based custom web development. Fast, conversion-optimized sites built from scratch.',
    images: [
      {
        url: '/og-image.png', // Create this file — see note below
        width: 1200,
        height: 630,
        alt: 'Applicreations — Custom Web Apps & Websites',
      },
    ],
  },

  // Twitter/X card
  twitter: {
    card: 'summary_large_image',
    title: 'Applicreations — Custom Web Apps & Websites',
    description: 'Custom web development for businesses that are done with templates.',
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: 'https://applicreations.com',
  },
}
```

**OG Image note:** Create a 1200×630px PNG at `public/og-image.png`. It should be a simple branded image: dark background, logo mark, "Applicreations" in the display font, and the tagline. This does NOT need to be dynamic for now. A static image is correct for a single-page marketing site.

**Snag to watch for:** The `url` and `canonical` values must match your actual production domain exactly (with or without `www` — pick one and be consistent). Using `applicreations.com` vs `www.applicreations.com` inconsistently will split SEO signals.

---

### 5B — Favicon Suite

**Problem:** Most Next.js projects launch with the default Next.js favicon or a single `.ico` file. A proper favicon suite covers all contexts: browser tab, bookmarks bar, iOS home screen, Android PWA, pinned tab.

**Files location:** `app/` directory (Next.js App Router uses `app/favicon.ico` and co-located metadata images)

**Implementation:**

Create the following files in the `app/` directory. Next.js App Router automatically picks these up — no configuration needed:

```
app/
  favicon.ico          — 32×32, the logo mark
  apple-icon.png       — 180×180, the logo mark with padding on brand bg color
  icon.png             — 192×192, same as apple-icon (Android/PWA)
  icon.svg             — SVG version if the logo mark is vector-clean
```

**Generation process:**

1. Export the logo mark SVG from wherever it lives in the codebase
2. Use a tool like `sharp` (Node.js) or an online favicon generator (favicon.io or realfavicongenerator.net) to generate the size suite
3. The background color for `apple-icon.png` should be `--color-surface-dark` (`oklch(14% 0.02 265)` ≈ `#0d0e14`), not transparent — iOS renders transparent icons with a white background which will look bad
4. Place generated files in `app/` directory

**In `app/layout.tsx`, add to the metadata object:**

```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    { url: '/icon.png', sizes: '192x192', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
},
manifest: '/manifest.json', // Optional — only add if creating manifest
```

**Snag to watch for:** Next.js App Router has a specific file convention for icons. If you place them in `app/` with the exact names `favicon.ico`, `icon.png`, `apple-icon.png`, Next.js generates the correct `<link>` tags automatically WITHOUT needing to add them to the metadata object. However, explicitly adding them to metadata is belt-and-suspenders and ensures they're correct. Either approach works — just don't do both in conflicting ways.

**Verify:** Open the site in a new tab. The favicon should show the logo mark. Bookmark the page — the bookmark icon should show the logo mark. On mobile Safari, "Add to Home Screen" — the icon should appear correctly with the dark background.

---

### 5C — Custom 404 Page

**Problem:** Hitting any invalid URL serves Next.js's generic 404. This is a missed brand touchpoint that also signals "I didn't finish the site."

**Files to create:** `app/not-found.tsx`

**Implementation:**

```tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'This page does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-surface-dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 8vw, 8rem)',
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '1.5rem',
        }}
      >
        404
      </p>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          lineHeight: 1.05,
          color: 'var(--color-text-on-dark)',
          marginBottom: '1.5rem',
          maxWidth: '14ch',
        }}
      >
        That page doesn't exist.
      </h1>

      {/* Subtext — dry, not apologetic */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.125rem',
          color: 'var(--color-text-on-dark-muted)',
          marginBottom: '3rem',
          maxWidth: '40ch',
        }}
      >
        It may have moved, or it never existed. Either way, let's get you back.
      </p>

      {/* CTA */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          fontWeight: 500,
          padding: '12px 28px',
          borderRadius: '6px',
          textDecoration: 'none',
          transition: 'background-color 180ms ease, transform 180ms ease',
        }}
      >
        Back to home →
      </Link>
    </div>
  )
}
```

**Snag to watch for:** `app/not-found.tsx` does NOT inherit the root layout in all Next.js versions the same way. Verify that your fonts and CSS variables load correctly on this page. If they don't (the page looks unstyled), wrap the content in the same `<html>` and `<body>` structure as your root layout, or ensure `not-found.tsx` is at the root `app/` level (not nested inside a route group).

**Verify:** Navigate to `localhost:3000/anything-fake`. The branded 404 page should appear with correct styling, fonts loading, and the "Back to home" link working.

---

## Phase 6: Final Verification Checklist

Run through this entire checklist after all phases are complete. Do not mark done until every item passes.

### Functional
- [ ] All nav links scroll smoothly to correct section — no jumping, no content hidden behind navbar
- [ ] Mobile nav links also have correct scroll-padding-top offset
- [ ] Tab through entire page with keyboard only — every interactive element receives visible focus ring
- [ ] Press Enter and Space on keyboard-focused buttons — all activate correctly
- [ ] FAQ accordion opens/closes via keyboard
- [ ] Work section tabs switch via keyboard
- [ ] Hosting period toggle switches via keyboard

### Visual
- [ ] Custom scrollbar visible on desktop (Chrome/Safari/Edge)
- [ ] Text selection shows purple tint (select any paragraph text)
- [ ] Favicon shows logo mark in browser tab (not Next.js triangle, not blank)
- [ ] Favicon visible in bookmarks bar after bookmarking
- [ ] No straight quotes `"` visible in any rendered prose copy
- [ ] No double hyphens `--` visible in any rendered copy
- [ ] Headings render with smooth antialiasing (no jagged edges on the DM Serif Display type)

### Performance & Technical
- [ ] DevTools Console: zero errors, zero warnings from your own code
- [ ] DevTools Network tab: no 404 requests for missing assets (favicon, og-image, etc.)
- [ ] Lighthouse Performance score ≥ 90 on desktop
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] CLS (Cumulative Layout Shift) ≤ 0.05
- [ ] Page `<title>` in browser tab reads "Applicreations — Custom Web Apps & Websites"
- [ ] `<meta name="description">` present (view source or check in DevTools Elements)

### Brand
- [ ] Navigate to `/anything-random` — branded 404 page appears, correctly styled
- [ ] Share the URL in Slack or iMessage — OG image preview appears (requires production URL or ngrok tunnel)
- [ ] Logo mark displays with full gradient colors in both navbar and footer
- [ ] No blue, teal, or green accent colors visible anywhere except the hosting "Most Popular" badge

---

## Common Snags Reference

**"My scroll-padding-top isn't working"** — The value must match the EXACT rendered height of the sticky navbar. Open DevTools, select the nav element, and check its computed height. Use that exact pixel value.

**"The 404 page doesn't show my fonts"** — Move `not-found.tsx` to `app/not-found.tsx` (root level). Check that your font CSS variables are defined on `:root` in `globals.css` and that `globals.css` is imported in `layout.tsx`, not conditionally.

**"The OG image isn't showing in link previews"** — OG images require an absolute URL in production. They will NOT work on localhost. Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator) or [Open Graph Debugger](https://developers.facebook.com/tools/debug/) after deploying to Vercel to verify.

**"Custom scrollbar disappeared in Firefox"** — Firefox uses the `scrollbar-width` / `scrollbar-color` CSS properties, not `::-webkit-scrollbar`. Both approaches are included in the Phase 2B implementation above. Firefox's custom scrollbar is thinner and less controllable than webkit — this is expected behavior.

**"Focus ring shows on mouse click, not just keyboard"** — This means `focus-visible` isn't working. Check that you're using `focus-visible:` Tailwind prefix (not `focus:`), and that the CSS `:focus-visible` pseudo-class is supported in your target browsers (it is in all modern browsers). If `*:focus { outline: none }` is overriding it, ensure the `*:focus-visible` rule comes AFTER it in the CSS.

**"Smart quote replacement broke a JSX prop"** — JSX attribute values use straight quotes by syntax requirement. Only replace quotes in JSX string content (between tags), not in attribute values (`className="..."`, `href="..."`, etc.).
