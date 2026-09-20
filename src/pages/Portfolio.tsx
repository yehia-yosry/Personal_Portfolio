import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionHeader'
import { portfolioProjects } from '../data/portfolio'

export function Portfolio() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:px-14">
      <header className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <SectionLabel index="03">Portfolio</SectionLabel>
        </div>
        <div className="animate-fade-up lg:col-span-9">
          <h1 className="max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-[5.5rem]">Selected work, built as examples.</h1>
          <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.75]">
            Four example projects that show how I approach different kinds of websites. They are concept work created for this portfolio, not
            client engagements. Open any project to see more screens.
          </p>
        </div>
      </header>

      <div className="mt-20 sm:mt-24">
        {portfolioProjects.map((project, i) => (
          <Reveal key={project.id}>
            <ProjectCard
              project={project}
              index={i}
              open={openId === project.id}
              onToggle={() => setOpenId((cur) => (cur === project.id ? null : project.id))}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
