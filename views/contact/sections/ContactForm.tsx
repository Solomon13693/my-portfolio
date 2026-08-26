'use client'

import { useState, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { ErrorMessage, Input, PhoneInput, TextArea } from '@/components/ui/form'
import Button from '@/components/ui/button'
import { validateContactForm, type ContactFormValues, type ContactFormErrors } from '@/schemas'
import { EASE_OUT } from '@/lib'

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', phone: '', message: '' }

export function ContactForm() {

  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [formError, setFormError] = useState<string>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')

  const setField = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setFormError(undefined)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setFormError(undefined)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const payload = (await res.json().catch(() => null)) as { error?: string; errors?: ContactFormErrors } | null

      if (!res.ok) {
        if (payload?.errors) setErrors(payload.errors)
        setFormError(payload?.error ?? 'Unable to send message right now. Please email me directly.')
        setStatus('idle')
        return
      }

      setStatus('sent')
      setValues(INITIAL_VALUES)
    } catch {
      setFormError('Unable to send message right now. Please email me directly.')
      setStatus('idle')
    }
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
          className="flex flex-col items-start gap-3 border border-line bg-muted p-8">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Message received</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
          <motion.button
            type="button"
            onClick={() => setStatus('idle')}
            whileTap={{ scale: 0.95 }}
            className="mt-2 font-mono text-xs tracking-wider uppercase underline underline-offset-4 hover:text-foreground cursor-pointer">
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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
            radius='none'
          />

          <PhoneInput
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={(value) => setField('phone', value)}
            error={errors.phone}
            disabled={status === 'submitting'}
            radius='none'
          />

          <TextArea
            label="Message"
            name="message"
            placeholder="What are you looking to build?"
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            error={errors.message}
            disabled={status === 'submitting'}
            className='h-24'
            radius='none'
          />

          <div className="mt-4">
            <Button type="submit" loading={status === 'submitting'} className="w-full font-normal rounded-none" endContent={<Send className="size-4" aria-hidden="true" />}>
              Send message
            </Button>
            <div role="alert" aria-live="polite">
              <ErrorMessage error={formError} />
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
