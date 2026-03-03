// components/sections/pain-strip.tsx — Pain points in one row
const PAIN_ITEMS = [
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "DIY tools waste weekends",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Agencies charge agency prices",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    text: "Your site isn't converting",
  },
] as const;

export function PainStrip() {
  return (
    <section className="border-y border-border bg-surface-raised py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 md:flex-row md:gap-12">
        {PAIN_ITEMS.map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 text-center md:text-left"
          >
            {icon}
            <span className="text-sm font-medium text-text-primary">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
