// components/sections/pricing.tsx — Two pricing cards, hosting included
const STARTER_FEATURES = [
  "Up to 5 pages",
  "Custom design",
  "Mobile-ready",
  "SEO basics",
  "Contact form",
  "Hosting included",
  "30 days support",
] as const;

const PRO_FEATURES = [
  "Up to 10 pages",
  "Custom design",
  "Mobile-ready",
  "Advanced SEO",
  "Email integration",
  "Hosting included",
  "60 days support",
  "CMS for updates",
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Starter — second on mobile (Pro first per SCOPE) */}
          <div className="order-2 flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm md:order-1">
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Starter
            </h3>
            <p className="mb-4 text-3xl font-semibold text-text-primary">
              $2,500
              <span className="text-base font-normal text-text-muted">
                /project
              </span>
            </p>
            <ul className="mb-6 flex-1 space-y-2 text-sm text-text-secondary">
              {STARTER_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="flex min-h-[44px] items-center justify-center rounded-lg border border-border-strong py-2.5 text-base font-medium text-text-primary transition-colors hover:bg-surface-raised"
            >
              Get Started
            </a>
          </div>

          {/* Pro — first on mobile per SCOPE */}
          <div className="relative order-1 flex flex-col rounded-xl border-2 border-primary bg-surface p-6 shadow-md md:order-2">
            <span className="absolute -top-3 left-6 rounded bg-primary px-2 py-0.5 text-xs font-medium text-white">
              Popular
            </span>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              Pro
            </h3>
            <p className="mb-4 text-3xl font-semibold text-text-primary">
              $4,500
              <span className="text-base font-normal text-text-muted">
                /project
              </span>
            </p>
            <ul className="mb-6 flex-1 space-y-2 text-sm text-text-secondary">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="flex min-h-[44px] items-center justify-center rounded-lg bg-primary py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
            >
              Get Started →
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-text-muted">
          * Prices include hosting, domain management, and ongoing security
          monitoring. Need just the site build without hosting? Ask about
          site-only pricing.
        </p>
      </div>
    </section>
  );
}
