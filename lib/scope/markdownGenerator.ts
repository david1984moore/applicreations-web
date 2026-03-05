// lib/scope/markdownGenerator.ts - COMPLETE IMPLEMENTATION
// Converts ScopeDocument to markdown format for SCOPE.md (all 15 sections)

import type {
  ScopeDocument,
  ExecutiveSummary,
  ProjectClassification,
  ClientInformation,
  BusinessContext,
  BrandAssets,
  ContentStrategy,
  TechnicalSpecifications,
  MediaElements,
  DesignDirection,
  FeaturesBreakdown,
  SupportPlan,
  Timeline,
  InvestmentSummary,
  ValidationOutcomes,
  SecurityRequirements,
} from '@/types/scope'

export class MarkdownGenerator {
  /**
   * Generate full SCOPE.md markdown from scope document (all 15 sections)
   */
  generateMarkdown(scope: ScopeDocument): string {
    const sections: string[] = [
      this.generateHeader(scope),
      this.generateSection1(scope.section1_executiveSummary),
      this.generateSection2(scope.section2_projectClassification),
      this.generateSection3(scope.section3_clientInformation),
      this.generateSection4(scope.section4_businessContext),
      this.generateSection5(scope.section5_brandAssets),
      this.generateSection6(scope.section6_contentStrategy),
      this.generateSection7(scope.section7_technicalSpecifications),
      this.generateSection8(scope.section8_mediaElements),
      this.generateSection9(scope.section9_designDirection),
      this.generateSection10(scope.section10_featuresBreakdown),
      this.generateSection11(scope.section11_supportPlan),
      this.generateSection12(scope.section12_timeline),
      this.generateSection13(scope.section13_investmentSummary),
      this.generateSection14(scope.section14_validationOutcomes),
      this.generateSection15(scope.section15_securityRequirements),
    ]

    return sections.join('\n\n---\n\n')
  }

  private generateHeader(scope: ScopeDocument): string {
    return `# SCOPE.md — ${scope.section1_executiveSummary.projectName}

**Generated:** ${scope.generatedAt}
**Version:** ${scope.version}
**Conversation ID:** ${scope.conversationId}

---

> **FOR CURSOR AI DEVELOPMENT**  
> This document contains complete technical specifications for building this project.  
> All requirements have been gathered and validated with the client.  
> No additional clarification should be needed to begin development.`
  }

  // ==========================================================================
  // SECTION 1: EXECUTIVE SUMMARY
  // ==========================================================================

  private generateSection1(section: ExecutiveSummary): string {
    return `## Section 1: Executive Summary

**Project Name:** ${section.projectName}  
**Website Type:** ${section.websiteType}  
**Primary Goal:** ${section.primaryGoal}  
**Target Audience:** ${section.targetAudience}

### Overview

${section.summaryText}

**Key Differentiator:** ${section.keyDifferentiator}`
  }

  // ==========================================================================
  // SECTION 2: PROJECT CLASSIFICATION
  // ==========================================================================

  private generateSection2(section: ProjectClassification): string {
    return `## Section 2: Project Classification

**Website Type:** ${section.websiteType}  
**Industry:** ${section.industry}  
**Business Model:** ${section.businessModel}  
**Complexity:** ${section.complexity}  
**Recommended Package:** ${section.recommendedPackage}`
  }

  // ==========================================================================
  // SECTION 3: CLIENT INFORMATION
  // ==========================================================================

  private generateSection3(section: ClientInformation): string {
    return `## Section 3: Client Information

**Full Name:** ${section.fullName}  
**Email:** ${section.email}  
${section.phone ? `**Phone:** ${section.phone}\n` : ''}**Company Name:** ${section.companyName}  
**Industry:** ${section.industry}  
${section.referralSource ? `**Referral Source:** ${section.referralSource}` : ''}`
  }

  // ==========================================================================
  // SECTION 4: BUSINESS CONTEXT
  // ==========================================================================

