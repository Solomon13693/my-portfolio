import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { BioRow, LiveClock, SocialLinks } from '@/components'
import { PROFILE } from '@/data'

export function Details() {
  return (
    <div className="border-t border-line pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16">

      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Direct
      </p>

      <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

      <div className="mt-8 flex flex-col gap-5">
        
        <BioRow icon={<Mail />} copyValue={PROFILE.email}>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-foreground">
            {PROFILE.email}
          </a>
        </BioRow>

        <BioRow icon={<Phone />} copyValue={PROFILE.phone}>
          <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="hover:text-foreground">
            {PROFILE.phone}
          </a>
        </BioRow>

        <BioRow icon={<MapPin />}>{PROFILE.location}</BioRow>

        <BioRow icon={<Clock />}>
          <LiveClock timeZone={PROFILE.timezone} /> local time
        </BioRow>
      </div>

      <SocialLinks className="mt-10" />
    </div>
  )
}

export default Details
