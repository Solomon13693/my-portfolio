import Image from 'next/image'
import { PROFILE } from '@/data'

export function Hero() {
  return (
    <div className="border-b border-line">

      <div className="container flex items-center gap-4 py-6 sm:py-10">

        <Image src="/img/solomon.jpeg" alt={PROFILE.name} width={112} height={112} priority className="size-16 shrink-0 rounded-full object-cover sm:size-28"
        />

        <div>
          <h1 className="text-xl font-medium tracking-tight sm:text-3xl">
            {PROFILE.name}
          </h1>
          <p className="mt-1 font-mono text-xs sm:text-sm text-muted-foreground">
            {PROFILE.tagline}
          </p>
        </div>
        
      </div>
      
    </div>
  )
}

export default Hero
