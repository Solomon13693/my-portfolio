import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { BioRow, LiveClock } from '@/components/reusable'
import { PROFILE } from '@/data'

const SOCIALS = [
  { label: 'GitHub', href: PROFILE.github, Icon: SiGithub },
  { label: 'LinkedIn', href: PROFILE.linkedin, Icon: FaLinkedin },
  { label: 'Instagram', href: PROFILE.instagram, Icon: SiInstagram },
]

export function Details() {
  return (
    <div className="border-t border-line pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16">

      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Direct
      </p>

      <div className="mt-3 h-px w-10 bg-foreground" aria-hidden="true" />

      <div className="mt-8 flex flex-col gap-5">
        
        <BioRow icon={<Mail />} copyValue={PROFILE.email} copyLabel="email">
          <a href={`mailto:${PROFILE.email}`} className="hover:text-foreground">
            {PROFILE.email}
          </a>
        </BioRow>

        <BioRow icon={<Phone />} copyValue={PROFILE.phone} copyLabel="phone number">
          <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="hover:text-foreground">
            {PROFILE.phone}
          </a>
        </BioRow>

        <BioRow icon={<MapPin />}>{PROFILE.location}</BioRow>

        <BioRow icon={<Clock />}>
          <LiveClock timeZone={PROFILE.timezone} /> local time
        </BioRow>
      </div>

      <div className="mt-10 flex items-center gap-3">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-9 items-center justify-center rounded-md border border-line text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
            <Icon className="size-4" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default Details