  private generateSection4(section: BusinessContext): string {
    let md = `## Section 4: Business Context

### Primary Goal

${section.primaryGoal}

### Success Metrics

${section.successMetrics}

### Target Audience

${section.targetAudience}

### Value Proposition

${section.valueProposition}

### Current Website Status

`

    if (section.existingWebsite?.hasWebsite) {
      md += `**Has Existing Website:** Yes\n`
      if (section.existingWebsite.url) {
        md += `**Current URL:** ${section.existingWebsite.url}\n`
      }
      if (section.existingWebsite.issues && section.existingWebsite.issues.length > 0) {
        md += `\n**Current Issues:**\n\n`
        section.existingWebsite.issues.forEach(issue => {
          md += `- ${issue}\n`
        })
      }
    } else {
      md += `**Has Existing Website:** No (New project)`
    }

    return md
  }

  // ==========================================================================
  // SECTION 5: BRAND ASSETS
  // ==========================================================================

  private generateSection5(section: BrandAssets): string {
    return `## Section 5: Brand Assets

### Logo

**Status:** ${section.logo.status}  
${section.logo.notes ? `**Notes:** ${section.logo.notes}\n` : ''}

### Brand Colors

**Status:** ${section.brandColors.status}  
${section.brandColors.notes ? `**Notes:** ${section.brandColors.notes}\n` : ''}

${section.brandGuidelines ? `### Brand Guidelines\n\n${section.brandGuidelines}` : ''}`
  }

  // ==========================================================================
  // SECTION 6: CONTENT STRATEGY
  // ==========================================================================

  private generateSection6(section: ContentStrategy): string {
    return `## Section 6: Content Strategy

### Content Readiness

**Status:** ${section.contentReadiness.status}  
${section.contentReadiness.notes ? `**Notes:** ${section.contentReadiness.notes}\n` : ''}

### Photo Assets

**Status:** ${section.photoAssets.status}  
${section.photoAssets.notes ? `**Notes:** ${section.photoAssets.notes}\n` : ''}

### Update Frequency

${section.updateFrequency}

### Content Provider

**Primary Content Provider:** ${section.contentProvider}`
  }

  // ==========================================================================
  // SECTION 7: TECHNICAL SPECIFICATIONS
  // ==========================================================================

  private generateSection7(section: TechnicalSpecifications): string {
    let md = `## Section 7: Technical Specifications

### Tech Stack

**Framework:** ${section.techStack.framework}  
**Language:** ${section.techStack.language}  
**Styling:** ${section.techStack.styling}  
**Database:** ${section.techStack.database}  
**ORM:** ${section.techStack.orm}  
`

    if (section.techStack.authentication) {
      md += `**Authentication:** ${section.techStack.authentication}\n`
    }
    if (section.techStack.stateManagement) {
      md += `**State Management:** ${section.techStack.stateManagement}\n`
    }

    md += `\n### Hosting & Deployment

**Platform:** ${section.hosting.platform}  
**Deployment:** ${section.hosting.deployment}

### Core Features

**User Accounts:** ${section.features.userAccounts ? 'Yes' : 'No'}  
**E-commerce:** ${section.features.ecommerce ? 'Yes' : 'No'}  
**CMS:** ${section.features.cms ? 'Yes' : 'No'}  
**API:** ${section.features.api ? 'Yes' : 'No'}

### Integrations

`

    if (section.integrations.length > 0) {
      section.integrations.forEach(integration => {
        md += `- ${integration}\n`
      })
    } else {
      md += 'No third-party integrations required\n'
    }

    md += `\n### Performance Requirements

**Expected Traffic:** ${section.performance.expectedTraffic}  
**Caching Strategy:** ${section.performance.caching}`

    return md
  }

  // ==========================================================================
  // SECTION 8: MEDIA & INTERACTIVE ELEMENTS
  // ==========================================================================

  private generateSection8(section: MediaElements): string {
    let md = `## Section 8: Media & Interactive Elements

### Images

**Requirement:** ${section.images.requirement}  
**Source:** ${section.images.source}

`

    if (section.video?.required) {
      md += `### Video\n\n**Required:** Yes\n`
      if (section.video.hosting) {
        md += `**Hosting:** ${section.video.hosting}\n`
      }
      md += '\n'
    }

    md += `### Animations

${section.animations}

### Interactive Elements

`

    section.interactiveElements.forEach(element => {
      md += `- ${element}\n`
    })

    return md
  }

