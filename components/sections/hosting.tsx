// components/sections/hosting.tsx — Post-launch hosting & support info
"use client";

import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT_SECTION } from "@/lib/animations";

export function Hosting() {
  return (
    <section
      id="hosting"
      className="bg-[var(--color-surface-light)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            After Launch
          </p>
          <h2
            className="mb-10 font-[family-name:var(--font-dm-serif)] text-[var(--color-text-primary)]"
            style={{
              fontSize: "var(--text-section)",
              lineHeight: "var(--leading-section)",
            }}
          >
            Hosting &amp; Support
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-6 md:p-8">
            <p className="mb-1 text-lg font-semibold text-[var(--color-text-primary)]">
              Included
            </p>
            <p className="mb-4 text-3xl font-bold text-accent">30 days</p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Every project includes 30 days of post-launch hosting and support.
              We&apos;re available to fix issues, answer questions, and make sure
              everything runs smoothly after you go live.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border-light)] bg-white p-6 md:p-8">
            <p className="mb-1 text-lg font-semibold text-[var(--color-text-primary)]">
              Ongoing plan
            </p>
            <p className="mb-4 text-3xl font-bold text-accent">$49 / month</p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Safety monitoring, routine health checks, and real-time support. We
              handle all technical maintenance — you focus on running your
              business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
