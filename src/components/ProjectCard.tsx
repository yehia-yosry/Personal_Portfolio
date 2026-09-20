import { useEffect, useRef } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { Carousel } from './Carousel'
import type { PortfolioProject } from '../types'

interface ProjectCardProps {
  project: PortfolioProject
  index: number
  open: boolean
  onToggle: () => void
}

export function ProjectCard({ project, index, open, onToggle }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null)
  const firstRender = useRef(true)
  const panelId = `project-${project.id}`

  // Bring the card into view when it opens
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (open) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [open])

  return (
    <article ref={ref} className="scroll-mt-20 border-t border-line py-10 sm:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Media: cover image when closed, carousel when open */}
        <div className={open ? 'lg:col-span-12' : 'lg:col-span-7'}>
          {open ? (
            <div className="animate-fade-up">
              <Carousel images={project.images} label={`${project.name} screenshots`} />
            </div>
          ) : (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={false}
              aria-controls={panelId}
              aria-label={`Open project: ${project.name}`}
              className="group relative block aspect-[16/10] w-full overflow-hidden border border-line bg-paper-deep text-left"
            >
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-paper px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                {project.images.length} screens
                <ArrowUpRight aria-hidden className="size-3.5" />
              </span>
            </button>
          )}
        </div>

        {/* Text */}
        <div id={panelId} className={open ? 'grid gap-8 lg:col-span-12 lg:grid-cols-12 lg:gap-12' : 'lg:col-span-5 lg:pt-2'}>
          <div className={open ? 'lg:col-span-7' : ''}>
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-mute">
              <span className="tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
              <span aria-hidden className="h-px w-8 bg-line" />
              {project.category}
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">{project.name}</h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75]">{project.description}</p>

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={panelId}
              className="group mt-8 inline-flex min-h-11 items-center gap-2.5 border-b border-ink/30 pb-1 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink"
            >
              {open ? 'Close project' : 'View project'}
              {open ? <Minus aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4 transition-transform duration-300 group-hover:rotate-90" />}
            </button>
          </div>

          {open && (
            <div className="animate-fade-up lg:col-span-5">
              <dl className="border-t border-ink/80 text-sm">
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-mute">Type</dt>
                  <dd className="text-ink">{project.category}</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-mute">Built with</dt>
                  <dd className="text-ink">{project.stack.join(' · ')}</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-mute">Note</dt>
                  <dd>Example project created for this portfolio, not a client engagement.</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
