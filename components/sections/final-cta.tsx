// components/sections/final-cta.tsx — Closing CTA, links to Introspect questionnaire
"use client";

import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="contact" className="bg-primary py-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
          Ready to stop leaving money on the table?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Most businesses that need a website already know they need one. The
          only question is who builds it. Answer a few questions with Introspect
          and get a personalized proposal in minutes.
        </p>
        <Link
          href="/introspect"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-white/95"
        >
          Get your quote - with Introspect →
        </Link>
      </div>
    </section>
  );
}
