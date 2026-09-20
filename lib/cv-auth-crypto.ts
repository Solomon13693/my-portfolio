export const CV_AUTH_COOKIE_NAME = 'cv_lab_auth'

export async function hashPasscode(passcode: string): Promise<string> {
  const bytes = new TextEncoder().encode(passcode)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
