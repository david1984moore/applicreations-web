// lib/colors/colorPalette.ts — Searchable brand color palette

export interface ColorOption {
  hex: string
  name: string
  keywords: string[] // for search
}

export const COLOR_PALETTE: ColorOption[] = [
  // Blues
  { hex: '#1a2b6b', name: 'Navy blue', keywords: ['navy', 'blue', 'dark', 'professional'] },
  { hex: '#1e3a5f', name: 'Deep navy', keywords: ['navy', 'blue', 'dark'] },
  { hex: '#2563eb', name: 'Royal blue', keywords: ['blue', 'bright', 'trust'] },
  { hex: '#0066cc', name: 'Corporate blue', keywords: ['blue', 'business', 'professional'] },
  { hex: '#0ea5e9', name: 'Sky blue', keywords: ['blue', 'light', 'sky'] },
  { hex: '#3b82f6', name: 'Bright blue', keywords: ['blue', 'vibrant'] },
  { hex: '#1e40af', name: 'Cobalt blue', keywords: ['blue', 'cobalt', 'rich'] },
  // Grays & neutrals
  { hex: '#374151', name: 'Charcoal gray', keywords: ['gray', 'grey', 'charcoal', 'neutral'] },
  { hex: '#4b5563', name: 'Slate gray', keywords: ['gray', 'grey', 'slate'] },
  { hex: '#6b7280', name: 'Medium gray', keywords: ['gray', 'grey'] },
  { hex: '#1f2937', name: 'Dark gray', keywords: ['gray', 'grey', 'dark'] },
  { hex: '#111827', name: 'Near black', keywords: ['black', 'dark', 'gray'] },
  // Golds & yellows
  { hex: '#ffd700', name: 'Gold', keywords: ['gold', 'yellow', 'luxury'] },
  { hex: '#c4a747', name: 'Antique gold', keywords: ['gold', 'antique', 'muted'] },
  { hex: '#eab308', name: 'Bright gold', keywords: ['gold', 'yellow', 'bright'] },
  { hex: '#fbbf24', name: 'Amber', keywords: ['amber', 'yellow', 'warm'] },
  { hex: '#f59e0b', name: 'Orange gold', keywords: ['gold', 'orange', 'warm'] },
  // Reds
  { hex: '#dc2626', name: 'Red', keywords: ['red', 'bold', 'energy'] },
  { hex: '#c41e3a', name: 'Crimson', keywords: ['red', 'crimson', 'deep'] },
  { hex: '#b91c1c', name: 'Dark red', keywords: ['red', 'dark'] },
  { hex: '#ef4444', name: 'Bright red', keywords: ['red', 'bright'] },
  // Greens
  { hex: '#16a34a', name: 'Forest green', keywords: ['green', 'forest', 'nature'] },
  { hex: '#228b22', name: 'Green', keywords: ['green', 'classic'] },
  { hex: '#059669', name: 'Emerald', keywords: ['green', 'emerald'] },
  { hex: '#10b981', name: 'Teal green', keywords: ['green', 'teal'] },
  { hex: '#22c55e', name: 'Bright green', keywords: ['green', 'bright'] },
  // Purples
  { hex: '#7c3aed', name: 'Purple', keywords: ['purple', 'violet'] },
  { hex: '#6d28d9', name: 'Deep purple', keywords: ['purple', 'deep'] },
  { hex: '#8b5cf6', name: 'Violet', keywords: ['purple', 'violet'] },
  { hex: '#a855f7', name: 'Bright purple', keywords: ['purple', 'bright'] },
  // Oranges
  { hex: '#ea580c', name: 'Orange', keywords: ['orange', 'warm'] },
  { hex: '#f97316', name: 'Bright orange', keywords: ['orange', 'bright'] },
  { hex: '#fb923c', name: 'Light orange', keywords: ['orange', 'light'] },
  // Teals & cyans
  { hex: '#0d9488', name: 'Teal', keywords: ['teal', 'cyan'] },
  { hex: '#14b8a6', name: 'Bright teal', keywords: ['teal', 'bright'] },
  { hex: '#06b6d4', name: 'Cyan', keywords: ['cyan', 'blue'] },
  // Pinks
  { hex: '#db2777', name: 'Pink', keywords: ['pink', 'magenta'] },
  { hex: '#ec4899', name: 'Hot pink', keywords: ['pink', 'bright'] },
  { hex: '#be185d', name: 'Rose', keywords: ['pink', 'rose', 'muted'] },
  // Browns
  { hex: '#78350f', name: 'Brown', keywords: ['brown', 'earth'] },
  { hex: '#92400e', name: 'Sienna', keywords: ['brown', 'sienna'] },
  { hex: '#a16207', name: 'Olive brown', keywords: ['brown', 'olive'] },
  // Whites & off-whites
  { hex: '#ffffff', name: 'White', keywords: ['white', 'clean'] },
  { hex: '#f8fafc', name: 'Off-white', keywords: ['white', 'cream', 'off'] },
  { hex: '#f1f5f9', name: 'Light gray', keywords: ['gray', 'light', 'background'] },
]

export function searchColors(query: string): ColorOption[] {
  const q = query.trim().toLowerCase()
  if (!q) return COLOR_PALETTE
  return COLOR_PALETTE.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.includes(q))
  )
}
