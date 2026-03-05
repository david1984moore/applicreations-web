"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// components/sections/pain-strip.tsx — Pain points in one row (slideshow)
const PAIN_ITEMS = [
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "DIY tools waste weekends",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Agencies charge agency prices",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    text: "Your site isn't converting",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: "No generic templates",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    text: "Human designed, specific to you",
  },
] as const;

const DURATION_MS = 5000; // Time each slide stays visible (5 seconds)
const TRANSITION_MS = 1400; // Fade in/out duration (1.4 seconds)
const ENTER_DELAY_MS = 1100; // Delay before next fades in (current ~80% done fading out)

export function PainStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_ITEMS.length);
    }, DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const { icon, text } = PAIN_ITEMS[index];

  return (
    <section className="border-y border-border bg-surface-raised py-6">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6">
        <div className="relative min-h-10 w-full overflow-hidden">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: 80,
                transition: { duration: TRANSITION_MS / 1000, ease: "easeInOut" },
              }}
              transition={{
                duration: TRANSITION_MS / 1000,
                ease: "easeInOut",
                delay: ENTER_DELAY_MS / 1000,
              }}
              className="absolute inset-0 flex items-center justify-center gap-3 md:justify-center"
            >
              {icon}
              <span className="text-sm font-medium text-text-primary">{text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
