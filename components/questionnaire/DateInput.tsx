'use client'

interface DateInputProps {
  value: string
  onChange: (value: string) => void
}

export function DateInput({ value, onChange }: DateInputProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] px-5 py-4 text-[oklch(95%_0_0)] outline-none transition-colors duration-150 focus:border-[oklch(57%_0.15_250)] [color-scheme:dark]"
    />
  )
}
