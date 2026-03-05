// lib/questions/pageGroups.ts — Page group definitions per INTROSPECT spec

import type { Answer } from '@/types/questions'
import { getVisibleQuestions } from './conditionalLogic'

export const PAGE_GROUPS = [
  {
    id: 'page_1',
    headline: "First, let's get acquainted.",
    subtext: 'Quick and easy — just the basics.',
    questionIds: ['q1_name', 'q2_email', 'q3_phone', 'q4_business_name'],
  },
  {
    id: 'page_2',
    headline: "Tell us about what you're building.",
    subtext: "Don't overthink it — your gut answers are usually the best ones.",
    questionIds: ['q5_website_type', 'q6_industry'],
  },
  {
    id: 'page_3',
    headline: "What are you actually trying to accomplish?",
    subtext: "This is the most important page. Be honest — there are no wrong answers.",
    questionIds: ['q7_primary_goal', 'q9_target_audience', 'q10_differentiator'],
  },
  {
    id: 'page_4',
    headline: 'Show us your taste.',
    subtext: "This is our favorite part — and one of the most useful things you can give us.",
    questionIds: ['q11_inspiration_urls', 'q12_inspiration_styles', 'q13_styles_to_avoid'],
  },
  {
    id: 'page_5',
    headline: "What are we working with?",
    subtext: "No judgment — we just need to know where you're starting.",
    questionIds: ['q14_has_website', 'q15_existing_url', 'q16_existing_frustrations'],
  },
  {
    id: 'page_6',
    headline: "Let's talk about your look.",
    subtext: "We'll work with what you have — and fill in what you don't.",
    questionIds: ['q17_has_logo', 'q18_has_colors', 'q19_brand_colors', 'q20_has_photos'],
  },
  {
    id: 'page_7',
    headline: "What's going on the site?",
    subtext: "We'll help figure out what's essential vs. nice-to-have.",
    questionIds: ['q21_content_provider', 'q22_update_frequency', 'q23_pages_needed'],
  },
  {
    id: 'page_8',
    headline: 'What should your website actually do?',
    subtext: 'Beyond just looking good — what features do you need?',
    questionIds: ['q24_key_features', 'q25_ecommerce_details', 'q26_integrations'],
  },
  {
    id: 'page_9',
    headline: "Let's talk logistics.",
    subtext: "No surprises — we just want to make sure we're aligned.",
    questionIds: ['q27_domain_status', 'q28_existing_domain', 'q29_timeline', 'q30_budget'],
  },
  {
    id: 'page_10',
    headline: 'Almost there — just a few more.',
    subtext: "These last ones help us do our homework before we get to work.",
    questionIds: ['q31_competitors', 'q32_accessibility', 'q33_anything_else'],
  },
] as const

/**
 * Returns page groups that have at least one visible question.
 * Pages where ALL questions are hidden by showIf are skipped.
 */
export function getVisiblePageGroups(answers: Record<string, Answer>) {
  const visibleIds = new Set(getVisibleQuestions(answers).map((q) => q.id))
  return PAGE_GROUPS.filter((pg) => pg.questionIds.some((id) => visibleIds.has(id)))
}
