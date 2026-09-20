import type { Service } from '../types'
import { media } from './media'

const hello = 'Hello Yehia, I’m interested in your'

export const services: Service[] = [
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description:
      'A single, focused page built to do one job: introduce an offer and turn attention into enquiries. Fast to load, clear on every screen size, and structured so the message leads.',
    image: media.services.landingPages,
    imageAlt: 'Monitor showing a landing page design beside a laptop and phone',
    whatsappMessage: `${hello} Landing Pages service. I’d like to discuss my project and requirements.`,
  },
  {
    id: 'websites',
    name: 'Websites',
    description:
      'Multi-page business and personal websites with a clear structure, careful typography and pages that are easy to keep up to date. Built with React and TypeScript, responsive from phone to widescreen.',
    image: media.services.websites,
    imageAlt: 'Desk with a laptop and desktop monitor displaying a website',
    whatsappMessage: `${hello} Website Development service. I’d like to discuss the website I’m planning.`,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description:
      'Online stores with product catalogues, carts and checkout flows built on solid data models. I pay close attention to what protects an order: accurate stock, validation and secure transactions.',
    image: media.services.ecommerce,
    imageAlt: 'Minimal product photograph of white watches on a light grey surface',
    whatsappMessage: `${hello} E-commerce service. I’d like to discuss my online store and requirements.`,
  },
  {
    id: 'maintenance-support',
    name: 'Maintenance & Support',
    description:
      'Ongoing care for an existing website: updates, fixes, performance checks and small improvements, handled by someone who understands the code and takes responsibility for it.',
    image: media.services.maintenance,
    imageAlt: 'Laptop displaying an analytics dashboard with charts',
    whatsappMessage: `${hello} Maintenance & Support service. I’d like to discuss ongoing support for my website.`,
  },
]

/** Options for the Contact form's "Service Needed" field */
export const serviceOptions = [...services.map((s) => s.name), 'Not sure yet'] as const
