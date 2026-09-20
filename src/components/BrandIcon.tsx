import type { CSSProperties } from 'react'

/** Monochrome SVG icon rendered as a CSS mask, so its colour follows `currentColor`. */
export function BrandIcon({ src, className = 'size-5' }: { src: string; className?: string }) {
  return <span aria-hidden="true" className={`icon-mask ${className}`} style={{ '--icon': `url("${src}")` } as CSSProperties} />
}
