import { useMemo, useState } from 'react'
import { Container, SectionTitle, Eyebrow, Tag, FilterChips, Callout } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { varieties, varietyFilters } from '../data/varieties.js'
import { Search } from '../components/icons/Icons.jsx'

export default function Varieties() {
  const [crop, setCrop] = useState('all')
  const [type, setType] = useState('all')
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('year')

  const list = useMemo(() => {
    let r = varieties.slice()
    if (crop !== 'all') r = r.filter((v) => v.crop === crop)
    if (type !== 'all') r = r.filter((v) => v.type === type)
    if (q.trim()) {
      const k = q.toLowerCase()
      r = r.filter((v) =>
        v.name.toLowerCase().includes(k) ||
        v.traits.toLowerCase().includes(k) ||
        v.breeder.toLowerCase().includes(k) ||
        v.states.join(' ').toLowerCase().includes(k)
      )
    }
    if (sortBy === 'year') r.sort((a, b) => b.year - a.year)
    if (sortBy === 'crop') r.sort((a, b) => a.crop.localeCompare(b.crop))
    if (sortBy === 'name') r.sort((a, b) => a.name.localeCompare(b.name))
    return r
  }, [crop, type, q, sortBy])

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Varieties' }]} />
      </Container>

      <PageHero
        src={images.varieties.hero}
        alt="Glass jars of millet cultivar seeds"
        eyebrow="Cultivars database"
        title="35+ varieties & hybrids"
        lede="Searchable database of ICAR, AICRP and state university releases — 2003 to 2023."
      />

      <section className="border-b border-stone-200 pt-8 pb-12">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Cultivars database"
              title="35+ millet varieties & hybrids — released by ICAR, AICRP and state universities."
              lede="Notified releases from 2003 onwards (with foundational landmark releases) — searchable by crop, type, breeder, state and trait. Includes commercialization-ready cultivars from the IIMR ZTMC."
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 self-end">
            {[
              { label: 'Total releases', value: varieties.length },
              { label: 'Hybrids', value: varieties.filter((v) => v.type === 'Hybrid').length },
              { label: 'Varieties (OPV)', value: varieties.filter((v) => v.type === 'Variety').length },
              { label: 'Latest year', value: Math.max(...varieties.map((v) => v.year)) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-paper ring-1 ring-stone-200 p-4">
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{s.label}</div>
                <div className="mt-1 font-display text-2xl text-ink tabular">{s.value}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 bg-paper border-b border-stone-200/80 sticky top-[88px] z-20 backdrop-blur-sm bg-paper/95">
        <Container className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-6">
            <div>
              <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Crop</div>
              <FilterChips value={crop} onChange={setCrop} options={varietyFilters.crops} />
            </div>
            <div>
              <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Type</div>
              <FilterChips value={type} onChange={setType} options={varietyFilters.types} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, trait, breeder, state…"
                className="pl-9 pr-3 py-2 text-sm w-72 rounded-full border border-stone-300 bg-paper-50 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700"
              />
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-full text-sm border border-stone-300 bg-paper-50 focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700"
            >
              <option value="year">Sort: Newest</option>
              <option value="name">Sort: Name A–Z</option>
              <option value="crop">Sort: Crop</option>
            </select>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-12">
        <Container>
          <div className="text-sm text-stone-600 mb-4 tabular">
            <span className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Showing</span> {list.length} cultivars
          </div>

          <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200 bg-paper">
            <table className="min-w-full text-sm">
              <thead className="bg-paper-200/70">
                <tr className="text-left text-2xs uppercase tracking-eyebrow text-stone-600 font-semibold">
                  <th className="px-5 py-3.5">Cultivar</th>
                  <th className="px-5 py-3.5">Crop</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Use</th>
                  <th className="px-5 py-3.5">Year</th>
                  <th className="px-5 py-3.5">Maturity</th>
                  <th className="px-5 py-3.5">Grain yield</th>
                  <th className="px-5 py-3.5">Recommended states</th>
                  <th className="px-5 py-3.5">Breeder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {list.map((v) => (
                  <tr key={v.id} className="hover:bg-paper-200/40">
                    <td className="px-5 py-4 align-top">
                      <div className="font-medium text-ink">{v.name}</div>
                      <div className="mt-1 text-2xs text-stone-500 line-clamp-2 max-w-xs">{v.traits}</div>
                    </td>
                    <td className="px-5 py-4 align-top capitalize text-stone-700">{v.crop.replace('-', ' ')}</td>
                    <td className="px-5 py-4 align-top">
                      <Tag tone={v.type === 'Hybrid' ? 'clay' : 'forest'}>{v.type}</Tag>
                    </td>
                    <td className="px-5 py-4 align-top text-stone-700">{v.use}</td>
                    <td className="px-5 py-4 align-top tabular text-stone-700">{v.year}</td>
                    <td className="px-5 py-4 align-top tabular text-stone-700">{v.maturity}</td>
                    <td className="px-5 py-4 align-top tabular text-stone-700">{v.yieldGrain}</td>
                    <td className="px-5 py-4 align-top text-stone-700 max-w-xs">{v.states.join(', ')}</td>
                    <td className="px-5 py-4 align-top text-2xs uppercase tracking-eyebrow text-stone-500 max-w-xs">{v.breeder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {list.length === 0 && (
            <div className="mt-6">
              <Callout tone="millet">No cultivars match the current filter. Try clearing the search or selecting a different crop.</Callout>
            </div>
          )}

          <p className="mt-6 text-2xs uppercase tracking-eyebrow text-stone-500">
            Sources · IIMR ZTMC Millet Cultivars for Commercialization · AICRP Pearl Millet Hybrids & Varieties · Latest Sorghum Varietal Technology
          </p>
        </Container>
      </section>
    </>
  )
}
