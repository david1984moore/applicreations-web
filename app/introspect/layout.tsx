import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Your Quote | Introspect | Applicreations',
  description:
    'Answer a few questions to get a personalized website proposal. Our custom tool helps lay the foundation for your project.',
}

export default function IntrospectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[oklch(10%_0_0)]">
      {children}
    </div>
  )
}
