import { useMemo, useState } from 'react'
import { Container, SectionTitle, Eyebrow, Tag, FilterChips, Callout } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageImage from '../components/ui/PageImage.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { recipeImage } from '../data/images.js'
import { images } from '../data/images.js'
import { recipes, recipeCategories } from '../data/recipes.js'

function RecipeArt({ id, name, tone }) {
  const src = recipeImage(id)
  const grad = {
    forest: 'from-forest-700 to-forest-600',
    millet: 'from-millet-600 to-millet-400',
    clay: 'from-clay-700 to-clay-500',
    paper: 'from-paper-300 to-paper-200',
  }[tone] || 'from-forest-700 to-forest-600'
  return (
    <PageImage
      src={src}
      alt={name}
      className="relative h-44 rounded-xl"
      imgClassName="w-full h-full object-cover"
      fallback={
        <div className={`h-44 rounded-xl bg-gradient-to-br ${grad} flex items-end p-5`}>
          <span className="font-display text-xl text-paper">{name}</span>
        </div>
      }
    />
  )
}

export default function Recipes() {
  const [cat, setCat] = useState('all')
  const [millet, setMillet] = useState('all')
  const [q, setQ] = useState('')

  const milletOptions = useMemo(() => {
    const u = Array.from(new Set(recipes.map((r) => r.millet)))
    return [{ id: 'all', label: 'All grains' }, ...u.map((m) => ({ id: m, label: m }))]
  }, [])

  const filtered = useMemo(() => {
    return recipes.filter((r) =>
      (cat === 'all' || r.category === cat) &&
      (millet === 'all' || r.millet === millet) &&
      (!q || r.name.toLowerCase().includes(q.toLowerCase()) || r.blurb.toLowerCase().includes(q.toLowerCase()))
    )
  }, [cat, millet, q])

  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Recipes' }]} />
      </Container>

      <PageHero
        src={images.home.iymTable}
        alt="Traditional millet dishes"
        eyebrow="On the plate"
        title="The millet kitchen"
        lede="Breakfast, mains, snacks, sweets and drinks — from three official recipe books."
      />

      <section className="border-b border-stone-200 pt-8 pb-12">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="On the plate"
              title="The millet kitchen — from breakfast to feast."
              lede="A curated library drawing on three official recipe books — IIMR Millet Recipes 2021, GoI Nutri Cereals Recipes 2018 and FSSAI Shree Anna Canteen Book. Each card is tagged by region, grain and difficulty."
            />
          </div>
          <div className="lg:col-span-4">
            <Callout tone="millet" title="Cooking notes">
              Most millets benefit from a 30-minute soak before cooking. Dehulled millets cook in ~2.5× water; semolina-style rava in ~1.5×. Add a pinch of ghee for digestibility.
            </Callout>
          </div>
        </Container>
      </section>

      <section className="py-8 bg-paper border-b border-stone-200">
        <Container className="flex flex-wrap gap-5 items-end">
          <div>
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Category</div>
            <FilterChips value={cat} onChange={setCat} options={recipeCategories} />
          </div>
          <div>
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold mb-2">Grain</div>
            <FilterChips value={millet} onChange={setMillet} options={milletOptions} />
          </div>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search recipes…"
            className="ml-auto px-4 py-2 text-sm w-64 rounded-full border border-stone-300 bg-paper-50 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700"
          />
        </Container>
      </section>

      <section className="py-14 bg-paper-50">
        <Container>
          <div className="text-sm text-stone-600 mb-6 tabular">
            <span className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Showing</span> {filtered.length} of {recipes.length} recipes
          </div>
          {filtered.length === 0 ? (
            <Callout tone="millet">No recipes match your filter. Reset category or grain.</Callout>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <article key={r.id} className="bg-paper rounded-2xl ring-1 ring-stone-200 overflow-hidden hover:shadow-card transition">
                  <RecipeArt id={r.id} tone={r.tone} name={r.name} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag tone="forest">{r.millet}</Tag>
                      <Tag tone="paper">{r.category}</Tag>
                    </div>
                    <h3 className="mt-3 font-display text-xl text-ink">{r.name}</h3>
                    <div className="mt-1 text-2xs uppercase tracking-eyebrow text-stone-500">{r.region}</div>
                    <p className="mt-3 text-sm text-stone-600 leading-relaxed">{r.blurb}</p>
                    <div className="mt-4 flex items-center gap-4 text-2xs uppercase tracking-eyebrow text-stone-500">
                      <span>⏱ {r.time}</span>
                      <span>· {r.diff}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => <Tag key={t} tone="millet">{t}</Tag>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <Callout tone="forest" title="Source attribution">
            Recipe summaries are abstracted for educational use. Full preparation methods are available in the
            IIMR Millet Recipes 2021, GoI Nutri Cereals Recipes 2018 and FSSAI Shree Anna Canteen Book — all linked in the Resource Library.
          </Callout>
        </Container>
      </section>
    </>
  )
}
