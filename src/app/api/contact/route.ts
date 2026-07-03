import { profile } from '@/data/profile'
import { Resend } from 'resend'

export const runtime = 'nodejs'

interface ContactPayload {
  name?: unknown
  email?: unknown
  body?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 })
  }

  const name = normalizeText(payload.name, 100)
  const email = normalizeText(payload.email, 200).toLowerCase()
  const body = normalizeText(payload.body, 4000)

  if (!name || !emailPattern.test(email) || !body) {
    return Response.json({ message: 'Please provide a valid name, email, and message.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return Response.json({ message: 'Email delivery is not configured yet.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email
  const from = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'
  const subject = `Portfolio message from ${name}`
  const escapedName = escapeHtml(name)
  const escapedEmail = escapeHtml(email)
  const escapedBody = escapeHtml(body).replace(/\n/g, '<br />')

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${body}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">New portfolio message</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <div style="margin-top: 24px;">
          <strong>Message:</strong>
          <p>${escapedBody}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend contact email failed', error)
    return Response.json({ message: 'Could not send the message. Please try again.' }, { status: 502 })
  }

  return Response.json({ id: data?.id, message: 'Message sent.' })
}
