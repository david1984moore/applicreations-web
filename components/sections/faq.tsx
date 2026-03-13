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
      "2-6 weeks depending on content and use case for your website or app. Although some projects do take 6 weeks, most projects typically range 2-4 weeks.",
  },
  {
    id: "provide",
    question: "What do I need to provide?",
    answer: (
      <>
        We recommend using Introspect to guide you through the process. This
        gives us the context we need—things like business/project name, brand
        colors, design preferences, what you want your website/app to do, and
        how you may want it to look. Introspect is designed to gather these
        essential building blocks for your app. So use the{" "}
        <Link
          href="/introspect"
          className="font-medium text-accent hover:text-accent-hover"
        >
          Introspect
        </Link>{" "}
        tool. Better than trying to remember everything you want in an email.
      </>
    ),
  },
  {
    id: "payment",
    question: "What payment options are available?",
    answer:
      "All projects require a 50% deposit to start. This does not apply to the free preview. The preview is 100% free. You can of course pay for the project in full up front. In all other cases, when an official proposal is signed (after the preview app is delivered and tested), a 50% deposit is immediately due to begin the project. Two options are provided to pay the remaining balance. Option A: Pay the remaining balance in full when your app or website is live online and your project is complete. Option B: You can choose to pay the remaining balance in 3 equal monthly payments.",
  },
  {
    id: "hosting",
    question: "Is hosting really included?",
    answer:
      "Yes. Hosting, domain management, and security monitoring are included from day one. No surprise bills for infrastructure.",
  },
  {
    id: "changes",
    question: "What if I need changes after launch?",
    answer:
      "We include 30 or 60 days of support depending on your plan. After that, we offer ongoing maintenance packages. Small tweaks are quick; we\u2019re here when you need us.",
  },
  {
    id: "outside-de",
    question: "Do you work with businesses outside your area?",
    answer:
      "While we focus on our local Delaware Valley region, we are open to all potential clients, regardless of location. We operate in U.S. Eastern Standard time zone. Please take into consideration when contacting. Either send us an email or use our Introspect tool to get started.",
  },
  {
    id: "vs-diy",
    question: "How is this different from Wix or Squarespace?",
    answer:
      "Those tools use templates that look generic. We do not use any templates when architecting your website or app. We take the time to understand your specific needs and build a custom website or app according to those needs. With Wix or other website builders, your ability to customize is restrained. Our design process is completely unrestrained and template-free.",
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
