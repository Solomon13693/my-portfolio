import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'

export const EFCircular = localFont({
  src: [
    { path: '../public/fonts/EFCircular-Book.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/EFCircular-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/EFCircular-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-efcircular',
  display: 'swap',
  preload: true,
})

export const geistMono = localFont({
  src: [
    { path: '../public/fonts/GeistMono-Regular.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/GeistMono-Medium.woff', weight: '500', style: 'normal' },
    { path: '../public/fonts/GeistMono-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

export const Poppins500 = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
})
