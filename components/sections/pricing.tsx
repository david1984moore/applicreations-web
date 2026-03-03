// components/sections/pricing.tsx — Two pricing cards, hosting included
"use client";

import { useState } from "react";

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
      <span className="text-accent">✓</span>
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
      {/* Desktop: always show full list */}
      <ul className="hidden space-y-2 text-sm text-text-secondary md:block">
        {features.map((f) => (
          <FeatureItem key={f} text={f} />
        ))}
      </ul>
      {/* Mobile: collapsible with Show all */}
      <ul className="space-y-2 text-sm text-text-secondary md:hidden">
        {visible.map((f) => (
          <FeatureItem key={f} text={f} />
        ))}
        {hasMore && !expanded && (
          <li>
            <button
              type="button"
              onClick={onToggle}
              className="flex min-h-[44px] w-full items-center text-left text-sm font-medium text-accent transition-colors hover:text-accent-hover"
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
              className="flex min-h-[44px] w-full items-center text-left text-sm font-medium text-accent transition-colors hover:text-accent-hover"
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
    <section id="pricing" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Starter — second on mobile (Pro first per SCOPE) */}
          <div className="order-2 flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm md:order-1">
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Starter
            </h3>
            <p className="mb-4 text-3xl font-semibold text-text-primary">
              $2,500
              <span className="text-base font-normal text-text-muted">
                /project
              </span>
            </p>
            <FeatureList
              features={STARTER_FEATURES}
              expanded={starterExpanded}
              onToggle={() => setStarterExpanded((e) => !e)}
            />
            <a
              href="#contact"
              className="flex min-h-[44px] w-full items-center justify-center rounded-lg border border-border-strong py-2.5 text-base font-medium text-text-primary transition-colors hover:bg-surface-raised md:w-auto"
            >
              Get Started
            </a>
          </div>

          {/* Pro — first on mobile per SCOPE */}
          <div className="relative order-1 flex flex-col rounded-xl border-2 border-primary bg-surface p-6 shadow-md md:order-2">
            <span className="absolute -top-3 left-6 rounded bg-primary px-2 py-0.5 text-xs font-medium text-white">
              Popular
            </span>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Pro
            </h3>
            <p className="mb-4 text-3xl font-semibold text-text-primary">
              $4,500
              <span className="text-base font-normal text-text-muted">
                /project
              </span>
            </p>
            <FeatureList
              features={PRO_FEATURES}
              expanded={proExpanded}
              onToggle={() => setProExpanded((e) => !e)}
            />
            <a
              href="#contact"
              className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover md:w-auto"
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
