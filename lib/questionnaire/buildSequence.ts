// lib/questionnaire/buildSequence.ts — Question routing logic per spec

import type { Answer } from '@/stores/questionnaireStore'

export function buildSequence(
  answers: Record<string, Answer>,
  activeBranches: string[]
): string[] {
  const sequence: string[] = []
  const getVal = (id: string) => answers[id]?.value

  // Always: Q1–Q7
  sequence.push(
    'q1_name',
    'q2_email',
    'q3_phone',
    'q4_business_name',
    'q5_project_type',
    'q6_industry',
    'q7_primary_goal'
  )

  // Inject e-commerce branch after Q7 if active
  if (activeBranches.includes('ecommerce')) {
    sequence.push('qe1_product_count', 'qe2_variants', 'qe3_inventory', 'qe4_payment_methods')
  }

  // Inject app branch after Q7 if active
  if (activeBranches.includes('app')) {
    sequence.push('qa1_who_logs_in')
    // qa2_account_actions ("What can a logged-in customer actually do?") only when customers have accounts
    const qa1 = getVal('qa1_who_logs_in')
    const customerFacingAuth = ['customers', 'both', 'all_three']
    if (qa1 && customerFacingAuth.includes(String(qa1))) {
      sequence.push('qa2_account_actions')
    }
    sequence.push('qa3_business_logic', 'qa4_data_sensitivity')
  }

  // Always: Q8 (existing site)
  sequence.push('q8_existing_website')

  // Conditional: Q8a and Q8b if site exists
  const q8 = getVal('q8_existing_website')
  if (q8 === 'yes_migrate' || q8 === 'yes_replace') {
    sequence.push('q8a_current_url', 'q8b_frustrations')
  }

  // Always: Q9–Q16
  sequence.push('q9_logo', 'q10_brand_colors')

  // Conditional: Q10a if has colors
  const q10 = getVal('q10_brand_colors')
  if (q10 === 'yes_exact' || q10 === 'yes_general') {
    sequence.push('q10a_color_entry')
  }

  sequence.push(
    'q11_photography',
    'q12_media',
    'q13_inspiration',
    'q14_design_style',
    'q15_styles_avoid',
    'q16_integrations',
    'q17_content_writer',
    'q18_update_frequency'
  )

  // Inject content branch after Q18 if active
  if (activeBranches.includes('content')) {
    sequence.push('qc1_content_types', 'qc2_multiple_authors')
  }

  // Always: Q19–Q21
  sequence.push('q19_support', 'q20_domain')

  // Conditional: Q20a if has domain
  if (getVal('q20_domain') === 'yes') {
    sequence.push('q20a_domain_entry')
  }

  sequence.push('q21_timeline')

  // Conditional: Q21a if specific date
  if (getVal('q21_timeline') === 'specific_date') {
    sequence.push('q21a_specific_date')
  }

  // Always: Q22–Q24
  sequence.push('q22_budget', 'q23_competitors', 'q24_anything_else')

  return sequence
}
