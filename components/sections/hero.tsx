// components/sections/hero.tsx — Above-fold hero, entrance animations
"use client";

import { motion } from "framer-motion";
import { TRANSITION_REVEAL } from "@/lib/animations";

export function Hero() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.08 }}
          className="mb-6 text-3xl font-semibold leading-tight text-text-primary md:text-4xl"
        >
          Your website should work as hard as you do.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.16 }}
          className="mx-auto mb-8 max-w-xl text-lg text-text-secondary"
        >
          We design and build custom websites for small businesses —
          with hosting, support, and strategy included from day one.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.24 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            Get a Quote →
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-lg border border-border-strong px-5 py-2.5 text-base font-medium text-text-primary transition-colors hover:bg-surface-raised"
          >
            See Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
