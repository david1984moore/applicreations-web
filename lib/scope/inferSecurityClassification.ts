// lib/scope/inferSecurityClassification.ts — Answers-based security classification per spec

import type { Answer } from '@/stores/questionnaireStore'

export function inferSecurityClassification(
  answers: Record<string, Answer>
): 'low' | 'medium' | 'high' | 'critical' {
  const get = (id: string) => answers[id]?.value
  const has = (id: string, val: string) => {
    const v = get(id)
    return Array.isArray(v) ? v.includes(val) : v === val
  }

  // Critical signals
  if (has('qa4_data_sensitivity', 'health_records')) return 'critical'
  if (has('qa4_data_sensitivity', 'personal_ids')) return 'critical'
  if (get('q6_industry') === 'legal_financial') return 'critical'

  // High signals
  if (has('qa4_data_sensitivity', 'payment_data')) return 'high'
  if (has('qa4_data_sensitivity', 'private_messages')) return 'high'
  if (get('q6_industry') === 'health_wellness') return 'high'
  if (get('q5_project_type') === 'ecommerce') return 'high'
  if (get('q5_project_type') === 'app') return 'high'
  if (has('q7_primary_goal', 'sign_up')) return 'high'

  // Medium signals
  if (has('q7_primary_goal', 'book_appointment')) return 'medium'
  if (has('q7_primary_goal', 'buy_something')) return 'medium'
  const integrations = get('q16_integrations')
  if (Array.isArray(integrations) && integrations.includes('payment_processor')) return 'medium'

  return 'low'
}
