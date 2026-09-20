import { Link } from 'react-router-dom'
import { Button } from './Button'
import { SocialLinks } from './SocialLinks'
import { navItems } from '../data/navigation'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Have a project
              <br />
              in mind?
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed">
              {site.availability}. Tell me what you’re building and I’ll reply with honest next steps.
            </p>
            <div className="mt-8">
              <Button to="/contact">Work Together</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:pl-10">
            <nav aria-label="Footer">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-mute">Navigate</p>
              <ul className="mt-5 space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-[0.95rem] text-ink transition-colors hover:text-accent">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-mute">Contact</p>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                <li>
                  <a href={`mailto:${site.email}`} className="break-all text-ink transition-colors hover:text-accent">
                    {site.email}
                  </a>
                </li>
                <li className="text-ink">{site.phoneDisplay}</li>
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">{site.name}</p>
            <p className="mt-1 text-sm text-mute">{site.role}</p>
          </div>
          <SocialLinks />
        </div>
        <p className="pb-8 text-sm text-mute">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
