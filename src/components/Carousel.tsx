import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProjectImage } from '../types'

/** Lightweight accessible carousel: buttons, dots, arrow keys and touch swipe. */
export function Carousel({ images, label }: { images: ProjectImage[]; label: string }) {
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const count = images.length

  const go = (next: number) => setIndex((next + count) % count)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }
  const onTouchStart = (e: TouchEvent) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  const arrow =
    'grid size-11 place-items-center border border-ink/20 bg-paper/90 text-ink backdrop-blur transition-colors duration-300 hover:bg-ink hover:text-paper'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="select-none"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden border border-line bg-paper-deep"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ul
          className="flex size-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {images.map((img, i) => (
            <li
              key={img.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="size-full shrink-0"
            >
              <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} className="size-full object-cover object-top" />
            </li>
          ))}
        </ul>

        <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          <button type="button" onClick={() => go(index - 1)} className={`${arrow} pointer-events-auto`} aria-label="Previous image">
            <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => go(index + 1)} className={`${arrow} pointer-events-auto`} aria-label="Next image">
            <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className="group grid h-6 w-10 place-items-center"
            >
              <span className={`h-px w-full transition-all duration-300 ${i === index ? 'h-0.5 bg-ink' : 'bg-ink/30 group-hover:bg-ink/60'}`} />
            </button>
          ))}
        </div>
        <p className="text-xs tabular-nums tracking-[0.18em] text-mute">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
