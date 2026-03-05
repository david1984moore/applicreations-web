'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COLOR_PALETTE, searchColors, type ColorOption } from '@/lib/colors/colorPalette'

/** Value format: string[] where each is "hex|name" e.g. ["#1a2b6b|Navy blue"] */
export function parseColorValue(val: string): { hex: string; name: string } | null {
  if (!val || !val.includes('|')) return null
  const [hex, name] = val.split('|')
  return hex && name ? { hex, name } : null
}

export function formatColorValue(hex: string, name: string): string {
  return `${hex}|${name}`
}

interface ColorPickerProps {
  id: string
  value: string[]
  onChange: (value: string[]) => void
  required?: boolean
}

export function ColorPicker({ id, value, onChange, required }: ColorPickerProps) {
  const [search, setSearch] = useState('')
  const [customHex, setCustomHex] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const filteredColors = useMemo(() => searchColors(search), [search])

  const selectedColors = useMemo(() => {
    return value
      .map(parseColorValue)
      .filter((c): c is { hex: string; name: string } => c !== null)
  }, [value])

  // Clean up invalid entries (e.g. migrated from old textarea format)
  useEffect(() => {
    const valid = value.filter((v) => parseColorValue(v) !== null)
    if (valid.length !== value.length) {
      onChange(valid)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- only run on mount to migrate old data

  const addColor = (opt: ColorOption) => {
    const formatted = formatColorValue(opt.hex, opt.name)
    if (!value.includes(formatted)) {
      onChange([...value, formatted])
    }
  }

  const removeColor = (formatted: string) => {
    onChange(value.filter((v) => v !== formatted))
  }

  const addCustomColor = () => {
    const hex = customHex.trim()
    if (!hex) return
    // Normalize hex
    const normalized = hex.startsWith('#') ? hex : `#${hex}`
    if (!/^#[0-9A-Fa-f]{6}$/.test(normalized)) return
    const formatted = formatColorValue(normalized, `Custom ${normalized}`)
    if (!value.includes(formatted)) {
      onChange([...value, formatted])
    }
    setCustomHex('')
    setShowCustomInput(false)
  }

  return (
    <div className="space-y-4" role="group" aria-required={required}>
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <input
          type="search"
          id={id}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search colors (e.g. navy, gold, blue…)"
          className="min-h-[44px] w-full rounded-lg border border-border bg-surface pl-11 pr-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search for colors"
        />
      </div>

      {/* Selected colors */}
      {selectedColors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">Selected</p>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map(({ hex, name }) => {
              const formatted = formatColorValue(hex, name)
              return (
                <button
                  key={formatted}
                  type="button"
                  onClick={() => removeColor(formatted)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-border-strong"
                    style={{ backgroundColor: hex }}
                    aria-hidden
                  />
                  <span className="text-text-primary">{name}</span>
                  <X className="h-4 w-4 text-text-muted" aria-hidden />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Color grid */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">
          {search ? 'Matching colors' : 'Popular brand colors'}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {filteredColors.map((opt) => {
            const formatted = formatColorValue(opt.hex, opt.name)
            const selected = value.includes(formatted)
            return (
              <button
                key={formatted}
                type="button"
                onClick={() => (selected ? removeColor(formatted) : addColor(opt))}
                className={cn(
                  'flex min-h-[56px] items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                  'hover:border-primary/50 hover:bg-primary/5',
                  selected ? 'border-2 border-primary bg-primary/10' : 'border-border bg-surface'
                )}
              >
                <span
                  className="h-8 w-8 shrink-0 rounded-md border border-border-strong shadow-sm"
                  style={{ backgroundColor: opt.hex }}
                  aria-hidden
                />
                <span className="truncate text-sm font-medium text-text-primary">{opt.name}</span>
              </button>
            )
          })}
        </div>
        {filteredColors.length === 0 && (
          <p className="text-sm text-text-muted">No colors match your search.</p>
        )}
      </div>

      {/* Custom hex input */}
      {showCustomInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={customHex}
            onChange={(e) => setCustomHex(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomColor()}
            placeholder="#1a2b6b or 1a2b6b"
            className="min-h-[44px] flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={addCustomColor}
            className="min-h-[44px] rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false)
              setCustomHex('')
            }}
            className="min-h-[44px] rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-raised"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowCustomInput(true)}
          className="text-sm text-primary hover:underline"
        >
          + Enter a custom hex color
        </button>
      )}
    </div>
  )
}
