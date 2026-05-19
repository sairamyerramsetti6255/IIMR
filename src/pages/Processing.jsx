import { Container, SectionTitle, Eyebrow, Tag, Hairline, Callout, ExternalLink } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { images } from '../data/images.js'
import { eatriteTechs, tariff, licensingInclusions, vendors, customHiringModels } from '../data/processing.js'
import { Factory, Check } from '../components/icons/Icons.jsx'

export default function Processing() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Processing' }]} />
      </Container>

      <PageHero
        src={images.processing.hero}
        alt="Millet dehulling machine in village processing centre"
        eyebrow="Value chain"
        title="Processing & Eatrite technologies"
        lede="50+ value-added products, licensing tariff, equipment vendors and custom-hiring models."
      />

      <section className="border-b border-stone-200 pt-8 pb-14">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow="Value chain"
              title="From grain to packaged food — the IIMR processing stack."
              lede="Three layers: 50+ commercialisable value-added technologies under the Eatrite brand · 7 vendor categories for primary and secondary equipment · A custom-hiring model that has demonstrably 3–4× farmer income at the village level."
            />
          </div>
          <div className="lg:col-span-4">
            <Callout tone="forest" title="Licensing window">
              Open to entrepreneurs, existing processing firms and start-ups via the IIMR NIELAN-TBI. Express interest with Dr. B. Dayakar Rao — dayakar@millets.res.in.
            </Callout>
          </div>
        </Container>
      </section>

      {/* Tariff */}
      <section className="py-14 bg-paper-50 border-b border-stone-200">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow tone="forest">Licensing tariff</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">Per-technology rates.</h2>
            <p className="mt-3 text-stone-600 max-w-prose">A package of training, technology docket, machinery specifications and a nutritional profile is included with every license; a 3-year MoU governs use.</p>
            <ul className="mt-6 space-y-2 text-sm text-stone-700">
              {licensingInclusions.map((l) => (
                <li key={l} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-forest-700" /> {l}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200 bg-paper">
              <table className="w-full text-sm">
                <thead className="bg-paper-200/70 text-2xs uppercase tracking-eyebrow text-stone-600 font-semibold">
                  <tr>
                    <th className="text-left px-5 py-3.5">Number of technologies</th>
                    <th className="text-left px-5 py-3.5">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {tariff.map((t) => (
                    <tr key={t.count}>
                      <td className="px-5 py-4 text-ink">{t.count}</td>
                      <td className="px-5 py-4 text-ink font-medium tabular">{t.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-2xs uppercase tracking-eyebrow text-stone-500">
              Source · IIMR NIELAN-TBI · List of Value-added Technologies (Dec 2021)
            </p>
          </div>
        </Container>
      </section>

      {/* Eatrite list */}
      <section className="py-16">
        <Container>
          <SectionTitle
            eyebrow="Eatrite products"
            title="50+ value-added technologies, commercialised & developed."
            lede="Atta, flakes, vermicelli, pasta, idli/upma/pongal/khichdi mixes, cookies, puffs, laddus, energy bars — all developed and standardised by IIMR's product technology programme."
          />

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <Eyebrow tone="forest">Commercialised under Eatrite</Eyebrow>
              <h3 className="mt-2 font-display text-xl text-ink">{eatriteTechs.commercialized.length} technologies</h3>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {eatriteTechs.commercialized.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-stone-700 py-1 border-b border-stone-200/60">
                    <span className="text-2xs uppercase tracking-eyebrow text-stone-400 tabular w-8 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow tone="clay">Recently developed</Eyebrow>
              <h3 className="mt-2 font-display text-xl text-ink">{eatriteTechs.developed.length} technologies</h3>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {eatriteTechs.developed.map((t, i) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-stone-700 py-1 border-b border-stone-200/60">
                    <span className="text-2xs uppercase tracking-eyebrow text-stone-400 tabular w-8 pt-0.5">{String(i + 31).padStart(2, '0')}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Vendors */}
      <section className="py-16 bg-forest-800 text-paper">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow tone="paper" className="!text-millet-300">Equipment directory</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-paper text-balance">Vendors for primary & secondary processing.</h2>
            <p className="mt-4 text-paper-200/85 max-w-prose">
              Indicative manufacturers and commercialisation routes documented in the IIMR Millet AI Advisory Resource Directory. Verify specifications, food-contact materials, after-sales support and capacity before procurement — these are not endorsements.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vendors.map((v) => (
              <article key={v.name} className="rounded-2xl bg-forest-700/40 ring-1 ring-paper-200/10 p-6">
                <div className="flex items-center justify-between">
                  <Factory className="w-5 h-5 text-millet-300" />
                  <span className="text-2xs uppercase tracking-eyebrow text-millet-300">{v.region}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-paper">{v.name}</h3>
                <div className="mt-1 text-2xs uppercase tracking-eyebrow text-millet-300">{v.category}</div>
                <p className="mt-3 text-paper-200/90 text-sm leading-relaxed">{v.product}</p>
                <p className="mt-3 text-2xs text-paper-200/60">{v.note}</p>
                <Hairline className="my-4 opacity-30" />
                <ExternalLink href={v.url} className="!text-millet-200 hover:!text-paper text-sm">Visit website</ExternalLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Custom hiring */}
      <section className="py-16">
        <Container>
          <SectionTitle
            eyebrow="Custom hiring models"
            title="Village-level primary processing units that lift farmer income 3–4×."
            lede="From Gangapur in Telangana to Koraput in Odisha and Medziphema in Nagaland — IIMR's farm-gate primary-processing centres are documented in the Primary Processing of Millets booklet (2025)."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customHiringModels.map((c) => (
              <article key={c.site} className="rounded-2xl bg-paper ring-1 ring-stone-200 p-5">
                <Eyebrow tone="forest">{c.state}</Eyebrow>
                <div className="mt-3 font-display text-lg text-ink">{c.site}</div>
                <div className="mt-1 text-2xs uppercase tracking-eyebrow text-stone-500">{c.operator}</div>
                <p className="mt-3 text-sm text-stone-700 leading-relaxed">{c.impact}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
