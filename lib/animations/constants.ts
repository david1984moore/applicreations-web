// lib/animations/constants.ts — Reusable animation values per INTROSPECT spec

export const ANIMATION = {
  // Durations (ms)
  duration: {
    instant: 150,
    fast: 200,
    normal: 300,
    medium: 400,
    slow: 600,
    verySlow: 1000,
  },

  // Easing
  ease: {
    out: [0.0, 0.0, 0.2, 1.0] as const,
    inOut: [0.4, 0.0, 0.2, 1.0] as const,
    spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
    springGentle: { type: 'spring' as const, stiffness: 150, damping: 25 },
  },

  // Reusable variants
  variants: {
    fadeUp: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideInFromRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    },
    stagger: {
      visible: { transition: { staggerChildren: 0.12 } },
    },
    staggerFast: {
      visible: { transition: { staggerChildren: 0.06 } },
    },
  },
} as const
