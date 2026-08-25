'use client'

import { useState, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Input, PhoneInput, TextArea } from '@/components/ui/form'
import Button from '@/components/ui/button'
import { validateContactForm, type ContactFormValues, type ContactFormErrors } from '@/schemas'
import { EASE_OUT } from '@/lib'

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', phone: '', message: '' }

export function ContactForm() {

  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')

  const setField = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStatus('sent')
    setValues(INITIAL_VALUES)
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="flex flex-col items-start gap-3 border border-line bg-muted p-8"
        >
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Message received</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
          <motion.button
            type="button"
            onClick={() => setStatus('idle')}
            whileTap={{ scale: 0.95 }}
            className="mt-2 font-mono text-xs tracking-wider uppercase underline underline-offset-4 hover:text-foreground cursor-pointer"
          >
            Send another message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="w-full max-w-lg"
        >
          <Input
            label="Name"
            name="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            error={errors.name}
            radius='none'
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            error={errors.email}
            radius='none'
          />

          <PhoneInput
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={(value) => setField('phone', value)}
            error={errors.phone}
            radius='none'
          />

          <TextArea
            label="Message"
            name="message"
            placeholder="What are you looking to build?"
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            error={errors.message}
            className='h-24'
            radius='none'
          />

          <Button type="submit" loading={status === 'submitting'} className="w-full font-normal mt-4 rounded-none" endContent={<Send className="size-4" aria-hidden="true" />}>
            Send message
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
