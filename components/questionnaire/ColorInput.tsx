'use client'

const LABELS = ['Primary', 'Secondary', 'Accent'] as const

interface ColorInputProps {
  value: string
  onChange: (value: string) => void
}

export function ColorInput({ value, onChange }: ColorInputProps) {
  // Parse stored value to extract swatch hexes and text description
  const parts = value ? value.split(' — ') : []
  const textPart = parts.find((p) => !p.includes('#'))?.trim() ?? ''
  const hexMatches = value?.match(/#[0-9A-Fa-f]{6}/g) ?? []
  const swatches: (string | '')[] = [hexMatches[0] ?? '', hexMatches[1] ?? '', hexMatches[2] ?? '']

  const buildOutput = (newSwatches: string[], newText: string): string => {
    const hexParts: string[] = []
    newSwatches.forEach((hex, i) => {
      if (hex) hexParts.push(`${LABELS[i]}: ${hex}`)
    })
    const combined = hexParts.length > 0 ? hexParts.join(', ') : ''
    if (newText.trim()) {
      return combined ? `${combined} — ${newText.trim()}` : newText.trim()
    }
    return combined
  }

  const handleSwatchChange = (index: number, hex: string) => {
    const newSwatches = [...swatches]
    newSwatches[index] = hex
    onChange(buildOutput(newSwatches, textPart))
  }

  const handleTextChange = (text: string) => {
    onChange(buildOutput(swatches, text))
  }

  const baseInputClass =
    'rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] px-4 py-3 text-[oklch(95%_0_0)] placeholder:text-[oklch(50%_0_0)] outline-none transition-colors duration-150 focus:border-[oklch(58%_0.20_240)]'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {LABELS.map((label, i) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="text-sm text-[oklch(70%_0_0)]">{label}</span>
            <div className="flex items-center gap-2">
              <label
                className="h-12 w-12 shrink-0 rounded-xl border border-[oklch(25%_0_0)] bg-[oklch(15%_0_0)] flex items-center justify-center overflow-hidden hover:border-[oklch(58%_0.20_240)] transition-colors cursor-pointer"
                style={swatches[i] ? { backgroundColor: swatches[i] } : undefined}
                aria-label={`Pick ${label.toLowerCase()} color`}
              >
                {!swatches[i] && (
                  <span className="text-2xl text-[oklch(50%_0_0)]">+</span>
                )}
                <input
                  type="color"
                  value={swatches[i] || '#000000'}
                  onChange={(e) => handleSwatchChange(i, e.target.value)}
                  className="sr-only"
                  aria-hidden
                />
              </label>
              <input
                type="text"
                readOnly
                value={swatches[i]}
                placeholder="—"
                className={`${baseInputClass} w-24 font-mono text-sm`}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm text-[oklch(70%_0_0)] mb-2">
          Or describe in words (optional)
        </label>
        <input
          type="text"
          value={textPart}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder='e.g. "navy blue and gold"'
          className={`${baseInputClass} w-full`}
        />
      </div>
    </div>
  )
}
