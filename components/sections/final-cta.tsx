// components/sections/final-cta.tsx — Introspect CTA + Final CTA, dark cohesive chapter
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ANIMATION } from "@/lib/animations/constants";
import { IntrospectFieldCycler } from "@/components/sections/introspect-field-cycler";
import { IntrospectTimeline } from "@/components/sections/introspect-timeline";

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
            Good builds start with good questions. Introspect is a short intake —
            about 5–10 minutes — that helps us understand your project,
            what&apos;s driving it, and what a successful outcome looks like.
            We&apos;ll have a working demo back to you within 48 hours, completely
            free.
          </motion.p>

          {/* Desktop-only animated timeline */}
          <div className="hidden lg:block mb-10">
            <IntrospectTimeline />
          </div>
        </div>

        {/* Right column — animation card (footer hidden on mobile via CSS) */}
        <div className="order-2 lg:order-none mt-0 lg:mt-24">
          <IntrospectFieldCycler />
        </div>

        {/* Mobile-only: timeline + standalone CTA below the animation */}
        <div className="order-3 flex flex-col gap-8 lg:hidden">
          <IntrospectTimeline />

          <div className="flex justify-center md:justify-start">
            <Link
              href="/introspect"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Start Introspect
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
