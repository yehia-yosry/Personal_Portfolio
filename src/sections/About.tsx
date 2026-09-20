import { Button } from '../components/Button'
import { BrandIcon } from '../components/BrandIcon'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionHeader'
import { alsoWorkedWith, primaryStack } from '../data/techStack'
import { site } from '../data/site'

const facts = [
  {
    label: 'Education',
    text: 'B.Sc. in Computer and Communication Engineering, Alexandria University.',
  },
  {
    label: 'Problem solving',
    text: 'Placed 67th of 200+ teams at the Egyptian Collegiate Programming Contest. 200+ algorithmic problems solved on LeetCode and Codeforces, from dynamic programming to graph theory.',
  },
  {
    label: 'Engineering projects',
    text: 'An order-processing and bookstore system in Laravel and MySQL, with stock-control triggers and a multi-step checkout. A team-built social platform in Java with role-based group permissions.',
  },
  {
    label: 'Courses',
    text: 'MySQL Database Fundamentals, PHP & Laravel Web Development, Full Web Development Fundamentals.',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel index="01">About</SectionLabel>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal>
              <h2 className="max-w-4xl text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
                I’m a computer engineer who builds websites with the same care I bring to solving hard problems.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-8 text-[1.05rem] leading-[1.75] sm:mt-14 md:grid-cols-2 md:gap-12">
              <Reveal delay={60}>
                <p>
                  I’m studying Computer and Communication Engineering at Alexandria University and working as a freelance full-stack developer
                  for clients in Egypt and abroad. That training shapes how I build: clear structure, sensible data models, and code that
                  stays easy to change.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p>
                  Much of my project work sits on the backend — relational schemas, transactional workflows, role-based access and REST APIs.
                  I pair that with a front-end craft that keeps the result fast, accessible and well designed, so a client gets one person
                  who can carry a site from first sketch to something that works reliably.
                </p>
              </Reveal>
            </div>

            <Reveal delay={80}>
              <dl className="mt-16 border-t border-ink/80">
                {facts.map((f) => (
                  <div key={f.label} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-mute sm:pt-1">{f.label}</dt>
                    <dd className="max-w-2xl leading-relaxed text-ink">{f.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-16">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-mute">Core stack</p>
                <ul className="mt-6 grid grid-cols-2 divide-line border-y border-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
                  {primaryStack.map((t) => (
                    <li
                      key={t.name}
                      className="group flex items-center gap-3.5 px-1 py-5 text-ink transition-colors duration-300 hover:text-accent lg:px-6 lg:first:pl-0"
                    >
                      <BrandIcon src={t.icon} className="size-6 shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />
                      <span className="text-[0.95rem] font-medium">{t.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-mute">
                  Also worked with: {alsoWorkedWith.join(', ')}.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-14">
                <Button href={site.cvUrl} variant="outline">
                  View My CV
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
