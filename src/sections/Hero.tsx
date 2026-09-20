import { Button } from '../components/Button'
import { Portrait } from '../components/Portrait'
import { site } from '../data/site'

export function Hero() {
  const [first, ...rest] = site.name.split(' ')

  return (
    <section id="home" className="relative scroll-mt-0 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_82%_35%,#fbf9f4,transparent)]" />
      <div className="relative mx-auto grid min-h-svh max-w-[90rem] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:pb-16 lg:pt-28">
        <div className="animate-fade-up lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">{site.role}</p>

          <h1 className="mt-8 text-[clamp(4.5rem,13.5vw,13rem)] leading-[0.88]">
            {first}
            <br />
            <span className="italic">{rest.join(' ')}</span>
          </h1>

          <p className="mt-10 max-w-xl font-display text-[1.7rem] leading-[1.2] text-ink/90 sm:text-[2rem]">{site.motto}</p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Button to="/contact">Work Together</Button>
            <Button to="/portfolio" variant="secondary">
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms] lg:col-span-5">
          <Portrait />
        </div>
      </div>
    </section>
  )
}
