// lib/animations.ts — Shared Framer Motion constants per SCOPE

/** 200ms for micro-interactions (hover, focus) */
export const DURATION_MICRO = 0.2;

/** 350ms for section/page reveals */
export const DURATION_REVEAL = 0.35;

/** Ease-out cubic — [0.25, 0.1, 0.25, 1.0] */
export const EASE_OUT_CUBIC = [0.25, 0.1, 0.25, 1.0] as const;

/** Scroll-triggered reveal viewport: conservative, once, -50px margin */
export const VIEWPORT_REVEAL = { once: true, margin: "-50px" } as const;

/** Viewport for section headings — -80px margin */
export const VIEWPORT_SECTION = { once: true, margin: "-80px" } as const;

/** Default transition for enter animations */
export const TRANSITION_REVEAL = {
  duration: DURATION_REVEAL,
  ease: EASE_OUT_CUBIC,
} as const;

/** Scroll-triggered fade-in-up — for section headings and major content blocks */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

/** Stagger children — for card grids, feature lists, pricing cards */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;
