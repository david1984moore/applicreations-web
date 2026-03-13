'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { buildSequence } from '@/lib/questionnaire/buildSequence'
import { questions } from '@/lib/questionnaire/questions'
import { generateScope } from '@/lib/scope/generateScope'
import { QuestionCard } from './QuestionCard'
import { ProgressBar } from './ProgressBar'

export function QuestionnaireFlow() {
  const router = useRouter()
  const {
    answers,
    activeBranches,
    currentQuestionId,
    setCurrentQuestion,
    setCompleted,
    completedAt,
  } = useQuestionnaireStore()

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sequence = useMemo(
    () => buildSequence(answers, activeBranches),
    [answers, activeBranches]
  )

  useEffect(() => {
    if (sequence.length > 0 && !sequence.includes(currentQuestionId)) {
      setCurrentQuestion(sequence[0])
    }
  }, [sequence, currentQuestionId, setCurrentQuestion])

  useEffect(() => {
    if (completedAt) {
      router.push('/introspect/complete')
    }
  }, [completedAt, router])

  const currentIndex = sequence.indexOf(currentQuestionId)
  const currentQuestion = questions[currentQuestionId]
  const progress =
    sequence.length > 0 ? ((currentIndex + 1) / sequence.length) * 100 : 0

  const handleNext = () => {
    const nextId = sequence[currentIndex + 1]
    if (nextId) {
      setCurrentQuestion(nextId)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    const prevId = sequence[currentIndex - 1]
    if (prevId) setCurrentQuestion(prevId)
  }

  const handleComplete = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const { scopeMd, clientSummary } = await generateScope(answers, activeBranches)
      const clientName = String(answers['q1_name']?.value ?? '')
      const clientEmail = String(answers['q2_email']?.value ?? '')

      const res = await fetch('/api/send-scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scopeMd,
          clientSummary,
          clientName,
          clientEmail,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Failed to send emails')
      }

      setCompleted()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }

  if (completedAt || isGenerating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[oklch(57%_0.15_250)] border-t-transparent mx-auto" />
          <p className="text-[oklch(95%_0_0)]">
            {completedAt ? 'Taking you to your confirmation...' : 'Generating your project scope...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-[oklch(95%_0_0)]">
            Something went wrong
          </h1>
          <p className="mt-2 text-[oklch(60%_0_0)]">
            Something went wrong generating your brief. Please try again.
          </p>
          <button
            type="button"
            onClick={() => {
              setError(null)
              handleComplete()
            }}
            className="mt-6 px-6 py-3 rounded-lg bg-[oklch(57%_0.15_250)] text-white text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[oklch(10%_0_0)] flex flex-col">
      <ProgressBar progress={progress} />

      <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12 md:py-16">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onNext={handleNext}
                  onBack={currentIndex > 0 ? handleBack : undefined}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
