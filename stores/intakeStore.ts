// stores/intakeStore.ts — Zustand store for questionnaire state with localStorage persistence

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Answer } from '@/types/questions'
import { getVisiblePageGroups } from '@/lib/questions'

export type IntakePhase = 'welcome' | 'onboarding' | 'questionnaire' | 'review'

interface IntakeStore {
  phase: IntakePhase
  answers: Record<string, Answer>
  currentPageId: string
  completedPageIds: string[]
  editingFromReview: boolean
  isSubmitting: boolean
  isComplete: boolean
  sessionId: string
  progress: number

  advanceFromWelcome: () => void
  advanceFromOnboarding: () => void
  submitPage: (pageAnswers: Record<string, Answer>) => void
  goBack: () => void
  goToPage: (pageId: string) => void
  goToPageForEdit: (pageId: string) => void
  submitFromReview: () => void
  reset: () => void
  returnToForm: () => void
}

function getFirstPageId(answers: Record<string, Answer>): string {
  const visible = getVisiblePageGroups(answers)
  return visible[0]?.id ?? 'page_1'
}

function getNextPageId(currentPageId: string, answers: Record<string, Answer>): string | null {
  const visible = getVisiblePageGroups(answers)
  const idx = visible.findIndex((p) => p.id === currentPageId)
  if (idx === -1 || idx >= visible.length - 1) return null
  return visible[idx + 1].id
}

function getPrevPageId(currentPageId: string, answers: Record<string, Answer>): string | null {
  const visible = getVisiblePageGroups(answers)
  const idx = visible.findIndex((p) => p.id === currentPageId)
  if (idx <= 0) return null
  return visible[idx - 1].id
}

function getPageProgress(completedPageIds: string[], answers: Record<string, Answer>): number {
  const visible = getVisiblePageGroups(answers)
  const completed = visible.filter((p) => completedPageIds.includes(p.id)).length
  return visible.length > 0 ? Math.round((completed / visible.length) * 100) : 0
}

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set, get) => ({
      phase: 'welcome',
      answers: {},
      currentPageId: 'page_1',
      completedPageIds: [],
      editingFromReview: false,
      isSubmitting: false,
      isComplete: false,
      sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : '',
      progress: 0,

      advanceFromWelcome: () => set({ phase: 'onboarding' }),

      advanceFromOnboarding: () => {
        const { answers } = get()
        const firstPage = getFirstPageId(answers)
        set({
          phase: 'questionnaire',
          currentPageId: firstPage,
          progress: getPageProgress([], answers),
        })
      },

      submitPage: (pageAnswers: Record<string, Answer>) => {
        const { answers, currentPageId, completedPageIds, editingFromReview } = get()
        const newAnswers = { ...answers, ...pageAnswers }
        const newCompleted = completedPageIds.includes(currentPageId)
          ? completedPageIds
          : [...completedPageIds, currentPageId]

        if (editingFromReview) {
          set({
            answers: newAnswers,
            editingFromReview: false,
            phase: 'review',
            progress: 100,
          })
        } else {
          const nextPage = getNextPageId(currentPageId, newAnswers)
          if (nextPage) {
            set({
              answers: newAnswers,
              currentPageId: nextPage,
              completedPageIds: newCompleted,
              progress: getPageProgress(newCompleted, newAnswers),
            })
          } else {
            set({
              answers: newAnswers,
              completedPageIds: newCompleted,
              phase: 'review',
              progress: 100,
            })
          }
        }
      },

      goBack: () => {
        const { currentPageId, answers, phase } = get()
        if (phase === 'questionnaire') {
          const prev = getPrevPageId(currentPageId, answers)
          if (prev) {
            set({
              currentPageId: prev,
              completedPageIds: get().completedPageIds.filter((id) => id !== prev),
              progress: getPageProgress(
                get().completedPageIds.filter((id) => id !== prev),
                answers
              ),
            })
          } else {
            set({ phase: 'onboarding' })
          }
        }
      },

      goToPage: (pageId: string) => {
        set({ phase: 'questionnaire', currentPageId: pageId })
      },

      goToPageForEdit: (pageId: string) => {
        set({ phase: 'questionnaire', currentPageId: pageId, editingFromReview: true })
      },

      submitFromReview: () => {
        set({ isComplete: true })
      },

      returnToForm: () => {
        const { answers } = get()
        const visible = getVisiblePageGroups(answers)
        const lastPage = visible[visible.length - 1]?.id ?? get().currentPageId
        set({
          isComplete: false,
          phase: 'review',
          currentPageId: lastPage,
        })
      },

      reset: () =>
        set({
          phase: 'welcome',
          answers: {},
          currentPageId: 'page_1',
          completedPageIds: [],
          editingFromReview: false,
          isSubmitting: false,
          isComplete: false,
          sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : '',
          progress: 0,
        }),
    }),
    {
      name: 'introspect-intake',
      partialize: (state) => ({
        answers: state.answers,
        phase: state.phase,
        currentPageId: state.currentPageId,
        completedPageIds: state.completedPageIds,
        editingFromReview: state.editingFromReview,
        sessionId: state.sessionId,
        progress: state.progress,
      }),
    }
  )
)
