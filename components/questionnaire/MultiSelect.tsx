'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Option } from '@/types/questionnaire'

interface MultiSelectProps {
  options: Option[]
  value: string[]
  textValue?: string
  max?: number
  onChange: (value: string[], textValue?: string) => void
}

export function MultiSelect({
  options,
  value,
  textValue,
  max,
  onChange,
}: MultiSelectProps) {
  const [localText, setLocalText] = useState(textValue ?? '')

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      const next = value.filter((v) => v !== optValue)
      const stillHasAllowText = next.some((v) =>
        options.find((o) => o.value === v && o.allowText)
      )
      onChange(next, stillHasAllowText ? localText : undefined)
    } else if (max && value.length >= max) {
      return
    } else {
      const next = [...value, optValue]
      const hasAllowText = next.some((v) =>
        options.find((o) => o.value === v && o.allowText)
      )
      onChange(next, hasAllowText ? localText : undefined)
    }
  }

  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = value.includes(option.value)
        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`
              w-full text-left px-5 py-4 rounded-xl border transition-all duration-150
              ${isSelected
                ? 'border-[oklch(57%_0.15_250)] bg-[oklch(57%_0.15_250)]/10 text-[oklch(95%_0_0)]'
                : 'border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] text-[oklch(80%_0_0)] hover:border-[oklch(40%_0_0)] hover:text-[oklch(95%_0_0)]'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                  mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center
                  ${isSelected
                    ? 'border-[oklch(57%_0.15_250)] bg-[oklch(57%_0.15_250)]'
                    : 'border-[oklch(40%_0_0)]'
                  }
                `}
              >
                {isSelected && (
                  <Check size={12} className="text-white" strokeWidth={3} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{option.label}</div>
                {option.description && (
                  <div className="text-[oklch(60%_0_0)] text-xs mt-0.5 leading-relaxed">
                    {option.description}
                  </div>
                )}
                {isSelected && option.allowText && (
                  <input
                    type="text"
                    value={localText}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const v = e.target.value
                      setLocalText(v)
                      onChange(value, v)
                    }}
                    placeholder="Tell us more..."
                    className="mt-2 w-full bg-transparent border-b border-[oklch(40%_0_0)] text-[oklch(95%_0_0)] text-sm pb-1 outline-none placeholder:text-[oklch(50%_0_0)] focus:border-[oklch(57%_0.15_250)]"
                  />
                )}
              </div>
            </div>
          </motion.button>
        )
      })}
      {max && (
        <p className="text-xs text-[oklch(60%_0_0)]">
          Select up to {max} options
        </p>
      )}
    </div>
  )
}
