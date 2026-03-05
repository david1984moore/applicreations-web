// components/pdf/ClientSummaryPDF.tsx
// React PDF component for client-facing proposal (excludes Section 15)

import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { ClientSummaryContent } from '@/lib/scopeGeneration/clientSummary'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
    color: '#333',
  },
  featureItem: {
    marginBottom: 8,
  },
  featureName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  featureBenefit: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#555',
    marginLeft: 4,
  },
  listItem: {
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 10,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
})

interface Props {
  summary: ClientSummaryContent
}

export const ClientSummaryPDF: React.FC<Props> = ({ summary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Website Proposal</Text>
        <Text style={styles.subtitle}>{summary.projectName}</Text>
        <Text style={styles.subtitle}>Prepared for {summary.clientName}</Text>
        <Text style={styles.subtitle}>{summary.summaryDate}</Text>
      </View>

      {/* Section 1: Understanding Your Business */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Understanding Your Business</Text>
        <Text style={styles.text}>{summary.understandingYourBusiness}</Text>
      </View>

      {/* Section 2: Our Recommendation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Our Recommendation</Text>
        <Text style={styles.text}>
          We recommend the {summary.recommendation.packageName} package ({summary.recommendation.packagePrice}).
        </Text>
        <Text style={styles.text}>{summary.recommendation.budgetNote}</Text>
      </View>

      {/* Section 3: Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Features</Text>
        {summary.features.map((feature, i) => (
          <View key={i} style={styles.featureItem}>
            <Text style={styles.featureName}>• {feature.name}</Text>
            <Text style={styles.featureBenefit}>{feature.benefit}</Text>
          </View>
        ))}
      </View>

      {/* Section 4: Design */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Design Direction</Text>
        {summary.design.inspirationStyles.length > 0 && (
          <>
            <Text style={styles.text}>Styles you love:</Text>
            {summary.design.inspirationStyles.map((style, i) => (
              <Text key={i} style={styles.listItem}>• {style}</Text>
            ))}
          </>
        )}
        <Text style={styles.text}>Styles to avoid: {summary.design.stylesToAvoid}</Text>
      </View>

      {/* Section 5: Investment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Investment</Text>
        <Text style={styles.text}>
          {summary.investment.packageName} package: {summary.investment.packagePrice}
        </Text>
        <Text style={styles.text}>
          Monthly hosting: {summary.investment.monthlyHosting}
        </Text>
        <Text style={styles.text}>{summary.investment.paymentTerms}</Text>
      </View>

      {/* Section 6: Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Timeline</Text>
        <Text style={styles.text}>Estimated launch: {summary.timeline}</Text>
      </View>

      {/* Section 7: Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Next Steps</Text>
        {summary.nextSteps.map((step, i) => (
          <Text key={i} style={styles.listItem}>
            {i + 1}. {step}
          </Text>
        ))}
      </View>

      {/* Closing CTA */}
      <View style={styles.section}>
        <Text style={styles.text}>{summary.closingCta}</Text>
      </View>

      <Text style={styles.footer}>
        Applicreations | david1984moore@gmail.com | www.applicreations.com
      </Text>
    </Page>
  </Document>
)
