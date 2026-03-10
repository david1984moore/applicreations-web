// types/questionnaire.ts — Question Set V3 types per CURSOR_PROMPT_INTROSPECT_QUESTIONNAIRE_V1

export type InputType =
  | 'text'
  | 'option_select'
  | 'textarea'
  | 'date'
  | 'color'
  | 'url_list'

export interface Option {
  value: string
  label: string
  description?: string
  allowText?: boolean
}

export interface QuestionCondition {
  questionId: string
  value?: string
  notValue?: string
}

export interface Question {
  id: string
  text: string
  subtext?: string
  inputType: InputType
  inputMode?: 'email' | 'tel' | 'url'
  required: boolean
  skippable?: boolean
  placeholder?: string
  helpText?: string
  scopeField: string | string[]
  options?: Option[]
  multiSelect?: boolean
  multiSelectMax?: number
  branch?: 'ecommerce' | 'app' | 'content'
  branchTrigger?: boolean
  branchLogic?: Record<string, string[]>
  condition?: QuestionCondition
}
