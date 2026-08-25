import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'

export const EFCircular = localFont({
  src: [
    { path: '../public/fonts/EFCircular-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/EFCircular-Book.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/EFCircular-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/EFCircular-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/EFCircular-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-efcircular',
})

export const Poppins500 = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-poppins',
})
