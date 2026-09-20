import { useEffect, useState } from 'react'

/** Returns the id of the landing-page section currently crossing the upper-middle of the viewport. */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string>(ids[0])

  useEffect(() => {
    if (!enabled) return
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids, enabled])

  return active
}
