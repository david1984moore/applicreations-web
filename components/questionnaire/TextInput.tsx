'use client'

interface TextInputProps {
  inputType: 'text' | 'textarea'
  inputMode?: 'email' | 'tel' | 'url'
  value: string
  placeholder?: string
  helpText?: string
  onChange: (value: string) => void
}

export function TextInput({
  inputType,
  inputMode,
  value,
  placeholder,
  helpText,
  onChange,
}: TextInputProps) {
  const baseClass =
    'w-full rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] px-5 py-4 text-[oklch(95%_0_0)] placeholder:text-[oklch(50%_0_0)] outline-none transition-colors duration-150 focus:border-[oklch(57%_0.15_250)]'

  if (inputType === 'textarea') {
    return (
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`${baseClass} resize-y min-h-[120px]`}
        />
        {helpText && (
          <p className="text-sm text-[oklch(60%_0_0)]">{helpText}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={baseClass}
      />
      {helpText && (
        <p className="text-sm text-[oklch(60%_0_0)]">{helpText}</p>
      )}
    </div>
  )
}
