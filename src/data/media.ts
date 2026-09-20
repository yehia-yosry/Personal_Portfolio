/**
 * Central registry of every image on the site.
 * To swap a picture, replace the file (or change the import) here — components never import images directly.
 */
import profile from '../assets/profile/profile.png'

import landingPages from '../assets/services/landing-pages.webp'
import websites from '../assets/services/websites.webp'
import ecommerce from '../assets/services/ecommerce.webp'
import maintenance from '../assets/services/maintenance.webp'

import saas1 from '../assets/portfolio/saas-1.webp'
import saas2 from '../assets/portfolio/saas-2.webp'
import saas3 from '../assets/portfolio/saas-3.webp'
import saas4 from '../assets/portfolio/saas-4.webp'
import clinic1 from '../assets/portfolio/clinic-1.webp'
import clinic2 from '../assets/portfolio/clinic-2.webp'
import clinic3 from '../assets/portfolio/clinic-3.webp'
import clinic4 from '../assets/portfolio/clinic-4.webp'
import shop1 from '../assets/portfolio/shop-1.webp'
import shop2 from '../assets/portfolio/shop-2.webp'
import shop3 from '../assets/portfolio/shop-3.webp'
import shop4 from '../assets/portfolio/shop-4.webp'
import studio1 from '../assets/portfolio/studio-1.webp'
import studio2 from '../assets/portfolio/studio-2.webp'
import studio3 from '../assets/portfolio/studio-3.webp'
import studio4 from '../assets/portfolio/studio-4.webp'

import typescript from '../assets/tech/typescript.svg'
import react from '../assets/tech/react.svg'
import tailwind from '../assets/tech/tailwindcss.svg'
import node from '../assets/tech/nodedotjs.svg'
import postgres from '../assets/tech/postgresql.svg'
import github from '../assets/tech/github.svg'
import linkedin from '../assets/tech/linkedin.svg'
import whatsapp from '../assets/tech/whatsapp.svg'

export const media = {
  profile: { src: profile, alt: 'Portrait of Yehia Yosry' },
  services: { landingPages, websites, ecommerce, maintenance },
  portfolio: {
    foldline: [saas1, saas2, saas3, saas4],
    aster: [clinic1, clinic2, clinic3, clinic4],
    halden: [shop1, shop2, shop3, shop4],
    verra: [studio1, studio2, studio3, studio4],
  },
  icons: { typescript, react, tailwind, node, postgres, github, linkedin, whatsapp },
} as const
