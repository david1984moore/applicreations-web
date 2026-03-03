// components/sections/faq.tsx — FAQ accordion with real copy
import { Accordion, type AccordionItem } from "@/components/ui/accordion";

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Most projects ship in 2–3 weeks from kickoff. We'll give you a specific timeline after we review your needs.",
  },
  {
    id: "provide",
    question: "What do I need to provide?",
    answer:
      "Your logo, brand colors (if you have them), and the content for each page. We'll handle structure, design, and build. If you're not sure what to write, we can help draft copy.",
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
      "We include 30 or 60 days of support depending on your plan. After that, we offer ongoing maintenance packages. Small tweaks are quick; we're here when you need us.",
  },
  {
    id: "outside-de",
    question: "Do you work with businesses outside your area?",
    answer:
      "We focus on local small businesses, but we've worked with clients in neighboring areas. Ask us — if it's a good fit, we'll say yes.",
  },
  {
    id: "vs-diy",
    question: "How is this different from Wix or Squarespace?",
    answer:
      "Those are DIY tools. You get a template and you build it yourself. We design and build a custom site for you — no templates, no weekend projects. You get a finished site and we handle the rest.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-6 text-2xl font-semibold text-text-primary">
          Frequently asked questions
        </h2>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
