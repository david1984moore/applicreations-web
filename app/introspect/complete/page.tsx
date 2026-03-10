'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Check, Mail } from 'lucide-react'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/applicreations'
const DAVID_EMAIL = 'david1984moore@gmail.com'

function getFirstName(answers: Record<string, { value: string | string[] }>): string {
  const nameVal = answers['q1_name']?.value
  if (!nameVal) return ''
  const name = typeof nameVal === 'string' ? nameVal : nameVal[0] ?? ''
  const first = name.trim().split(/\s+/)[0]
  return first || name
}

export default function IntrospectCompletePage() {
  const { answers, reset } = useQuestionnaireStore()

  const firstName = getFirstName(answers)
  const clientEmail = String(answers['q2_email']?.value ?? '')

  useEffect(() => {
    const t = setTimeout(() => reset(), 2000)
    return () => clearTimeout(t)
  }, [reset])

  return (
    <div className="min-h-screen bg-[oklch(10%_0_0)] px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-2xl space-y-16">
        {/* Zone 1 — Confirmation header */}
        <section className="space-y-4 text-center">
          <div
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(58%_0.20_240)]/20 text-[oklch(58%_0.20_240)]"
            aria-hidden
          >
            <Check size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-[2.369rem] leading-[1.2] font-medium text-[oklch(95%_0_0)]">
            You&apos;re all set{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="text-base leading-[1.6] text-[oklch(60%_0_0)]">
            Your project brief is on its way.
          </p>
        </section>

        {/* Zone 2 — Email status */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(14%_0_0)] p-6">
            <div className="mb-3 flex items-center gap-2 text-[oklch(58%_0.20_240)]">
              <Mail size={18} strokeWidth={2} />
              <span className="text-sm font-medium">Sent to you</span>
            </div>
            <p className="text-[oklch(95%_0_0)] font-medium">
              {clientEmail || 'Your email'}
            </p>
            <p className="mt-1 text-sm text-[oklch(60%_0_0)]">
              Your project summary
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[oklch(58%_0.20_240)]">
              <Check size={14} strokeWidth={2.5} />
              Sent
            </p>
          </div>

          <div className="rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(14%_0_0)] p-6">
            <div className="mb-3 flex items-center gap-2 text-[oklch(58%_0.20_240)]">
              <Mail size={18} strokeWidth={2} />
              <span className="text-sm font-medium">Sent to David</span>
            </div>
            <p className="text-[oklch(95%_0_0)] font-medium">{DAVID_EMAIL}</p>
            <p className="mt-1 text-sm text-[oklch(60%_0_0)]">
              Full project specification
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[oklch(58%_0.20_240)]">
              <Check size={14} strokeWidth={2.5} />
              Sent
            </p>
          </div>
        </section>

        {/* Zone 3 — Next steps */}
        <section className="space-y-6 text-center">
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-[oklch(58%_0.20_240)] px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Schedule your discovery call
          </Link>
          <p className="max-w-md mx-auto text-sm leading-[1.6] text-[oklch(60%_0_0)]">
            David will review your brief before the call. Expect a 30-minute
            conversation to align on scope and timeline.
          </p>
          <p className="text-sm text-[oklch(50%_0_0)]">
            Questions?{' '}
            <a
              href={`mailto:${DAVID_EMAIL}`}
              className="text-[oklch(58%_0.20_240)] underline hover:no-underline"
            >
              {DAVID_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
