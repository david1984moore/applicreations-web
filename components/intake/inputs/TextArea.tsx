'use client'

import { cn } from '@/lib/utils'

interface TextAreaProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  rows?: number
  className?: string
}

export function TextArea({
  id,
  value,
  onChange,
  placeholder,
  required,
  minLength,
  maxLength,
  rows = 4,
  className,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      rows={rows}
      className={cn(
        'min-h-[120px] w-full resize-y rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted',
        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
    />
  )
}
