'use client'

import { cn } from '@/lib/utils'

interface TextInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email'
  minLength?: number
  maxLength?: number
  className?: string
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  minLength,
  maxLength,
  className,
}: TextInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      className={cn(
        'min-h-[44px] w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted',
        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
    />
  )
}
