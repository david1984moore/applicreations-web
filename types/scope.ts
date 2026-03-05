// types/scope.ts - Type definitions for legacy scope document structure
// Note: New Introspect flow uses lib/scopeGeneration and types/intelligence

// ============================================================================
// SECTION 1: EXECUTIVE SUMMARY
// ============================================================================

export interface ExecutiveSummary {
  projectName: string
  websiteType: string
  primaryGoal: string
  targetAudience: string
  keyDifferentiator: string
  summaryText: string // 2-3 sentence overview
}

// ============================================================================
// SECTION 2: PROJECT CLASSIFICATION
// ============================================================================

export interface ProjectClassification {
  websiteType: string
  industry: string
  businessModel: 'service' | 'product' | 'content' | 'membership' | 'hybrid' | 'unknown'
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise'
  recommendedPackage: 'starter' | 'professional' | 'custom'
}

// ============================================================================
// SECTION 3: CLIENT INFORMATION
// ============================================================================

export interface ClientInformation {
  fullName: string
  email: string
  phone?: string
  companyName: string
  industry: string
  referralSource?: string
}

// ============================================================================
// SECTION 4: BUSINESS CONTEXT
// ============================================================================

export interface BusinessContext {
  primaryGoal: string
  successMetrics: string
  targetAudience: string
  valueProposition: string
  existingWebsite?: {
    hasWebsite: boolean
    url?: string
    issues?: string[]
  }
}

// ============================================================================
// SECTION 5: BRAND ASSETS
// ============================================================================

export interface BrandAssets {
  logo: {
    status: 'professional' | 'needs-improvement' | 'needs-creation' | 'not-sure'
    notes?: string
  }
  brandColors: {
    status: 'defined' | 'ideas' | 'needs-help' | 'not-sure'
    notes?: string
  }
  brandGuidelines?: string
}

// ============================================================================
// SECTION 6: CONTENT STRATEGY
// ============================================================================

export interface ContentStrategy {
  contentReadiness: {
    status: 'ready' | 'partial' | 'needs-help' | 'not-sure'
    notes?: string
  }
  photoAssets: {
    status: 'professional' | 'some-photos' | 'needs-photography' | 'stock-photos' | 'not-sure'
    notes?: string
  }
  updateFrequency: string
  contentProvider: 'client' | 'applicreations' | 'collaborative'
}

// ============================================================================
// SECTION 7: TECHNICAL SPECIFICATIONS
// ============================================================================

export interface TechnicalSpecifications {
  techStack: {
    framework: string
    language: string
    styling: string
    database: string
    orm: string
    authentication?: string
    stateManagement?: string
  }
  hosting: {
    platform: string
    deployment: string
  }
  features: {
    userAccounts: boolean
    ecommerce: boolean
    cms: boolean
    api: boolean
  }
  integrations: string[]
  performance: {
    expectedTraffic: string
    caching: string
  }
}

// ============================================================================
// SECTION 8: MEDIA & INTERACTIVE ELEMENTS
// ============================================================================

export interface MediaElements {
  images: {
    requirement: string
    source: string
  }
  video?: {
    required: boolean
    hosting?: string
  }
  animations: string
  interactiveElements: string[]
}

// ============================================================================
// SECTION 9: DESIGN DIRECTION
// ============================================================================

export interface DesignDirection {
  inspirationSites: string[]
  designPreferences: string[]
  stylesToAvoid?: string
  designSystem: {
    componentLibrary: string
    typography: string
    colorApproach: string
    spacing: string
  }
  accessibility: {
    wcagLevel: string
    requirements: string[]
  }
}

// ============================================================================
// SECTION 10: FEATURES BREAKDOWN
// ============================================================================

export interface ScopeFeature {
  id: string
  name: string
  description?: string
  category?: string
  basePrice?: number
}

export interface FeaturesBreakdown {
  coreFeatures: ScopeFeature[]
  selectedAddOns: ScopeFeature[]
  specificRequirements?: string
  featureDetails: {
    [featureId: string]: {
      implementation: string
      complexity: 'simple' | 'moderate' | 'complex'
      dependencies: string[]
    }
  }
}

// ============================================================================
// SECTION 11: POST-LAUNCH SUPPORT PLAN
// ============================================================================

export interface SupportPlan {
  managementNeeds: string
  trainingNeeds: string
  hostingPlan: {
    tier: 'basic' | 'professional' | 'enterprise'
    monthlyPrice: number
    features: string[]
  }
  futureEnhancements?: string[]
}

// ============================================================================
// SECTION 12: PROJECT TIMELINE
// ============================================================================

export interface Timeline {
  desiredLaunchDate: string
  flexibility: string
  estimatedDuration: string
  milestones: {
    name: string
    duration: string
    deliverables: string[]
  }[]
  criticalPath: string[]
}

