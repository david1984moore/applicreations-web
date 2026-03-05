'use client'

import { cn } from '@/lib/utils'

interface UrlInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  onBlur?: () => void
  className?: string
}

const URL_REGEX = /^https?:\/\/.+/i

export function UrlInput({
  id,
  value,
  onChange,
  placeholder = 'https://example.com',
  required,
  onBlur,
  className,
}: UrlInputProps) {
  const isValid = !value || URL_REGEX.test(value)

  return (
    <input
      id={id}
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      onBlur={onBlur}
      className={cn(
        'min-h-[44px] w-full rounded-lg border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        isValid ? 'border-border-strong focus:border-primary' : 'border-error focus:border-error',
        className
      )}
    />
  )
}
