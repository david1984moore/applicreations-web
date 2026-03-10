// app/api/generate-scope/route.ts — Single Claude API call for SCOPE.md generation
// RECONCILED: Old approach used Intelligence + pure generateScope(); spec requires prompt + Claude

import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 }
    )
  }
  const client = new Anthropic()
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: prompt' },
        { status: 400 }
      )
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type from Claude' },
        { status: 500 }
      )
    }

    const raw = content.text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    if (!raw) {
      return NextResponse.json(
        { error: 'Claude returned empty response', details: 'The model may have been truncated or failed to produce JSON.' },
        { status: 500 }
      )
    }

    let parsed: { scopeMd?: string; clientSummary?: string }
    try {
      parsed = JSON.parse(raw) as { scopeMd?: string; clientSummary?: string }
    } catch (parseError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON from Claude',
          details: parseError instanceof Error ? parseError.message : 'Response may be truncated. Try again.',
        },
        { status: 500 }
      )
    }

    if (!parsed.scopeMd || !parsed.clientSummary) {
      return NextResponse.json(
        { error: 'Claude response missing scopeMd or clientSummary' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      scopeMd: parsed.scopeMd,
      clientSummary: parsed.clientSummary,
    })
  } catch (error: unknown) {
    const err = error as { status?: number; error?: { message?: string }; message?: string }
    console.error('Scope generation error:', error)
    try {
      console.error('Full error (serialized):', JSON.stringify(err, null, 2))
    } catch {
      // ignore JSON serialization failures
    }
    if (err?.error?.message) console.error('Anthropic API error:', err.error.message)
    if (err?.status) console.error('Anthropic status:', err.status)
    return NextResponse.json(
      {
        error: 'Failed to generate scope',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
