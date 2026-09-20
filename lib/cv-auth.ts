import { cookies } from 'next/headers'
import { CV_AUTH_COOKIE_NAME, hashPasscode } from './cv-auth-crypto'

export async function isCvLabAuthed(): Promise<boolean> {
  const passcode = process.env.CV_TOOL_PASSCODE
  if (!passcode) return false

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(CV_AUTH_COOKIE_NAME)?.value
  if (!cookieValue) return false

  const expected = await hashPasscode(passcode)
  return cookieValue === expected
}
