'use client'

interface UrlListInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helpText?: string
}

const URL_COUNT = 5

export function UrlListInput({
  value,
  onChange,
  placeholder,
  helpText,
}: UrlListInputProps) {
  const urls = value
    ? value.split(',').map((u) => u.trim()).filter(Boolean)
    : []
  const padded = [...urls]
  while (padded.length < URL_COUNT) padded.push('')

  const handleChange = (index: number, url: string) => {
    const newUrls = [...padded]
    newUrls[index] = url.trim()
    const nonEmpty = newUrls.filter(Boolean)
    onChange(nonEmpty.join(', '))
  }

  const baseInputClass =
    'w-full rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] px-5 py-4 text-[oklch(95%_0_0)] placeholder:text-[oklch(50%_0_0)] outline-none transition-colors duration-150 focus:border-[oklch(58%_0.20_240)]'

  return (
    <div className="space-y-3">
      {Array.from({ length: URL_COUNT }, (_, i) => (
        <div key={i}>
          <label
            htmlFor={`url-${i}`}
            className="block text-sm text-[oklch(70%_0_0)] mb-1"
          >
            Website {i + 1}
          </label>
          <input
            id={`url-${i}`}
            type="url"
            value={padded[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder={i === 0 ? placeholder : undefined}
            className={baseInputClass}
          />
        </div>
      ))}
      {helpText && (
        <p className="text-sm text-[oklch(60%_0_0)]">{helpText}</p>
      )}
    </div>
  )
}
