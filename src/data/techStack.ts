import type { TechItem } from '../types'
import { media } from './media'

/** The stack shown visually in the About section */
export const primaryStack: TechItem[] = [
  { name: 'TypeScript', icon: media.icons.typescript },
  { name: 'React', icon: media.icons.react },
  { name: 'Tailwind CSS', icon: media.icons.tailwind },
  { name: 'Node.js', icon: media.icons.node },
  { name: 'PostgreSQL', icon: media.icons.postgres },
]

/** Additional technologies from the CV, referenced in supporting text */
export const alsoWorkedWith = ['Next.js', 'Laravel', 'PHP', 'Python', 'Java', 'MySQL', 'MongoDB', 'Docker', 'Git', 'REST APIs']
