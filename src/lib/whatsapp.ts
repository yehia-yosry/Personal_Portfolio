import { whatsappBaseUrl } from '../data/site'

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

/** wa.me link that opens WhatsApp with an editable, pre-filled message */
export const whatsappUrl = (message?: string) =>
  message ? `${whatsappBaseUrl}?text=${encodeURIComponent(message)}` : whatsappBaseUrl

/** Builds the message from the Contact form. Every field the visitor entered is included. */
export const buildContactMessage = (v: ContactFormValues) =>
  [
    'Hello Yehia,',
    '',
    'I’d like to discuss a project with you.',
    '',
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service Needed: ${v.service}`,
    '',
    'Project Details:',
    v.message,
    '',
    'Regards,',
    v.name,
  ].join('\n')
