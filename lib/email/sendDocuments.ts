// lib/email/sendDocuments.ts — Sends SCOPE.md to David, client PDF to customer

import { Resend } from 'resend'
import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { ClientSummaryPDF } from '@/components/pdf/ClientSummaryPDF'
import { generateClientSummary } from '@/lib/scopeGeneration/clientSummary'
import type { Intelligence } from '@/types/intelligence'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function sendDocuments(
  scopeMarkdown: string,
  intelligence: Intelligence,
  clientEmail: string
): Promise<{ davidEmailSent: boolean; clientEmailSent: boolean }> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const clientSummary = generateClientSummary(intelligence)
  const pdfElement = React.createElement(ClientSummaryPDF, { summary: clientSummary })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = await renderToBuffer(pdfElement as any)
  const clientPDF = Buffer.from(pdfBuffer)

  // Strip Section 15 from scope for any client-facing use (we send full to David only)
  const scopeForDavid = scopeMarkdown

  const projectName = intelligence.businessName
  const slug = slugify(projectName)

  // Email 1 — To David (full SCOPE.md with Section 15)
  const { data: davidData, error: davidError } = await resend.emails.send({
    from: 'Introspect <noreply@applicreations.com>',
    to: 'david1984moore@gmail.com',
    subject: `New Project SCOPE.md — ${projectName}`,
    text: `New client project scope attached.

Client: ${intelligence.name}
Email: ${intelligence.email}
Project: ${projectName}
Type: ${intelligence.websiteType}

Review the attached SCOPE.md for complete project details and security requirements.`,
    attachments: [
      {
        filename: `${slug}-SCOPE.md`,
        content: Buffer.from(scopeForDavid, 'utf-8'),
      },
    ],
  })

  if (davidError) {
    throw new Error(`Failed to send SCOPE to David: ${davidError.message}`)
  }

  // Resend rate limit: 2 requests/second — wait before second send
  await new Promise((resolve) => setTimeout(resolve, 1100))

  // Email 2 — To client (PDF, Sections 1–14 only)
  const { data: clientData, error: clientError } = await resend.emails.send({
    from: 'Introspect <noreply@applicreations.com>',
    to: clientEmail,
    subject: `Your Custom Website Proposal — ${projectName}`,
    html: `
      <h1>Thank you for sharing your vision!</h1>
      <p>Hi ${intelligence.name},</p>
      <p>Your personalized website proposal is attached. This includes:</p>
      <ul>
        <li>Complete project overview</li>
        <li>Recommended features and functionality</li>
        <li>Investment breakdown</li>
        <li>Timeline and next steps</li>
      </ul>
      <p>Questions? Just reply to this email.</p>
      <p>Best regards,<br>David Moore<br>Applicreations</p>
    `,
    attachments: [
      {
        filename: `${slug}-Proposal.pdf`,
        content: clientPDF,
      },
    ],
  })

  if (clientError) {
    throw new Error(`Failed to send proposal to client: ${clientError.message}`)
  }

  return {
    davidEmailSent: !!davidData?.id,
    clientEmailSent: !!clientData?.id,
  }
}