  // ==========================================================================
  // SECTION 9: DESIGN DIRECTION
  // ==========================================================================

  private generateSection9(section: DesignDirection): string {
    let md = `## Section 9: Design Direction

### Inspiration Websites

`

    if (section.inspirationSites.length > 0) {
      section.inspirationSites.forEach(site => {
        md += `- ${site}\n`
      })
    } else {
      md += 'No specific inspiration sites provided\n'
    }

    md += `\n### Design Preferences

`

    section.designPreferences.forEach(pref => {
      md += `- ${pref}\n`
    })

    if (section.stylesToAvoid) {
      md += `\n### Styles to Avoid

${section.stylesToAvoid}\n`
    }

    md += `\n### Design System

**Component Library:** ${section.designSystem.componentLibrary}  
**Typography:** ${section.designSystem.typography}  
**Color Approach:** ${section.designSystem.colorApproach}  
**Spacing:** ${section.designSystem.spacing}

### Accessibility

**WCAG Level:** ${section.accessibility.wcagLevel}

**Requirements:**

`

    section.accessibility.requirements.forEach(req => {
      md += `- ${req}\n`
    })

    return md
  }

  // ==========================================================================
  // SECTION 10: FEATURES BREAKDOWN
  // ==========================================================================

  private generateSection10(section: FeaturesBreakdown): string {
    let md = `## Section 10: Features & Functionality Breakdown

### Core Features (Included in Package)

`

    if (section.coreFeatures.length > 0) {
      section.coreFeatures.forEach(feature => {
        md += `**${feature.name}**\n`
        md += `- Category: ${feature.category ?? 'General'}\n`
        md += `- Description: ${feature.description ?? '—'}\n`

        if (section.featureDetails[feature.id]) {
          const detail = section.featureDetails[feature.id]
          md += `- Implementation: ${detail.implementation}\n`
          md += `- Complexity: ${detail.complexity}\n`
          if (detail.dependencies.length > 0) {
            md += `- Dependencies: ${detail.dependencies.join(', ')}\n`
          }
        }
        md += '\n'
      })
    } else {
      md += 'Standard website features included\n\n'
    }

    md += `### Selected Add-On Features

`

    if (section.selectedAddOns.length > 0) {
      section.selectedAddOns.forEach(feature => {
        md += `**${feature.name}** (+$${feature.basePrice})\n`
        md += `- Category: ${feature.category ?? 'General'}\n`
        md += `- Description: ${feature.description ?? '—'}\n`

        if (section.featureDetails[feature.id]) {
          const detail = section.featureDetails[feature.id]
          md += `- Implementation: ${detail.implementation}\n`
          md += `- Complexity: ${detail.complexity}\n`
          if (detail.dependencies.length > 0) {
            md += `- Dependencies: ${detail.dependencies.join(', ')}\n`
          }
        }
        md += '\n'
      })
    } else {
      md += 'No additional features selected\n\n'
    }

    if (section.specificRequirements) {
      md += `### Specific Requirements

${section.specificRequirements}`
    }

    return md
  }

  // ==========================================================================
  // SECTION 11: POST-LAUNCH SUPPORT PLAN
  // ==========================================================================

  private generateSection11(section: SupportPlan): string {
    let md = `## Section 11: Post-Launch Support Plan

### Management Needs

${section.managementNeeds}

### Training Needs

${section.trainingNeeds}

### Hosting Plan

**Tier:** ${section.hostingPlan.tier}  
**Monthly Price:** $${section.hostingPlan.monthlyPrice}

**Included Features:**

`

    section.hostingPlan.features.forEach(feature => {
      md += `- ${feature}\n`
    })

    if (section.futureEnhancements && section.futureEnhancements.length > 0) {
      md += `\n### Future Enhancements

`
      section.futureEnhancements.forEach(enhancement => {
        md += `- ${enhancement}\n`
      })
    }

    return md
  }

  // ==========================================================================
  // SECTION 12: PROJECT TIMELINE
  // ==========================================================================

