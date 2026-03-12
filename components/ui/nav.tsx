// components/ui/nav.tsx — Sticky nav, dark frosted glass, accent underline on hover
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isIntrospect = pathname?.startsWith("/introspect");
  // RECONCILED: Old flow had nav Back for questionnaire/review; spec uses in-card Back only

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAnchorClick = () => setMobileOpen(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[60px] transition-colors duration-200 nav-blur",
        scrolled && "border-b border-[var(--color-border-dark)]"
      )}
      style={{
        backgroundColor: "oklch(14% 0.02 265)",
      }}
    >
      <nav className="relative mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex shrink-0 cursor-pointer items-center"
          aria-label="Applicreations home"
          onClick={handleLogoClick}
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

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="group relative cursor-pointer text-sm font-normal text-[var(--color-text-on-dark-muted)] transition-colors duration-200 hover:text-[var(--color-text-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)]"
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                aria-hidden
              />
            </a>
          ))}
          {!isIntrospect && (
            <a
              href="/introspect"
              className="ml-2 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-[6px] border border-[var(--color-border-dark)] bg-transparent px-7 py-3 text-[15px] font-medium text-[var(--color-text-on-dark)] transition-all duration-[180ms] hover:-translate-y-px hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)]"
            >
              Introspect
            </a>
          )}
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-[6px] text-[var(--color-text-on-dark)] transition-colors hover:bg-[var(--color-surface-mid)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)] md:hidden"
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

      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className={cn(
          "overflow-hidden border-b border-[var(--color-border-dark)] transition-[max-height] duration-200 ease-out md:hidden",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
        style={{
          backgroundColor: "oklch(14% 0.02 265)",
        }}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="cursor-pointer rounded-[6px] px-4 py-3 text-base font-medium text-[var(--color-text-on-dark)] transition-colors hover:bg-[var(--color-surface-mid)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)]"
              onClick={handleAnchorClick}
            >
              {label}
            </a>
          ))}
          {!isIntrospect && (
          <Link
            href="/introspect"
            className="mt-2 block cursor-pointer rounded-[6px] border border-[var(--color-border-dark)] bg-transparent px-4 py-3 text-center text-base font-medium text-[var(--color-text-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)] transition-colors hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]"
            onClick={handleAnchorClick}
          >
              Introspect
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
