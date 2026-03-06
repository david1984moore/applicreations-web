"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// components/sections/pain-strip.tsx — Pain points strip, dark transition to Introspect CTA
const PAIN_ITEMS = [
  "Agencies charge agency prices",
  "DIY tools waste weekends",
  "Your site isn\u2019t converting",
  "No generic templates",
  "Human designed, specific to you",
] as const;

const DURATION_MS = 5000;
const TRANSITION_MS = 1400;
const ENTER_DELAY_MS = 1100;

export function PainStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_ITEMS.length);
    }, DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const text = PAIN_ITEMS[index];

  return (
    <section className="bg-[var(--color-surface-dark)] py-6">
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
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium uppercase tracking-wide text-[var(--color-text-on-dark-muted)]">
                {text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
