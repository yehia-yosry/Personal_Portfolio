import type { ReactNode } from 'react'

/** Numbered eyebrow + heading used at the top of each landing-page section */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-mute">
      <span className="tabular-nums text-accent">{index}</span>
      <span aria-hidden className="h-px w-10 bg-line" />
      {children}
    </p>
  )
}
