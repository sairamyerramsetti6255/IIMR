import { useEffect, useLayoutEffect } from 'react'

/**
 * Scroll-reveal system.
 *
 * Usage in JSX:
 *   <div data-reveal>...</div>                   // element fades in once visible
 *   <div data-reveal="stagger">                  // children fade in with stagger
 *      <div>...</div>
 *      <div>...</div>
 *   </div>
 *
 * The corresponding `.reveal` and `.reveal-in` styles live in src/index.css.
 * Elements are hidden synchronously (useLayoutEffect) BEFORE the first paint
 * so there's never a flash of unstyled content. An IntersectionObserver then
 * adds the `.reveal-in` class when each target scrolls into view.
 */
export function useScrollReveal() {
  // 1) Pre-paint: tag elements with `.reveal` synchronously so the browser
  //    never paints them in their final visible state.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const mode = el.getAttribute('data-reveal')
      if (mode === 'stagger') {
        Array.from(el.children).forEach((child) => child.classList.add('reveal'))
      } else {
        el.classList.add('reveal')
      }
    })
  }, [])

  // 2) After paint: observe each target and promote to `.reveal-in` on entry.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const targets = Array.from(document.querySelectorAll('[data-reveal]'))

    if (prefersReduced) {
      targets.forEach((el) => {
        const mode = el.getAttribute('data-reveal')
        if (mode === 'stagger') {
          Array.from(el.children).forEach((c) => c.classList.add('reveal-in'))
        } else {
          el.classList.add('reveal-in')
        }
      })
      return
    }

    // Once a transition completes, drop `will-change` so we don't hold an
    // unnecessary compositor layer (which hurts long-page scroll perf).
    const releaseWillChange = (el) => {
      const handler = () => {
        el.style.willChange = 'auto'
        el.removeEventListener('transitionend', handler)
      }
      el.addEventListener('transitionend', handler, { once: true })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const mode = el.getAttribute('data-reveal')

          if (mode === 'stagger') {
            Array.from(el.children).forEach((child, i) => {
              const delay = Math.min(i, 8) * 90
              window.setTimeout(() => {
                child.classList.add('reveal-in')
                releaseWillChange(child)
              }, delay)
            })
          } else {
            el.classList.add('reveal-in')
            releaseWillChange(el)
          }
          io.unobserve(el)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
