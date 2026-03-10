'use client'

import { useQuestionnaireStore } from '@/stores/questionnaireStore'
import { OptionSelect } from './OptionSelect'
import { MultiSelect } from './MultiSelect'
import { TextInput } from './TextInput'
import { DateInput } from './DateInput'
import { ColorInput } from './ColorInput'
import { UrlListInput } from './UrlListInput'
import type { Question } from '@/types/questionnaire'

interface QuestionCardProps {
  question: Question
  onNext: () => void
  onBack?: () => void
}

export function QuestionCard({ question, onNext, onBack }: QuestionCardProps) {
  const { answers, setAnswer } = useQuestionnaireStore()
  const currentAnswer = answers[question.id]

  const canProceed = question.required
    ? (() => {
        const v = currentAnswer?.value
        if (!v) return false
        if (Array.isArray(v)) return v.length > 0
        return String(v).trim().length > 0
      })()
    : true

  const handleAnswer = (value: string | string[], textValue?: string) => {
    setAnswer(question.id, value, textValue)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-[1.777rem] leading-[1.3] text-[oklch(95%_0_0)] font-medium">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-[oklch(60%_0_0)] text-base leading-[1.6]">
            {question.subtext}
          </p>
        )}
      </div>

      <div>
        {question.inputType === 'option_select' && !question.multiSelect && (
          <OptionSelect
            options={question.options ?? []}
            value={currentAnswer?.value as string}
            textValue={currentAnswer?.textValue}
            onChange={(v, t) => handleAnswer(v, t)}
          />
        )}
        {question.inputType === 'option_select' && question.multiSelect && (
          <MultiSelect
            options={question.options ?? []}
            value={(currentAnswer?.value as string[]) ?? []}
            textValue={currentAnswer?.textValue}
            max={question.multiSelectMax}
            onChange={(v, t) => handleAnswer(v, t)}
          />
        )}
        {(question.inputType === 'text' || question.inputType === 'textarea') && (
          <TextInput
            inputType={question.inputType}
            inputMode={question.inputMode}
            value={(currentAnswer?.value as string) ?? ''}
            placeholder={question.placeholder}
            helpText={question.helpText}
            onChange={(val) => handleAnswer(val)}
          />
        )}
        {question.inputType === 'date' && (
          <DateInput
            value={(currentAnswer?.value as string) ?? ''}
            onChange={(val) => handleAnswer(val)}
          />
        )}
        {question.inputType === 'color' && (
          <ColorInput
            value={(currentAnswer?.value as string) ?? ''}
            onChange={(val) => handleAnswer(val)}
          />
        )}
        {question.inputType === 'url_list' && (
          <UrlListInput
            value={(currentAnswer?.value as string) ?? ''}
            onChange={(val) => handleAnswer(val)}
            placeholder={question.placeholder}
            helpText={question.helpText}
          />
        )}
      </div>

      <div className="flex items-center gap-4 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-[oklch(60%_0_0)] text-sm hover:text-[oklch(95%_0_0)] transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        {question.skippable && (
          <button
            type="button"
            onClick={onNext}
            className="text-[oklch(60%_0_0)] text-sm hover:text-[oklch(95%_0_0)] transition-colors"
          >
            Skip
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all duration-150
            ${canProceed
              ? 'bg-[oklch(58%_0.20_240)] text-white hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-[oklch(25%_0_0)] text-[oklch(50%_0_0)] cursor-not-allowed'
            }
          `}
        >
          {question.inputType === 'option_select' ? 'Continue' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
