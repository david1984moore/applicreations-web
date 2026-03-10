// app/api/send-scope/route.ts — Sends SCOPE.md to David, clientSummary to client per spec

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { scopeMd, clientSummary, clientName, clientEmail } = await request.json()

    if (!scopeMd || !clientSummary || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: scopeMd, clientSummary, clientName, clientEmail' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // Send SCOPE.md to David
    const { error: davidError } = await resend.emails.send({
      from: 'Introspect <introspect@applicreations.com>',
      to: 'david1984moore@gmail.com',
      subject: `New Project Scope: ${clientName}`,
      text: scopeMd,
      attachments: [
        {
          filename: `SCOPE_${String(clientName).replace(/\s+/g, '_')}_${Date.now()}.md`,
          content: Buffer.from(scopeMd).toString('base64'),
        },
      ],
    })

    if (davidError) {
      throw new Error(`Failed to send SCOPE to David: ${davidError.message}`)
    }

    // Rate limit: wait before second send
    await new Promise((r) => setTimeout(r, 1100))

    // Send client summary to client
    const { error: clientError } = await resend.emails.send({
      from: 'David Moore <david@applicreations.com>',
      to: clientEmail,
      subject: `Your Project Summary — ${clientName}`,
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${escapeHtml(clientSummary)}</pre>`,
    })

    if (clientError) {
      throw new Error(`Failed to send summary to client: ${clientError.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send scope error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send emails',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
