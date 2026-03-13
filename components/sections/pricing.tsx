// components/sections/pricing.tsx — Three pricing packages, mobile tabbed layout
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fadeInUp, VIEWPORT_SECTION } from "@/lib/animations";

const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: 1499,
    popular: false,
    features: [
      "1-page website",
      "Custom design",
      "Mobile-ready",
      "Contact form",
      "SEO basics",
      "30 days support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 2599,
    popular: true,
    features: [
      "Up to 5 pages",
      "Custom design",
      "Mobile-ready",
      "Advanced SEO",
      "Contact form",
      "Email integration",
      "30 days support",
      "Hosting included",
    ],
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: 6499,
    popular: false,
    features: [
      "Up to 10 pages",
      "Custom design",
      "Mobile-ready",
      "Advanced SEO",
      "Contact form",
      "Email integration",
      "CMS for updates",
      "1 year hosting & support",
      "May include custom web app (not just a website)",
    ],
  },
] as const;

type PackageId = (typeof PACKAGES)[number]["id"];

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PackageId>("pro");
  const [mobileAppAddon, setMobileAppAddon] = useState(false);

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

        {/* ── Mobile: tabbed single-card view ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="md:hidden"
        >
          <div className="mb-6 flex overflow-hidden rounded-lg border border-[var(--color-border-light)]">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setActiveTab(pkg.id)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  activeTab === pkg.id
                    ? "bg-accent text-white"
                    : "bg-transparent text-[var(--color-text-secondary)] hover:bg-accent/10"
                )}
              >
                {pkg.name}
              </button>
            ))}
          </div>

          {PACKAGES.filter((pkg) => pkg.id === activeTab).map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-[var(--color-border-light)] bg-white p-6 shadow-sm"
            >
              {pkg.popular && (
                <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="mb-1 text-xl font-semibold text-[var(--color-text-primary)]">
                {pkg.name}
              </h3>
              <p className="mb-1 font-[family-name:var(--font-dm-serif)] text-4xl text-[var(--color-text-primary)]">
                ${pkg.price.toLocaleString()}
                <span className="font-[family-name:var(--font-dm-sans)] text-base font-normal text-[var(--color-text-secondary)]">
                  /project
                </span>
              </p>

              <ul className="mb-6 mt-4 space-y-2">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <label className="mb-6 flex cursor-pointer items-center gap-3 border-t border-[var(--color-border-light)] py-3">
                <input
                  type="checkbox"
                  checked={mobileAppAddon}
                  onChange={(e) => setMobileAppAddon(e.target.checked)}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                <span className="text-sm">
                  Add native mobile app
                  <span className="text-[var(--color-text-secondary)]">
                    {" "}— $4,499
                  </span>
                </span>
              </label>

              {mobileAppAddon && (
                <p className="-mt-4 mb-4 pl-7 text-xs text-[var(--color-text-secondary)]">
                  iOS + Android companion app. Scoped separately after project
                  kickoff.
                </p>
              )}

              <Button
                asChild
                variant={pkg.popular ? "primary" : "ghost"}
                className="w-full"
              >
                <a href="/introspect">Get Started →</a>
              </Button>
            </div>
          ))}
        </motion.div>

        {/* ── Desktop: 3-card grid ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="hidden gap-6 md:grid md:grid-cols-3"
        >
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                pkg.popular
                  ? "border-accent bg-accent/5 shadow-md ring-1 ring-accent"
                  : "border-[var(--color-border-light)] bg-white shadow-sm"
              )}
            >
              {pkg.popular && (
                <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}
              <h3 className="mb-1 text-xl font-semibold text-[var(--color-text-primary)]">
                {pkg.name}
              </h3>
              <p className="mb-1 font-[family-name:var(--font-dm-serif)] text-4xl text-[var(--color-text-primary)]">
                ${pkg.price.toLocaleString()}
                <span className="font-[family-name:var(--font-dm-sans)] text-base font-normal text-[var(--color-text-secondary)]">
                  /project
                </span>
              </p>
              <ul className="mb-6 mt-4 flex-1 space-y-2">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={pkg.popular ? "primary" : "ghost"}
                className="w-full"
              >
                <a href="/introspect">Get Started →</a>
              </Button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
