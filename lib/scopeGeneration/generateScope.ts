// lib/scopeGeneration/generateScope.ts — Maps Intelligence to full SCOPE.md string

import type { Intelligence } from '@/types/intelligence'
import { formatValue, formatValues, WEBSITE_TYPE_PROSE, INDUSTRY_PROSE } from './formatValue'
import { generateSecuritySection } from './securitySection'

function writeExecutiveSummary(intelligence: Intelligence): string {
  const websiteTypeProse = WEBSITE_TYPE_PROSE[intelligence.websiteType] ?? formatValue(intelligence.websiteType).replace(/^(a|an)\s+/i, '').toLowerCase()
  const industryProse = INDUSTRY_PROSE[intelligence.industry] ?? formatValue(intelligence.industry).toLowerCase()
  const primaryGoal = formatValue(intelligence.primaryGoal)
  const differentiator = intelligence.differentiator
  const businessName = intelligence.businessName

  const sentences: string[] = []
  sentences.push(
    `${businessName} is building a ${websiteTypeProse} for the ${industryProse} space.`
  )
  sentences.push(
    `The primary goal is to ${primaryGoal.toLowerCase()}, and the site will serve ${formatValue(intelligence.targetAudience).toLowerCase()}.`
  )
  if (differentiator?.trim()) {
    sentences.push(
      `What sets ${businessName} apart: ${differentiator.trim().replace(/\.$/, '')}.`
    )
  }
  return sentences.length > 0 ? sentences.join(' ') : `${businessName} — ${websiteTypeProse} for ${industryProse}.`
}

