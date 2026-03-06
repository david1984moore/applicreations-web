// app/not-found.tsx — Branded 404 page
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-surface-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "60px clamp(1.5rem, 8vw, 8rem) 0 clamp(1.5rem, 8vw, 8rem)",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          marginBottom: "1.5rem",
        }}
      >
        404
      </p>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          lineHeight: 1.05,
          color: "var(--color-text-on-dark)",
          marginBottom: "1.5rem",
          maxWidth: "14ch",
        }}
      >
        That page doesn&apos;t exist.
      </h1>

      {/* Subtext — dry, not apologetic */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.125rem",
          color: "var(--color-text-on-dark-muted)",
          marginBottom: "3rem",
          maxWidth: "40ch",
        }}
      >
        It may have moved, or it never existed. Either way, let&apos;s get you
        back.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="cursor-pointer hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "var(--color-accent)",
          color: "white",
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          fontWeight: 500,
          padding: "12px 28px",
          borderRadius: "6px",
          textDecoration: "none",
          transition: "background-color 180ms ease, transform 180ms ease",
        }}
      >
        Back to home →
      </Link>
    </div>
  );
}
