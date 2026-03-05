// types/intelligence.ts — Intelligence object (all gathered data) per INTROSPECT spec

export interface Intelligence {
  // Contact
  name: string
  email: string
  phone?: string
  businessName: string

  // Project
  websiteType: string
  industry: string
  primaryGoal: string
  successVision: string
  targetAudience: string
  differentiator: string

  // Inspiration
  inspirationUrls: string[]
  inspirationStyles: string[]
  stylestoAvoid?: string

  // Current situation
  hasExistingWebsite: boolean
  existingUrl?: string
  existingFrustrations?: string[]

  // Brand
  hasLogo: 'yes_professional' | 'yes_needs_work' | 'no' | 'not_sure'
  hasBrandColors: 'yes' | 'no' | 'not_sure'
  brandColors?: string
  hasPhotos: 'yes_professional' | 'yes_casual' | 'no'

  // Content
  contentProvider: 'client' | 'collaborative' | 'agency'
  updateFrequency: 'regularly' | 'occasionally' | 'rarely'

  // Features
  needsUserAccounts: boolean
  needsEcommerce: boolean
  needsCMS: boolean
  needsBooking: boolean
  needsBlog: boolean
  needsLiveChat: boolean
  additionalFeatures?: string[]

  // Technical
  domainStatus: 'have_domain' | 'need_domain' | 'not_sure'
  existingDomain?: string
  hostingPreference?: string

  // Business
  budget?: string
  timeline?: string
  competitors?: string
  additionalContext?: string

  // Computed
  selectedPackage?: 'starter' | 'professional' | 'custom'
  estimatedPrice?: number
  riskLevel?: 'low' | 'medium' | 'high' | 'critical'
}
