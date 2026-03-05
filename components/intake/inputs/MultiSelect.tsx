'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SelectOption } from '@/types/questions'

interface MultiSelectProps {
  id: string
  options: SelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  otherOption?: boolean
  otherValue?: string
  onOtherChange?: (value: string) => void
  required?: boolean
}

export function MultiSelect({
  id,
  options,
  value,
  onChange,
  otherOption,
  otherValue = '',
  onOtherChange,
  required,
}: MultiSelectProps) {
  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }

  const isOtherSelected = value.includes('_other')
  const showOtherInput = otherOption && isOtherSelected

  return (
    <div className="space-y-3" role="group" aria-required={required}>
      {options.map((opt) => {
        const selected = value.includes(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={() => toggle(opt.value)}
            className={cn(
              'flex min-h-[44px] w-full items-start gap-3 rounded-lg border px-4 py-4 text-left transition-colors',
              'hover:border-primary/50 hover:bg-primary/5',
              selected ? 'border-2 border-primary bg-primary/10' : 'border-border bg-surface'
            )}
          >
            <span className="flex-1">
              <span className="block font-medium text-text-primary">{opt.label}</span>
              {opt.helperText && (
                <span className="mt-0.5 block text-sm text-text-muted">{opt.helperText}</span>
              )}
            </span>
            {selected && <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden />}
          </button>
        )
      })}
      {otherOption && (
        <>
          <button
            type="button"
            role="checkbox"
            aria-checked={isOtherSelected}
            onClick={() => toggle('_other')}
            className={cn(
              'flex min-h-[44px] w-full items-center gap-3 rounded-lg border px-4 py-4 text-left transition-colors',
              'hover:border-primary/50 hover:bg-primary/5',
              isOtherSelected
                ? 'border-2 border-primary bg-primary/10'
                : 'border-border bg-surface'
            )}
          >
            <span className="font-medium text-text-primary">Something else</span>
            {isOtherSelected && <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden />}
          </button>
          {showOtherInput && onOtherChange && (
            <div className="mt-2 pl-2">
              <input
                type="text"
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                placeholder="Please describe…"
                className="min-h-[44px] w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
