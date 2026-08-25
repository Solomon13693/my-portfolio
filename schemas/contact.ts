import { isValidPhoneNumber } from 'react-phone-number-input'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Your name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if(!values.phone){
    errors.phone = 'Phone number is required'
  } else if (values.phone && !isValidPhoneNumber(values.phone)) {
    errors.phone = 'Enter a valid phone number'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}