  private generateSection12(section: Timeline): string {
    let md = `## Section 12: Project Timeline

### Desired Launch Date

${section.desiredLaunchDate}

### Timeline Flexibility

${section.flexibility}

### Estimated Duration

${section.estimatedDuration}

### Project Milestones

`

    section.milestones.forEach(milestone => {
      md += `**${milestone.name}** (${milestone.duration})\n\n`
      md += 'Deliverables:\n\n'
      milestone.deliverables.forEach(deliverable => {
        md += `- ${deliverable}\n`
      })
      md += '\n'
    })

    md += `### Critical Path Items

`

    section.criticalPath.forEach(item => {
      md += `- ${item}\n`
    })

    return md
  }

  // ==========================================================================
  // SECTION 13: INVESTMENT SUMMARY
  // ==========================================================================

  private generateSection13(section: InvestmentSummary): string {
    let md = `## Section 13: Investment Summary

### Base Package

**${section.basePackage.name}:** $${section.basePackage.price.toLocaleString()}

### Selected Features

`

    if (section.selectedFeatures.length > 0) {
      section.selectedFeatures.forEach(feature => {
        md += `- ${feature.feature}: $${feature.price.toLocaleString()}\n`
      })
      md += `\n**Subtotal:** $${section.subtotal.toLocaleString()}\n`
    } else {
      md += 'No additional features selected\n\n'
      md += `**Subtotal:** $${section.subtotal.toLocaleString()}\n`
    }

    md += `\n### Hosting

**Tier:** ${section.hosting.tier}  
**Monthly Price:** $${section.hosting.monthlyPrice}  
**First Year Hosting:** $${(section.hosting.monthlyPrice * 12).toLocaleString()}

### Total Investment

**Project Total:** $${section.totalProjectInvestment.toLocaleString()}  
**First Year Total (incl. hosting):** $${section.firstYearTotal.toLocaleString()}

### Payment Schedule

`

    section.paymentSchedule.forEach(payment => {
      md += `**${payment.milestone}**  \n`
      md += `${payment.percentage}% — $${payment.amount.toLocaleString()}\n\n`
    })

    if (section.roi) {
      md += `### ROI Projection

**Estimated Timeframe:** ${section.roi.estimatedTimeframe}

**Assumptions:**

`
      section.roi.assumptions.forEach(assumption => {
        md += `- ${assumption}\n`
      })
    }

    return md
  }

  // ==========================================================================
  // SECTION 14: VALIDATION OUTCOMES
  // ==========================================================================

  private generateSection14(section: ValidationOutcomes): string {
    let md = `## Section 14: Validation Outcomes

### Key Decisions

`

    section.keyDecisions.forEach(decision => {
      md += `**Decision:** ${decision.decision}\n`
      md += `**Rationale:** ${decision.rationale}\n`
      md += `**Timestamp:** ${new Date(decision.timestamp).toLocaleString()}\n\n`
    })

    md += `### Assumptions

`

    section.assumptions.forEach(assumption => {
      md += `- ${assumption}\n`
    })

    md += `\n### Clarifications

`

    section.clarifications.forEach(clarification => {
      md += `- ${clarification}\n`
    })

    md += `\n### Dependencies

`

    section.dependencies.forEach(dependency => {
      md += `- ${dependency}\n`
    })

    return md
  }

  // ==========================================================================
  // SECTION 15: SECURITY (ALREADY IMPLEMENTED - KEEP AS IS)
  // ==========================================================================

