// types/questions.ts — Question, Answer, QuestionType interfaces per INTROSPECT spec

export type QuestionType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'single_select'
  | 'multi_select'
  | 'url'
  | 'url_list'
  | 'color_picker'

export interface SelectOption {
  value: string
  label: string
  helperText?: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  helperText?: string
  placeholder?: string
  options?: SelectOption[]
  required: boolean
  minLength?: number
  maxLength?: number
  showIf?: (answers: Record<string, Answer>) => boolean
  otherOption?: boolean
}

export interface Answer {
  questionId: string
  value: string | string[]
  otherText?: string
}
