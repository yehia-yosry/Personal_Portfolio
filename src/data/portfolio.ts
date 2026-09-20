import type { PortfolioProject } from '../types'
import { media } from './media'

/**
 * Example projects created for this portfolio — concept work, not client engagements.
 * Add, remove or edit entries freely; the Portfolio page renders whatever is in this list
 * (each project should keep 3–5 images).
 */
const shots = (name: string, srcs: readonly string[], labels: string[]) =>
  srcs.map((src, i) => ({ src, alt: `${name} — ${labels[i] ?? `screen ${i + 1}`}` }))

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'foldline',
    name: 'Foldline',
    category: 'SaaS product website',
    description:
      'Marketing site and product preview for an invoicing and cash-flow tool aimed at small teams. The design leads with a real-looking dashboard, then explains the workflow in four plain steps.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    images: shots('Foldline', media.portfolio.foldline, [
      'home page with dashboard preview',
      'product features',
      'workflow and integrations',
      'invoice detail screen',
    ]),
  },
  {
    id: 'aster-dental',
    name: 'Aster Dental Clinic',
    category: 'Healthcare',
    description:
      'A calm, reassuring website for a neighbourhood dental clinic: clear treatment overviews, a first-visit guide and an appointment request form that respects patients’ time.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    images: shots('Aster Dental Clinic', media.portfolio.aster, [
      'home page',
      'treatments',
      'first visit guide',
      'appointment booking',
    ]),
  },
  {
    id: 'halden-goods',
    name: 'Halden Goods',
    category: 'E-commerce',
    description:
      'A minimal online store for audio gear and accessories. Product grid, detailed product page and a streamlined bag with an honest order summary.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    images: shots('Halden Goods', media.portfolio.halden, [
      'home page',
      'bestsellers and categories',
      'product page',
      'shopping bag',
    ]),
  },
  {
    id: 'verra-interiors',
    name: 'Verra Interiors',
    category: 'Small business / studio',
    description:
      'An editorial website for an independent interior design studio, led by photography and a restrained serif type system, with a short enquiry form instead of a contact wall.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    images: shots('Verra Interiors', media.portfolio.verra, [
      'home page',
      'selected projects',
      'design approach',
      'enquiry form',
    ]),
  },
]
