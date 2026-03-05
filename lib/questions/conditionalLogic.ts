// lib/questions/conditionalLogic.ts — Pure functions for question visibility and progress

import type { Question, Answer } from '@/types/questions'
import { QUESTIONS } from './questionBank'

/**
 * Given the current answers, returns the ordered list of questions
 * that should be shown to this user.
 */
export function getVisibleQuestions(answers: Record<string, Answer>): Question[] {
  return QUESTIONS.filter((question) => {
    if (!question.showIf) return true
    return question.showIf(answers)
  })
}

/**
 * Given the current question ID and all answers, returns the next
 * question the user should see.
 */
export function getNextQuestion(
  currentQuestionId: string,
  answers: Record<string, Answer>
): Question | null {
  const visible = getVisibleQuestions(answers)
  const currentIndex = visible.findIndex((q) => q.id === currentQuestionId)
  if (currentIndex === -1 || currentIndex === visible.length - 1) return null
  return visible[currentIndex + 1]
}

/**
 * Returns 0–100 progress percentage based on visible questions answered.
 */
export function getProgress(answers: Record<string, Answer>): number {
  const visible = getVisibleQuestions(answers)
  const answered = visible.filter((q) => answers[q.id] !== undefined).length
  return Math.round((answered / visible.length) * 100)
}

/**
 * Returns true when all required visible questions have answers.
 */
export function isComplete(answers: Record<string, Answer>): boolean {
  const visible = getVisibleQuestions(answers)
  const required = visible.filter((q) => q.required)
  return required.every((q) => {
    const answer = answers[q.id]
    if (!answer) return false
    if (Array.isArray(answer.value)) return answer.value.length > 0
    return String(answer.value).trim().length > 0
  })
}
