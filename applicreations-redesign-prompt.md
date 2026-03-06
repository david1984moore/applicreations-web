# Applicreations Website — Complete UI Redesign Prompt
**For Cursor / Composer — Full Implementation**

---

## Context & Constraints

This is a complete visual redesign of the Applicreations marketing site. The objective is to elevate the design from "competent template" to "confident professional studio" — drawing from the design sensibility of Render, Infinum, and Euristiq without copying any of them.

**Hard constraints:**
- Zero content changes. Every word, every headline, every label, every list item stays exactly as written.
- No layout restructuring beyond what is specified below. If a section exists, it stays. Sections do not move in page order.
- Preserve all existing functionality: tab switching in Work section, toggle in Hosting section, accordion in FAQ, all navigation links, Introspect CTA routing.
- Tech stack stays identical: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion.
- All animations must respect `prefers-reduced-motion`.
- WCAG AA contrast compliance throughout.

---

## Design System — Replace Entirely

### Color Tokens (update `globals.css` `@theme` block)

```css
@theme {
  /* === CORE PALETTE === */
  /* Dark ground — used for hero, Introspect CTA, footer */
  --color-surface-dark:    oklch(14% 0.02 265);   /* near-black, slight blue undertone */
  --color-surface-mid:     oklch(18% 0.025 265);  /* slightly lighter dark for cards on dark bg */

  /* Light ground — used for all body sections */
  --color-surface-light:   oklch(98% 0.005 265);  /* warm off-white, not pure white */
  --color-surface-subtle:  oklch(96% 0.008 265);  /* very faint gray for alternating sections */

  /* Brand accent — single purple, used sparingly */
  --color-accent:          oklch(62% 0.22 280);   /* primary brand purple */
  --color-accent-hover:    oklch(58% 0.24 280);   /* darker on hover */
  --color-accent-subtle:   oklch(62% 0.22 280 / 0.10); /* 10% opacity tint for backgrounds */

  /* Text hierarchy */
  --color-text-primary:    oklch(12% 0.01 265);   /* on light bg */
  --color-text-secondary:  oklch(45% 0.01 265);   /* supporting text on light bg */
  --color-text-tertiary:   oklch(60% 0.01 265);   /* labels, metadata on light bg */

  --color-text-on-dark:        oklch(96% 0.005 265);  /* primary text on dark bg */
  --color-text-on-dark-muted:  oklch(65% 0.01 265);   /* supporting text on dark bg */

  /* Borders */
  --color-border-light:    oklch(90% 0.005 265);
  --color-border-dark:     oklch(25% 0.02 265);

  /* Remove all existing blue, teal, and green accent variables */
  /* The old --color-primary blue and --color-accent teal are retired */
}
```

**Color usage rules:**
- Purple (`--color-accent`) is used ONLY on: primary CTA buttons, the Introspect nav button, active tab states, the "Popular" pricing badge, hover underlines on nav links, and one ambient glow element in the hero.
- No blue. No teal. No green except the existing "Most Popular" badge on the Hosting section which may retain green for differentiation from purple pricing badge.
- All section backgrounds alternate between `--color-surface-light` and `--color-surface-subtle` — never the same color twice in a row.

---

### Typography (update `globals.css`)

Replace Geist Sans with a two-font pairing that creates editorial contrast:

```css
/* In layout.tsx or globals.css, import via next/font: */
/* Display font: DM Serif Display — for all hero headlines and major section H2s */
/* Body font: DM Sans — clean geometric sans for all body copy, nav, labels, buttons */

/* Apply in @theme: */
@theme {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
}
```

**Typography scale — add these to `@theme`:**
```css
@theme {
  /* Hero headline — dramatically large */
  --text-hero:    clamp(3rem, 6vw, 5.5rem);
  --leading-hero: 1.05;

  /* Section H2 — confident but not overwhelming */
  --text-section: clamp(2rem, 3.5vw, 3rem);
  --leading-section: 1.15;

  /* Eyebrow labels — small caps treatment */
  --text-eyebrow: 0.75rem;
  --tracking-eyebrow: 0.12em;
}
```

