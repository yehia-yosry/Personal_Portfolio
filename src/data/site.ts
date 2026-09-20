/**
 * Single source of truth for personal details and contact configuration.
 * Change values here — nothing else in the codebase repeats them.
 */
export const site = {
  name: 'Yehia Yosry',
  role: 'Computer Engineer / Full-Stack Web Developer',
  motto: 'Well-engineered websites, designed with care and built to last.',
  location: 'Alexandria, Egypt',
  availability: 'Available for freelance projects',

  email: 'yehiayosry101@gmail.com',

  /** International format, digits only — used to build wa.me links */
  whatsappNumber: '201552004509',
  /** Human-readable version of the same number */
  phoneDisplay: '+20 155 200 4509',

  github: 'https://github.com/yehia-yosry',
  linkedin: 'https://www.linkedin.com/in/yehia-yosry/',

  /** CV lives in /public so the path is stable. Replace the file, keep the name. */
  cvUrl: `${import.meta.env.BASE_URL}Yehia-Yosry-CV.pdf`,
} as const

export const whatsappBaseUrl = `https://wa.me/${site.whatsappNumber}`
