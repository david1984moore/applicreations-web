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
    <div className={className}>
      {items.map(({ id, question, answer }) => {
        const isOpen = openId === id;
        return (
          <div
            key={id}
            className="border-b border-[var(--color-border-light)] py-5"
          >
            <button
              type="button"
              onClick={() => toggle(id)}
              className="flex w-full min-h-[48px] cursor-pointer items-center justify-between gap-4 py-2 text-left transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`accordion-${id}`}
              id={`accordion-trigger-${id}`}
            >
              <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text-primary)]">
                {question}
              </span>
              <span
                className={cn(
                  "text-xl font-light text-accent transition-transform",
                  isOpen ? "" : ""
                )}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-${id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${id}`}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={TRANSITION_REVEAL}
                  className="overflow-hidden"
                >
                  <div className="pt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
