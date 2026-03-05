// components/sections/hero.tsx — Above-fold hero, entrance animations
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TRANSITION_REVEAL } from "@/lib/animations";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 pt-20 pb-12">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.08 }}
          className="mb-2 flex items-center justify-center gap-4 font-(family-name:--font-inter) text-3xl font-semibold italic leading-tight tracking-[0.2em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.25)] md:text-4xl"
        >
          <Image
            src="/logo.png"
            alt=""
            width={80}
            height={80}
            className="h-14 w-14 shrink-0 md:h-20 md:w-20 [filter:drop-shadow(0_8px_6px_rgba(0,0,0,0.35))]"
            priority
          />
          Applicreations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.16 }}
          className="mx-auto mb-20 max-w-xl translate-x-20 font-(family-name:--font-inter) text-lg italic text-white"
        >
          Custom apps and websites
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_REVEAL, delay: 0.24 }}
          className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <a
            href="/introspect"
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
