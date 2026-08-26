import { Code2, MapPin, Clock, Phone, Mail } from 'lucide-react'
import { BioRow, LiveClock } from '@/components/reusable'
import { PROFILE } from '@/data'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'

export function Overview() {
  return (
    <div className="border-b border-line">

      <div className="container grid gap-x-8 gap-y-3 py-6 sm:grid-cols-2 sm:py-10">

        <BioRow icon={<Code2 />} fullWidth>
          {PROFILE.role.label} <span aria-label="at">@</span>{' '}
          <span className="font-medium">{PROFILE.role.company}</span>
        </BioRow>

        <BioRow icon={<MapPin />}>
          <a className="hover:text-foreground" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROFILE.location)}`}>
            {PROFILE.location}
          </a>
        </BioRow>

        <BioRow icon={<Clock />}>
          <LiveClock timeZone={PROFILE.timezone} />
          <span className="text-muted-foreground">{' // WAT'}</span>
        </BioRow>

        <BioRow icon={<Phone />} copyValue={PROFILE.phone} copyLabel="phone number">
          <a className="hover:text-foreground" href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>
            {PROFILE.phone}
          </a>
        </BioRow>

        <BioRow icon={<Mail />} copyValue={PROFILE.email} copyLabel="email">
          <a className="hover:text-foreground" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
        </BioRow>

        <BioRow icon={<FaLinkedin />}>
          <a className="hover:text-foreground" target="_blank" rel="noopener noreferrer" href={PROFILE.linkedin}>
            LinkedIn
          </a>
        </BioRow>

        <BioRow icon={<SiGithub />}>
          <a className="hover:text-foreground" target="_blank" rel="noopener noreferrer" href={PROFILE.github}>
            GitHub
          </a>
        </BioRow>

      </div>
      
    </div>
  )
}

export default Overview
