'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CV_AUTH_COOKIE_NAME, hashPasscode } from './cv-auth-crypto'

export interface UnlockCvLabState {
  error?: string
}

export async function unlockCvLabAction(
  _prevState: UnlockCvLabState,
  formData: FormData
): Promise<UnlockCvLabState> {
  const submitted = String(formData.get('passcode') ?? '')
  const passcode = process.env.CV_TOOL_PASSCODE

  if (!passcode || !submitted || submitted !== passcode) {
    return { error: 'Incorrect passcode.' }
  }

  const cookieStore = await cookies()
  cookieStore.set(CV_AUTH_COOKIE_NAME, await hashPasscode(passcode), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  redirect('/cv-lab')
}
