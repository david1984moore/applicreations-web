// lib/scope/generateScope.ts — Client-side: calls API for single Claude SCOPE generation

import { buildScopePrompt } from './buildScopePrompt'
import { inferFeatures } from './inferFeatures'
import { inferSecurityClassification } from './inferSecurityClassification'
import type { Answer } from '@/stores/questionnaireStore'

export async function generateScope(
  answers: Record<string, Answer>,
  activeBranches: string[]
): Promise<{ scopeMd: string; clientSummary: string }> {
  const features = inferFeatures(answers, activeBranches)
  const security = inferSecurityClassification(answers)
  const prompt = buildScopePrompt(answers, features, security)

  const response = await fetch('/api/generate-scope', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  const text = await response.text()
  let data: { scopeMd?: string; clientSummary?: string; error?: string }
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    throw new Error(response.ok ? 'Invalid response from server' : 'Scope generation failed')
  }
  if (!response.ok) {
    throw new Error(data.error ?? 'Scope generation failed')
  }
  if (!data.scopeMd || !data.clientSummary) {
    throw new Error(data.error ?? 'Scope generation failed')
  }
  return { scopeMd: data.scopeMd, clientSummary: data.clientSummary }
}
