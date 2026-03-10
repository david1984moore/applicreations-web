// stores/questionnaireStore.ts — Zustand store for Introspect questionnaire (Question Set V3)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Safe storage that returns null on parse failure (avoids "Unexpected end of JSON input" from corrupted localStorage) */
const safeJsonStorage = {
  getItem: (name: string) => {
    try {
      if (typeof localStorage === 'undefined') return null
      const str = localStorage.getItem(name)
      if (str == null || str === '') return null
      return JSON.parse(str) as { state: unknown; version?: number }
    } catch {
      return null
    }
  },
  setItem: (name: string, value: { state: unknown; version?: number }) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(value))
    }
  },
  removeItem: (name: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(name)
    }
  },
}

export interface Answer {
  questionId: string
  value: string | string[]
  textValue?: string
  answeredAt: string
}

export type Branch = 'ecommerce' | 'app' | 'content'

export interface QuestionnaireState {
  sessionId: string
  startedAt: string
  answers: Record<string, Answer>
  currentQuestionId: string
  activeBranches: Branch[]
  questionSequence: string[]
  completedAt: string | null

  setAnswer: (questionId: string, value: string | string[], textValue?: string) => void
  setCurrentQuestion: (questionId: string) => void
  activateBranch: (branch: Branch) => void
  getAnswerValue: (questionId: string) => string | string[] | undefined
  setCompleted: () => void
  reset: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : '',
      startedAt: new Date().toISOString(),
      answers: {},
      currentQuestionId: 'q1_name',
      activeBranches: [],
      questionSequence: [],
      completedAt: null,

      setAnswer: (questionId, value, textValue) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              questionId,
              value,
              textValue,
              answeredAt: new Date().toISOString(),
            },
          },
        }))

        const { activateBranch } = get()
        const val = typeof value === 'string' ? value : value[0]
        if (questionId === 'q5_project_type') {
          if (val === 'ecommerce') activateBranch('ecommerce')
          if (val === 'app') activateBranch('app')
          if (val === 'blog') activateBranch('content')
        }
        if (questionId === 'q7_primary_goal' && val === 'buy_something') {
          activateBranch('ecommerce')
        }
        if (questionId === 'q18_update_frequency') {
          if (val === 'weekly' || val === 'daily') activateBranch('content')
        }
      },

      setCurrentQuestion: (questionId) => set({ currentQuestionId: questionId }),

      activateBranch: (branch) =>
        set((state) => ({
          activeBranches: state.activeBranches.includes(branch)
            ? state.activeBranches
            : [...state.activeBranches, branch],
        })),

      getAnswerValue: (questionId) => get().answers[questionId]?.value,

      setCompleted: () => set({ completedAt: new Date().toISOString() }),

      reset: () =>
        set({
          sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : '',
          startedAt: new Date().toISOString(),
          answers: {},
          currentQuestionId: 'q1_name',
          activeBranches: [],
          questionSequence: [],
          completedAt: null,
        }),
    }),
    {
      name: 'introspect-session',
      storage: safeJsonStorage,
    }
  )
)