**Typography application rules:**
- `font-display` (DM Serif Display): Hero H1, all section H2 headings
- `font-body` (DM Sans): Everything else — nav, body copy, buttons, labels, pricing, FAQ
- Eyebrow labels (e.g. "THE SOLUTION", "5 MINUTES"): `font-body`, uppercase, `tracking-eyebrow`, `text-tertiary`
- NO italic wordmark in hero. The logo mark handles brand identity.

---

### Button System — Rebuild from scratch

Two variants only. All other variants retired from marketing site use.

**Primary button** (used for all CTAs: "Get a Quote", "Get Started", "Get Instant Quote"):
```
bg: --color-accent
text: white
border-radius: 6px
padding: 12px 28px
font: DM Sans, 15px, weight 500
hover: --color-accent-hover, translateY(-1px), subtle box-shadow
transition: 180ms ease
```

**Secondary / Ghost button** (used for "See Our Work", "See Demo Sites"):
```
bg: transparent
text: --color-text-primary (on light bg) OR --color-text-on-dark (on dark bg)
border: 1.5px solid --color-border-light (on light) OR --color-border-dark lightened (on dark)
border-radius: 6px
padding: 12px 28px
font: DM Sans, 15px, weight 500
hover: bg becomes --color-surface-subtle, translateY(-1px)
transition: 180ms ease
```

**Rules:**
- Buttons are never full-width on desktop (max-width: fit-content)
- On mobile, both buttons in a pair stack vertically and go full-width
- Remove all rounded-full / pill shapes. 6px radius only.

---

## Section-by-Section Implementation

---

### 1. Navigation

**Current problem:** Logo centered-ish, nav looks like a default layout. Introspect button is purple but feels isolated.

**New implementation:**
- Sticky nav, `backdrop-blur-md`, `bg-surface-dark/90` — dark frosted glass treatment
- Logo mark (SVG icon only, no wordmark text) left-aligned
- Nav links right-aligned: Work · Process · Pricing · FAQ
- Nav link style: `text-on-dark-muted`, weight 400, `hover:text-on-dark`, 200ms transition. On hover, a 1px `color-accent` underline slides in from left using `scaleX` transform.
- Introspect button: primary button variant, right of nav links, 8px left margin
- On scroll past 80px: add `border-bottom: 1px solid --color-border-dark`

---

### 2. Hero Section

**Current problem:** Centered stack, gradient background feels dated, italic wordmark, empty vertical space.

**New implementation — left-anchored editorial layout:**

Background: `--color-surface-dark`. Full viewport height minimum (`min-h-screen`).

Layout: Two-column CSS grid, `grid-cols-[1fr_auto]` on desktop, single column on mobile. Left column holds all content. Right column holds the ambient visual element.

**Left column content (left-aligned, not centered):**
```
[eyebrow label]
"Custom apps and websites"  ← small, uppercase, tracking-wide, accent color

[H1 headline]
"Applicreations"  ← font-display, text-hero size, text-on-dark, leading-hero
                     weight: 400 (DM Serif Display looks best at regular weight)

[subtext — already exists, preserve exactly]
No additional subtext needed.

[CTA row]
"Get a Quote →"  [primary button]    "See Our Work"  [secondary button, dark variant]
Both left-aligned, gap-4, flex-row
```

**Right column — ambient visual:**
A single radial gradient orb: `width: 420px, height: 420px`, `border-radius: 50%`, `background: radial-gradient(circle, oklch(62% 0.22 280 / 0.18) 0%, transparent 70%)`. Positioned to bleed slightly off the right edge. Apply a slow, gentle `@keyframes float` animation (translateY -12px over 6s ease-in-out, infinite alternate). This is the only motion on the hero.

**Process steps row** (currently below hero, the 01/02/03/04 section):
Move this into the bottom of the hero section itself — a horizontal strip inside the dark hero, separated from the headline content by generous spacing. Style: four equal columns, each with a large number (`text-6xl`, `font-body`, `font-thin`, `text-on-dark-muted`), the time label in eyebrow style in accent color, and the step name in `text-on-dark`. The chevron/accordion behavior (if any) is preserved.

---

### 3. "What We Build" Section

