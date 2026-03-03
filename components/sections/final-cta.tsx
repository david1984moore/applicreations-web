// components/sections/final-cta.tsx — Closing CTA with contact form, dark background
"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function FinalCTA() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      businessName: formData.get("businessName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      message: formData.get("message") as string,
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please email us directly at support@applicreations.com."
      );
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="bg-primary py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
            Thanks — we&apos;ll be in touch soon.
          </h2>
          <p className="text-lg text-white/90">
            We typically respond within one business day.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-primary py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
            Ready to stop leaving money on the table?
          </h2>
          <p className="text-lg text-white/90">
            Most businesses that need a website already know they need one. The
            only question is who builds it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-white/90"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="businessName"
                className="mb-1 block text-sm font-medium text-white/90"
              >
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                autoComplete="organization"
                className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Your business"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-white/90"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-white/90"
              >
                Phone <span className="text-white/60">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="(302) 555-0123"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-white/90"
            >
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-amber-200">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full min-h-[44px] rounded-lg bg-white px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-white/95 disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Get Your Quote — It Takes 5 Minutes →"}
          </button>
        </form>
      </div>
    </section>
  );
}
