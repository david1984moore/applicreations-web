'use client'

import { cn } from '@/lib/utils'

interface PhoneInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export function PhoneInput({
  id,
  value,
  onChange,
  placeholder = '(555) 123-4567',
  required,
  className,
}: PhoneInputProps) {
  return (
    <input
      id={id}
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete="tel"
      className={cn(
        'min-h-[44px] w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted',
        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
    />
  )
}
