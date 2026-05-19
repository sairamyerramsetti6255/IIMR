import { Container, SectionTitle, Eyebrow, Tag, Hairline, Callout } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { nutritionTable, healthBenefits, giData } from '../data/nutrition.js'
import { Heart, Pulse, Shield, Sun, Leaf, Drop, Sparkle, Scale, Baby, WheatOff } from '../components/icons/Icons.jsx'

const iconMap = { heart: Heart, pulse: Pulse, shield: Shield, sun: Sun, leaf: Leaf,
  droplet: Drop, sparkles: Sparkle, scale: Scale, baby: Baby, 'wheat-off': WheatOff }

function Bar({ value, max, tone = 'forest' }) {
  const pct = Math.min(100, (value / max) * 100)
  const toneCls = { forest: 'bg-forest-700', clay: 'bg-clay-500', millet: 'bg-millet-500' }[tone]
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm tabular text-ink w-14">{value.toFixed(1)}</span>
      <div className="flex-1 h-1.5 bg-stone-200 rounded">
        <div className={`h-full rounded ${toneCls}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function Nutrition() {
  // bar maxes per column
  const maxima = {}
  for (const col of nutritionTable.columns) {
    if (col.key === 'crop') continue
    maxima[col.key] = Math.max(...nutritionTable.rows.map((r) => r[col.key]))
  }
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Nutrition & Health' }]} />
      </Container>

      <PageHero
        src={images.nutrition.hero}
        alt="Comparison of millet grains in terracotta saucers"
        eyebrow="Nutrition science"
        title="Per 100 g — millets vs fine cereals"
        lede="ICAR-IIMR and FSSAI comparative values, plus glycemic index and ten health-benefit panels."
      />

      <section className="border-b border-stone-200 pt-8 pb-16">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Nutrition science"
              title="Per-100-gram comparison — millets vs the fine cereals."
              lede="Source: ICAR-IIMR Nutritional & Health Benefits of Millets (2017) + Nutri-Cereals (2018) + FSSAI guidance. All values are per 100 g edible portion."
            />
          </div>
          <div className="lg:col-span-4">
            <Callout tone="millet" title="How to read">
              Bars are scaled relative to the highest value in each column. Cereals (rice, wheat, maize) are shown at the bottom as reference rows.
            </Callout>
          </div>
        </Container>
      </section>

      {/* Big table */}
      <section className="py-12 bg-paper-50 border-b border-stone-200">
        <Container>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-stone-200 bg-paper">
            <table className="min-w-full text-sm">
              <thead className="bg-paper-200/70 text-2xs uppercase tracking-eyebrow text-stone-600 font-semibold">
                <tr>
                  {nutritionTable.columns.map((c) => (
                    <th key={c.key} className="px-4 py-3.5 text-left">
                      {c.label}{c.unit ? <span className="ml-1 text-stone-400 normal-case tracking-normal">({c.unit})</span> : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {nutritionTable.rows.map((r) => (
                  <tr key={r.crop} className={r.kind === 'cereal' ? 'bg-stone-50' : ''}>
                    <td className="px-4 py-3 align-middle">
                      <div className="font-medium text-ink">{r.crop}</div>
                      <div className="text-2xs uppercase tracking-eyebrow text-stone-500">{r.kind === 'millet' ? 'Millet' : 'Fine cereal'}</div>
                    </td>
                    {nutritionTable.columns.slice(1).map((c) => (
                      <td key={c.key} className="px-4 py-3 align-middle min-w-[10rem]">
                        <Bar value={r[c.key]} max={maxima[c.key]} tone={r.kind === 'cereal' ? 'clay' : (['ca','fe','zn','fiber','protein'].includes(c.key) ? 'forest' : 'millet')} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* GI / GL */}
      <section className="py-16">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Eyebrow tone="forest">Glycemic profile</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink text-balance">Why millets keep blood sugar steady.</h2>
            <p className="mt-3 text-stone-700 max-w-prose">
              Independent NIN-IIMR studies measured the Glycemic Index (GI) and Glycemic Load (GL) of standardised millet meals against rice and wheat preparations. All millet foods score in the low-GI band; rice and wheat in the high-GI band.
            </p>
            <p className="mt-3 text-sm text-stone-500">GI &lt; 55 is low · 55–69 medium · ≥ 70 high.</p>
          </div>
          <div className="lg:col-span-6">
            <ul className="divide-y divide-stone-200 ring-1 ring-stone-200 rounded-2xl bg-paper overflow-hidden">
              {giData.map((r) => (
                <li key={r.crop} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4">
                  <span className="font-medium text-ink">{r.crop}</span>
                  <span className="text-2xs uppercase tracking-eyebrow text-stone-500 tabular"><span className="text-stone-400">GI</span> {r.gi}</span>
                  <Tag tone={r.tone === 'low' ? 'forest' : 'clay'}>{r.tone === 'low' ? 'Low' : 'High'} GL · {r.gl}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Health benefits cards */}
      <section className="py-16 bg-forest-800 text-paper">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="paper" className="!text-millet-300">Health benefits</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-paper text-balance">Ten conditions, each with evidence.</h2>
            <p className="mt-4 text-paper-200/85 max-w-prose">
              These ten panels translate clinical and chemical evidence from IIMR and NIN into a quick-read public reference. Always pair specific dietary advice with a registered nutritionist or physician.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {healthBenefits.map((b) => {
              const Icon = iconMap[b.icon] || Shield
              return (
                <article key={b.id} className="rounded-2xl bg-forest-700/40 ring-1 ring-paper-200/10 p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-millet-500/15 text-millet-300">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-display text-xl text-paper">{b.title}</h3>
                  </div>
                  <p className="mt-4 text-paper-200/90 leading-relaxed text-sm text-pretty">{b.summary}</p>
                  <Hairline className="my-4 opacity-30" />
                  <p className="text-2xs uppercase tracking-eyebrow text-millet-300 font-semibold mb-1.5">Evidence</p>
                  <p className="text-2xs text-paper-200/70 leading-relaxed">{b.evidence}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <Callout tone="forest" title="Methodology note">
            Macronutrient and mineral values are taken from the IFCT / IIMR composition tables. Bioavailability values can change with dehulling, malting, fermentation and parboiling — refer to the GAP Manual 2025 for processing effects.
          </Callout>
        </Container>
      </section>
    </>
  )
}
