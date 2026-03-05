'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' &&
          'bg-primary text-white shadow-sm hover:bg-primary-hover',
        variant === 'secondary' &&
          'border border-border-strong bg-surface text-text-primary hover:bg-surface-raised',
        variant === 'ghost' && 'text-text-secondary hover:text-text-primary',
        size === 'default' && 'px-6 py-2.5 text-base',
        size === 'sm' && 'px-4 py-2 text-sm',
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
