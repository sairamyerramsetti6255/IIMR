import { useParams, Link, Navigate } from 'react-router-dom'
import { Container, Eyebrow, SectionTitle, Tag, Hairline, InfoRow, Callout, Button } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import { PanicleArt, Panicle, Drop, Sun, Leaf, Grain, ArrowRight } from '../components/icons/Icons.jsx'
import PageImage from '../components/ui/PageImage.jsx'
import { milletHeroImage } from '../data/images.js'
import { getMillet, millets } from '../data/millets.js'
import { varieties } from '../data/varieties.js'
import { popList } from '../data/pop.js'
import { recipes } from '../data/recipes.js'

export default function MilletDetail() {
  const { slug } = useParams()
  const m = getMillet(slug)
  if (!m) return <Navigate to="/millets" replace />
  const cropVars = varieties.filter((v) => v.crop === slug).slice(0, 6)
  const cropPop = popList.filter((p) => p.crop === slug)
  const cropRecipes = recipes.filter((r) => r.millet.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]))
  const related = millets.filter((x) => x.slug !== slug).slice(0, 4)

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Millets', to: '/millets' }, { label: m.name }]} />
      </Container>

      {/* HERO */}
      <section className="border-b border-stone-200 py-16">
        <Container className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Eyebrow tone="forest">{m.category} millet · {m.family} · {m.hindi}</Eyebrow>
            <h1 className="mt-4 font-display text-5xl lg:text-6xl text-ink tracking-tighter2 leading-[1.02] text-balance">
              {m.name}
            </h1>
            <div className="mt-3 text-lg italic text-stone-600">{m.scientific}</div>
            <p className="mt-6 text-lg text-stone-700 leading-relaxed max-w-2xl text-pretty">{m.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {m.keyTraits.map((t) => <Tag key={t} tone="forest">{t}</Tag>)}
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Grain yield', value: m.yield.grain },
                { label: 'Fodder', value: m.yield.fodder },
                { label: 'Duration', value: m.duration },
                { label: 'Seasons', value: m.seasons.join(' · ') },
              ].map((s) => (
                <div key={s.label} className="border-l border-stone-200 pl-4">
                  <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{s.label}</div>
                  <div className="mt-1.5 text-sm font-medium text-ink tabular">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-8 space-y-5">
            <PageImage
              src={milletHeroImage(slug)}
              alt={`${m.name} in the field`}
              className="rounded-3xl shadow-card ring-1 ring-stone-200 aspect-[4/3]"
              imgClassName="w-full h-full object-cover"
              loading="eager"
              fallback={
                <div className="rounded-3xl bg-forest-700/10 aspect-[4/3] flex items-center justify-center">
                  <PanicleArt className="w-48 h-auto opacity-40" />
                </div>
              }
            />
            <div className="rounded-3xl bg-forest-700 text-paper p-8 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-25 pointer-events-none">
                <PanicleArt className="w-80 h-auto" primary="#F7F1E1" accent="#F4B942"/>
              </div>
              <div className="relative">
                <Eyebrow tone="paper" className="!text-millet-300">Snapshot</Eyebrow>
                <h3 className="mt-3 font-display text-2xl">Crop card</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ['Climate', m.climate],
                    ['Soil', m.soil],
                    ['Sowing window', m.sowingWindow],
                    ['Major states', m.states.slice(0, 6).join(', ') + (m.states.length > 6 ? '…' : '')],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <dt className="text-2xs uppercase tracking-eyebrow text-millet-300 font-semibold">{k}</dt>
                      <dd className="text-paper-200/90 leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* LOCAL NAMES + USES */}
      <section className="py-14 bg-paper-50 border-b border-stone-200">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Eyebrow tone="forest">Regional identity</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">Local names across India</h2>
            <p className="mt-3 text-stone-600 max-w-prose">
              {m.name} has rooted itself in dialects across the subcontinent. The same grain travels under different names — a sign of its embedded role in regional cuisines.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {Object.entries(m.localNames).map(([lang, name]) => (
                <div key={lang} className="border-b border-stone-200/70 pb-2">
                  <dt className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{lang}</dt>
                  <dd className="mt-0.5 text-ink font-medium">{name}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow tone="clay">End uses</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">Where the grain lands</h2>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {m.uses.map((u, idx) => (
                <li key={u} className="flex items-start gap-3 p-3 rounded-lg bg-paper ring-1 ring-stone-200/70">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-clay-500/10 text-clay-700 text-2xs font-semibold tabular">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-stone-700">{u}</span>
                </li>
              ))}
            </ul>

            <Eyebrow tone="forest" className="mt-10">Intercropping & rotations</Eyebrow>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.intercrops.map((i) => <Tag tone="paper" key={i}>{i}</Tag>)}
            </ul>
          </div>
        </Container>
      </section>

      {/* VARIETIES */}
      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between mb-8">
            <SectionTitle eyebrow="Cultivars" title="Flagship varieties & hybrids" />
            <Link to="/varieties" className="text-sm font-semibold text-forest-800 hover:underline inline-flex items-center gap-1">
              See all varieties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {cropVars.length === 0 ? (
            <Callout tone="millet">
              Detailed cultivar entries for {m.name} will surface in the global Varieties database. Below: the flagship recommendations from IIMR brochures and POPs.
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.flagshipVarieties.map((v) => <Tag key={v} tone="forest">{v}</Tag>)}
              </div>
            </Callout>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cropVars.map((v) => (
                <article key={v.id} className="border border-stone-200 rounded-2xl p-5 bg-paper">
                  <div className="flex items-center justify-between">
                    <Tag tone={v.type === 'Hybrid' ? 'clay' : 'forest'}>{v.type}</Tag>
                    <span className="text-2xs uppercase tracking-eyebrow text-stone-500 tabular">{v.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink font-medium">{v.name}</h3>
                  <div className="mt-2 text-2xs uppercase tracking-eyebrow text-stone-500">{v.use}</div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-2xs">
                    <div>
                      <dt className="uppercase tracking-eyebrow text-stone-500 font-semibold">Yield</dt>
                      <dd className="mt-0.5 text-ink text-sm tabular">{v.yieldGrain}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-eyebrow text-stone-500 font-semibold">Maturity</dt>
                      <dd className="mt-0.5 text-ink text-sm tabular">{v.maturity}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-stone-600 line-clamp-3">{v.traits}</p>
                  <div className="mt-3 text-2xs text-stone-500">{v.breeder}</div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* NUTRITION & AGRONOMY */}
      <section className="bg-paper-50 py-16 border-y border-stone-200">
        <Container className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="forest">Nutrition</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">Per 100 g edible portion</h2>
            <p className="mt-3 text-stone-600 max-w-prose">Comparative values from ICAR-IIMR Nutritional & Health Benefits of Millets and FSSAI guidance.</p>
            <table className="mt-6 w-full text-sm">
              <tbody>
                {[
                  ['Energy', `${m.nutrition.energy} kcal`],
                  ['Protein', `${m.nutrition.protein} g`],
                  ['Fat', `${m.nutrition.fat} g`],
                  ['Carbohydrates', `${m.nutrition.carbs} g`],
                  ['Total fibre', `${m.nutrition.fiber} g`],
                  ['Calcium', `${m.nutrition.ca} mg`],
                  ['Iron', `${m.nutrition.fe} mg`],
                  ['Zinc', `${m.nutrition.zn} mg`],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-stone-200/70 last:border-0">
                    <td className="py-2.5 text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold w-1/2">{k}</td>
                    <td className="py-2.5 text-ink tabular">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <Link to="/nutrition" className="text-sm font-semibold text-forest-800 inline-flex items-center gap-1 hover:underline">
                Compare with all cereals <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Eyebrow tone="clay">Pests</Eyebrow>
              <h3 className="mt-3 font-display text-xl text-ink">Common pests</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.pests.map((p) => <Tag tone="clay" key={p}>{p}</Tag>)}
              </div>
            </div>
            <div>
              <Eyebrow tone="forest">Diseases</Eyebrow>
              <h3 className="mt-3 font-display text-xl text-ink">Major diseases</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.diseases.map((d) => <Tag tone="forest" key={d}>{d}</Tag>)}
              </div>
            </div>
            {cropPop[0] && (
              <Callout tone="forest" title="Field reference">
                Open the full POP for {m.name} ({cropPop[0].season}) — sowing, spacing, NPK, weed and IPM.
                <div className="mt-3">
                  <Button to="/package-of-practices" size="sm">Open POP</Button>
                </div>
              </Callout>
            )}
          </div>
        </Container>
      </section>

      {/* RECIPES */}
      {cropRecipes.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="flex items-end justify-between mb-8">
              <SectionTitle eyebrow="On the plate" title={`Recipes featuring ${m.name}`} />
              <Link to="/recipes" className="text-sm font-semibold text-forest-800 hover:underline inline-flex items-center gap-1">
                Full recipe library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {cropRecipes.slice(0, 3).map((r) => (
                <article key={r.id} className="border border-stone-200 rounded-2xl p-5 bg-paper">
                  <Tag tone="millet">{r.category}</Tag>
                  <h3 className="mt-3 font-display text-xl text-ink">{r.name}</h3>
                  <div className="mt-1 text-2xs uppercase tracking-eyebrow text-stone-500">{r.region} · {r.time} · {r.diff}</div>
                  <p className="mt-3 text-sm text-stone-600">{r.blurb}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* RELATED */}
      <section className="bg-paper-50 py-16 border-t border-stone-200">
        <Container>
          <SectionTitle eyebrow="Continue reading" title="Other millets in the index" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/millets/${r.slug}`} className="group flex items-start gap-3 p-4 rounded-xl border border-stone-200 bg-paper hover:bg-paper-200/40">
                <Panicle className="w-5 h-5 text-forest-700/70 mt-0.5" />
                <div>
                  <div className="font-display text-lg text-ink">{r.name}</div>
                  <div className="text-2xs uppercase tracking-eyebrow text-stone-500">{r.hindi} · {r.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
