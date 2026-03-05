'use client'

import { UrlInput } from './UrlInput'

const URL_REGEX = /^https?:\/\/.+/i

interface UrlListInputProps {
  id: string
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxUrls?: number
}

export function UrlListInput({
  id,
  value,
  onChange,
  placeholder = 'https://example.com',
  maxUrls = 5,
}: UrlListInputProps) {
  const urls = [...value]
  while (urls.length < maxUrls) {
    urls.push('')
  }

  const updateAt = (index: number, newVal: string) => {
    const next = [...urls]
    next[index] = newVal
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {urls.slice(0, maxUrls).map((url, i) => (
        <div key={i}>
          <label
            htmlFor={`${id}-${i}`}
            className="mb-1 block text-sm font-medium text-text-muted"
          >
            {i + 1}
          </label>
          <UrlInput
            id={`${id}-${i}`}
            value={url}
            onChange={(v) => updateAt(i, v)}
            placeholder={i === 0 ? placeholder : undefined}
          />
        </div>
      ))}
    </div>
  )
}