**Current problem:** Two centered cards with large clip-art monitor and code bracket icons.

**New implementation:**
- Background: `--color-surface-light`
- Section H2: `font-display`, `text-section`, left-aligned within a `max-w-5xl mx-auto` container
- Supporting copy: left-aligned, `text-secondary`, `max-w-prose`
- Cards: Replace the 2-column card layout with a horizontal two-panel layout. Each panel is a large card (`rounded-xl`, `border border-color-border-light`, padding `2rem`) that spans roughly half the container width.
- **Replace the blue stroke icons entirely.** Each card gets a large typographic character instead:
  - Website card: the character `↗` in `font-display`, `text-7xl`, `text-accent`, low opacity (0.3), positioned decoratively in the top-right corner of the card as a background element. The actual card content (title + description) remains normally visible.
  - Web App card: the character `{ }` in `font-mono`, same treatment.
- Card hover: `translateY(-4px)`, `box-shadow: 0 20px 40px oklch(0% 0 0 / 0.06)`, 250ms spring transition.

---

### 4. "The Problem" Section (if present — the pain points / "Turn Business Pain Points Into Competitive Advantages" section)

**Current problem:** Centered headline, loose two-column layout with floating card, blue icon features.

**New implementation:**
- Background: `--color-surface-subtle` (alternating from previous section)
- Layout: `grid grid-cols-[1fr_1fr] gap-16` on desktop
- Left column: section headline (`font-display`), body copy, and the three feature items (Automate / Centralize / Scale)
  - Feature items: Remove the blue icons entirely. Replace with a simple left border treatment: `border-l-2 border-accent`, `pl-4`, feature title in `font-body font-semibold`, description in `text-secondary text-sm`
- Right column: The "Common Applications We Build" card
  - Card style: `bg-surface-dark`, `rounded-xl`, padding `2rem`, text `text-on-dark`
  - Card title: `font-body font-semibold text-on-dark-muted text-sm uppercase tracking-wide` (eyebrow style)
  - List items: `text-on-dark`, bullet replaced with a `·` middot character in accent color

---

### 5. "The Solution" Section ("A Website That Works as Hard as You Do")

**Current problem:** Three equal icon cards, blue icons, large empty space.

**New implementation:**
- Background: `--color-surface-light`
- Eyebrow: "THE SOLUTION" in eyebrow style, centered
- H2: `font-display`, centered, `text-section`
- Supporting copy: centered, `max-w-2xl mx-auto`, `text-secondary`
- Cards: Shift from icon-top layout to left-accent layout
  - Three cards in a row (`grid-cols-3` desktop, `grid-cols-1` mobile)
  - Each card: no icon. Instead, a two-character number (`01`, `02`, `03`) in `font-display text-5xl text-accent opacity-40` floated to top-right as a decorative counter.
  - Card content: title (`font-body font-semibold`), description (`text-secondary text-sm`)
  - Cards: `bg-surface-subtle rounded-xl p-8 border border-color-border-light`

---

### 6. "Our Work" Section

**Current problem:** Centered headline, tab buttons look generic, card is functional but unstyled.

**New implementation:**
- Background: `--color-surface-subtle`
- H2 + copy: Left-aligned within container
- Tab switcher: Replace the filled/unfilled pill tabs with an underline tab style
  - Each tab: `font-body font-medium text-secondary`, on active: `text-primary border-b-2 border-accent`
  - Tab container: `flex gap-8 border-b border-color-border-light mb-8`
- Work card: Keep the existing two-column layout (phone mockup left, details right) but refine:
  - Card border: `border border-color-border-light` instead of the gray card background
  - Project name: `font-display text-3xl`
  - Description text: `text-secondary text-sm leading-relaxed`
  - External link: accent color, remove the external link icon or replace with `↗`
  - Thumbnail strip: retain as-is

---

### 7. Pricing Section

**Current problem:** Cards have inconsistent border treatment; Pro card has purple outline but Starter doesn't; typography size jump between plan name and price is harsh.

