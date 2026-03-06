// components/sections/footer.tsx — Minimal footer, dark
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FOOTER_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Footer() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-block cursor-pointer"
              aria-label="Applicreations home"
              onClick={handleLogoClick}
            >
              <Image
                src="/logo.png"
                alt="Applicreations"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
            {FOOTER_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex min-h-[44px] cursor-pointer items-center text-sm text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)] md:min-h-0"
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:applicreations@gmail.com"
              className="flex min-h-[44px] cursor-pointer items-center text-sm text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-text-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-dark)] md:min-h-0"
            >
              applicreations@gmail.com
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-[var(--color-text-on-dark-muted)]">
          © 2026 Applicreations. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
