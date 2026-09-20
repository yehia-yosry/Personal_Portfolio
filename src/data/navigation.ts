import type { NavItem } from '../types'

export const navItems: NavItem[] = [
  { label: 'Home', to: '/', sectionId: 'home' },
  { label: 'About', to: '/#about', sectionId: 'about' },
  { label: 'Services', to: '/#services', sectionId: 'services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

/** Section ids on the landing page, in page order */
export const homeSectionIds = ['home', 'about', 'services'] as const
