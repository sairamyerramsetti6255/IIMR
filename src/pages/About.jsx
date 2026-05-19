import { Link } from 'react-router-dom'
import { Container, SectionTitle, Eyebrow, Tag, Hairline, Callout, Button, ExternalLink } from '../components/ui/Primitives.jsx'
import Breadcrumb from '../components/ui/Breadcrumb.jsx'
import { PanicleArt, Panicle, Globe, Book, Beaker } from '../components/icons/Icons.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import PageImage from '../components/ui/PageImage.jsx'
import { images } from '../data/images.js'
import { site } from '../data/site.js'

export default function About() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </Container>

      <PageHero
        src={images.about.hero}
        alt="ICAR agricultural research institute campus"
        eyebrow="About Millet Vista"
        title="India's Shree Anna knowledge portal"
        lede="Aligned to ICAR–IIMR, Hyderabad — built from 30+ official publications."
      />

      <section className="border-b border-stone-200 pt-8 pb-16">
        <Container className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="forest">About the portal</Eyebrow>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl text-ink leading-tight tracking-tighter2 text-balance">
              A public, editorial-grade reference for India's millet ecosystem.
            </h1>
            <p className="mt-5 text-lg text-stone-700 leading-relaxed max-w-prose text-pretty">
              Millet Vista distils 30+ official ICAR–IIMR, AICRP, FSSAI, NIN and Government of India publications into a single, navigable web reference. The portal is aligned to — but not officially published by — ICAR-Indian Institute of Millets Research, Hyderabad.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed max-w-prose">
              The architecture follows the three-tier framework set out in the IIMR Millet AI Advisory Resource Directory (April 2026): authoritative science first, operational seed system second, commercial discovery third.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Tag tone="forest">ICAR-IIMR aligned</Tag>
              <Tag tone="millet">IYM 2023+ Shree Anna</Tag>
              <Tag tone="clay">FAO TCP/RAS/3909</Tag>
              <Tag tone="paper">Last updated {site.updated}</Tag>
            </div>
          </div>
          <div className="lg:col-span-5 flex items-start justify-center">
            <div className="relative w-full max-w-md">
              <PageImage
                src={images.about.hero}
                alt="ICAR-IIMR campus"
                className="rounded-2xl shadow-card ring-1 ring-stone-200 aspect-[4/3]"
                imgClassName="w-full h-full object-cover"
                fallback={<PanicleArt className="w-72 h-auto" />}
              />
              <div className="absolute -bottom-3 -right-4 px-4 py-3 rounded-xl bg-paper border border-stone-200 shadow-card">
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500">Global Centre of Excellence</div>
                <div className="mt-0.5 text-sm font-display text-ink">ICAR-IIMR, Hyderabad</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* IIMR snapshot */}
      <section className="py-16 bg-paper-50 border-b border-stone-200">
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow tone="forest">The institute</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">ICAR-Indian Institute of Millets Research.</h2>
            <p className="mt-3 text-stone-700 max-w-prose">
              IIMR is the nodal institute under the Indian Council of Agricultural Research dedicated to millets (Shree Anna). In 2023, during the United Nations International Year of Millets, the Government of India declared IIMR the Global Centre of Excellence on Millets.
            </p>
            <Hairline className="my-6" />
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Location', 'Rajendranagar, Hyderabad'],
                ['Mandate crops', 'Sorghum, pearl millet, finger millet + 5 small millets'],
                ['Programmes', 'AICRP Pearl Millet · AICRP Sorghum · AICRP Small Millets'],
                ['Phone', site.contactPhone],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{k}</dt>
                  <dd className="mt-1 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex gap-3">
              <ExternalLink href="https://www.millets.res.in/" className="text-sm">millets.res.in</ExternalLink>
              <ExternalLink href="https://www.aicpmip.res.in/" className="text-sm">aicpmip.res.in</ExternalLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow tone="clay">IYM 2023 context</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-ink">A turning point for Shree Anna.</h2>
            <p className="mt-3 text-stone-700 leading-relaxed max-w-prose">
              The proposal of the Government of India to the United Nations for declaring 2023 as the International Year of Millets was supported by 72 countries. Aligned with India's G20 Presidency theme of <em>One Earth, One Family, One Future</em>, the IYM brought millet productivity, processing and policy back to the centre of global food-systems planning.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { label: 'India share of Asia millet output', value: '> 80%' },
                { label: 'Co-sponsoring nations at UN', value: '72' },
                { label: 'Production at IYM launch', value: '> 17 M T' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-paper ring-1 ring-stone-200 p-4">
                  <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">{s.label}</div>
                  <div className="mt-1 font-display text-2xl text-ink tabular">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial principles */}
      <section className="py-16">
        <Container>
          <SectionTitle eyebrow="Editorial principles" title="How Millet Vista is built." />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Book, title: 'Source-cited, never invented', body: 'Every cultivar, every nutrition value, every POP number traces to a public PDF in the Resource Library.' },
              { icon: Globe, title: 'Pan-India scope', body: '28 states across kharif, rabi and summer ecologies — from arid Rajasthan to the Northeast hills.' },
              { icon: Beaker, title: 'Science-first', body: 'Health claims pair a clear summary with the underlying NIN-IIMR evidence; we treat advisory as a craft.' },
              { icon: Panicle, title: 'Editorial typography', body: 'Designed with the discipline of a government institute publication — serif display, dense tables, restrained palette.' },
              { icon: Globe, title: 'Independent of vendors', body: 'Equipment listings are documentation, not endorsement. Verify locally before procurement.' },
              { icon: Book, title: 'Public good', body: 'Released as an educational reference; please cite original publications when redistributing.' },
            ].map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl bg-paper ring-1 ring-stone-200 p-6">
                <Icon className="w-5 h-5 text-forest-700" />
                <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Container>
          <Callout tone="forest" title="Get in touch">
            For licensing queries on IIMR value-added technologies, write to <em>dayakar@millets.res.in</em>. For institute matters, see <Link to="/" className="underline">millets.res.in</Link>. For corrections to this portal, contact the editor.
            <div className="mt-4 flex gap-3">
              <Button to="/resources">Open resource library</Button>
              <Button to="/millets" tone="outline">Browse millets</Button>
            </div>
          </Callout>
        </Container>
      </section>
    </>
  )
}
