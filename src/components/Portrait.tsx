import { media } from '../data/media'
import { site } from '../data/site'

/**
 * Profile photo treatment.
 *
 * The photo sits on a warm stone panel and is blended into it with `multiply`, so the studio backdrop
 * takes on the site's palette instead of fighting it.
 * To change the photo: replace `src/assets/profile/profile.png` (or edit `media.profile` in data/media.ts).
 * `object-position` below controls the crop for a different framing.
 */
export function Portrait() {
  return (
    <figure className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      <div className="relative">
      {/* Offset hairline frame */}
      <div aria-hidden className="absolute -bottom-4 -right-4 left-4 top-4 border border-ink/15" />

      <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f2e8]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,#efeae0,transparent_70%)]" />
        <img
          src={media.profile.src}
          alt={media.profile.alt}
          width={896}
          height={1200}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-top mix-blend-multiply"
        />
        {/* Crop marks */}
        <span aria-hidden className="absolute left-3 top-3 size-4 border-l border-t border-ink/40" />
        <span aria-hidden className="absolute right-3 top-3 size-4 border-r border-t border-ink/40" />
      </div>
      </div>

      <figcaption className="mt-8 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-mute">
        <span>{site.location}</span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Freelance
        </span>
      </figcaption>
    </figure>
  )
}
