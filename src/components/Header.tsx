import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems, homeSectionIds } from '../data/navigation'
import { site } from '../data/site'
import { useActiveSection } from '../lib/useActiveSection'

export function Header() {
  const { pathname, key } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(homeSectionIds, onHome)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu after any navigation
  useEffect(() => setOpen(false), [key])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (item: (typeof navItems)[number]) =>
    item.sectionId ? onHome && activeSection === item.sectionId : pathname === item.to

  const linkClass = (active: boolean) =>
    `relative py-2 text-[0.92rem] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-300 ${
      active ? 'text-ink after:scale-x-100' : 'text-body hover:text-ink after:scale-x-0 hover:after:scale-x-100'
    }`

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open ? 'border-line bg-paper' : solid ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link to="/" className="font-display text-[1.65rem] leading-none tracking-tight text-ink" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} end className={linkClass(isActive(item))} aria-current={isActive(item) ? 'page' : undefined}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-6" strokeWidth={1.5} /> : <Menu aria-hidden className="size-6" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu — height animates via grid rows */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <ul className="border-t border-line px-5 pb-6 pt-2 sm:px-8">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-line/70 last:border-none">
                <NavLink
                  to={item.to}
                  end
                  className={`flex min-h-14 items-center justify-between font-display text-3xl ${isActive(item) ? 'text-accent' : 'text-ink'}`}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(item) ? 'page' : undefined}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
