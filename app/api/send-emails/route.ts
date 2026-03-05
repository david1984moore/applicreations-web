// app/api/send-emails/route.ts — Sends SCOPE.md to David, client PDF to customer

import { NextResponse } from 'next/server'
import { sendDocuments } from '@/lib/email/sendDocuments'
import type { Intelligence } from '@/types/intelligence'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { scopeMarkdown, intelligence, clientEmail } = body as {
      scopeMarkdown: string
      intelligence: Intelligence
      clientEmail: string
    }

    if (!scopeMarkdown || !intelligence || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: scopeMarkdown, intelligence, clientEmail' },
        { status: 400 }
      )
    }

    const result = await sendDocuments(scopeMarkdown, intelligence, clientEmail)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send emails', details: String(error) },
      { status: 500 }
    )
  }
}
