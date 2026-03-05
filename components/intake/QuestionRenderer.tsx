'use client'

import type { Question, Answer } from '@/types/questions'
import { TextInput } from './inputs/TextInput'
import { TextArea } from './inputs/TextArea'
import { PhoneInput } from './inputs/PhoneInput'
import { UrlInput } from './inputs/UrlInput'
import { UrlListInput } from './inputs/UrlListInput'
import { SingleSelect } from './inputs/SingleSelect'
import { MultiSelect } from './inputs/MultiSelect'
import { ColorPicker } from './inputs/ColorPicker'

interface QuestionRendererProps {
  question: Question
  value: string | string[]
  otherText?: string
  onChange: (value: string | string[], otherText?: string) => void
}

function getStringValue(val: string | string[]): string {
  return Array.isArray(val) ? val[0] ?? '' : (val ?? '')
}

function getArrayValue(val: string | string[]): string[] {
  return Array.isArray(val) ? val : val ? [val] : []
}

export function QuestionRenderer({
  question,
  value,
  otherText = '',
  onChange,
}: QuestionRendererProps) {
  const strVal = getStringValue(value)
  const arrVal = getArrayValue(value)

  switch (question.type) {
    case 'text':
      return (
        <TextInput
          id={question.id}
          value={strVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
          required={question.required}
          minLength={question.minLength}
          maxLength={question.maxLength}
        />
      )

    case 'email':
      return (
        <TextInput
          id={question.id}
          type="email"
          value={strVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
          required={question.required}
        />
      )

    case 'phone':
      return (
        <PhoneInput
          id={question.id}
          value={strVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
          required={question.required}
        />
      )

    case 'textarea':
      return (
        <TextArea
          id={question.id}
          value={strVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
          required={question.required}
          minLength={question.minLength}
          maxLength={question.maxLength}
        />
      )

    case 'url':
      return (
        <UrlInput
          id={question.id}
          value={strVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
          required={question.required}
        />
      )

    case 'url_list':
      return (
        <UrlListInput
          id={question.id}
          value={arrVal}
          onChange={(v) => onChange(v)}
          placeholder={question.placeholder}
        />
      )

    case 'single_select':
      return (
        <SingleSelect
          id={question.id}
          options={question.options ?? []}
          value={strVal}
          onChange={(v) => {
            if (v === '_other') {
              onChange('_other', otherText || '')
            } else {
              onChange(v)
            }
          }}
          otherOption={question.otherOption}
          otherValue={otherText}
          onOtherChange={(v) => onChange('_other', v)}
          required={question.required}
        />
      )

    case 'multi_select':
      return (
        <MultiSelect
          id={question.id}
          options={question.options ?? []}
          value={arrVal}
          onChange={(v) => onChange(v)}
          otherOption={question.otherOption}
          otherValue={otherText}
          onOtherChange={(v) => {
            const hasOther = arrVal.includes('_other')
            if (hasOther) onChange([...arrVal.filter((x) => x !== '_other'), '_other'], v)
            else onChange([...arrVal, '_other'], v)
          }}
          required={question.required}
        />
      )

    case 'color_picker':
      return (
        <ColorPicker
          id={question.id}
          value={arrVal}
          onChange={(v) => onChange(v)}
          required={question.required}
        />
      )

    default:
      return null
  }
}
