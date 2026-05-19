import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, SectionTitle, Eyebrow, Tag, FilterChips, Hairline } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import { Panicle, ArrowRight } from '../components/icons/Icons.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { millets } from '../data/millets.js'

const filterOpts = [
  { id: 'all', label: 'All 9 millets' },
  { id: 'Major', label: 'Major millets' },
  { id: 'Minor', label: 'Minor millets' },
]

export default function MilletsIndex() {
  const [filter, setFilter] = useState('all')
  const list = useMemo(
    () => (filter === 'all' ? millets : millets.filter((m) => m.category === filter)),
    [filter]
  )
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Millets' }]} />
      </Container>

      <PageHero
        src={images.home.grainFlatlay}
        alt="Nine millet grains in burlap pouches"
        eyebrow="The encyclopedia"
        title="Nine millets of India"
        lede="Major staples, climate-smart minors and niche grains — each with cultivars, agronomy, nutrition and recipes."
      />

      <section className="border-b border-stone-200 pb-16 pt-8">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <SectionTitle
                eyebrow="The Encyclopedia"
                title="The nine millets that anchor India's nutritional security."
                lede="A complete reference for each grain — local names, agronomy, varieties, nutrition profile, pests & diseases, and regional recipes. Drawn from ICAR-IIMR extension folders, AICRP compendia and the GAP Manual 2025."
              />
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-forest-700/5 ring-1 ring-forest-700/15 p-6">
                <Eyebrow tone="forest">Reading order</Eyebrow>
                <ol className="mt-4 space-y-3 text-sm text-stone-700">
                  <li><strong className="text-ink">1. Major millets</strong> — Sorghum · Pearl millet · Finger millet — bulk of acreage.</li>
                  <li><strong className="text-ink">2. Minor millets</strong> — Foxtail, Kodo, Little, Barnyard, Proso, Browntop — climate-resilient niches.</li>
                  <li><strong className="text-ink">3. Cross-cutting</strong> — Nutrition, processing, seed system.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <FilterChips value={filter} onChange={setFilter} options={filterOpts} />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container>
          <ul className="grid gap-8 lg:grid-cols-2">
            {list.map((m) => (
              <li key={m.slug}>
                <Link to={`/millets/${m.slug}`} className="group block border border-stone-200 rounded-2xl p-7 bg-paper hover:bg-paper-200/40 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <Eyebrow tone="forest">{m.category} millet · {m.family}</Eyebrow>
                      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight2 text-ink">
                        {m.name} <span className="text-stone-400">·</span> <span className="font-sans text-base text-stone-600 italic font-normal">{m.scientific}</span>
                      </h3>
                      <div className="mt-1 text-sm text-stone-600">Hindi · {m.hindi} · {Object.keys(m.localNames).length} regional names</div>
                    </div>
                    <Panicle className="w-7 h-7 text-forest-700/60" />
                  </div>
                  <p className="mt-4 text-stone-700 leading-relaxed text-pretty">{m.blurb}</p>

                  <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div>
                      <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Yield · grain</div>
                      <div className="mt-0.5 text-ink tabular">{m.yield.grain}</div>
                    </div>
                    <div>
                      <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Duration</div>
                      <div className="mt-0.5 text-ink tabular">{m.duration}</div>
                    </div>
                    <div>
                      <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Seasons</div>
                      <div className="mt-0.5 text-ink">{m.seasons.join(' · ')}</div>
                    </div>
                    <div>
                      <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">States</div>
                      <div className="mt-0.5 text-ink">{m.states.length} states</div>
                    </div>
                  </div>

                  <Hairline className="my-5" />

                  <div className="flex flex-wrap gap-1.5">
                    {m.keyTraits.slice(0, 4).map((t) => <Tag key={t} tone="paper">{t}</Tag>)}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 group-hover:underline">
                    View {m.name} profile <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
