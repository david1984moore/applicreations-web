// components/ui/nav.tsx — Sticky nav, transparent → frosted on scroll, mobile hamburger
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler(); // Set initial state on mount (handles refresh with restored scroll)
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAnchorClick = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[60px] transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-border bg-white/95 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Applicreations home"
        >
          <Image
            src="/logo.png"
            alt="Applicreations"
            width={120}
            height={30}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            Get a Quote →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-raised md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — full-width slide-down panel */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className={cn(
          "overflow-hidden border-b border-border bg-white/95 backdrop-blur-md transition-[max-height] duration-200 ease-out md:hidden",
          mobileOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-4 py-3 text-base font-medium text-text-primary transition-colors hover:bg-surface-raised"
              onClick={handleAnchorClick}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-base font-medium text-white"
            onClick={handleAnchorClick}
          >
            Get a Quote →
          </a>
        </div>
      </div>
    </header>
  );
}