**New implementation:**
- Background: `--color-surface-light`
- H2: `font-display`, centered
- Two pricing cards side-by-side. Both cards get identical base structure — differentiation comes from weight, not from arbitrary border color.
  - Both cards: `bg-white rounded-xl border border-color-border-light p-10`
  - Starter: no special treatment beyond base
  - Pro card: `border-2 border-accent` AND a subtle background tint `bg-accent-subtle`
  - "Popular" badge: Retain. Style: `bg-accent text-white text-xs font-body font-semibold px-3 py-1 rounded-full`
- Price display: `font-display text-5xl text-primary` — the `/project` suffix in `font-body text-sm text-secondary`
- Feature list: Replace blue checkmarks with `·` in accent color. Or use a minimal `✓` in accent.
- CTA buttons:
  - Starter: secondary/ghost button variant
  - Pro: primary button variant

---

### 8. Hosting & Maintenance Section

**Current problem:** Blue toggle button doesn't match the purple palette; "Most Popular" badge is green which creates a third accent color.

**New implementation:**
- Background: `--color-surface-subtle`
- Period toggle (3 Months / 6 Months / 12 Months):
  - Container: `bg-surface-light rounded-lg p-1 inline-flex border border-color-border-light`
  - Active tab: `bg-accent text-white rounded-md`
  - Inactive: `text-secondary hover:text-primary`
- Hosting cards: same card style as pricing — base card structure, Pro card gets accent border
- "Most Popular" badge: Unify to `bg-accent` (purple) — retire the green. Consistency over color variety.

---

### 9. FAQ Section

**Current problem:** Left-aligned section header but generic accordion items. Functionally fine.

**New implementation:**
- Background: `--color-surface-light`
- H2: `font-display`, retain position
- Accordion items:
  - Remove the outer border wrapper. Each item: `border-b border-color-border-light py-5`
  - Question text: `font-body font-medium text-primary`
  - Chevron: replace with a `+` / `−` toggle character in `text-accent font-light text-xl`
  - Answer: `text-secondary text-sm leading-relaxed pt-2`
  - Open/close animation: `height` transition via Framer Motion `AnimatePresence` + `motion.div` with `initial={{ height: 0 }} animate={{ height: 'auto' }}`

---

### 10. Pain Point CTA Banner (the scrolling marquee "Agencies charge agency prices · DIY tools waste weekends" strip)

**Current problem:** Unclear styling from the screenshot — likely a light strip that breaks the flow.

**New implementation:**
- Background: `--color-surface-dark`
- Text: `text-on-dark-muted`, `font-body text-sm tracking-wide uppercase`
- Separator: `·` in `text-accent`
- This strip now serves as a visual transition element between the light body and the dark Introspect CTA below it

---

### 11. Introspect CTA Section

**Current problem:** Centered `|` divider glyph, small-caps spaced "INTROSPECT" title, centered bullet list, white outlined button on purple. Reads like a late-2010s agency template.

**New implementation:**
- Background: `--color-surface-dark` (continuous dark flow from the scrolling strip above)
- Layout: Two-column grid, `grid-cols-[1fr_1fr] gap-24` on desktop. Single column on mobile.
- Left column:
  - Eyebrow: "INTROSPECT" in `font-body text-xs uppercase tracking-eyebrow text-accent`
  - H2: "Built to understand your project before we build it." — wait, preserve the existing copy. The existing heading text is the spaced "INTROSPECT" with the description paragraph. Keep that structure, just restyle:
    - The `INTROSPECT` label: eyebrow treatment (small, uppercase, accent color, no decorative `|` above it)
    - Body paragraph: `text-on-dark-muted text-base leading-relaxed`
- Right column: The three bullet points
  - Convert from bullet list to numbered items: each item gets a numeral `01`, `02`, `03` in `font-display text-2xl text-accent opacity-50`, followed by the item text in `text-on-dark font-medium`
  - Stack vertically with `gap-6`
- CTA button row (centered below both columns on mobile, left-aligned in left column on desktop):
  - "Start →" button: primary button variant. On dark background it should use the full accent fill — this already works with the primary button.

---

### 12. Final CTA Section ("Ready to Grow Your Business Online?")

**Current problem:** Flat blue background, centered, two full-width buttons that look unbalanced.

