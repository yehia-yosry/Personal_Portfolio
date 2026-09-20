import { Mail } from 'lucide-react'
import { socialLinks } from '../data/socials'
import { BrandIcon } from './BrandIcon'

/** Row of icon links (GitHub, LinkedIn, WhatsApp, Email). Icons and URLs come from data/socials.ts. */
export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper"
          >
            {s.icon ? <BrandIcon src={s.icon} className="size-[1.15rem]" /> : <Mail aria-hidden className="size-[1.15rem]" strokeWidth={1.6} />}
          </a>
        </li>
      ))}
    </ul>
  )
}
