// components/ui/accordion.tsx — Accordion primitive for FAQ
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TRANSITION_REVEAL } from "@/lib/animations";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map(({ id, question, answer }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(id)}
              className="flex w-full min-h-[48px] items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-surface-raised"
              aria-expanded={isOpen}
              aria-controls={`accordion-${id}`}
              id={`accordion-trigger-${id}`}
            >
              <span className="font-medium text-text-primary">{question}</span>
              <svg
                className={cn(
                  "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-${id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={TRANSITION_REVEAL}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm text-text-secondary">{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
