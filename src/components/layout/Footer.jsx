import { Link } from 'react-router-dom'
import { Container } from '../ui/Primitives.jsx'
import { site } from '../../data/site.js'
import { sourceCount } from '../../data/resources.js'

const cols = [
  {
    title: 'Knowledge',
    links: [
      { label: 'Millets encyclopedia', to: '/millets' },
      { label: 'Package of practices', to: '/package-of-practices' },
      { label: 'Varieties database', to: '/varieties' },
      { label: 'Nutrition & health', to: '/nutrition' },
      { label: 'Recipes', to: '/recipes' },
    ],
  },
  {
    title: 'Value chain',
    links: [
      { label: 'Processing & technology', to: '/processing' },
      { label: 'Seed availability hub', to: '/seed-hub' },
      { label: 'Resource library', to: '/resources' },
      { label: 'About IIMR', to: '/about' },
    ],
  },
  {
    title: 'Government links',
    external: true,
    links: [
      { label: 'ICAR-IIMR', href: 'https://www.millets.res.in/' },
      { label: 'AICRP Pearl Millet', href: 'https://www.aicpmip.res.in/' },
      { label: 'SeedNet India', href: 'https://seednet.gov.in/' },
      { label: 'FSSAI Eat Right', href: 'https://fssai.gov.in/' },
      { label: 'Nutri Cereals (DMD)', href: 'https://nutricereals.dac.gov.in/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-forest-800 text-paper-200 relative overflow-hidden">
      {/* heritage accent rule */}
      <div className="h-[3px] w-full bg-gradient-to-r from-millet-400 via-clay-500 to-forest-500" aria-hidden />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-millet-500/10 blur-3xl gpu-layer" aria-hidden />

      <Container className="relative pt-10 pb-6">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center" aria-label="Millet Vista — Home">
              <img
                src="/images/brand/logo-wordmark.png"
                alt="Millet Vista — Shree Anna Knowledge Portal"
                className="h-10 w-auto object-contain rounded-md bg-paper/95 px-2 py-1 ring-1 ring-millet-400/20"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-4 max-w-md text-[13px] text-paper-200/85 leading-relaxed">
              {site.description}
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px]">
              <div>
                <div className="text-[10px] uppercase tracking-eyebrow text-millet-300 font-semibold mb-1">Contact</div>
                <a href={`mailto:${site.contactEmail}`} className="block text-paper-200/90 hover:text-millet-200 transition-colors">
                  {site.contactEmail}
                </a>
                <span className="block text-paper-200/70">{site.contactPhone}</span>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-eyebrow text-millet-300 font-semibold mb-1">Address</div>
                <address className="not-italic text-paper-200/80 leading-snug">{site.address}</address>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[10px] uppercase tracking-eyebrow text-millet-300 font-semibold pb-2 border-b border-paper-200/10">
                  {c.title}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {c.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-[12.5px] text-paper-200/85 hover:text-millet-200 transition-colors"
                        >
                          {l.label}
                          <span className="text-millet-400/70 group-hover:text-millet-300 text-[10px]">↗</span>
                        </a>
                      ) : (
                        <Link
                          to={l.to}
                          className="text-[12.5px] text-paper-200/85 hover:text-millet-200 transition-colors"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Citation note — slim band */}
        <div className="mt-8 pt-4 border-t border-paper-200/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] text-paper-200/65">
          <p className="leading-relaxed max-w-3xl">
            All technical content is sourced from <span className="text-millet-300 font-semibold tabular">{sourceCount}</span> official ICAR, FSSAI and GoI publications. Each data point links to its primary source — please cite the original publication when redistributing.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-[11px] uppercase tracking-eyebrow font-semibold text-millet-300 hover:text-millet-200 transition-colors whitespace-nowrap"
          >
            Back to top
            <span aria-hidden>↑</span>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-4 border-t border-paper-200/10 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[10.5px] uppercase tracking-eyebrow text-paper-200/55">
          <div>
            © 2026 Millet Vista · Public educational portal · Aligned to ICAR–IIMR · Updated {site.updated}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span>ICAR · FSSAI · GoI · AICRP · NIN</span>
            <span className="opacity-40">·</span>
            <span>Years of record · <span className="tabular">{site.yearsOfRecord}</span></span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
