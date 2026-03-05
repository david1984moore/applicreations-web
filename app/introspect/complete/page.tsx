'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useIntakeStore } from '@/stores/intakeStore'
import { answersToIntelligence } from '@/lib/questions/answersToIntelligence'
import { ProcessingScreen } from '@/components/intake/ProcessingScreen'
import { SuccessScreen } from '@/components/intake/SuccessScreen'

const MIN_PROCESSING_MS = 3000

export default function IntrospectCompletePage() {
  const router = useRouter()
  const { answers, isComplete, reset, returnToForm } = useIntakeStore()
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const clientEmailRef = useRef<string>('')

  useEffect(() => {
    if (status === 'success') return
    if (!isComplete || Object.keys(answers).length === 0) {
      router.replace('/introspect')
    }
  }, [isComplete, answers, router, status])

  useEffect(() => {
    if (!isComplete || status !== 'idle') return

    const run = async () => {
      setStatus('processing')
      setErrorMessage('')
      clientEmailRef.current = String(answers['q2_email']?.value ?? '')
      const startTime = Date.now()

      try {
        const intelligence = answersToIntelligence(answers)

        const scopeRes = await fetch('/api/generate-scope', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intelligence }),
        })

        if (!scopeRes.ok) {
          const data = await scopeRes.json().catch(() => ({}))
          throw new Error(data.error ?? 'Failed to generate scope')
        }

        const { scopeMarkdown } = await scopeRes.json()

        const emailRes = await fetch('/api/send-emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scopeMarkdown,
            intelligence,
            clientEmail: clientEmailRef.current,
          }),
        })

        if (!emailRes.ok) {
          const data = await emailRes.json().catch(() => ({}))
          const details = data.details ? ` — ${data.details}` : ''
          throw new Error((data.error ?? 'Failed to send emails') + details)
        }

        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, MIN_PROCESSING_MS - elapsed)
        await new Promise((r) => setTimeout(r, remaining))

        setStatus('success')
        reset()
      } catch (err) {
        setStatus('error')
        setErrorMessage(
          err instanceof Error ? err.message : 'Something went wrong. Please try again.'
        )
      }
    }

    run()
  }, [isComplete])

  if (status === 'processing') {
    return <ProcessingScreen />
  }

  if (status === 'error') {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{
          background: 'linear-gradient(135deg, oklch(0.12 0.04 250) 0%, oklch(0.18 0.06 260) 100%)',
        }}
      >
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-2xl font-semibold text-white">
            Something went wrong
          </h1>
          <p className="mb-6 text-white/80">{errorMessage}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/introspect"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white bg-transparent px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-white hover:text-[oklch(0.45_0.18_250)]"
            >
              Try again
            </Link>
            <button
              type="button"
              onClick={() => {
                returnToForm()
                router.push('/introspect')
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/50 bg-white/10 px-6 py-2.5 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20"
            >
              Return to form
            </button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Your answers are saved. If the problem persists,{' '}
            <a
              href="mailto:hello@applicreations.com"
              className="text-white/80 hover:underline"
            >
              email us directly
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return <SuccessScreen email={clientEmailRef.current} />
  }

  return null
}
