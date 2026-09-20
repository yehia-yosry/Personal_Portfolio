import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'outline'

const base =
  'group inline-flex items-center justify-center gap-2.5 font-medium transition-[background-color,color,border-color,transform] duration-300 active:translate-y-px'

const variants: Record<Variant, string> = {
  // Most prominent action on the page
  primary: 'bg-accent px-8 py-4 text-[0.95rem] tracking-wide text-paper hover:bg-accent-strong',
  // Visibly quieter: text link with an underline
  secondary:
    'border-b border-ink/30 pb-1 text-[0.95rem] text-ink hover:border-ink',
  outline: 'border border-ink/25 px-6 py-3 text-sm text-ink hover:border-ink hover:bg-ink hover:text-paper',
}

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
  /** Show the trailing arrow (diagonal arrow for external links) */
  arrow?: boolean
}

type ButtonProps =
  | (CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className'>)
  | (CommonProps & { href: string } & Omit<ComponentProps<'a'>, 'href' | 'className'>)
  | (CommonProps & { to?: undefined; href?: undefined } & Omit<ComponentProps<'button'>, 'className'>)

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', arrow = true, ...rest } = props
  const cls = `${base} ${variants[variant]} ${className}`

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkProps } = rest as ComponentProps<typeof Link>
    return (
      <Link to={to} className={cls} {...linkProps}>
        {children}
        {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ComponentProps<'a'>
    const external = /^https?:/.test(href ?? '')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {children}
        {arrow && (
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </a>
    )
  }
  return (
    <button className={cls} {...(rest as ComponentProps<'button'>)}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  )
}