// ============================================================================
// SECTION 13: INVESTMENT SUMMARY
// ============================================================================

export interface InvestmentSummary {
  basePackage: {
    name: string
    price: number
  }
  selectedFeatures: {
    feature: string
    price: number
  }[]
  subtotal: number
  hosting: {
    tier: string
    monthlyPrice: number
  }
  totalProjectInvestment: number
  firstYearTotal: number
  paymentSchedule: {
    milestone: string
    percentage: number
    amount: number
  }[]
  roi?: {
    estimatedTimeframe: string
    assumptions: string[]
  }
}

// ============================================================================
// SECTION 14: VALIDATION OUTCOMES
// ============================================================================

export interface ValidationOutcomes {
  keyDecisions: {
    decision: string
    rationale: string
    timestamp: string
  }[]
  assumptions: string[]
  clarifications: string[]
  dependencies: string[]
}

// ============================================================================
// SECTION 15: SECURITY (ALREADY IMPLEMENTED)
// ============================================================================

export interface SecurityProfile {
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskRationale: string
  handlesPII: boolean
  handlesPayments: boolean
  requiresAuth: boolean
  hasEcommerce: boolean
  complianceRequirements: string[]
  apiIntegrations: string[]
}

export interface AuthenticationRequirements {
  required: boolean
  requirements: string[]
  mfaRequired: boolean
  sessionManagement: string[]
}

export interface DataProtection {
  encryptionAtRest: string[]
  encryptionInTransit: string[]
  sensitiveDataHandling: string[]
  piiProtection?: string[]
  paymentDataHandling?: string[]
  hipaaCompliance?: string[]
}

export interface InputValidation {
  serverSideValidation: string[]
  sqlInjectionPrevention: string[]
  xssPrevention: string[]
  apiSecurity: string[]
  corsConfiguration: string[]
}

export interface Infrastructure {
  environmentVariables: Record<string, string>
  deploymentSecurity: string[]
  buildSecurity: string[]
}

export interface FrontendSecurity {
  securityHeaders: Record<string, string>
  cspPolicy: string
  clientSideBestPractices: string[]
}

export interface Monitoring {
  loggingRequirements: string[]
  monitoringAlerts: string[]
  incidentResponse: string[]
}

export interface Testing {
  prelaunchChecklist: string[]
  ongoingMaintenance: {
    monthly: string[]
    quarterly: string[]
    annually: string[]
  }
}

export interface ProjectSpecific {
  websiteTypeConsiderations: string[]
  featureSpecificRequirements: string[]
}

export interface ImplementationTimeline {
  priority1: string[]
  priority2: string[]
  priority3: string[]
}

export interface CursorAIGuidance {
  libraries: Record<string, string>
  patterns: string[]
  antiPatterns: string[]
  implementationOrder: string[]
}

export interface SecurityRequirements {
  securityProfile: SecurityProfile
  authentication?: AuthenticationRequirements
  dataProtection: DataProtection
  inputValidation: InputValidation
  infrastructure: Infrastructure
  frontendSecurity: FrontendSecurity
  thirdPartyIntegrations?: Record<string, string[]>
  monitoring: Monitoring
  compliance?: Record<string, string[]>
  testing: Testing
  projectSpecific: ProjectSpecific
  implementationTimeline: ImplementationTimeline
  cursorAIGuidance: CursorAIGuidance
}

// ============================================================================
// COMPLETE SCOPE DOCUMENT
// ============================================================================

export interface ScopeDocument {
  generatedAt: string
  conversationId: string
  version: string

  section1_executiveSummary: ExecutiveSummary
  section2_projectClassification: ProjectClassification
  section3_clientInformation: ClientInformation
  section4_businessContext: BusinessContext
  section5_brandAssets: BrandAssets
  section6_contentStrategy: ContentStrategy
  section7_technicalSpecifications: TechnicalSpecifications
  section8_mediaElements: MediaElements
  section9_designDirection: DesignDirection
  section10_featuresBreakdown: FeaturesBreakdown
  section11_supportPlan: SupportPlan
  section12_timeline: Timeline
  section13_investmentSummary: InvestmentSummary
  section14_validationOutcomes: ValidationOutcomes
  section15_securityRequirements: SecurityRequirements
}

// ============================================================================
// CLIENT SUMMARY (FOR PDF - EXCLUDES SECTION 15)
// ============================================================================

export interface ClientSummary {
  projectName: string
  clientName: string
  summaryDate: string
  overview: {
    websiteType: string
    primaryGoal: string
    targetAudience: string
  }
  keyFeatures: string[]
  investmentSummary: {
    totalInvestment: number
    monthlyHosting: number
    estimatedTimeline: string
  }
  nextSteps: string[]
}