export function generateScope(intelligence: Intelligence): string {
  const fmt = formatValue
  const sections: string[] = []

  // Section 1: Executive Summary
  const executiveSummary = writeExecutiveSummary(intelligence)
  sections.push(`# SCOPE.md — ${intelligence.businessName}

**Generated:** ${new Date().toISOString().split('T')[0]}
**Version:** 1.0

---

## Section 1: Executive Summary

${executiveSummary}`)

  // Section 2: Project Classification
  sections.push(`## Section 2: Project Classification

- **Website Type:** ${fmt(intelligence.websiteType)}
- **Industry:** ${fmt(intelligence.industry)}
- **Recommended Package:** ${fmt(intelligence.selectedPackage ?? 'professional')}`)

  // Section 3: Client Information
  sections.push(`## Section 3: Client Information

- **Name:** ${intelligence.name}
- **Email:** ${intelligence.email}
- **Phone:** ${intelligence.phone ?? 'Not provided'}
- **Business:** ${intelligence.businessName}`)

  // Section 4: Business Context
  const existingFrustrations = intelligence.existingFrustrations?.length
    ? formatValues(intelligence.existingFrustrations)
    : ''
  sections.push(`## Section 4: Business Context

- **Primary Goal:** ${fmt(intelligence.primaryGoal)}
- **Target Audience:** ${fmt(intelligence.targetAudience)}
- **Differentiator:** ${intelligence.differentiator}
- **Existing Website:** ${intelligence.hasExistingWebsite ? intelligence.existingUrl ?? 'Yes' : 'No'}
${existingFrustrations ? `- **Current Frustrations:** ${existingFrustrations}` : ''}`)

  // Section 5: Brand Assets
  sections.push(`## Section 5: Brand Assets

- **Logo:** ${fmt(intelligence.hasLogo)}
- **Brand Colors:** ${fmt(intelligence.hasBrandColors)}${intelligence.brandColors ? ` — ${intelligence.brandColors}` : ''}
- **Photos:** ${fmt(intelligence.hasPhotos)}`)

  // Section 6: Content Strategy
  sections.push(`## Section 6: Content Strategy

- **Content Provider:** ${fmt(intelligence.contentProvider)}
- **Update Frequency:** ${fmt(intelligence.updateFrequency)}`)

  // Section 7: Technical Specifications
  const features = [
    intelligence.needsUserAccounts && 'User accounts',
    intelligence.needsEcommerce && 'E-commerce',
    intelligence.needsCMS && 'CMS/Blog',
    intelligence.needsBooking && 'Booking',
    intelligence.needsLiveChat && 'Live chat',
  ].filter(Boolean) as string[]
  const additionalFeatures = intelligence.additionalFeatures?.map(fmt) ?? []
  const allFeaturesList = [...features, ...additionalFeatures].filter(Boolean)

  const paymentProcessor = intelligence.needsEcommerce ? 'Stripe recommended for e-commerce (payment processing, PCI compliance).' : ''
  const cartSession = intelligence.needsEcommerce
    ? 'Cart: server-side session or secure cookie; persist cart across sessions; handle guest checkout.'
    : ''
  const compliance = intelligence.needsEcommerce
    ? 'PCI-DSS: use Stripe Elements or hosted checkout; never store raw card data.'
    : ''
  const cmsRecommendation =
    intelligence.contentProvider === 'collaborative' || intelligence.updateFrequency === 'regularly'
      ? 'CMS: Recommended for collaborative content (e.g., Sanity, Contentful, or Next.js + MDX).'
      : ''

  const integrations: string[] = []
  if (intelligence.needsEcommerce) {
    integrations.push('Stripe — payment processing, checkout, webhooks')
  }
  if (intelligence.needsBooking) {
    integrations.push('Calendly or similar — scheduling, availability sync')
  }
  if (intelligence.needsCMS || intelligence.needsBlog) {
    integrations.push('CMS (Sanity/Contentful) — content management, preview')
  }
  if (intelligence.additionalFeatures?.includes('payment_processing') && !intelligence.needsEcommerce) {
    integrations.push('Stripe — one-off payments')
  }
  if (intelligence.additionalFeatures?.includes('social_feed')) {
    integrations.push('Instagram/social API — embed feed')
  }
  if (intelligence.additionalFeatures?.includes('multilingual')) {
    integrations.push('i18n — routing and translations')
  }
  integrations.push('Google Analytics — analytics')
  integrations.push('Email (Resend/SendGrid) — contact form')

  const integrationsList = integrations.length
    ? integrations.map((i) => `- ${i}`).join('\n')
    : '- No integrations specified'

  const techSpecs = [
    paymentProcessor && `**Payment Processor:** ${paymentProcessor}`,
    cartSession && `**Cart & Session:** ${cartSession}`,
    compliance && `**Compliance:** ${compliance}`,
    cmsRecommendation && `**CMS:** ${cmsRecommendation}`,
  ].filter(Boolean)
  const techSpecsBlock = techSpecs.length > 0 ? '\n\n' + techSpecs.join('\n') + '\n' : ''

  sections.push(`## Section 7: Technical Specifications

- **Key Features:** ${allFeaturesList.join(', ') || 'Contact form, responsive design'}
- **Domain Status:** ${fmt(intelligence.domainStatus)}
- **Existing Domain:** ${intelligence.existingDomain ?? 'N/A'}${techSpecsBlock}
**Integrations:**
${integrationsList}`)

  // Section 8: Design Direction
  sections.push(`## Section 8: Design Direction

- **Inspiration URLs:** ${intelligence.inspirationUrls?.length ? intelligence.inspirationUrls.join(', ') : 'None'}
- **Inspiration Styles:** ${intelligence.inspirationStyles?.length ? formatValues(intelligence.inspirationStyles) : 'None specified'}
- **Styles to Avoid:** ${intelligence.stylestoAvoid ? formatValues((intelligence.stylestoAvoid.split?.(',') ?? [intelligence.stylestoAvoid]).map((s) => String(s).trim()).filter(Boolean)) : 'None specified'}`)

  // Section 9: Features Breakdown
  const allFeatures = [
    'Contact form',
    ...(intelligence.needsBooking ? ['Online booking'] : []),
    ...(intelligence.needsEcommerce ? ['E-commerce store'] : []),
    ...(intelligence.needsUserAccounts ? ['User accounts'] : []),
    ...(intelligence.needsLiveChat ? ['Live chat'] : []),
    ...(intelligence.needsCMS || intelligence.needsBlog ? ['Blog/CMS'] : []),
    ...(intelligence.additionalFeatures ?? []).map(fmt),
  ]
  const uniqueFeatures = [...new Set(allFeatures)]
  sections.push(`## Section 9: Features Breakdown

- **Core Features:** ${uniqueFeatures.join(', ')}`)

  // Section 10: Timeline
  sections.push(`## Section 10: Timeline

- **Timeline:** ${intelligence.timeline ? fmt(intelligence.timeline) : 'To be determined'}`)

  // Section 11: Investment
  const PACKAGE_PRICE_NUM: Record<string, number> = {
    starter: 2500,
    professional: 4500,
    custom: 6000,
  }
  const PACKAGE_PRICE_DISPLAY: Record<string, string> = {
    starter: '$2,500',
    professional: '$4,500',
    custom: '$6,000+',
  }
  const packageKey = intelligence.selectedPackage ?? 'professional'
  const packagePriceNum = PACKAGE_PRICE_NUM[packageKey] ?? 4500
  const packagePriceDisplay = PACKAGE_PRICE_DISPLAY[packageKey] ?? '$4,500'
  const budgetMaxByKey: Record<string, number> = {
    under_2500: 2500,
    '2500_4500': 4500,
    '4500_plus': 999999,
  }
  const budgetDisplay = intelligence.budget ? fmt(intelligence.budget) : 'To be determined'
  const budgetMax = intelligence.budget ? (budgetMaxByKey[intelligence.budget] ?? 999999) : 999999
  const budgetMismatch =
    intelligence.budget && packagePriceNum > budgetMax
      ? `\n\n⚠️ **Budget mismatch:** Client stated ${budgetDisplay}. Recommended package is ${fmt(packageKey)} at ${packagePriceDisplay}. Confirm before development begins.`
      : ''
  sections.push(`## Section 11: Investment Summary

- **Budget Range (client stated):** ${budgetDisplay}
- **Estimated Package:** ${fmt(packageKey)}${budgetMismatch}`)

  // Section 12: Competitors — omit if empty, null, or placeholder
  const competitorsValue = (intelligence.competitors ?? '').trim()
  const competitorsOmit =
    !competitorsValue ||
    competitorsValue.toLowerCase() === 'not specified' ||
    competitorsValue.toLowerCase() === 'none provided'
  if (!competitorsOmit) {
    sections.push(`## Section 12: Market Context

- **Competitors:** ${competitorsValue}`)
  }

  // Section 13: Additional Context — omit if empty, null, or placeholder
  const additionalContextValue = (intelligence.additionalContext ?? '').trim()
  const additionalContextOmit =
    !additionalContextValue ||
    additionalContextValue.toLowerCase() === 'not specified' ||
    additionalContextValue.toLowerCase() === 'none provided'
  if (!additionalContextOmit) {
    sections.push(`## Section 13: Additional Context

${additionalContextValue}`)
  }

  // Section 14: Validation
  sections.push(`## Section 14: Validation Outcomes

- All requirements gathered via Introspect questionnaire
- Client has reviewed and confirmed project scope`)

  // Section 15: Security (Internal Only)
  sections.push(generateSecuritySection(intelligence))

  return sections.join('\n\n---\n\n')
}
