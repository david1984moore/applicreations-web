// components/sections/hero.tsx — Hero with left-anchored editorial layout, ambient orb, process steps
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { TRANSITION_REVEAL } from "@/lib/animations";

const STEPS = [
  {
    num: "01",
    timeframe: "5 Minutes",
    title: "Introspect",
    body: "Answer a few focused questions. Introspect turns your responses into a technical blueprint.",
  },
  {
    num: "02",
    timeframe: "48 Hours",
    title: "Build",
    body: "We deliver a working preview of your site or app within 48 hours—free.",
  },
  {
    num: "03",
    timeframe: "Ongoing",
    title: "Test",
    body: "Review your preview. When you're ready to move forward, we make it official and get to work.",
  },
  {
    num: "04",
    timeframe: "2–6 Weeks",
    title: "Grow",
    body: "We take it from preview to finished product. Most projects wrap in 2–6 weeks.",
  },
] as const;

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setExpandedIds(new Set(STEPS.map((s) => s.num)));
    }
  }, [isMobile]);

  const toggle = (num: string) => {
    const wasExpanded = expandedIds.has(num);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
    if (wasExpanded) {
      setHoveredId(null);
    }
  };

  return (
    <section
      id="process"
      className="relative min-h-screen bg-[var(--color-surface-dark)] pt-[140px] pb-16"
    >
      <div className="mx-auto grid min-h-0 max-w-5xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Left column — content */}
        <div className="flex flex-col justify-center">
          <p
            className="mb-4 font-[family-name:var(--font-dm-sans)] text-[var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-accent"
            style={{ fontSize: "var(--text-eyebrow)" }}
          >
            Custom apps and websites
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION_REVEAL, delay: 0.08 }}
            className="font-[family-name:var(--font-dm-serif)] text-[var(--color-text-on-dark)]"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-hero)",
              fontWeight: 400,
            }}
          >
            Applicreations
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION_REVEAL, delay: 0.24 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild variant="primary" onDark>
              <a href="/introspect">Get a Quote →</a>
            </Button>
            <Button
              variant="ghost"
              onDark
              onClick={() => {
                const el = document.getElementById("work");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              See Our Work
            </Button>
          </motion.div>
        </div>

        {/* Right column — ambient orb */}
        <div className="relative hidden lg:block">
          <div
            className="hero-orb absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(62% 0.22 280 / 0.18) 0%, transparent 70%)",
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Process steps row — horizontal strip at bottom of hero */}
      <div className="mx-auto mt-20 max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ num, timeframe, title, body }, index) => {
            const alignRight = index % 2 === 0;
            const isExpanded =
              expandedIds.has(num) || (!isMobile && hoveredId === num);
            const slideX = isMobile ? (alignRight ? -24 : 24) : 0;

            return (
              <motion.div
                key={num + "-wrapper"}
                initial={isMobile ? { opacity: 0, y: 16 } : false}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => toggle(num)}
                  onMouseEnter={() => setHoveredId(num)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "flex w-full cursor-pointer flex-col transition-colors",
                    isMobile
                      ? alignRight
                        ? "items-end text-right"
                        : "items-start text-left"
                      : "items-center text-center"
                  )}
                  aria-expanded={expandedIds.has(num)}
                  aria-controls={`process-body-${num}`}
                  aria-label={
                    expandedIds.has(num) ? `Collapse ${title}` : `Expand ${title}`
                  }
                  id={`process-trigger-${num}`}
                >
                  <span
                    className={cn(
                      "mb-2 flex flex-col",
                      isMobile
                        ? alignRight
                          ? "items-end"
                          : "items-start"
                        : "items-center"
                    )}
                  >
                    <p
                      className="process-num-glass mb-1 font-[family-name:var(--font-dm-sans)] text-6xl font-thin"
                      aria-hidden
                    >
                      {num}
                    </p>
                    <p
                      className="mb-2 font-[family-name:var(--font-dm-sans)] text-[var(--text-eyebrow)] uppercase tracking-[var(--tracking-eyebrow)] text-accent"
                      style={{ fontSize: "var(--text-eyebrow)" }}
                    >
                      {timeframe}
                    </p>
                    <h3 className="mb-2 text-xl font-semibold text-[var(--color-text-on-dark)]">
                      {title}
                    </h3>
                    <span
                      className={cn(
                        "flex items-center justify-center text-accent transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    >
                      <svg
                        className="h-4 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        id={`process-body-${num}`}
                        role="region"
                        aria-labelledby={`process-trigger-${num}`}
                        initial={{ height: 0, opacity: 0, x: slideX }}
                        animate={{ height: "auto", opacity: 1, x: 0 }}
                        exit={{ height: 0, opacity: 0, x: slideX }}
                        transition={TRANSITION_REVEAL}
                        className="w-full overflow-hidden"
                      >
                        <p
                          className={cn(
                            "text-balance text-[15px] leading-relaxed text-[var(--color-text-on-dark-muted)]",
                            !isMobile && "mx-auto max-w-[260px]"
                          )}
                        >
                          {body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
