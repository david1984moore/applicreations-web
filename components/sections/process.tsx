// components/sections/process.tsx — 4-step process
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export function Process() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (num: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <section id="process" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ num, timeframe, title, body }) => {
            const isExpanded = expandedIds.has(num);
            return (
              <div
                key={num}
                className="flex flex-col items-center text-center"
              >
                <button
                  type="button"
                  onClick={() => toggle(num)}
                  className="mb-2 flex w-full cursor-pointer flex-col items-center text-center transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`process-body-${num}`}
                  aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
                  id={`process-trigger-${num}`}
                >
                  <p className="mb-1 font-mono text-2xl text-text-muted">{num}</p>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                    {timeframe}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold text-text-primary">
                    {title}
                  </h3>
                  <span
                    className={cn(
                      "process-chevron flex items-center justify-center transition-colors duration-200",
                      isExpanded ? "text-red-500" : "text-green-500"
                    )}
                  >
                    <svg
                      className={cn(
                        "h-4 w-5 shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`process-body-${num}`}
                      role="region"
                      aria-labelledby={`process-trigger-${num}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={TRANSITION_REVEAL}
                      className="w-full overflow-hidden"
                    >
                      <p className="max-w-[260px] mx-auto text-balance text-[15px] leading-relaxed text-text-secondary">
                        {body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
