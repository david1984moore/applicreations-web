// lib/scopeGeneration/securitySection.ts — Section 15 (Internal Only), risk-based

import type { Intelligence } from '@/types/intelligence'

export interface SecurityClassification {
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  triggers: string[]
}

export function classifyRisk(intelligence: Intelligence): SecurityClassification {
  const triggers: string[] = []

  // Critical: healthcare (with or without booking)
  if (intelligence.industry === 'healthcare') {
    triggers.push('Industry: healthcare — handles sensitive health information requiring HIPAA considerations')
    if (intelligence.needsBooking) {
      triggers.push('Online booking in healthcare — appointment data may include PHI')
    }
    return { riskLevel: 'critical', triggers }
  }

  // High: e-commerce, user accounts, payment processing, or professional services
  if (intelligence.needsEcommerce) {
    triggers.push('E-commerce store selected — payment data and PCI-DSS scope')
  }
  if (intelligence.needsUserAccounts) {
    triggers.push('User accounts requested — authentication and credential storage')
  }
  if (intelligence.additionalFeatures?.includes('payment_processing')) {
    triggers.push('Payment processing feature — cardholder data handling')
  }
  if (intelligence.industry === 'professional_services') {
    triggers.push('Industry: professional services — confidential client data')
  }
  if (
    intelligence.needsEcommerce ||
    intelligence.needsUserAccounts ||
    intelligence.additionalFeatures?.includes('payment_processing') ||
    intelligence.industry === 'professional_services'
  ) {
    return { riskLevel: 'high', triggers }
  }

  // Medium: booking or sign-up goal
  if (intelligence.needsBooking) {
    triggers.push('Online booking — collects scheduling and contact data')
  }
  if (intelligence.primaryGoal === 'sign_up') {
    triggers.push('Primary goal: sign-up — collects user registration data')
  }
  if (intelligence.needsBooking || intelligence.primaryGoal === 'sign_up') {
    return { riskLevel: 'medium', triggers }
  }

  // Low
  triggers.push('Standard brochure/contact site — no sensitive data collection')
  return { riskLevel: 'low', triggers }
}

function getSecurityContent(riskLevel: 'low' | 'medium' | 'high' | 'critical'): string {
  const base = `
- Security headers (CSP, X-Frame-Options, HSTS, etc.)
- Form spam protection (reCAPTCHA v3)
- Honeypot fields on all forms
- Rate limiting on form submissions
`

  const medium = base + `
- GDPR basics: cookie consent, privacy policy link, data retention
- Secure session management
- CSRF protection on all state-changing requests
- Email security (SPF, DKIM, validation)
`

  const high = medium + `
- Authentication (NextAuth.js or equivalent)
- Role-based access control (RBAC)
- Secure password requirements
- 2FA for admin accounts
- PCI-DSS considerations if e-commerce
`

  const critical = high + `
- HIPAA compliance requirements
- PHI encryption at rest and in transit
- Audit logging for all PHI access
- BAA documentation
- Mandatory 2FA for all users with PHI access
`

  switch (riskLevel) {
    case 'critical':
      return critical
    case 'high':
      return high
    case 'medium':
      return medium
    default:
      return base
  }
}

export function generateSecuritySection(intelligence: Intelligence): string {
  const { riskLevel, triggers } = classifyRisk(intelligence)
  const content = getSecurityContent(riskLevel)

  const rationaleText =
    triggers.length > 0
      ? triggers.map((t) => `- ${t}`).join('\n')
      : '- No specific risk factors identified'

  return `## Section 15: Security Requirements (Internal Only — Not for Client)

**Risk Level:** ${riskLevel.toUpperCase()}

**Classification rationale:** The following answers triggered this risk classification:

${rationaleText}

### Implementation Requirements

${content.trim()}
`
}
