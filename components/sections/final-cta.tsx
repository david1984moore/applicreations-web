// components/sections/final-cta.tsx — Introspect CTA + Final CTA, dark cohesive chapter
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ANIMATION } from "@/lib/animations/constants";
import { IntrospectFieldCycler } from "@/components/sections/introspect-field-cycler";

const BULLETS = [
  "Gathers the pertinent requirements for your project",
  "Transforms your answers into a Product Requirements Document (PRD) for our development team",
  "We get to work on your free demo",
  "Like the demo? We agree on scope and timeline, then refine it into your final product — delivered on schedule.",
] as const;

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-[var(--color-surface-dark)] py-20"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 lg:grid-cols-[1fr_1fr] lg:gap-24">
        {/* Left column — intro content + desktop-only bullets */}
        <div className="order-1 lg:order-none">
          <motion.svg
            viewBox="0 0 48 64"
            className="mb-6 h-16 w-12 text-[var(--color-text-on-dark)]"
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
          <motion.p
            className="mb-4 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[var(--tracking-eyebrow)] text-accent"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            INTROSPECT
          </motion.p>
          <motion.p
            className="mb-10 text-base leading-relaxed text-[var(--color-text-on-dark-muted)] md:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: ANIMATION.duration.normal / 1000,
            }}
          >
            Good builds start with good questions. Introspect is how we make sure
            we understand your project before writing a single line of code —
            the project, the purpose behind it, and what done actually looks
            like. Takes about 5–10 minutes. We&#39;ll have a working demo
            within 48 hours, completely free.
          </motion.p>

          {/* Desktop-only numbered points */}
          <div className="hidden lg:flex mb-10 flex-col gap-6">
            {BULLETS.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.55 + i * 0.1,
                  duration: ANIMATION.duration.normal / 1000,
                }}
                className="flex items-start gap-4"
              >
                <span
                  className="font-[family-name:var(--font-dm-serif)] text-2xl text-accent opacity-50"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-[var(--color-text-on-dark)]">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column — animation card (footer hidden on mobile via CSS) */}
        <div className="order-2 lg:order-none mt-0 lg:mt-24">
          <IntrospectFieldCycler />
        </div>

        {/* Mobile-only: bullets + standalone CTA below the animation */}
        <div className="order-3 flex flex-col gap-8 lg:hidden">
          <div className="flex flex-col gap-6">
            {BULLETS.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.55 + i * 0.1,
                  duration: ANIMATION.duration.normal / 1000,
                }}
                className="flex items-start gap-4"
              >
                <span
                  className="font-[family-name:var(--font-dm-serif)] text-2xl text-accent opacity-50"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-[var(--color-text-on-dark)]">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>

          <Link
            href="/introspect"
            className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Start Introspect
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
