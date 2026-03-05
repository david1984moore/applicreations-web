'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntakeStore } from '@/stores/intakeStore'
import { getVisiblePageGroups, getVisibleQuestions, detectFromBusinessName } from '@/lib/questions'
import { QUESTIONS } from '@/lib/questions/questionBank'
import { QuestionRenderer } from './QuestionRenderer'
import { Button } from '@/components/ui/Button'
import type { Question, Answer } from '@/types/questions'
import { ANIMATION } from '@/lib/animations/constants'

function isValidAnswer(question: Question, value: string | string[], otherText?: string): boolean {
  if (question.required) {
    if (Array.isArray(value)) {
      if (value.length === 0) return false
      if (value.includes('_other') && (!otherText || !otherText.trim())) return false
    } else {
      const s = String(value).trim()
      if (!s) return false
      if (value === '_other' && (!otherText || !otherText.trim())) return false
    }
  }
  if (question.minLength && typeof value === 'string') {
    if (value.trim().length < question.minLength) return false
  }
  return true
}

export function QuestionShell() {
  const {
    answers,
    currentPageId,
    submitPage,
    phase,
  } = useIntakeStore()

  const visiblePages = getVisiblePageGroups(answers)
  const currentPage = visiblePages.find((p) => p.id === currentPageId) ?? visiblePages[0]

  const visibleQuestions = getVisibleQuestions(answers)
  const pageQuestionIds = currentPage?.questionIds ?? []
  const pageQuestions = pageQuestionIds
    .map((id) => QUESTIONS.find((q) => q.id === id))
    .filter((q): q is Question => !!q && visibleQuestions.some((vq) => vq.id === q.id))

  const [draftAnswers, setDraftAnswers] = useState<Record<string, { value: string | string[]; otherText?: string }>>({})

  const setDraftForQuestion = useCallback((questionId: string, value: string | string[], otherText?: string) => {
    setDraftAnswers((prev) => ({
      ...prev,
      [questionId]: { value, ...(otherText !== undefined && { otherText }) },
    }))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPageId])

  useEffect(() => {
    const next: Record<string, { value: string | string[]; otherText?: string }> = {}
    for (const q of pageQuestions) {
      const existing = answers[q.id]
      if (existing) {
        next[q.id] = {
          value: Array.isArray(existing.value) ? existing.value : String(existing.value),
          otherText: existing.otherText,
        }
      } else if (q.id === 'q5_website_type') {
        const businessName = String(answers['q4_business_name']?.value ?? '')
        const detected = detectFromBusinessName(businessName)
        next[q.id] = { value: detected.websiteType ?? '' }
      } else if (q.id === 'q6_industry') {
        const businessName = String(answers['q4_business_name']?.value ?? '')
        const detected = detectFromBusinessName(businessName)
        next[q.id] = { value: detected.industry ?? '' }
      } else {
        next[q.id] = {
          value: q.type === 'url_list' || q.type === 'color_picker' ? [] : '',
        }
      }
    }
    setDraftAnswers(next)
    // Only re-initialize when page changes — answers/pageQuestions in deps would cause
    // effect to fire on every store update, resetting drafts and wiping user input
  }, [currentPageId])

  const canProceed = pageQuestions.every((q) => {
    const draft = draftAnswers[q.id]
    const value = draft?.value ?? (q.type === 'url_list' || q.type === 'color_picker' ? [] : '')
    const otherText = draft?.otherText
    return isValidAnswer(q, value, otherText)
  })

  const handleContinue = () => {
    if (!currentPage || !canProceed) return
    const pageAnswers: Record<string, Answer> = {}
    for (const q of pageQuestions) {
      const draft = draftAnswers[q.id]
      const value = draft?.value ?? (q.type === 'url_list' || q.type === 'color_picker' ? [] : '')
      const otherText = draft?.otherText
      pageAnswers[q.id] = {
        questionId: q.id,
        value,
        ...(otherText && { otherText }),
      }
    }
    submitPage(pageAnswers)
  }

  if (phase !== 'questionnaire' || !currentPage) return null

  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.99_0.002_250)]">
      <main className="mx-auto flex w-full max-w-[680px] flex-1 flex-col px-6 pt-28 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageId}
            variants={ANIMATION.variants.slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-1 flex-col"
          >
            <h1 className="text-xl font-bold text-[oklch(0.15_0.01_250)] md:text-2xl">
              {currentPage.headline}
            </h1>
            <p className="mt-2 text-base text-[oklch(0.50_0.01_250)]">
              {currentPage.subtext}
            </p>

            <div className="mt-8 space-y-8">
              {pageQuestions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <label
                    htmlFor={question.id}
                    className="block text-base font-medium text-[oklch(0.15_0.01_250)]"
                  >
                    {question.text}
                  </label>
                  {question.helperText && (
                    <p className="text-sm text-[oklch(0.50_0.01_250)]">
                      {question.helperText}
                    </p>
                  )}
                  <div className="mt-3">
                    <QuestionRenderer
                      question={question}
                      value={draftAnswers[question.id]?.value ?? (question.type === 'url_list' || question.type === 'color_picker' ? [] : '')}
                      otherText={draftAnswers[question.id]?.otherText ?? ''}
                      onChange={(v, ot) => setDraftForQuestion(question.id, v, ot)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleContinue}
                disabled={!canProceed}
                className="min-w-[240px] py-4 text-lg"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
