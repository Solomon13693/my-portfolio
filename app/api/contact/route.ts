import { NextRequest, NextResponse } from 'next/server'
import { sendContactMessage } from '@/services'
import { validateContactForm, type ContactFormValues } from '@/schemas'

function readField(body: Record<string, unknown>, key: keyof ContactFormValues) {
  const value = body[key]
  return typeof value === 'string' ? value : ''
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const values: ContactFormValues = {
    name: readField(payload, 'name'),
    email: readField(payload, 'email'),
    phone: readField(payload, 'phone'),
    message: readField(payload, 'message'),
  }

  const errors = validateContactForm(values)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Please check the form and try again', errors }, { status: 400 })
  }

  const result = await sendContactMessage(values)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
