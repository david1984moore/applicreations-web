// lib/pdf/clientPDFGenerator.ts
// Generates client-facing PDF from ClientSummary (excludes Section 15)

import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { ClientSummaryPDF } from '@/components/pdf/ClientSummaryPDF'
import type { ClientSummaryContent } from '@/lib/scopeGeneration/clientSummary'

/**
 * Generate client-friendly PDF from ClientSummaryContent
 * Uses @react-pdf/renderer for production-quality PDFs
 */
export async function generateClientPDF(
  summary: ClientSummaryContent
): Promise<Buffer> {
  const element = React.createElement(ClientSummaryPDF, { summary })
  // renderToBuffer expects Document root - ClientSummaryPDF returns <Document>...</Document>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(element as any)
  return Buffer.from(buffer)
}
