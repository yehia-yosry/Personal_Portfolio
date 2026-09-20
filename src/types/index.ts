export interface NavItem {
  label: string
  /** Route or route + hash, e.g. "/portfolio" or "/#about" */
  to: string
  /** Section id on the landing page (used for scroll-spy) */
  sectionId?: string
}

export interface TechItem {
  name: string
  icon: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
  external: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  image: string
  imageAlt: string
  /** Pre-written WhatsApp opener; visitors can edit it before sending */
  whatsappMessage: string
}

export interface ProjectImage {
  src: string
  alt: string
}

export interface PortfolioProject {
  id: string
  name: string
  category: string
  description: string
  stack: string[]
  images: ProjectImage[]
}
