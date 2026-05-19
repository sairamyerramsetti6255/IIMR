import { useMemo, useState } from 'react'
import { Container, SectionTitle, Eyebrow, Tag, FilterChips, Callout, ExternalLink } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { resources, resourceCategories, sourceCount } from '../data/resources.js'
import { Doc, Search } from '../components/icons/Icons.jsx'

export default function Resources() {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    return resources.filter((r) =>
      (cat === 'all' || r.category === cat) &&
      (!q || (r.title + ' ' + r.publisher + ' ' + r.blurb).toLowerCase().includes(q.toLowerCase()))
    )
  }, [cat, q])

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Resources' }]} />
      </Container>

      <PageHero
        src={images.resources.hero}
        alt="ICAR library shelf of technical publications"
        eyebrow="Source library"
        title="30 official publications"
        lede="Every claim on Millet Vista traces back to ICAR, FSSAI, AICRP and Government of India sources."
      />

      <section className="border-b border-stone-200 pt-8 pb-14">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Source library"
              title="Every claim on Millet Vista traces back to one of these documents."
              lede={`${sourceCount} ICAR, FSSAI, AICRP, NIN and Government of India publications — categorized, year-stamped and linked to the publisher.`}
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 self-end">
            {[
              { label: 'Total sources', value: sourceCount },
              { label: 'Years of record', value: '1942 — 2026' },
              { label: 'Categories', value: resourceCategories.length - 1 },
              { label: 'Publishers', value: 'ICAR · FSSAI · GoI' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-paper ring-1 ring-stone-200 p-4">
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{s.label}</div>
                <div className="mt-1 font-display text-xl text-ink tabular">{s.value}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 bg-paper border-b border-stone-200 sticky top-[88px] z-20 backdrop-blur-sm bg-paper/95">
        <Container className="flex flex-wrap gap-5 items-end">
          <div className="flex-1 min-w-[260px]">
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Category</div>
            <FilterChips value={cat} onChange={setCat} options={resourceCategories} />
          </div>
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, publisher, theme…"
              className="pl-9 pr-3 py-2 text-sm w-72 rounded-full border border-stone-300 bg-paper-50 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700"
            />
          </label>
        </Container>
      </section>

      <section className="py-14 bg-paper-50">
        <Container>
          <div className="text-sm text-stone-600 mb-6 tabular">
            <span className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Showing</span> {filtered.length} of {resources.length} sources
          </div>
          {filtered.length === 0 ? (
            <Callout tone="millet">No matches. Clear search or pick another category.</Callout>
          ) : (
            <ul className="grid md:grid-cols-2 gap-5">
              {filtered.map((r) => (
                <li key={r.id}>
                  <article className="h-full rounded-2xl ring-1 ring-stone-200 p-6 bg-paper hover:shadow-card transition">
                    <div className="flex items-center justify-between">
                      <Tag tone="forest">{r.category}</Tag>
                      <span className="text-2xs uppercase tracking-eyebrow text-stone-500 tabular">{r.year}{r.pages ? ` · ${r.pages} p` : ''}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl text-ink leading-tight text-balance">{r.title}</h3>
                    <div className="mt-1 text-2xs uppercase tracking-eyebrow text-stone-500">{r.publisher}</div>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed">{r.blurb}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-2xs text-stone-500"><Doc className="w-4 h-4" /> {r.file}</div>
                      {r.sourceUrl && <ExternalLink href={r.sourceUrl} className="text-sm">Open publisher</ExternalLink>}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Callout tone="forest" title="Citation policy">
            All technical content is for educational use. When redistributing, cite the original publication and link to the publisher URL provided above. We do not host PDFs from third parties.
          </Callout>
        </Container>
      </section>
    </>
  )
}
