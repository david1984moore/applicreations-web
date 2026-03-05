// lib/scopeGeneration/formatValue.ts — Converts raw enum/ID strings to human-readable text

export const FORMAT_MAP: Record<string, string> = {
  // Website type
  business: 'A website for my business or services',
  ecommerce: 'E-commerce store',
  portfolio: 'A portfolio to show off my work',
  nonprofit: 'A site for my non-profit or community cause',
  blog: 'A blog or place to share content',
  landing_page: 'One focused landing page',

  // Industry
  food_beverage: 'Food & Beverage',
  professional_services: 'Law, finance, or consulting',
  healthcare: 'Healthcare or wellness',
  real_estate: 'Real estate or property',
  construction: 'Construction, trades, or home services',
  creative: 'Design, photography, or creative work',
  technology: 'Tech or software',
  education: 'Education or coaching',
  retail: 'Retail or product sales',
  nonprofit_sector: 'Non-profit or community',
  beauty_wellness: 'Beauty, fitness, or personal care',
  hospitality: 'Events or entertainment',

  // Primary goal
  contact_quote: 'They pick up the phone and call me (or fill out a form)',
  purchase: 'Drive online purchases',
  hire_me: "They're impressed and decide to hire me",
  sign_up: 'They sign up, join, or subscribe to something',
  build_trust: 'They trust me more than my competitors',
  find_info: 'They find the exact information they came for',
  donate: 'They donate to or support my cause',

  // Target audience
  local_consumers: 'People in my local area',
  national_consumers: 'Customers anywhere in the country',
  businesses_b2b: 'Other businesses (I work B2B)',
  professionals: 'Professionals or specialists in my field',
  community: 'A community of like-minded people',
  mix: 'Mixed / general audience',

  // Inspiration styles
  clean_simple: 'Clean and uncluttered — room to breathe',
  professional_trustworthy: 'Professional and trust-building — serious business energy',
  bold_eyecatching: 'Bold and impossible to ignore',
  easy_navigation: 'Easy to navigate — I always know where I am',
  beautiful_photos: 'Stunning photography and visuals',
  modern_fresh: 'Modern and fresh — not dated at all',
  clear_messaging: "Crystal clear — I immediately get what they do",
  mobile_first: 'Works beautifully on my phone',
  fast_responsive: 'Fast — blink and it loads',

  // Styles to avoid
  not_corporate: 'Nothing too corporate',
  no_dark: 'No dark mode',
  not_cluttered: "Not cluttered like my competitor's site",
  no_busy: 'No busy or overwhelming layouts',
  no_generic: "Don't want a generic template look",
  no_flashy: 'No flashy animations or effects',
  no_minimal: "Don't want it too minimal or sparse",
  no_playful: 'Nothing too playful or casual',

  // Existing website
  yes: 'Yes',
  no: 'No',

  // Existing frustrations
  looks_outdated: "It looks like it was built in 2012",
  not_mobile: 'Looks terrible on phones',
  cant_update: "I can't update it without calling someone",
  not_in_google: "Google doesn't know it exists",
  not_converting: 'Visitors come and go without doing anything',
  loads_slowly: 'It takes forever to load',
  confusing: "Nobody can tell what I actually do",
  embarrassing: "I'm embarrassed to hand out my business card",
  technical_issues: "It's constantly broken or hacked",

  // Logo
  yes_professional: 'Yes — professional logo ready',
  yes_needs_work: 'I have one, but honestly it could be better',
  not_sure: 'Honestly not sure',

  // Brand colors
  has_colors: 'Yes — I know my exact colors',
  has_no_colors: "Not really — I'm open to what looks great",

  // Photos
  yes_casual: 'Yes — casual/phone photos',

  // Content provider
  client: "I'll write it — just need a direction to follow",
  collaborative: 'Collaborative (client + agency)',
  agency: 'I already have a copywriter handling it',

  // Update frequency
  regularly: 'All the time — I\'ll want to add things regularly',
  occasionally: 'A few times per year',
  rarely: 'Rarely — once it\'s up, it\'s mostly up',

  // Key features
  contact_form: 'Contact form',
  online_booking: 'Online booking',
  ecommerce_store: 'E-commerce store',
  user_accounts: 'User accounts',
  live_chat: 'Live chat',
  blog_cms: 'Blog or content section',
  email_newsletter: 'Email newsletter sign-up',
  photo_gallery: 'Photo gallery',
  video_embed: 'Video integration',
  google_maps: 'Map showing location',
  social_feed: 'Social media feed integration',
  reviews_testimonials: 'Display Google or Yelp reviews',
  payment_processing: 'Accept payments (one-off)',
  quote_calculator: 'Quote calculator or pricing estimator',
  multilingual: 'Multi-language support',

  // E-commerce
  small: 'Small shop — under 25 products',
  medium: 'Medium catalog — 25 to 200 products',
  large: 'Big operation — 200+ products',

  // Integrations
  google_analytics: 'Google Analytics',
  mailchimp: 'Mailchimp or email platform',
  crm: 'CRM (Salesforce, HubSpot)',
  payment_stripe: 'Stripe',
  payment_paypal: 'PayPal',
  calendly: 'Calendly or scheduling tool',
  social_media: 'Social media accounts',
  quickbooks: 'QuickBooks or accounting software',
  none: 'None specified',

  // Domain
  need_domain: 'Needs a domain registered',
  have_domain: 'Domain already registered',

  // Timeline
  asap: 'As soon as possible',
  one_month: 'Within one month',
  two_three_months: '2–3 months',
  flexible: "I'm flexible — quality over speed",
  specific_date: 'I have a specific date in mind',

  // Budget
  under_2500: 'Under $2,500',
  '2500_4500': '$2,500–$4,500',
  '4500_plus': '$4,500+',

  // Accessibility
  standard: 'Standard accessibility',
  wcag_aa: 'WCAG 2.1 AA compliance',

  // Package
  starter: 'Starter',
  professional: 'Professional',
  custom: 'Custom',
}

export function formatValue(raw: string): string {
  return FORMAT_MAP[raw] ?? raw
}

/** Prose descriptors for Executive Summary — no leading article, natural noun phrases */
export const WEBSITE_TYPE_PROSE: Record<string, string> = {
  business: 'business website',
  ecommerce: 'e-commerce store',
  portfolio: 'portfolio site',
  nonprofit: 'non-profit website',
  blog: 'blog',
  landing_page: 'landing page',
}

export const INDUSTRY_PROSE: Record<string, string> = {
  food_beverage: 'food & beverage',
  professional_services: 'law, finance, or consulting',
  healthcare: 'healthcare',
  real_estate: 'real estate',
  construction: 'construction and trades',
  creative: 'creative work',
  technology: 'technology',
  education: 'education',
  retail: 'retail',
  nonprofit_sector: 'non-profit',
  beauty_wellness: 'beauty and wellness',
  hospitality: 'hospitality and events',
}

/** Format an array of raw values; returns human-readable strings joined by separator */
export function formatValues(raw: string[], separator = ', '): string {
  return raw.map(formatValue).filter(Boolean).join(separator)
}
