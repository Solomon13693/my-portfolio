import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

const geistMonoRegular = await readFile(join(process.cwd(), 'public/fonts/GeistMono-Regular.woff'))

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ededed',
          fontFamily: 'Geist Mono',
          fontWeight: 400,
          fontSize: 22,
        }}
      >
        S
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist Mono', data: geistMonoRegular, weight: 400, style: 'normal' }],
    }
  )
}