**New implementation:**
- Background: `--color-surface-dark` — continuous with the Introspect section above. These two dark sections and the scrolling strip between them form one cohesive dark chapter at the bottom of the page.
- H2: `font-display text-section text-on-dark` — centered
- Supporting copy: `text-on-dark-muted max-w-2xl mx-auto text-center`
- Buttons: `flex gap-4 justify-center` — NOT full-width. Primary + ghost, as-is.

---

### 13. Footer

**Current problem:** Appears minimal/default. Hard to evaluate from the screenshot.

**New implementation:**
- Background: `--color-surface-dark` with a `border-t border-color-border-dark`
- Logo mark left, nav links right (same four links), email right-most
- Copyright: `text-on-dark-muted text-xs`
- All text: `text-on-dark-muted`, hover: `text-on-dark`

---

## Animation Directives

Keep all existing Framer Motion animations. Add the following:

**Scroll-triggered entrance (apply to all section headings and major content blocks):**
```typescript
// Reusable variant — add to lib/animations.ts
export const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }
}

// Usage:
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

**Stagger children (apply to card grids, feature lists, pricing cards):**
```typescript
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

**Hero orb float — CSS only (no Framer Motion needed):**
```css
@keyframes float {
  from { transform: translateY(0px); }
  to   { transform: translateY(-14px); }
}
.hero-orb {
  animation: float 7s ease-in-out infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
  .hero-orb { animation: none; }
}
```

---

## Files to Touch

Open these files in Cursor before beginning:

1. `app/globals.css` — Replace `@theme` block entirely with new tokens above
2. `app/layout.tsx` — Update font imports (DM Serif Display + DM Sans via `next/font/google`)
3. `components/ui/button.tsx` — Rebuild with two variants (primary, ghost)
4. `components/sections/HeroSection.tsx` (or equivalent) — Full rebuild
5. `components/sections/ProcessSection.tsx` — Integrate into hero
6. `components/sections/WhatWeBuild.tsx`
7. `components/sections/PainPoints.tsx`
8. `components/sections/TheSolution.tsx`
9. `components/sections/OurWork.tsx` — Tab treatment only
10. `components/sections/PricingSection.tsx`
11. `components/sections/HostingSection.tsx`
12. `components/sections/FAQ.tsx`
13. `components/sections/IntrospectCTA.tsx`
14. `components/sections/FinalCTA.tsx`
15. `components/layout/Navbar.tsx`
16. `components/layout/Footer.tsx`
17. `lib/animations.ts` — Add `fadeInUp` and `staggerContainer`

---

## Implementation Sequence

Execute in this order to avoid dependency issues:

1. **Tokens first** — `globals.css` color and typography tokens. Verify the site doesn't break catastrophically.
2. **Font swap** — `layout.tsx`. Verify DM Serif Display renders correctly on H1/H2 elements.
3. **Button component** — Establish the two-variant system before touching any section.
4. **Navbar** — Dark treatment, confirm sticky behavior still works.
5. **Hero** — The most complex section. Build the two-column grid, the orb, the eyebrow/H1/CTA stack.
6. **Sections top to bottom** — Work through each section in page order.
7. **Dark sections last** — Pain Point strip, Introspect CTA, Final CTA, Footer as one pass.
8. **Animation pass** — Add `fadeInUp` and `staggerContainer` to all sections uniformly after structure is solid.

---

## Quality Checks Before Marking Done

- [ ] No blue or teal appears anywhere on the page (inspect computed styles)
- [ ] All H2 section headings render in DM Serif Display
- [ ] Buttons never appear full-width on desktop
- [ ] Pricing cards — both have visible structure, Pro has accent border only
- [ ] Hero is left-aligned on desktop, single column stacked on mobile
- [ ] Nav links are right-aligned, logo is left-aligned
- [ ] Dark sections (hero, strip, Introspect CTA, Final CTA, footer) flow visually without white gaps between them
- [ ] `prefers-reduced-motion` disables the hero orb float
- [ ] WCAG AA contrast passes on: nav links on dark, body text on light, text-secondary on light backgrounds
- [ ] Accordion open/close animation still works
- [ ] Work section tab switching still works
- [ ] Hosting period toggle still works and updates prices
