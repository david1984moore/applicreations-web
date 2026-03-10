// lib/scope/inferFeatures.ts — Feature inference from answers (no client input) per spec

import type { Answer } from '@/stores/questionnaireStore'

export function inferFeatures(
  answers: Record<string, Answer>,
  activeBranches: string[]
): string[] {
  const features: string[] = []
  const get = (id: string) => answers[id]?.value
  const has = (id: string, val: string) => {
    const v = get(id)
    return Array.isArray(v) ? v.includes(val) : v === val
  }

  // Always included
  features.push('Responsive design (mobile, tablet, desktop)')
  features.push('SSL certificate')
  features.push('Basic SEO (meta tags, sitemap, robots.txt)')
  features.push('Contact form')
  features.push('Google Analytics integration')
  features.push('Performance optimization')

  // Goal-based
  if (has('q7_primary_goal', 'book_appointment'))
    features.push('Appointment scheduling system with calendar sync and automated reminders')
  if (has('q7_primary_goal', 'call_contact'))
    features.push('Click-to-call button', 'Contact form with email notification')
  if (has('q7_primary_goal', 'get_a_quote')) features.push('Multi-step quote request form')
  if (has('q7_primary_goal', 'find_my_location'))
    features.push('Google Maps embed', 'Business hours display')
  if (has('q7_primary_goal', 'sign_up'))
    features.push('User authentication system', 'Account creation flow')

  // Type-based
  const type = get('q5_project_type')
  if (type === 'restaurant')
    features.push('Menu display system', 'Hours and location page', 'Online reservation or booking')
  if (type === 'portfolio') features.push('Project gallery with filtering', 'Case study layout')
  if (type === 'nonprofit')
    features.push('Donation system', 'Event calendar', 'Volunteer signup form')
  if (type === 'blog') features.push('Blog system with categories and tags', 'RSS feed')

  // Industry-based
  const industry = get('q6_industry')
  if (
    industry === 'health_wellness' ||
    industry === 'beauty_personal' ||
    industry === 'fitness'
  ) {
    features.push('Appointment scheduling system', 'SMS appointment reminders')
  }
  if (industry === 'home_services' || industry === 'automotive') {
    features.push('Service area map or description', 'Quote request form')
  }
  if (industry === 'legal_financial') {
    features.push('Secure contact form', 'Privacy policy compliance page')
  }

  // Photography / media
  if (has('q11_photography', 'have_great')) features.push('Professional photo gallery')
  if (has('q12_media', 'yes_embed')) features.push('Embedded video component')
  if (has('q12_media', 'yes_background'))
    features.push('Hero background video with performance optimization')
  if (has('q12_media', 'yes_interactive'))
    features.push('Custom interactive component (calculator, quiz, or configurator)')

  // Content management
  const updateFreq = get('q18_update_frequency')
  if (updateFreq === 'weekly' || updateFreq === 'daily')
    features.push('Content Management System (CMS) with visual editor')
  if (updateFreq === 'daily')
    features.push('Advanced caching strategy for high-frequency updates')

  // Support tier
  if (has('q19_support', 'handle_it_for_me'))
    features.push('Managed hosting with monitoring and automated backups')
  if (has('q19_support', 'some_help'))
    features.push('Managed hosting with standard monitoring')

  // Integrations
  const integrations = get('q16_integrations') as string[] | undefined
  if (integrations) {
    if (integrations.includes('email_marketing'))
      features.push('Email marketing platform integration')
    if (integrations.includes('booking_system'))
      features.push('Existing booking system integration or migration')
    if (integrations.includes('crm')) features.push('CRM integration')
    if (integrations.includes('payment_processor'))
      features.push('Existing payment processor integration')
    if (integrations.includes('pos_system')) features.push('POS system integration')
    if (integrations.includes('accounting'))
      features.push('Accounting software integration')
    if (integrations.includes('social_media'))
      features.push('Social media feed integration')
  }

  // E-commerce branch
  if (activeBranches.includes('ecommerce')) {
    features.push('E-commerce storefront with product catalog')
    features.push('Shopping cart and secure checkout')
    if (has('qe2_variants', 'yes') || has('qe2_variants', 'some'))
      features.push('Product variant system (sizes, colors, styles)')
    if (has('qe3_inventory', 'yes'))
      features.push('Real-time inventory tracking with out-of-stock automation')
    const payMethods = get('qe4_payment_methods') as string[] | undefined
    if (payMethods?.includes('apple_google_pay')) features.push('Apple Pay / Google Pay')
    if (payMethods?.includes('buy_now_pay_later'))
      features.push('Buy now, pay later (Afterpay / Klarna)')
    const productCount = get('qe1_product_count')
    if (productCount === '500_plus')
      features.push(
        'Advanced inventory management system',
        'Bulk product import/export'
      )
  }

  // App branch
  if (activeBranches.includes('app')) {
    features.push('User authentication system')
    const whoLogsIn = get('qa1_who_logs_in')
    if (whoLogsIn === 'both' || whoLogsIn === 'all_three')
      features.push('Role-based access control (admin, staff, customer roles)')
    const actions = get('qa2_account_actions') as string[] | undefined
    if (actions?.includes('manage_bookings'))
      features.push('Customer booking management portal')
    if (actions?.includes('download_files'))
      features.push('Secure file storage and download system')
    if (actions?.includes('manage_subscription'))
      features.push('Subscription management with recurring billing')
    if (actions?.includes('message_you')) features.push('Internal messaging system')
    features.push('Admin dashboard')
  }

  // Content branch
  if (activeBranches.includes('content')) {
    const contentTypes = get('qc1_content_types') as string[] | undefined
    if (contentTypes?.includes('newsletters'))
      features.push('Newsletter system with subscriber management')
    if (contentTypes?.includes('podcasts'))
      features.push('Podcast player and episode management')
    if (contentTypes?.includes('videos')) features.push('Video content management')
    const authors = get('qc2_multiple_authors')
    if (authors === 'small_team' || authors === 'larger_team')
      features.push(
        'Multi-author CMS with editorial roles and approval workflow'
      )
  }

  return [...new Set(features)]
}
