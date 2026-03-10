'use client'

interface CompletionScreenProps {
  email?: string
}

export function CompletionScreen({ email }: CompletionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <h1 className="text-[2.369rem] leading-[1.2] font-medium text-[oklch(95%_0_0)]">
          Thank you
        </h1>
        <p className="mt-4 text-base leading-[1.6] text-[oklch(60%_0_0)]">
          Your project summary has been sent to {email ?? 'your email'}. We&apos;ll
          be in touch soon.
        </p>
      </div>
    </div>
  )
}
