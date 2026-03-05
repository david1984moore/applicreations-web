/**
 * Test script for scope generation (new Introspect flow)
 * Run: npx tsx scripts/test-scope-generation.ts
 */

import { generateScope } from '../lib/scopeGeneration/generateScope'
import { generateClientSummary } from '../lib/scopeGeneration/clientSummary'
import { generateClientPDF } from '../lib/pdf/clientPDFGenerator'
import type { Intelligence } from '../types/intelligence'

const lowRiskIntelligence: Intelligence = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  businessName: 'Acme Corp',
  websiteType: 'business',
  industry: 'retail',
  primaryGoal: 'contact_quote',
  successVision: 'More customers and sales',
  targetAudience: 'local_consumers',
  differentiator: 'Quality service and local expertise',
  inspirationUrls: [],
  inspirationStyles: [],
  hasExistingWebsite: false,
  hasLogo: 'yes_professional',
  hasBrandColors: 'yes',
  hasPhotos: 'yes_professional',
  contentProvider: 'client',
  updateFrequency: 'occasionally',
  needsUserAccounts: false,
  needsEcommerce: false,
  needsCMS: false,
  needsBooking: false,
  needsBlog: false,
  needsLiveChat: false,
  domainStatus: 'have_domain',
  budget: '2500_4500',
  timeline: 'two_three_months',
}

const highRiskIntelligence: Intelligence = {
  ...lowRiskIntelligence,
  businessName: 'HealthFirst Clinic',
  industry: 'healthcare',
  needsUserAccounts: true,
}

async function main() {
  console.log('=== Introspect Scope Generation Test ===\n')

  // Test 1: Low-risk business site
  console.log('1. Low-risk business site (Acme Corp)...')
  const scopeLow = generateScope(lowRiskIntelligence)
  console.log('   ✅ SCOPE.md length:', scopeLow.length, 'characters')
  console.log('   ✅ Contains Section 15:', scopeLow.includes('## Section 15'))
  console.log('   ✅ Risk Level LOW:', scopeLow.includes('**Risk Level:** LOW'))

  // Test 2: High-risk healthcare site
  console.log('\n2. High-risk healthcare site (HealthFirst)...')
  const scopeHigh = generateScope(highRiskIntelligence)
  console.log('   ✅ SCOPE.md length:', scopeHigh.length, 'characters')
  console.log('   ✅ Risk Level CRITICAL:', scopeHigh.includes('**Risk Level:** CRITICAL'))
  console.log('   ✅ HIPAA:', scopeHigh.includes('HIPAA'))

  // Test 3: Client summary (for PDF)
  console.log('\n3. Client summary generation...')
  const clientSummary = generateClientSummary(lowRiskIntelligence)
  console.log('   ✅ Project:', clientSummary.projectName)
  console.log('   ✅ Client:', clientSummary.clientName)
  console.log('   ✅ Features count:', clientSummary.features.length)

  // Test 4: PDF generation
  console.log('\n4. PDF generation...')
  const pdfBuffer = await generateClientPDF(clientSummary)
  console.log('   ✅ PDF size:', pdfBuffer.length, 'bytes')

  console.log('\n=== All tests passed! ===\n')
}

main().catch((err) => {
  console.error('❌ Test failed:', err)
  process.exit(1)
})
