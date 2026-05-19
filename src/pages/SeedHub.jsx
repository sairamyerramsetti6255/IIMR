import { Container, SectionTitle, Eyebrow, Tag, Hairline, Callout, ExternalLink } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { seedPortals, seedCompanies, seedTiers } from '../data/seedHub.js'
import { Seed, Globe, ArrowUpRight } from '../components/icons/Icons.jsx'

export default function SeedHub() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Seed Hub' }]} />
      </Container>

      <PageHero
        src={images.seedHub.hero}
        alt="Millet seed samples in glass jars"
        eyebrow="Seed availability"
        title="Live portals & seed companies"
        lede="SeedNet, TNAU, AP Seeds, state corporations and private hybrid catalogues."
      />

      <section className="border-b border-stone-200 pt-8 pb-14">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Seed availability"
              title="Live portals, state corporations & private seed companies."
              lede="The operational seed-system layer — official live availability dashboards, university stock pages, public-sector corporations, and four major private seed companies that produce millet hybrids and OPVs."
            />
          </div>
          <div className="lg:col-span-4">
            <Callout tone="millet" title="Tip">
              SeedNet's live-availability dashboard is the closest thing India has to real-time multi-state stock visibility. Pair it with TNAU and AP Seeds for the cleanest institutional view.
            </Callout>
          </div>
        </Container>
      </section>

      {/* Tier framework */}
      <section className="py-12 bg-paper-50 border-b border-stone-200">
        <Container>
          <Eyebrow tone="forest">Framework</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-ink">The three-tier seed knowledge stack</h2>
          <div className="mt-6 grid lg:grid-cols-3 gap-5">
            {seedTiers.map((t) => (
              <article key={t.id} className="rounded-2xl ring-1 ring-stone-200 p-6 bg-paper">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl text-forest-700 tabular">0{t.id}</span>
                  <h3 className="font-display text-lg text-ink">{t.label}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-stone-700">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-forest-700" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Portals */}
      <section className="py-16">
        <Container>
          <Eyebrow tone="forest">Official portals</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-ink">Government seed-system websites.</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seedPortals.map((p) => (
              <article key={p.name} className="rounded-2xl ring-1 ring-stone-200 p-6 bg-paper hover:shadow-card transition">
                <div className="flex items-center justify-between">
                  <Tag tone="forest">{p.tier}</Tag>
                  <Globe className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="mt-4 font-display text-xl text-ink leading-tight">{p.name}</h3>
                <div className="mt-1 text-2xs uppercase tracking-eyebrow text-stone-500">{p.owner}</div>
                <p className="mt-3 text-sm text-stone-700 leading-relaxed">{p.note}</p>
                <Hairline className="my-4" />
                <ExternalLink href={p.url} className="text-sm">Open portal</ExternalLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Companies */}
      <section className="py-16 bg-paper-50 border-t border-stone-200">
        <Container>
          <Eyebrow tone="clay">Private sector</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-ink">Seed companies with millet portfolios.</h2>
          <p className="mt-3 text-stone-600 max-w-prose">Catalogue and product-discovery surfaces. Stock generally flows through dealer networks, not via the company portal — confirm availability locally.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {seedCompanies.map((c) => (
              <article key={c.name} className="rounded-2xl ring-1 ring-stone-200 p-6 bg-paper">
                <Seed className="w-5 h-5 text-clay-700" />
                <h3 className="mt-4 font-display text-lg text-ink">{c.name}</h3>
                <p className="mt-2 text-sm text-stone-700">{c.focus}</p>
                <Hairline className="my-4" />
                <ExternalLink href={c.url} className="text-sm">Visit catalogue</ExternalLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <Callout tone="forest" title="Quality & traceability">
            For seed authenticity & traceability, refer to the Karnataka KSSOCA / SATHI portal and seed-certification protocols of the relevant State Seed Certification Agency.
          </Callout>
        </Container>
      </section>
    </>
  )
}
