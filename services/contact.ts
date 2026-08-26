import { jsx } from 'react/jsx-runtime'
import { Resend } from 'resend'
import ContactEmailTemplate from '@/components/emails/ContactEmailTemplate'
import { PROFILE } from '@/data'
import type { ContactFormValues } from '@/schemas'

export async function sendContactMessage(values: ContactFormValues) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM?.trim()
  const to = process.env.CONTACT_TO?.includes('@') ? process.env.CONTACT_TO.trim() : PROFILE.email

  if (!apiKey || !from) {
    return { ok: false as const, error: 'Unable to send message right now. Please email me directly.' }
  }

  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New message from ${name}`,
    react: jsx(ContactEmailTemplate, { name, email, phone, message }),
    text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, '', message].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return { ok: false as const, error: 'Unable to send message right now. Please email me directly.' }
  }

  return { ok: true as const }
}
