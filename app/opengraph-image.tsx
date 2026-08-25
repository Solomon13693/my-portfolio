import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { PROFILE } from '@/data'
import { SEO_TITLE } from '@/constants'

export const alt = SEO_TITLE
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const [efCircularBlack, efCircularMedium, geistMonoBold, geistMonoMedium] = await Promise.all([
  readFile(join(process.cwd(), 'public/fonts/EFCircular-Black.otf')),
  readFile(join(process.cwd(), 'public/fonts/EFCircular-Medium.otf')),
  readFile(join(process.cwd(), 'public/fonts/GeistMono-Bold.woff')),
  readFile(join(process.cwd(), 'public/fonts/GeistMono-Medium.woff')),
])

const [firstName, ...lastNameParts] = PROFILE.name.split(' ')
const lastName = lastNameParts.join(' ')

const captionStyle = {
  display: 'flex',
  fontFamily: 'Geist Mono',
  fontWeight: 500,
  fontSize: 17,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#71717a',
}

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          padding: '48px',
          background: '#0a0a0a',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-90px',
            left: '-50px',
            display: 'flex',
            fontFamily: 'Geist Mono',
            fontWeight: 700,
            fontSize: 340,
            color: 'rgba(237,237,237,0.05)',
            letterSpacing: '-0.04em',
          }}
        >
          {'</>'}
        </div>

        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: '#f4f4f5',
            border: '1px solid #e4e4e7',
            borderRadius: '20px',
            padding: '56px 64px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={captionStyle}>Software Developer</div>
            <div style={captionStyle}>{PROFILE.location}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'EF Circular',
                fontWeight: 900,
                fontSize: 108,
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#171717',
              }}
            >
              <span style={{ display: 'flex' }}>{firstName}</span>
              <span style={{ display: 'flex' }}>{lastName}</span>
            </div>
          </div>

          <div style={{ display: 'flex', width: '100%', height: 1, background: '#e4e4e7', marginBottom: 24 }} />

          <div style={captionStyle}>React Native · React · TypeScript · JavaScript · Next.js</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'EF Circular', data: efCircularBlack, weight: 900, style: 'normal' },
        { name: 'EF Circular', data: efCircularMedium, weight: 500, style: 'normal' },
        { name: 'Geist Mono', data: geistMonoBold, weight: 700, style: 'normal' },
        { name: 'Geist Mono', data: geistMonoMedium, weight: 500, style: 'normal' },
      ],
    }
  )
}
