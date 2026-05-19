import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Container } from '../ui/Primitives.jsx'
import { primaryNav } from '../../data/site.js'
import { ChevronDown, Search, Close } from '../icons/Icons.jsx'

function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="Millet Vista — Home">
      <img
        src="/images/brand/logo-wordmark.png"
        alt="Millet Vista — Shree Anna Knowledge Portal"
        className={`${compact ? 'h-9' : 'h-11'} w-auto object-contain select-none`}
        draggable={false}
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMega, setOpenMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMega(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 will-change-transform ${
        scrolled
          ? 'bg-paper/95 border-b border-stone-200/80 shadow-[0_1px_0_rgba(15,17,21,0.04)]'
          : 'bg-paper border-b border-stone-200/60'
      }`}
      style={{ transform: 'translateZ(0)' }}
    >
      <Container className="flex items-center justify-between h-14 lg:h-[60px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setOpenMega(false)}>
          {primaryNav.map((item) => {
            const hasChildren = item.children?.length
            const active = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))
            if (hasChildren) {
              const isOpen = openMega === item.label
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMega(item.label)}
                >
                  <button
                    className={`relative px-3 py-2 text-[13px] font-medium tracking-[0.005em] rounded-md inline-flex items-center gap-1 transition-colors ${
                      active ? 'text-forest-800' : 'text-stone-700 hover:text-forest-800'
                    }`}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    {active && (
                      <span className="absolute left-3 right-3 -bottom-[7px] h-[2px] bg-millet-500 rounded-full" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-3 w-[30rem] z-50">
                      <div className="bg-paper border border-stone-200 shadow-[0_24px_60px_-20px_rgba(15,17,21,0.18)] rounded-2xl p-5 overflow-hidden">
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="text-[10px] uppercase tracking-eyebrow text-forest-700 font-semibold">
                            {item.description}
                          </div>
                          <div className="h-px flex-1 bg-stone-200" />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
                          {item.children.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              className="group/item flex items-center gap-2 py-1 text-[13px] text-stone-700 hover:text-forest-800"
                            >
                              <span className="w-1 h-1 rounded-full bg-stone-300 group-hover/item:bg-millet-500 transition-colors" />
                              <span className="group-hover/item:underline underline-offset-4 decoration-millet-500/60">
                                {c.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                          <Link to={item.to} className="text-[12px] font-semibold text-forest-800 hover:text-forest-900 inline-flex items-center gap-1.5">
                            View full encyclopedia
                            <span aria-hidden>→</span>
                          </Link>
                          <span className="text-[10px] uppercase tracking-eyebrow text-stone-400">{item.children.length} entries</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-[13px] font-medium tracking-[0.005em] rounded-md whitespace-nowrap transition-colors ${
                    isActive ? 'text-forest-800' : 'text-stone-700 hover:text-forest-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-[7px] h-[2px] bg-millet-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search"
            className="hidden md:inline-flex w-8 h-8 items-center justify-center rounded-full text-stone-600 hover:text-forest-800 hover:bg-paper-200 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <span className="hidden md:inline-block w-px h-5 bg-stone-200 mx-1" aria-hidden />
          <Link
            to="/resources"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-800 text-paper text-[12px] font-semibold tracking-[0.01em] hover:bg-forest-900 transition-colors"
          >
            Resource Library
            <span aria-hidden className="text-millet-300">→</span>
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex w-9 h-9 items-center justify-center rounded-md text-stone-700 hover:bg-paper-200"
          >
            {mobileOpen ? <Close className="w-5 h-5" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-paper">
          <Container className="py-3">
            <div className="grid gap-0.5">
              {primaryNav.map((item) => (
                <details key={item.label} className="group rounded-md hover:bg-paper-200/60" open={item.children ? false : undefined}>
                  {item.children ? (
                    <>
                      <summary className="flex items-center justify-between py-2.5 px-2 text-[13px] font-medium text-stone-800 cursor-pointer list-none">
                        {item.label}
                        <ChevronDown className="w-4 h-4 text-stone-500 group-open:rotate-180 transition" />
                      </summary>
                      <div className="pl-4 pr-2 pb-2 grid grid-cols-1 gap-0.5">
                        {item.children.map((c) => (
                          <Link key={c.to} to={c.to} className="block py-1.5 text-[13px] text-stone-700">
                            {c.label}
                          </Link>
                        ))}
                        <Link to={item.to} className="block py-1.5 text-[13px] font-semibold text-forest-800">
                          View all →
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Link to={item.to} className="block py-2.5 px-2 text-[13px] font-medium text-stone-800">
                      {item.label}
                    </Link>
                  )}
                </details>
              ))}
              <Link
                to="/resources"
                className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-forest-800 text-paper text-[13px] font-semibold"
              >
                Resource Library →
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
