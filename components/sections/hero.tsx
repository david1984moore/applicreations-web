// components/sections/hero.tsx — Above-fold hero, entrance animations
"use client";

import { motion } from "framer-motion";
import { TRANSITION_REVEAL } from "@/lib/animations";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.08 }}
          className="mb-6 text-3xl font-semibold leading-tight text-white md:text-4xl"
        >
          Custom App and Websites
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.16 }}
          className="mx-auto mb-8 max-w-xl text-lg text-white"
        >
          No generic templates, we design and build sites tailored just for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.24 }}
          className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            Get a Quote →
          </a>
          <a
            href="#work"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-white/20"
          >
            See Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
