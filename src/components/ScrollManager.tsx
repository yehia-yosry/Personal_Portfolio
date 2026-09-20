import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles scroll on navigation:
 *  - "/#about" style links scroll smoothly to the section (the sticky header offset is handled with scroll-margin in CSS)
 *  - changing page resets to the top instantly
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef<string | null>(null)

  useLayoutEffect(() => {
    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView({ behavior: changedPage ? 'instant' : 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: changedPage ? 'instant' : 'smooth' })
    }
  }, [pathname, hash, key])

  return null
}
