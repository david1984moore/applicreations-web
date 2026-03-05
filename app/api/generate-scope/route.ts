// app/api/generate-scope/route.ts — Generates SCOPE.md from Intelligence (no Claude during form; optional enhancement)

import { NextResponse } from 'next/server'
import { generateScope } from '@/lib/scopeGeneration/generateScope'
import type { Intelligence } from '@/types/intelligence'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { intelligence } = body as { intelligence: Intelligence }

    if (!intelligence) {
      return NextResponse.json(
        { error: 'Missing required field: intelligence' },
        { status: 400 }
      )
    }

    const scopeMarkdown = generateScope(intelligence)

    return NextResponse.json({ scopeMarkdown })
  } catch (error) {
    console.error('Scope generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate scope', details: String(error) },
      { status: 500 }
    )
  }
}
