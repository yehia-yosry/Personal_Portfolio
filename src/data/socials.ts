import type { SocialLink } from '../types'
import { media } from './media'
import { site, whatsappBaseUrl } from './site'

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: site.github, icon: media.icons.github, external: true },
  { label: 'LinkedIn', href: site.linkedin, icon: media.icons.linkedin, external: true },
  { label: 'WhatsApp', href: whatsappBaseUrl, icon: media.icons.whatsapp, external: true },
  { label: 'Email', href: `mailto:${site.email}`, icon: '', external: false },
]
