// components/sections/pricing.tsx — Two pricing cards, hosting included
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, VIEWPORT_SECTION } from "@/lib/animations";

const STARTER_FEATURES = [
  "Up to 5 pages",
  "Custom design",
  "Mobile-ready",
  "SEO basics",
  "Contact form",
  "Hosting included",
  "30 days support",
] as const;

const PRO_FEATURES = [
  "Up to 10 pages",
  "Custom design",
  "Mobile-ready",
  "Advanced SEO",
  "Email integration",
  "Hosting included",
  "60 days support",
  "CMS for updates",
] as const;

const FEATURES_VISIBLE_MOBILE = 4;

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-accent">·</span>
      {text}
    </li>
  );
}

function FeatureList({
  features,
  expanded,
  onToggle,
}: {
  features: readonly string[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const visible = expanded ? features : features.slice(0, FEATURES_VISIBLE_MOBILE);
  const hasMore = features.length > FEATURES_VISIBLE_MOBILE;

  return (
    <div className="mb-6 flex-1">
      <ul className="hidden space-y-2 text-sm text-[var(--color-text-secondary)] md:block">
        {features.map((f) => (
          <FeatureItem key={f} text={f} />
        ))}
      </ul>
      <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] md:hidden">
        {visible.map((f) => (
          <FeatureItem key={f} text={f} />
        ))}
        {hasMore && !expanded && (
          <li>
            <button
              type="button"
              onClick={onToggle}
              className="flex min-h-[44px] w-full cursor-pointer items-center text-left text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Show all features
            </button>
          </li>
        )}
        {hasMore && expanded && (
          <li>
            <button
              type="button"
              onClick={onToggle}
              className="flex min-h-[44px] w-full cursor-pointer items-center text-left text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Show less
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export function Pricing() {
  const [starterExpanded, setStarterExpanded] = useState(false);
  const [proExpanded, setProExpanded] = useState(false);

  return (
    <section
      id="pricing"
      className="bg-[var(--color-surface-subtle)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="mb-12 text-center font-[family-name:var(--font-dm-serif)] text-[var(--color-text-primary)]"
          style={{
            fontSize: "var(--text-section)",
            lineHeight: "var(--leading-section)",
          }}
        >
          Pricing
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Starter */}
          <div className="order-2 flex flex-col rounded-xl border border-[var(--color-border-light)] bg-white p-10 shadow-sm md:order-1">
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
              Starter
            </h3>
            <p className="mb-4 font-[family-name:var(--font-dm-serif)] text-5xl text-[var(--color-text-primary)]">
              $2,500
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[var(--color-text-secondary)]">
                /project
              </span>
            </p>
            <FeatureList
              features={STARTER_FEATURES}
              expanded={starterExpanded}
              onToggle={() => setStarterExpanded((e) => !e)}
            />
            <Button asChild variant="ghost">
              <a href="/introspect">Get Started</a>
            </Button>
          </div>

          {/* Pro — Popular */}
          <div
            className="relative order-1 flex flex-col rounded-xl border-2 border-accent p-10 shadow-sm md:order-2"
            style={{ backgroundColor: "var(--color-accent-subtle)" }}
          >
            <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              Popular
            </span>
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
              Pro
            </h3>
            <p className="mb-4 font-[family-name:var(--font-dm-serif)] text-5xl text-[var(--color-text-primary)]">
              $4,500
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-normal text-[var(--color-text-secondary)]">
                /project
              </span>
            </p>
            <FeatureList
              features={PRO_FEATURES}
              expanded={proExpanded}
              onToggle={() => setProExpanded((e) => !e)}
            />
            <Button asChild variant="primary">
              <a href="/introspect">Get Started →</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
