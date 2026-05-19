import { useMemo, useState } from 'react'
import { Container, SectionTitle, Eyebrow, Tag, FilterChips, Hairline, Callout } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { popList } from '../data/pop.js'
import { millets } from '../data/millets.js'
import { Leaf, Drop, Sun, Grain, Panicle } from '../components/icons/Icons.jsx'

const cropOptions = [
  { id: 'all', label: 'All crops' },
  ...millets.slice(0, 7).map((m) => ({ id: m.slug, label: m.name })),
]

const seasonOptions = [
  { id: 'all', label: 'All seasons' },
  { id: 'Kharif', label: 'Kharif' },
  { id: 'Rabi (post-rainy)', label: 'Rabi' },
  { id: 'Kharif / Rabi', label: 'Kharif/Rabi' },
]

function PopCard({ p }) {
  return (
    <article className="bg-paper border border-stone-200 rounded-2xl overflow-hidden">
      <header className="px-7 py-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-paper-50">
        <div>
          <Eyebrow tone="forest">{p.season}</Eyebrow>
          <h3 className="mt-1 font-display text-2xl text-ink">{p.cropName}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.states.slice(0, 6).map((s) => <Tag key={s} tone="paper">{s}</Tag>)}
          {p.states.length > 6 && <Tag tone="paper">+{p.states.length - 6}</Tag>}
        </div>
      </header>

      <div className="p-7 grid lg:grid-cols-2 gap-x-10 gap-y-6">
        <FieldRow icon={Sun} label="Sowing window" value={p.sowing} />
        <FieldRow icon={Grain} label="Seed rate" value={p.seedRate} />
        <FieldRow icon={Panicle} label="Spacing" value={p.spacing} />
        <FieldRow icon={Leaf} label="Plant population" value={p.plantPop} />
        <FieldRow icon={Drop} label="Fertilizer (NPK)" value={p.fertilizer} colSpan />
        <FieldRow icon={Leaf} label="Weed management" value={p.weed} colSpan />
        <div>
          <Eyebrow tone="forest">Intercrops</Eyebrow>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.intercrops.map((i) => <Tag key={i} tone="forest">{i}</Tag>)}
          </div>
        </div>
        <FieldRow icon={Drop} label="Irrigation" value={p.irrigation} />
      </div>

      <div className="px-7 pb-7">
        <Hairline />
        <div className="mt-5">
          <Eyebrow tone="clay">Integrated pest & disease management</Eyebrow>
          <ul className="mt-4 grid gap-3">
            {p.ipm.map((row) => (
              <li key={row.pest} className="grid sm:grid-cols-[14rem_1fr] gap-2 sm:gap-6 p-4 rounded-xl bg-clay-100/40 ring-1 ring-clay-300/40">
                <div className="text-sm font-semibold text-clay-800">{row.pest}</div>
                <div className="text-sm text-stone-700">{row.mgmt}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex items-center justify-between flex-wrap gap-3 text-sm">
          <div className="text-stone-600">
            <span className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Expected yield</span>
            <span className="ml-2 text-ink font-semibold tabular">{p.yield}</span>
          </div>
          <div className="text-2xs uppercase tracking-eyebrow text-stone-500">Source · ICAR-IIMR POP</div>
        </div>
      </div>
    </article>
  )
}

function FieldRow({ icon: Icon, label, value, colSpan = false }) {
  return (
    <div className={colSpan ? 'lg:col-span-2' : ''}>
      <div className="flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
        <Icon className="w-3.5 h-3.5 text-forest-700/70" /> {label}
      </div>
      <div className="mt-1.5 text-sm text-ink leading-relaxed">{value}</div>
    </div>
  )
}

export default function Pop() {
  const [crop, setCrop] = useState('all')
  const [season, setSeason] = useState('all')

  const filtered = useMemo(() => {
    return popList.filter((p) => (crop === 'all' || p.crop === crop) && (season === 'all' || p.season === season))
  }, [crop, season])

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Package of Practices' }]} />
      </Container>

      <PageHero
        src={images.pop.hero}
        alt="Farmer sowing pearl millet in Rajasthan"
        eyebrow="Field-ready agronomy"
        title="Package of Practices"
        lede="Crop × season × state — sowing, NPK, weed, IPM and expected yields from ICAR-IIMR POPs."
      />

      <section className="border-b border-stone-200 pt-8 pb-12">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Field-ready agronomy"
              title="Package of Practices — crop × season × state."
              lede="Land preparation, seed rate, spacing, plant population, NPK schedule, weed strategy, intercropping, irrigation and an IPM module — sourced directly from ICAR-IIMR recommended POPs."
            />
          </div>
          <div className="lg:col-span-4">
            <Callout tone="forest" title="How to use">
              Filter by crop and season. Each POP card carries the official IIMR recommendation. Cross-reference cultivar choices in the Varieties database for state-specific recommendations.
            </Callout>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-paper sticky top-[88px] z-20 border-b border-stone-200/80 backdrop-blur-sm bg-paper/95">
        <Container className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Crop</div>
            <FilterChips value={crop} onChange={setCrop} options={cropOptions} />
          </div>
          <div>
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Season</div>
            <FilterChips value={season} onChange={setSeason} options={seasonOptions} />
          </div>
          <div className="ml-auto text-sm text-stone-600 tabular">
            <span className="text-2xs uppercase tracking-eyebrow font-semibold text-stone-500">Showing</span> {filtered.length} of {popList.length} POPs
          </div>
        </Container>
      </section>

      <section className="py-14 bg-paper-50">
        <Container className="space-y-8">
          {filtered.length === 0 ? (
            <Callout tone="millet">No POPs match the current filter. Reset crop or season.</Callout>
          ) : (
            filtered.map((p) => <PopCard key={p.id} p={p} />)
          )}
        </Container>
      </section>
    </>
  )
}
