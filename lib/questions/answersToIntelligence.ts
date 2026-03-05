// lib/questions/answersToIntelligence.ts — Maps answers to Intelligence object

import type { Answer } from '@/types/questions'
import type { Intelligence } from '@/types/intelligence'

function str(a: Answer | undefined): string {
  if (!a) return ''
  const v = a.value
  return Array.isArray(v) ? (v[0] ?? '') : String(v ?? '')
}

function arr(a: Answer | undefined): string[] {
  if (!a) return []
  const v = a.value
  return Array.isArray(v) ? v.filter(Boolean) : v ? [String(v)] : []
}

/** Format color picker value (hex|name) array to readable string */
function formatBrandColors(a: Answer | undefined): string | undefined {
  const vals = arr(a)
  if (!vals.length) return undefined
  const formatted = vals
    .map((v) => {
      const parts = v.split('|')
      if (parts.length >= 2) return `${parts[1]} (${parts[0]})`
      return v
    })
    .filter(Boolean)
  return formatted.length ? formatted.join(', ') : undefined
}

function resolveOther(a: Answer | undefined): string {
  const val = str(a)
  if (val === '_other' && a?.otherText) return a.otherText
  return val
}

export function answersToIntelligence(answers: Record<string, Answer>): Intelligence {
  const features = arr(answers['q24_key_features'])

  return {
    name: str(answers['q1_name']),
    email: str(answers['q2_email']),
    phone: str(answers['q3_phone']) || undefined,
    businessName: str(answers['q4_business_name']),

    websiteType: resolveOther(answers['q5_website_type']),
    industry: resolveOther(answers['q6_industry']),
    primaryGoal: resolveOther(answers['q7_primary_goal']),
    successVision: str(answers['q8_success_vision']),
    targetAudience: resolveOther(answers['q9_target_audience']),
    differentiator: str(answers['q10_differentiator']),

    inspirationUrls: arr(answers['q11_inspiration_urls']).filter(
      (u) => u.startsWith('http://') || u.startsWith('https://')
    ),
    inspirationStyles: arr(answers['q12_inspiration_styles']),
    stylestoAvoid: str(answers['q13_styles_to_avoid']) || undefined,

    hasExistingWebsite: str(answers['q14_has_website']) === 'yes',
    existingUrl: str(answers['q15_existing_url']) || undefined,
    existingFrustrations: arr(answers['q16_existing_frustrations']).length
      ? arr(answers['q16_existing_frustrations'])
      : undefined,

    hasLogo: (str(answers['q17_has_logo']) || 'not_sure') as Intelligence['hasLogo'],
    hasBrandColors: (str(answers['q18_has_colors']) || 'not_sure') as Intelligence['hasBrandColors'],
    brandColors: formatBrandColors(answers['q19_brand_colors']) || undefined,
    hasPhotos: (str(answers['q20_has_photos']) || 'no') as Intelligence['hasPhotos'],

    contentProvider: (str(answers['q21_content_provider']) ||
      'client') as Intelligence['contentProvider'],
    updateFrequency: (str(answers['q22_update_frequency']) ||
      'occasionally') as Intelligence['updateFrequency'],

    needsUserAccounts: features.includes('user_accounts'),
    needsEcommerce: features.includes('ecommerce_store'),
    needsCMS: features.includes('blog_cms'),
    needsBooking: features.includes('online_booking'),
    needsBlog: features.includes('blog_cms'),
    needsLiveChat: features.includes('live_chat'),
    additionalFeatures: (() => {
      const known = ['user_accounts', 'ecommerce_store', 'blog_cms', 'online_booking', 'live_chat']
      const rest = features
        .filter((f) => !known.includes(f))
        .map((f) => (f === '_other' ? answers['q24_key_features']?.otherText : f))
        .filter((f): f is string => Boolean(f))
      return rest.length ? rest : undefined
    })(),

    domainStatus: (str(answers['q27_domain_status']) ||
      'not_sure') as Intelligence['domainStatus'],
    existingDomain: str(answers['q28_existing_domain']) || undefined,
    hostingPreference: undefined,

    budget: str(answers['q30_budget']) || undefined,
    timeline: str(answers['q29_timeline']) || undefined,
    competitors: str(answers['q31_competitors']) || undefined,
    additionalContext: str(answers['q33_anything_else']) || undefined,
  }
}
