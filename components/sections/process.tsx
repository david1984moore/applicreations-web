// components/sections/process.tsx — 3-step process
const STEPS = [
  {
    num: "01",
    timeframe: "5 minutes",
    title: "Get Your Quote",
    body: "Select features, get instant pricing.",
  },
  {
    num: "02",
    timeframe: "2–3 weeks",
    title: "We Build Your Site",
    body: "Custom design, copy, and build.",
  },
  {
    num: "03",
    timeframe: "Ongoing",
    title: "Launch & Grow",
    body: "Hosting, security, and updates handled.",
  },
] as const;

export function Process() {
  return (
    <section id="process" className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map(({ num, timeframe, title, body }) => (
            <div key={num} className="text-center md:text-left">
              <p className="mb-1 font-mono text-sm text-text-muted">{num}</p>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                {timeframe}
              </p>
              <h3 className="mb-2 text-xl font-semibold text-text-primary">
                {title}
              </h3>
              <p className="text-sm text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
