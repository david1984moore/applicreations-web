// components/sections/faq.tsx — FAQ accordion with real copy
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { fadeInUp, VIEWPORT_SECTION } from "@/lib/animations";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Most projects are delivered in 2–4 weeks. More complex builds can run up to 6 weeks, but that's the exception.",
  },
  {
    id: "provide",
    question: "What do I need to provide?",
    answer: (
      <>
        Start with{" "}
        <Link
          href="/introspect"
          className="font-medium text-accent hover:text-accent-hover"
        >
          Introspect
        </Link>{" "}
        — it walks you through everything we need: business name, brand
        preferences, goals, and functionality. No need to figure out what to
        include in an email.
      </>
    ),
  },
  {
    id: "payment",
    question: "What payment options are available?",
    answer:
      "A 50% deposit starts the project after your free preview is delivered, approved, and a proposal is signed. The remaining balance can be paid in full at launch or split into 3 monthly payments. The preview itself is completely free.",
  },
  {
    id: "hosting",
    question: "Is hosting really included?",
    answer:
      "Every project includes 30 days of hosting and support at no extra cost. After that, you can continue with our monthly hosting plan or manage hosting independently — either way, your site stays live.",
  },
  {
    id: "changes",
    question: "What if I need changes after launch?",
    answer:
      "Every project includes 30 days of post-launch support. After that, ongoing maintenance packages are available. Small tweaks are quick — we're here when you need us.",
  },
  {
    id: "outside-de",
    question: "Do you work with businesses outside your area?",
    answer:
      "We focus on the Delaware Valley but work with clients anywhere in the U.S. Eastern time zone. Use Introspect or send us an email to get started.",
  },
  {
    id: "vs-diy",
    question: "How is this different from Wix or Squarespace?",
    answer:
      "Template builders produce generic results with limited customization. Everything we build is custom — designed around your specific needs, not adapted from someone else's layout.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="bg-[var(--color-surface-light)] py-8 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          className="mb-4 sm:mb-6 font-[family-name:var(--font-dm-serif)] text-2xl sm:text-[length:var(--text-section)] text-[var(--color-text-primary)]"
          style={{
            lineHeight: "var(--leading-section)",
          }}
        >
          Frequently asked questions
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </div>
    </section>
  );
}
