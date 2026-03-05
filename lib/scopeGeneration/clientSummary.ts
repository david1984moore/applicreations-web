// lib/scopeGeneration/clientSummary.ts — Client-facing PDF content (proposal document)

import type { Intelligence } from '@/types/intelligence'
import { formatValue, WEBSITE_TYPE_PROSE, INDUSTRY_PROSE } from './formatValue'

/** Package pricing (actual prices, not client-stated budget) */
const PACKAGE_PRICING = {
  starter: '$2,500',
  professional: '$4,500',
  custom: '$6,000+',
} as const

const PACKAGE_PRICE_NUM: Record<string, number> = {
  starter: 2500,
  professional: 4500,
  custom: 6000,
}

export interface ClientSummaryContent {
  projectName: string
  clientName: string
  summaryDate: string

  /** Section 1: Understanding Your Business — 2–3 sentence paragraph */
  understandingYourBusiness: string

  /** Section 2: Our Recommendation */
  recommendation: {
    packageName: string
    packagePrice: string
    budgetNote: string
  }

  /** Section 3: Features — each described as a client benefit */
  features: Array<{ name: string; benefit: string }>

  /** Section 4: Design Direction */
  design: {
    inspirationStyles: string[]
    stylesToAvoid: string
  }

  /** Section 5: Investment */
  investment: {
    packageName: string
    packagePrice: string
    monthlyHosting: string
    paymentTerms: string
  }

  /** Section 6: Timeline */
  timeline: string

  /** Section 7: Next Steps */
  nextSteps: string[]

  /** Closing: Questions CTA */
  closingCta: string
}

function getRecommendedPackage(intelligence: Intelligence): 'starter' | 'professional' | 'custom' {
  const pkg = intelligence.selectedPackage
  if (pkg) return pkg
  if (intelligence.needsEcommerce || intelligence.needsUserAccounts || intelligence.needsBooking) {
    return 'professional'
  }
  if (intelligence.needsCMS || intelligence.needsBlog || (intelligence.additionalFeatures?.length ?? 0) > 2) {
    return 'professional'
  }
  return 'starter'
}

function buildFeatureBenefits(intelligence: Intelligence): Array<{ name: string; benefit: string }> {
  const items: Array<{ name: string; benefit: string }> = [
    { name: 'Custom design', benefit: 'A unique look that reflects your brand and stands out from competitors.' },
    { name: 'Mobile-responsive layout', benefit: 'Your site looks great and works smoothly on phones, tablets, and desktops.' },
    { name: 'Contact form', benefit: 'Visitors can reach you easily without sharing your personal email.' },
  ]

  if (intelligence.needsBooking) {
    items.push({
      name: 'Online booking',
      benefit: 'Let customers schedule appointments 24/7 without phone tag.',
    })
  }
  if (intelligence.needsEcommerce) {
    items.push({
      name: 'E-commerce store',
      benefit: 'Sell products online with a secure shopping cart and checkout.',
    })
  }
  if (intelligence.needsBlog || intelligence.needsCMS) {
    items.push({
      name: 'Blog or content section',
      benefit: 'Update your site yourself with news, tips, or portfolio pieces.',
    })
  }
  if (intelligence.needsLiveChat) {
    items.push({
      name: 'Live chat',
      benefit: 'Answer visitor questions in real time and capture leads.',
    })
  }
  if (intelligence.needsUserAccounts) {
    items.push({
      name: 'User accounts',
      benefit: 'Customers can log in to save preferences, track orders, or access members-only content.',
    })
  }

  const additionalMap: Record<string, string> = {
    contact_form: 'Visitors can reach you easily without sharing your personal email.',
    photo_gallery: 'Showcase your work or products in an attractive, easy-to-browse gallery.',
    social_feed: 'Your Instagram or social posts appear on your site to keep content fresh.',
    multilingual: 'Reach customers in their preferred language.',
    email_newsletter: 'Build your email list so you can stay in touch with customers.',
    google_maps: 'Visitors can find your location and get directions with one click.',
    video_embed: 'Embed YouTube or Vimeo videos to showcase your work or explain your services.',
    reviews_testimonials: 'Display your Google or Yelp reviews to build trust.',
    payment_processing: 'Accept one-off payments for deposits, donations, or services.',
    quote_calculator: 'Let visitors get instant estimates based on their needs.',
  }

  for (const raw of intelligence.additionalFeatures ?? []) {
    const name = formatValue(raw)
    const benefit = additionalMap[raw] ?? `Adds the functionality you need for your business.`
    if (!items.some((i) => i.name === name)) {
      items.push({ name, benefit })
    }
  }

  return items
}

function buildUnderstandingParagraph(intelligence: Intelligence): string {
  const websiteTypeProse = WEBSITE_TYPE_PROSE[intelligence.websiteType] ?? formatValue(intelligence.websiteType).replace(/^(a|an)\s+/i, '').toLowerCase()
  const industryProse = INDUSTRY_PROSE[intelligence.industry] ?? formatValue(intelligence.industry).toLowerCase()
  const primaryGoal = formatValue(intelligence.primaryGoal).toLowerCase()
  const targetAudience = formatValue(intelligence.targetAudience).toLowerCase()
  const differentiator = (intelligence.differentiator ?? '').trim()

  const sentences: string[] = []
  sentences.push(
    `${intelligence.businessName} is building a ${websiteTypeProse} for the ${industryProse} space, with a primary goal to ${primaryGoal} and a target audience of ${targetAudience}.`
  )
  if (differentiator) {
    sentences.push(`What sets you apart: ${differentiator.replace(/\.$/, '')}.`)
  }
  return sentences.join(' ')
}

export function generateClientSummary(intelligence: Intelligence): ClientSummaryContent {
  const fmt = formatValue
  const packageKey = getRecommendedPackage(intelligence)
  const packageName = fmt(packageKey)
  const packagePrice = PACKAGE_PRICING[packageKey]
  const budgetNote = `Based on your requirements, we recommend the ${packageName} package. We'll discuss options in our kickoff call.`

  const packagePriceNum = PACKAGE_PRICE_NUM[packageKey] ?? 4500
  const halfAmount = (packagePriceNum / 2).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const paymentTerms = `Payment terms: 50% deposit (${halfAmount}) to begin. 50% (${halfAmount}) due on launch.`

  const inspirationStyles = (intelligence.inspirationStyles ?? []).map(fmt).filter(Boolean)
  const stylesToAvoid = intelligence.stylestoAvoid
    ? (intelligence.stylestoAvoid.includes(',')
        ? intelligence.stylestoAvoid.split(',').map((s) => fmt(s.trim())).filter(Boolean)
        : [fmt(intelligence.stylestoAvoid)]
      ).join(', ')
    : 'None specified'

  return {
    projectName: intelligence.businessName,
    clientName: intelligence.name,
    summaryDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),

    understandingYourBusiness: buildUnderstandingParagraph(intelligence),

    recommendation: {
      packageName,
      packagePrice,
      budgetNote,
    },

    features: buildFeatureBenefits(intelligence),

    design: {
      inspirationStyles,
      stylesToAvoid,
    },

    investment: {
      packageName,
      packagePrice,
      monthlyHosting: 'Included for first year',
      paymentTerms,
    },

    timeline: intelligence.timeline ? fmt(intelligence.timeline) : '2–4 weeks',

    nextSteps: [
      'Review this proposal',
      'Schedule a kickoff call to discuss details',
      'Sign agreement to begin',
      'Receive your working prototype',
    ],

    closingCta:
      "Questions? We'd love to hear from you. Reply to this email or visit www.applicreations.com to book a call.",
  }
}
