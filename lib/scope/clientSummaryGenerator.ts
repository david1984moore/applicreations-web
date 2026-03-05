// lib/scope/clientSummaryGenerator.ts
// Generates ClientSummary from ScopeDocument (excludes Section 15)

import type { ScopeDocument, ClientSummary } from '@/types/scope'

/**
 * Extract client-facing summary from full scope document.
 * Section 15 (Security) is never included.
 */
export function generateClientSummary(scope: ScopeDocument): ClientSummary {
  const exec = scope.section1_executiveSummary
  const client = scope.section3_clientInformation

  return {
    projectName: exec.projectName,
    clientName: client.fullName,
    summaryDate: new Date(scope.generatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    overview: {
      websiteType: exec.websiteType,
      primaryGoal: scope.section4_businessContext.primaryGoal ?? 'Professional web presence',
      targetAudience: scope.section4_businessContext.targetAudience ?? 'Local business customers',
    },
    keyFeatures: extractKeyFeatures(scope),
    investmentSummary: extractInvestmentSummary(scope),
    nextSteps: [
      'Review this proposal',
      'Schedule a call to discuss details',
      'Sign agreement to begin',
      'Receive working prototype within 48 hours',
    ],
  }
}

function extractKeyFeatures(scope: ScopeDocument): string[] {
  const features = scope.section10_featuresBreakdown
  const allFeatures = [...features.coreFeatures, ...features.selectedAddOns]
  if (allFeatures.length > 0) {
    return allFeatures.map((f) => f.name)
  }
  return [
    'Custom design',
    'Mobile-responsive layout',
    'Contact form',
    'SEO basics',
  ]
}

function extractInvestmentSummary(
  scope: ScopeDocument
): ClientSummary['investmentSummary'] {
  const inv = scope.section13_investmentSummary
  const timeline = scope.section12_timeline
  return {
    totalInvestment: inv.totalProjectInvestment,
    monthlyHosting: inv.hosting.monthlyPrice,
    estimatedTimeline: timeline.estimatedDuration ?? '2-3 weeks',
  }
}
