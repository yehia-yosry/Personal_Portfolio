import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionHeader'
import { services } from '../data/services'
import { whatsappUrl } from '../lib/whatsapp'
import type { Service } from '../types'

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const flipped = index % 2 === 1
  return (
    <article className="grid items-center gap-8 border-t border-line py-14 first:border-t-0 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
      <Reveal className={`lg:col-span-6 ${flipped ? 'lg:order-2' : ''}`}>
        <div className="relative">
          <div
            aria-hidden
            className={`absolute -bottom-3 hidden size-full border border-ink/15 sm:block ${flipped ? '-left-3' : '-right-3'}`}
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              className="size-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className={`lg:col-span-5 ${flipped ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}>
        <p className="font-display text-xl italic text-accent">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{service.name}</h3>
        <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.75]">{service.description}</p>
        <div className="mt-9">
          <Button href={whatsappUrl(service.whatsappMessage)} variant="outline" aria-label={`Discuss ${service.name} on WhatsApp`}>
            Discuss on WhatsApp
          </Button>
        </div>
      </Reveal>
    </article>
  )
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 border-t border-line bg-card">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel index="02">Services</SectionLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem]">Four ways to work together.</h2>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75]">
                Every project starts with a short conversation on WhatsApp — what you need, who it’s for, and what a good result looks like.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          {services.map((s, i) => (
            <ServiceRow key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
