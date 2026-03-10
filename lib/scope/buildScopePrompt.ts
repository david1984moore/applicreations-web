// lib/scope/buildScopePrompt.ts — Claude prompt builder per spec

import type { Answer } from '@/stores/questionnaireStore'

export function buildScopePrompt(
  answers: Record<string, Answer>,
  inferredFeatures: string[],
  securityClassification: 'low' | 'medium' | 'high' | 'critical'
): string {
  const get = (id: string) => {
    const answer = answers[id]
    if (!answer) return 'Not provided'
    if (Array.isArray(answer.value)) {
      const vals = answer.value.join(', ')
      return answer.textValue ? `${vals} (${answer.textValue})` : vals
    }
    return answer.textValue
      ? `${answer.value} (${answer.textValue})`
      : String(answer.value)
  }

  return `---
CRITICAL CONSTRAINT — READ THIS FIRST:
You are generating a specification for a web development agency that 
uses ONE standard tech stack for every project. You must NEVER deviate 
from this stack regardless of what the client answers.

MANDATORY STACK (no exceptions):
- Framework: Next.js 15 with App Router
- Language: TypeScript 5 strict mode  
- Styling: Tailwind CSS v4
- Database: PostgreSQL
- ORM: Prisma
- Auth: NextAuth.js v5 (only when auth is required)
- Deployment: Render
- State: Zustand (only when complex client state is required)
- UI: Radix UI primitives

FORBIDDEN — never mention these under any circumstances:
- WordPress, Webflow, Wix, Squarespace, or any page-builder/CMS platform
- MySQL, MongoDB, SQLite, or any non-PostgreSQL database
- Vercel, Netlify, or any deployment platform other than Render
- PHP, Ruby, or any non-TypeScript stack

If you mention any forbidden technology, the output is invalid.
---

You are generating a complete technical specification document (SCOPE.md) for a web development project.

## OUTPUT FORMAT

Return your response as a JSON object with exactly two keys:
- "scopeMd": the complete internal SCOPE.md markdown document (for the developer)  
- "clientSummary": a professional client-facing summary (for the client PDF, no technical details, no pricing breakdowns, no feature lists)

Return only raw JSON with no markdown formatting, no code fences, no backticks, no preamble. The response must start with { and end with }.

## CLIENT INTAKE DATA

**Contact Information:**
- Name: ${get('q1_name')}
- Email: ${get('q2_email')}
- Phone: ${get('q3_phone')}
- Business: ${get('q4_business_name')}

**Project:**
- Type: ${get('q5_project_type')}
- Industry: ${get('q6_industry')}
- Primary Goal: ${get('q7_primary_goal')}

**Existing Site:**
- Has site: ${get('q8_existing_website')}
- URL: ${get('q8a_current_url')}
- Frustrations: ${get('q8b_frustrations')}

**Brand Assets:**
- Logo: ${get('q9_logo')}
- Colors: ${get('q10_brand_colors')} — ${get('q10a_color_entry')}
- Photography: ${get('q11_photography')}

**Media & Design:**
- Video/Interactive: ${get('q12_media')}
- Inspiration sites: ${get('q13_inspiration')}
- Design style: ${get('q14_design_style')}
- Styles to avoid: ${get('q15_styles_avoid')}

**Technical:**
- Existing integrations: ${get('q16_integrations')}
- Domain: ${get('q20_domain')} — ${get('q20a_domain_entry')}

**Content:**
- Who writes content: ${get('q17_content_writer')}
- Update frequency: ${get('q18_update_frequency')}

**Support & Timeline:**
- Post-launch support: ${get('q19_support')}
- Timeline: ${get('q21_timeline')} — ${get('q21a_specific_date')}

**Budget:**
- Selected range: ${get('q22_budget')}

**Context:**
- Competitors: ${get('q23_competitors')}
- Additional notes: ${get('q24_anything_else')}

${
  answers['qe1_product_count']
    ? `
**E-Commerce:**
- Product count: ${get('qe1_product_count')}
- Variants: ${get('qe2_variants')}
- Inventory tracking: ${get('qe3_inventory')}
- Payment methods: ${get('qe4_payment_methods')}
`
    : ''
}

${
  answers['qa1_who_logs_in']
    ? `
**App / Portal:**
- Who logs in: ${get('qa1_who_logs_in')}
- Customer actions: ${get('qa2_account_actions')}
- Business logic: ${get('qa3_business_logic')}
- Data sensitivity: ${get('qa4_data_sensitivity')}
`
    : ''
}

${
  answers['qc1_content_types']
    ? `
**Content Publishing:**
- Content types: ${get('qc1_content_types')}
- Multiple authors: ${get('qc2_multiple_authors')}
`
    : ''
}

## INFERRED FEATURES (Do not expose to client — internal use only)
${inferredFeatures.join('\n')}

## SECURITY CLASSIFICATION: ${securityClassification.toUpperCase()}

## SCOPE.md REQUIREMENTS

Generate all 15 sections. No placeholder text. No "TBD". Every section must be complete and developer-ready.

Sections:
1. Executive Summary
2. Project Classification (include recommended package with rationale)
3. Client Information
4. Business Context (synthesize target audience from industry + type + goal — do not ask what wasn't asked)
5. Brand Assets & Identity
6. Content Strategy
7. Technical Specifications (include auth, CMS, integrations, compliance, performance)
8. Media & Interactive Elements
9. Design Direction
10. Features & Functionality (based ONLY on inferred features — list each with implementation rationale)
11. Post-Launch Support Plan
12. Project Timeline (realistic milestones with client responsibilities)
13. Investment Summary (package price + any complexity adjustments — no line-item feature pricing)
14. Validation Outcomes
15. Security Classification (internal only — never appears in clientSummary)

## CLIENT SUMMARY REQUIREMENTS

The clientSummary is a warm, professional document the client receives via email. It must:
- Explain the project vision in plain language
- Confirm what was understood about their goals
- Describe what will be built (without technical implementation details)
- State the investment and timeline clearly
- Outline next steps
- Never mention specific features with individual prices
- Never mention security classification
- Never use technical jargon`
}