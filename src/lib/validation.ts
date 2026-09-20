import type { ContactFormValues } from './whatsapp'

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(v: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {}
  const digits = v.phone.replace(/\D/g, '')

  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(v.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!/^[+\d][\d\s\-().]*$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number, including the country code if abroad.'
  if (!v.service) errors.service = 'Please choose a service.'
  if (v.message.trim().length < 10) errors.message = 'Please add a few details about your project (10+ characters).'

  return errors
}
