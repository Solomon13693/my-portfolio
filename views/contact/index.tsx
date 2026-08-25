import { Reveal } from '@/components/motion'
import { Intro, ContactForm, Details } from './sections'

export function ContactView() {
  return (
    <div className="w-full">

      <Intro />

      <div className="border-b border-line">
        <div className="container grid gap-12 py-10 sm:py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <Reveal className="order-2 md:order-1">
            <ContactForm />
          </Reveal>
          <Reveal className="order-1 md:order-2" delay={0.1}>
            <Details />
          </Reveal>
        </div>
      </div>
      
    </div>
  )
}

export default ContactView
