'use client'

import { useState } from 'react'
import { useIntakeStore } from '@/stores/intakeStore'
import { getVisibleQuestions } from '@/lib/questions'
import { QUESTIONS } from '@/lib/questions/questionBank'
import { PAGE_GROUPS } from '@/lib/questions/pageGroups'
import { Button } from '@/components/ui/Button'
import type { Question, Answer } from '@/types/questions'

function formatAnswerDisplay(question: Question, answer: Answer): string {
  const { value, otherText } = answer
  if (Array.isArray(value)) {
    if (value.length === 0) return '—'
    if (question.type === 'color_picker') {
      return value
        .map((v) => {
          const parts = v.split('|')
          return parts[1] ?? parts[0] ?? v
        })
        .join(', ')
    }
    const labels = value.map((v) => {
      if (v === '_other') return otherText ?? 'Other'
      const opt = question.options?.find((o) => o.value === v)
      return opt?.label ?? v
    })
    return labels.join(', ')
  }
  const str = String(value ?? '').trim()
  if (!str) return '—'
  if (str === '_other') return otherText ?? 'Other'
  const opt = question.options?.find((o) => o.value === str)
  return opt?.label ?? str
}

function getQuestionLabel(questionId: string): string {
  const q = QUESTIONS.find((q) => q.id === questionId)
  if (!q) return questionId
  const shortLabels: Record<string, string> = {
    q1_name: 'Name',
    q2_email: 'Email',
    q3_phone: 'Phone',
    q4_business_name: 'Business',
    q5_website_type: 'Website type',
    q6_industry: 'Industry',
    q7_primary_goal: 'Primary goal',
    q9_target_audience: 'Target audience',
    q10_differentiator: 'Differentiator',
    q11_inspiration_urls: 'Inspiration URLs',
    q12_inspiration_styles: 'Inspiration styles',
    q13_styles_to_avoid: 'Styles to avoid',
    q14_has_website: 'Has website',
    q15_existing_url: 'Current URL',
    q16_existing_frustrations: 'Frustrations',
    q17_has_logo: 'Logo',
    q18_has_colors: 'Brand colors',
    q19_brand_colors: 'Colors',
    q20_has_photos: 'Photos',
    q21_content_provider: 'Content provider',
    q22_update_frequency: 'Update frequency',
    q23_pages_needed: 'Pages needed',
    q24_key_features: 'Key features',
    q25_ecommerce_details: 'E-commerce size',
    q26_integrations: 'Integrations',
    q27_domain_status: 'Domain status',
    q28_existing_domain: 'Domain',
    q29_timeline: 'Timeline',
    q30_budget: 'Budget',
    q31_competitors: 'Competitors',
    q32_accessibility: 'Accessibility',
    q33_anything_else: 'Anything else',
  }
  return shortLabels[questionId] ?? q.text
}

export function ReviewScreen() {
  const { answers, goToPageForEdit, submitFromReview } = useIntakeStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const visibleQuestions = getVisibleQuestions(answers)
  const visibleIds = new Set(visibleQuestions.map((q) => q.id))
  const visiblePages = PAGE_GROUPS.filter((pg) =>
    pg.questionIds.some((id) => visibleIds.has(id))
  )

  const email = String(answers['q2_email']?.value ?? '')

  const handleSubmit = () => {
    setIsSubmitting(true)
    submitFromReview()
  }

  return (
    <div className="min-h-screen bg-[oklch(0.99_0.002_250)] px-6 py-12">
      <div className="mx-auto max-w-[720px]">
        <h1 className="text-3xl font-bold text-[oklch(0.2_0.02_250)]">
          You&apos;re almost done.
        </h1>
        <p className="mt-2 text-base text-[oklch(0.45_0.02_250)]">
          Take a quick look at your answers. Change anything before we send it off.
        </p>

        <div className="mt-12 space-y-6">
          {visiblePages.map((page) => {
            const pageQuestions = page.questionIds
              .filter((id) => visibleIds.has(id))
              .map((id) => QUESTIONS.find((q) => q.id === id))
              .filter((q): q is Question => !!q)
            const hasAnswers = pageQuestions.some((q) => answers[q.id])

            if (!hasAnswers) return null

            return (
              <div
                key={page.id}
                className="rounded-xl border border-[oklch(0.9_0.01_250)] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[oklch(0.2_0.02_250)]">
                    {page.headline}
                  </h2>
                  <button
                    type="button"
                    onClick={() => goToPageForEdit(page.id)}
                    className="text-sm font-medium text-[oklch(0.45_0.18_160)] hover:underline"
                  >
                    Edit →
                  </button>
                </div>
                <dl className="space-y-3">
                  {pageQuestions.map((q) => {
                    const answer = answers[q.id]
                    if (!answer) return null
                    const display = formatAnswerDisplay(q, answer)
                    if (!display || display === '—') return null
                    return (
                      <div key={q.id} className="flex justify-between gap-4 text-sm">
                        <dt className="text-[oklch(0.45_0.02_250)]">
                          {getQuestionLabel(q.id)}
                        </dt>
                        <dd className="max-w-[60%] text-right font-medium text-[oklch(0.2_0.02_250)]">
                          {display}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-[oklch(0.9_0.01_250)] bg-white p-8 text-center shadow-sm">
          <h3 className="mb-2 text-xl font-semibold text-[oklch(0.2_0.02_250)]">
            Everything look right?
          </h3>
          <p className="mb-6 text-base text-[oklch(0.45_0.02_250)]">
            Hit the button below and we&apos;ll get to work building your custom project scope.
          </p>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-5 text-base"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              'Send it — let\'s build something →'
            )}
          </Button>
          <p className="mt-4 text-sm text-[oklch(0.45_0.02_250)]">
            We&apos;ll send a proposal to: {email || 'your email'}
          </p>
        </div>
      </div>
    </div>
  )
}
