// components/sections/final-cta.tsx — Closing CTA, links to Introspect questionnaire
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ANIMATION } from "@/lib/animations/constants";

const BULLETS = [
  "Gathers the pertinent requirements for your project",
  "Creates a unique blueprint",
  "Transfers your blueprint to our real human developers to begin building your project",
] as const;

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-16"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.32 0.2 290) 0%, oklch(0.28 0.22 285) 50%, oklch(0.24 0.2 280) 100%)",
      }}
    >
      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.5 0.15 290) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* "I" logo mark — fade + draw-in */}
        <motion.svg
          viewBox="0 0 48 64"
          className="mx-auto mb-6 h-16 w-12 text-white"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.path
            d="M24 4 L24 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="56"
            initial={{ strokeDashoffset: 56 }}
            animate={isInView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </motion.svg>

        {/* INTROSPECT */}
        <motion.h2
          className="mb-4 text-lg font-medium tracking-[0.3em] text-white/60"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: ANIMATION.duration.normal / 1000 }}
        >
          INTROSPECT
        </motion.h2>

        {/* Thin rule */}
        <motion.hr
          className="mx-auto mb-6 h-px w-10 bg-white/30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }}
        />

        {/* Introspect description */}
        <div className="mb-10">
          <motion.p
            className="mb-4 text-base leading-relaxed text-white/90 md:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: ANIMATION.duration.normal / 1000 }}
          >
            Introspect was built in-house to help us form the foundation of your
            app. In just a few minutes, this tool:
          </motion.p>
          <ul className="mx-auto inline-block list-none space-y-2 text-left text-base text-white/90 md:text-lg [&>li]:flex [&>li]:items-start [&>li]:gap-3">
            {BULLETS.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : {}
                }
                transition={{
                  delay: 0.55 + i * 0.1,
                  duration: ANIMATION.duration.normal / 1000,
                }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"
                  aria-hidden
                />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: ANIMATION.duration.normal / 1000 }}
        >
          <Link
            href="/introspect"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-primary shadow-lg shadow-black/20 transition-all duration-200 hover:scale-[1.02] hover:bg-white/95 hover:shadow-xl hover:shadow-primary/25"
          >
            Start
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