  private generateSection15(section: SecurityRequirements): string {
    let md = '## Section 15: Security Implementation Requirements\n\n'
    md += '**⚠️ INTERNAL ONLY - DO NOT SHARE WITH CLIENT**\n\n'

    // 15.1 Security Overview
    md += '### 15.1 Security Overview\n\n'
    md += '**Project Security Profile:**\n\n'
    md += `- **Risk Level:** ${section.securityProfile.riskLevel.toUpperCase()}\n`
    md += `- **Handles PII:** ${section.securityProfile.handlesPII ? 'Yes' : 'No'}\n`
    md += `- **Handles Payments:** ${section.securityProfile.handlesPayments ? 'Yes' : 'No'}\n`
    md += `- **Authentication Required:** ${section.securityProfile.requiresAuth ? 'Yes' : 'No'}\n`
    md += `- **E-commerce:** ${section.securityProfile.hasEcommerce ? 'Yes' : 'No'}\n`
    md += `- **Compliance:** ${section.securityProfile.complianceRequirements.join(', ')}\n`
    md += `- **Integrations:** ${section.securityProfile.apiIntegrations.join(', ') || 'None'}\n\n`
    md += `**Rationale:** ${section.securityProfile.riskRationale}\n\n`
    md += '---\n\n'

    // 15.2 Authentication (if applicable)
    if (section.authentication) {
      md += '### 15.2 Authentication & Authorization\n\n'
      md += '**Authentication Requirements:**\n\n'
      section.authentication.requirements.forEach((req) => {
        md += `- [ ] ${req}\n`
      })
      md += `\n**2FA/MFA Required:** ${section.authentication.mfaRequired ? 'Yes' : 'No'}\n\n`
      md += '**Session Management:**\n\n'
      section.authentication.sessionManagement.forEach((req) => {
        md += `- [ ] ${req}\n`
      })
      md += '\n---\n\n'
    }

    // 15.3 Data Protection
    md += '### 15.3 Data Protection\n\n'
    md += '**Encryption at Rest:**\n\n'
    section.dataProtection.encryptionAtRest.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**Encryption in Transit:**\n\n'
    section.dataProtection.encryptionInTransit.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**Sensitive Data Handling:**\n\n'
    section.dataProtection.sensitiveDataHandling.forEach((req) => {
      md += `- [ ] ${req}\n`
    })

    if (section.dataProtection.piiProtection) {
      md += '\n**PII Protection:**\n\n'
      section.dataProtection.piiProtection.forEach((req) => {
        md += `- [ ] ${req}\n`
      })
    }

    if (section.dataProtection.paymentDataHandling) {
      md += '\n**Payment Data Handling:**\n\n'
      section.dataProtection.paymentDataHandling.forEach((req) => {
        md += `- [ ] ${req}\n`
      })
    }

    if (section.dataProtection.hipaaCompliance) {
      md += '\n**HIPAA Compliance:**\n\n'
      section.dataProtection.hipaaCompliance.forEach((req) => {
        md += `- [ ] ${req}\n`
      })
    }

    md += '\n---\n\n'

    // 15.4 Input Validation & Sanitization
    md += '### 15.4 Input Validation & Sanitization\n\n'
    md += '**Server-Side Validation:**\n\n'
    section.inputValidation.serverSideValidation.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**SQL Injection Prevention:**\n\n'
    section.inputValidation.sqlInjectionPrevention.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**XSS Prevention:**\n\n'
    section.inputValidation.xssPrevention.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**API Security:**\n\n'
    section.inputValidation.apiSecurity.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**CORS Configuration:**\n\n'
    section.inputValidation.corsConfiguration.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n---\n\n'

    // 15.5 Infrastructure & Deployment Security
    md += '### 15.5 Infrastructure & Deployment Security (Vercel)\n\n'
    md += '**Environment Variables:**\n\n'
    Object.entries(section.infrastructure.environmentVariables).forEach(
      ([key, desc]) => {
        md += `- **${key}:** ${desc}\n`
      }
    )
    md += '\n**Deployment Security:**\n\n'
    section.infrastructure.deploymentSecurity.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**Build Security:**\n\n'
    section.infrastructure.buildSecurity.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n---\n\n'

    // 15.6 Frontend Security
    md += '### 15.6 Frontend Security\n\n'
    md += '**Security Headers:**\n\n'
    md += '```typescript\n// next.config.js\nconst securityHeaders = [\n'
    Object.entries(section.frontendSecurity.securityHeaders).forEach(
      ([key, value]) => {
        md += `  { key: '${key}', value: '${value}' },\n`
      }
    )
    md += ']\n```\n\n'
    md += '**Content Security Policy:**\n\n'
    md += '```\n' + section.frontendSecurity.cspPolicy + '\n```\n\n'
    md += '**Client-Side Best Practices:**\n\n'
    section.frontendSecurity.clientSideBestPractices.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n---\n\n'

    // 15.7 Third-Party Integrations (if applicable)
    if (section.thirdPartyIntegrations) {
      md += '### 15.7 Third-Party Integration Security\n\n'
      Object.entries(section.thirdPartyIntegrations).forEach(
        ([integration, reqs]) => {
          md += `**${integration}:**\n\n`
          reqs.forEach((req) => {
            md += `- [ ] ${req}\n`
          })
          md += '\n'
        }
      )
      md += '---\n\n'
    }

    // 15.8 Monitoring & Incident Response
    md += '### 15.8 Monitoring & Incident Response\n\n'
    md += '**Logging Requirements:**\n\n'
    section.monitoring.loggingRequirements.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**Monitoring & Alerts:**\n\n'
    section.monitoring.monitoringAlerts.forEach((req) => {
      md += `- [ ] ${req}\n`
    })
    md += '\n**Incident Response:**\n\n'
    section.monitoring.incidentResponse.forEach((step) => {
      md += `- ${step}\n`
    })
    md += '\n---\n\n'

    // 15.9 Compliance (if applicable)
    if (section.compliance) {
      md += '### 15.9 Compliance Requirements\n\n'
      Object.entries(section.compliance).forEach(([requirement, reqs]) => {
        md += `**${requirement}:**\n\n`
        reqs.forEach((req) => {
          md += `- [ ] ${req}\n`
        })
        md += '\n'
      })
      md += '---\n\n'
    }

    // 15.10 Testing & Validation
    md += '### 15.10 Testing & Validation\n\n'
    md += '**Pre-Launch Security Checklist:**\n\n'
    section.testing.prelaunchChecklist.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n**Ongoing Security Maintenance:**\n\n'
    md += '**Monthly:**\n\n'
    section.testing.ongoingMaintenance.monthly.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n**Quarterly:**\n\n'
    section.testing.ongoingMaintenance.quarterly.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n**Annually:**\n\n'
    section.testing.ongoingMaintenance.annually.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n---\n\n'

    // 15.11 Project-Specific Security Considerations
    md += '### 15.11 Project-Specific Security Considerations\n\n'
    md += '**Website Type Considerations:**\n\n'
    section.projectSpecific.websiteTypeConsiderations.forEach((req) => {
      md += `- ${req}\n`
    })
    md += '\n**Feature-Specific Requirements:**\n\n'
    if (section.projectSpecific.featureSpecificRequirements.length > 0) {
      section.projectSpecific.featureSpecificRequirements.forEach((req) => {
        md += `- ${req}\n`
      })
    } else {
      md += 'No feature-specific security requirements identified.\n'
    }
    md += '\n---\n\n'

    // 15.12 Implementation Timeline
    md += '### 15.12 Implementation Timeline\n\n'
    md += '**Priority 1 - Critical (Implement First):**\n\n'
    section.implementationTimeline.priority1.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n**Priority 2 - Important (Before Launch):**\n\n'
    section.implementationTimeline.priority2.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n**Priority 3 - Ongoing (Post-Launch):**\n\n'
    section.implementationTimeline.priority3.forEach((item) => {
      md += `- [ ] ${item}\n`
    })
    md += '\n---\n\n'

    // 15.13 Cursor AI Implementation Guidance
    md += '### 15.13 Implementation Guidance for Cursor AI\n\n'
    md += '**Recommended Libraries:**\n\n'
    Object.entries(section.cursorAIGuidance.libraries).forEach(
      ([purpose, library]) => {
        md += `- **${purpose}:** ${library}\n`
      }
    )
    md += '\n**Required Patterns:**\n\n'
    section.cursorAIGuidance.patterns.forEach((pattern) => {
      md += `- ${pattern}\n`
    })
    md += '\n**Critical Anti-Patterns (NEVER DO):**\n\n'
    section.cursorAIGuidance.antiPatterns.forEach((antiPattern) => {
      md += `- ❌ ${antiPattern}\n`
    })
    md += '\n**Implementation Order:**\n\n'
    section.cursorAIGuidance.implementationOrder.forEach((step) => {
      md += `${step}\n`
    })
    md += '\n'

    return md
  }
}

export const markdownGenerator = new MarkdownGenerator()
