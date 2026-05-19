import { Link } from 'react-router-dom'
import { Container, Eyebrow, Tag, Button, Hairline } from '../components/ui/Primitives.jsx'
import {
  PanicleArt, ArrowRight, ArrowUpRight, Panicle, Grain, Leaf, Drop, Sun,
  Heart, Book, Beaker, Seed, Factory, Doc, Globe, Search,
} from '../components/icons/Icons.jsx'
import PageImage from '../components/ui/PageImage.jsx'
import { images } from '../data/images.js'
import { site } from '../data/site.js'
import { millets } from '../data/millets.js'
import { seedTiers } from '../data/seedHub.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

// ─────────────────────────────────────────────────────────────────────────
// 01 · MASTHEAD — editorial date strip with publication metadata
// ─────────────────────────────────────────────────────────────────────────
function Masthead() {
  return (
    <div className="border-b border-stone-200 bg-paper">
      <Container className="flex items-center justify-between py-3 text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
        <div className="flex items-center gap-6">
          <span>Volume I · Edition 26</span>
          <span className="hidden md:inline opacity-50">·</span>
          <span className="hidden md:inline">{site.updated}</span>
          <span className="hidden md:inline opacity-50">·</span>
          <span className="hidden lg:inline">Aligned to ICAR–IIMR, Hyderabad</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">Public reference · educational use</span>
          <span className="inline-flex items-center gap-2 text-forest-700">
            <span className="w-1.5 h-1.5 rounded-full bg-millet-500 animate-pulse" />
            Live dossier
          </span>
        </div>
      </Container>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 02 · HERO — magazine masthead grid with asymmetric typography
// ─────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper cv-section">
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none gpu-layer" />
      <div className="absolute -top-32 -right-40 w-[40rem] h-[40rem] rounded-full bg-millet-200/40 blur-3xl opacity-70 gpu-layer" aria-hidden />
      <div className="absolute -bottom-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-forest-200/30 blur-3xl opacity-70 gpu-layer" aria-hidden />

      <Container className="relative pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Top kicker bar */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-forest-700 text-millet-300">
              <Panicle className="w-4 h-4" />
            </span>
            <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
              <span className="text-forest-700">A national knowledge dossier</span>
              <span className="mx-2 opacity-40">·</span>
              <span>Shree Anna · Nine grains · One reference</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
            <span>EN</span><span className="opacity-30">/</span>
            <span className="opacity-50">हि</span><span className="opacity-30">/</span>
            <span className="opacity-50">తె</span>
          </div>
        </div>

        {/* Grid hero: left rail · headline · image */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Side rail — print-journal metadata */}
          <aside className="hidden lg:flex lg:col-span-1 flex-col items-start gap-8 pt-4 text-2xs uppercase tracking-eyebrow font-semibold text-stone-500">
            <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
              <span className="text-forest-700">Issue 26</span>
              <span className="mx-3 opacity-40">·</span>
              <span>{site.yearsOfRecord}</span>
            </div>
          </aside>

          {/* Main copy column */}
          <div className="lg:col-span-7 flex flex-col" data-reveal>
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <Tag tone="forest">ICAR–IIMR aligned</Tag>
              <Tag tone="millet">IYM 2023+</Tag>
              <Tag tone="clay">Shree Anna</Tag>
            </div>

            <h1 className="font-display font-medium text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-tighter2 text-ink text-balance">
              India&rsquo;s nutrient
              <br />
              <span className="italic text-forest-700">powerhouse,</span>
              <br />
              documented{' '}
              <span className="relative inline-block">
                end-to-end.
                <span className="absolute left-0 right-0 -bottom-2 h-2 bg-millet-300/70 -z-0" aria-hidden />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-stone-700 leading-relaxed text-pretty drop-cap">
              Millet Vista is a public, editorial-grade reference for India&rsquo;s nine millet crops — drawn from 30+ official ICAR, FSSAI and Government of India publications. Each cultivar, agronomic decision, nutrition value and processing route is sourced, cited and openly readable.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button to="/millets" tone="forest" size="lg">Open the encyclopedia</Button>
              <Button to="/resources" tone="outline" size="lg" icon={Doc}>Read source PDFs</Button>
              <Link to="/varieties" className="text-sm font-semibold text-stone-600 hover:text-forest-700 ml-2 hidden sm:inline-flex items-center gap-1">
                Or browse 35+ cultivars <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Print-journal signature */}
            <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-700 text-millet-300 inline-flex items-center justify-center font-display text-base">MV</div>
                <div>
                  <div className="text-sm font-semibold text-ink">The Editors, Millet Vista</div>
                  <div className="text-2xs uppercase tracking-eyebrow text-stone-500">Hyderabad · {site.updated}</div>
                </div>
              </div>
              <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
                <span className="text-forest-700">Trust signal —</span> Built on 30 official PDFs · 0 ad partners
              </div>
            </div>
          </div>

          {/* Hero image with editorial inset cards */}
          <div className="lg:col-span-4 relative" data-reveal style={{ transitionDelay: '120ms' }}>
            <div className="relative w-full">
              <PageImage
                src={images.home.hero}
                alt="Pearl millet panicles at golden hour, Rajasthan"
                className="rounded-3xl shadow-card ring-1 ring-stone-200 aspect-[3/4] bg-stone-100"
                imgClassName="w-full h-full object-cover"
                loading="eager"
                fallback={<div className="w-full h-full bg-gradient-to-br from-forest-700 to-millet-500 flex items-center justify-center"><PanicleArt className="w-48" /></div>}
              />
              {/* corner volume badge */}
              <div className="absolute -top-4 -left-4 bg-forest-700 text-paper rounded-2xl px-4 py-3 shadow-card ring-1 ring-millet-400/30">
                <div className="text-2xs uppercase tracking-eyebrow text-millet-300 font-semibold">Cover essay</div>
                <div className="mt-1 font-display text-xl leading-tight">Vol. I · Ed. 26</div>
              </div>
              {/* bottom-right stat */}
              <div className="absolute -bottom-5 -right-4 bg-millet-400 text-ink rounded-2xl px-5 py-4 shadow-card ring-1 ring-millet-600/30 animate-float">
                <div className="text-2xs uppercase tracking-eyebrow text-forest-800 font-bold">Finger millet</div>
                <div className="mt-1 font-display text-3xl tabular leading-none text-forest-900">344<span className="text-base ml-0.5 align-top">mg</span></div>
                <div className="text-2xs text-forest-800/70 mt-1 font-semibold">Calcium per 100 g · highest of any cereal</div>
              </div>
              {/* left middle stat */}
              <div className="absolute top-1/3 -left-10 hidden md:block bg-paper border border-stone-200 rounded-xl px-4 py-3 shadow-card">
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">Pearl millet</div>
                <div className="mt-1 font-display text-xl text-ink tabular">167<span className="text-stone-400 mx-1">/</span>61</div>
                <div className="text-2xs text-stone-500">Hybrids · OPVs since 1942</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 03 · TICKER — horizontal marquee of headline statistics
// ─────────────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    ['Area under millets', '17 M ha'],
    ['Annual production', '18 M T'],
    ['Pearl millet cultivars', '167 hybrids + 61 OPVs'],
    ['Finger millet Calcium', '344 mg / 100 g'],
    ['Water saving vs rice', '70 %'],
    ['Eatrite value-added techs', '50 +'],
    ['Sources documented', '30 PDFs'],
    ['Years of record', '1942 – 2026'],
    ['States covered', '28'],
    ['Crops profiled', '9'],
  ]
  const doubled = [...items, ...items]
  return (
    <section className="bg-forest-800 text-paper border-y border-forest-900/50 overflow-hidden">
      <div className="relative mask-fade-x">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {doubled.map(([label, value], i) => (
            <span key={i} className="inline-flex items-center gap-3 px-8">
              <span className="text-2xs uppercase tracking-eyebrow text-millet-300 font-semibold">{label}</span>
              <span className="font-display text-xl text-paper tabular">{value}</span>
              <span className="text-millet-400/60 ml-4">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 04 · EDITORIAL INDEX — like a magazine table of contents
// ─────────────────────────────────────────────────────────────────────────
function EditorialIndex() {
  const entries = [
    { num: 'I',    to: '/millets',                  title: 'The nine millets',          sub: 'Encyclopedia · agronomy · cultivars',       pg: '01' },
    { num: 'II',   to: '/package-of-practices',     title: 'Package of Practices',      sub: 'Crop × season × state · IPM',                pg: '04' },
    { num: 'III',  to: '/varieties',                title: 'Cultivars database',        sub: '35+ ICAR / AICRP / SAU releases',            pg: '07' },
    { num: 'IV',   to: '/nutrition',                title: 'Nutrition & Health',        sub: 'Comparison · GI · 10 health panels',          pg: '11' },
    { num: 'V',    to: '/recipes',                  title: 'The millet kitchen',        sub: 'Breakfast · mains · sweets · drinks',         pg: '14' },
    { num: 'VI',   to: '/processing',               title: 'Processing & Eatrite',      sub: '50+ value-added technologies',                pg: '17' },
    { num: 'VII',  to: '/seed-hub',                 title: 'Seed availability',          sub: 'SeedNet · state corporations',               pg: '20' },
    { num: 'VIII', to: '/resources',                title: 'Source library',            sub: '30 official ICAR · FSSAI · GoI PDFs',         pg: '23' },
  ]
  return (
    <section className="py-20 bg-paper cv-section">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12" data-reveal>
          <div className="max-w-2xl">
            <Eyebrow tone="forest">In this dossier</Eyebrow>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-ink tracking-tight2 text-balance">
              An index — read it like a journal.
            </h2>
          </div>
          <div className="text-sm text-stone-600 max-w-sm">
            Each section is editorially independent and individually citable. Tap any entry to open the chapter.
          </div>
        </div>

        <ol className="border-t border-stone-300" data-reveal="stagger">
          {entries.map((e) => (
            <li key={e.num} className="border-b border-stone-300 group">
              <Link to={e.to} className="grid grid-cols-12 gap-4 items-baseline py-5 hover:bg-paper-200/50 transition-colors px-2">
                <span className="col-span-1 font-display text-2xl text-millet-500 tabular">{e.num}</span>
                <span className="col-span-6 lg:col-span-5 font-display text-xl lg:text-2xl text-ink group-hover:text-forest-700 transition-colors text-balance">
                  {e.title}
                </span>
                <span className="hidden lg:inline col-span-5 text-sm text-stone-500 dot-leader text-stone-300 self-end pb-1">
                  <span className="bg-paper pr-2 text-stone-600">{e.sub}</span>
                </span>
                <span className="col-span-5 lg:col-span-1 text-right text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold tabular">
                  pg. {e.pg}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 05 · 9-MILLET BENTO — asymmetric photo-led grid (Major large, Minor small)
// ─────────────────────────────────────────────────────────────────────────
function MilletBento() {
  const major = millets.slice(0, 3)
  const minor = millets.slice(3)
  const tone = (slug) => ({
    sorghum:           'from-clay-700 to-clay-500',
    'pearl-millet':    'from-millet-700 to-millet-500',
    'finger-millet':   'from-forest-800 to-forest-600',
    'foxtail-millet':  'from-millet-600 to-millet-400',
    'kodo-millet':     'from-stone-700 to-stone-500',
    'little-millet':   'from-sage-700 to-sage-500',
    'barnyard-millet': 'from-forest-700 to-sage-500',
    'proso-millet':    'from-brass-700 to-brass-500',
    'browntop-millet': 'from-clay-800 to-clay-600',
  }[slug] || 'from-forest-700 to-millet-500')

  return (
    <section className="bg-paper-200/40 border-y border-stone-200 py-20 cv-section">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10" data-reveal>
          <div className="max-w-2xl">
            <Eyebrow tone="forest">Chapter I — the nine</Eyebrow>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-ink tracking-tight2 text-balance">
              Three majors. Six minors. <span className="italic text-forest-700">One basket.</span>
            </h2>
            <p className="mt-4 text-stone-600 text-pretty max-w-prose">
              India&rsquo;s Shree Anna basket spans three high-acreage staples and six climate-resilient niches. Tap any tile to read the full crop profile — agronomy, varieties, nutrition, pests, and regional recipes.
            </p>
          </div>
          <Link to="/millets" className="text-sm font-semibold text-forest-700 hover:underline inline-flex items-center gap-1">
            View encyclopedia <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Major millets — large 3-up */}
        <div className="grid md:grid-cols-3 gap-5 mb-5" data-reveal="stagger">
          {major.map((m, i) => (
            <Link
              key={m.slug}
              to={`/millets/${m.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${tone(m.slug)} text-paper ring-1 ring-black/5 transition-transform hover:-translate-y-1 ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              <PageImage
                src={images.millets[m.slug]}
                alt={m.name}
                className="absolute inset-0 opacity-60 group-hover:opacity-70 transition-opacity"
                imgClassName="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/30 to-transparent" />
              <div className="relative p-6 h-72 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <Tag tone="millet" className="bg-millet-400/90 text-forest-900 ring-millet-400">Major</Tag>
                  <span className="font-display text-3xl text-millet-300/80 tabular">0{i + 1}</span>
                </div>
                <div>
                  <div className="text-2xs uppercase tracking-eyebrow text-millet-200 font-semibold">{m.hindi}</div>
                  <h3 className="mt-1 font-display text-3xl text-paper">{m.name}</h3>
                  <div className="mt-3 flex items-center gap-4 text-2xs text-paper-200/80 uppercase tracking-eyebrow font-semibold">
                    <span>{m.duration}</span>
                    <span className="w-px h-3 bg-paper-200/30" />
                    <span className="tabular">{m.yield.grain}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Minor millets — 6-up smaller tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" data-reveal="stagger">
          {minor.map((m, i) => (
            <Link
              key={m.slug}
              to={`/millets/${m.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tone(m.slug)} text-paper ring-1 ring-black/5 transition-transform hover:-translate-y-1`}
            >
              <PageImage
                src={images.millets[m.slug]}
                alt={m.name}
                className="absolute inset-0 opacity-55 group-hover:opacity-70 transition"
                imgClassName="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/30 to-transparent" />
              <div className="relative p-4 h-44 flex flex-col justify-between">
                <span className="font-display text-xl text-millet-300/70 tabular">0{i + 4}</span>
                <div>
                  <div className="text-2xs uppercase tracking-eyebrow text-millet-200">{m.hindi}</div>
                  <div className="font-display text-base text-paper leading-tight">{m.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 06 · PULL QUOTE / Director's Note — magazine editorial letter style
// ─────────────────────────────────────────────────────────────────────────
function PullQuote() {
  return (
    <section className="bg-paper py-24 relative overflow-hidden cv-section">
      <div className="absolute inset-0 opacity-[0.04] gpu-layer" style={{ backgroundImage: 'radial-gradient(circle, #1B2046 1px, transparent 1.5px)', backgroundSize: '24px 24px' }} aria-hidden />
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-center" data-reveal>
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <span className="font-display text-[12rem] leading-none text-millet-400 -mt-8 select-none">&ldquo;</span>
          </div>
          <div className="lg:col-span-10">
            <blockquote className="font-display text-3xl lg:text-[2.5rem] leading-[1.15] tracking-tight2 text-ink text-balance">
              India produced 18 million tonnes of millets in 2023 — more than the entire continent of Africa combined.
              The challenge is no longer cultivation. <span className="italic text-forest-700">It is rediscovery.</span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-px h-10 bg-millet-400" />
              <div>
                <div className="text-sm font-semibold text-ink">Adapted from the IIMR Director&rsquo;s foreword</div>
                <div className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
                  Indian Farming · IYM 2023 Special Issue · DKMA
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 07 · DATA SPOTLIGHT — editorial number callouts with provenance
// ─────────────────────────────────────────────────────────────────────────
function DataSpotlight() {
  const points = [
    { num: '344', unit: 'mg', label: 'Calcium in finger millet, per 100 g',                src: 'NIN · IFCT 2017' },
    { num: '70',  unit: '%',  label: 'Less water than rice for an equivalent harvest',     src: 'GAP Manual 2025' },
    { num: '167', unit: '',   label: 'Pearl millet hybrids released since 1942',           src: 'AICRP Compendium' },
    { num: '50',  unit: '+',  label: 'Eatrite value-added technologies for licensing',     src: 'IIMR NIELAN-TBI' },
    { num: '28',  unit: '',   label: 'States with notified millet POPs',                   src: 'ICAR-IIMR POPs' },
    { num: '10',  unit: '',   label: 'Clinical health domains with evidence panels',       src: 'NIN-IIMR studies' },
  ]
  return (
    <section className="bg-forest-800 text-paper py-24 relative overflow-hidden cv-section">
      <div className="absolute inset-0 grid-lines opacity-[0.08] gpu-layer" aria-hidden />
      <div className="absolute -right-32 top-0 w-96 h-96 rounded-full bg-millet-500/15 blur-3xl gpu-layer" aria-hidden />
      <Container className="relative">
        <div className="max-w-3xl mb-14" data-reveal>
          <Eyebrow tone="paper" className="!text-millet-300">By the numbers</Eyebrow>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl text-paper tracking-tight2 text-balance">
            Six figures that decide the millet conversation.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-forest-700/40 rounded-2xl overflow-hidden ring-1 ring-millet-400/15" data-reveal="stagger">
          {points.map((p) => (
            <article key={p.label} className="bg-forest-800 p-7 hover:bg-forest-700/60 transition-colors">
              <div className="flex items-baseline gap-1 font-display text-7xl text-millet-300 tabular leading-none">
                {p.num}<span className="text-3xl text-millet-400/80">{p.unit}</span>
              </div>
              <div className="mt-5 text-paper text-pretty text-base leading-snug">{p.label}</div>
              <div className="mt-4 text-2xs uppercase tracking-eyebrow text-millet-300/70 font-semibold">Source · {p.src}</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 08 · KNOWLEDGE LADDER — three-tier advisory stack (vertical)
// ─────────────────────────────────────────────────────────────────────────
function KnowledgeLadder() {
  const icons = { 1: Book, 2: Seed, 3: Factory }
  return (
    <section className="py-24 bg-paper-50 border-y border-stone-200 cv-section">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow tone="forest">Knowledge architecture</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-ink tracking-tight2 text-balance">
              A three-tier ladder — <span className="italic text-forest-700">science first.</span>
            </h2>
            <p className="mt-5 text-stone-700 text-pretty max-w-md">
              Built the way the IIMR Millet AI Advisory Resource Directory recommends: authoritative science first, operational seed system second, commercial discovery third.
            </p>
            <Link to="/resources" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 hover:underline">
              Read source framework <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-8 relative">
            {/* vertical timeline rail */}
            <div className="absolute left-4 top-3 bottom-3 w-px bg-stone-300 hidden md:block" aria-hidden />
            <ol className="space-y-5" data-reveal="stagger">
              {seedTiers.map((t) => {
                const Icon = icons[t.id]
                return (
                  <li key={t.id} className="relative md:pl-16">
                    <span className="hidden md:flex absolute left-0 top-5 w-8 h-8 rounded-full bg-forest-700 text-millet-300 items-center justify-center ring-4 ring-paper-50 font-display text-sm">
                      {t.id}
                    </span>
                    <article className="rounded-2xl bg-paper ring-1 ring-stone-200 p-7 hover:shadow-card transition">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-forest-700 font-semibold">
                            <Icon className="w-4 h-4" /> Tier 0{t.id}
                          </div>
                          <h3 className="mt-2 font-display text-2xl text-ink">{t.label}</h3>
                        </div>
                        <span className="text-2xs uppercase tracking-eyebrow text-stone-400 font-semibold tabular">{String(t.items.length).padStart(2, '0')} items</span>
                      </div>
                      <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-stone-700">
                        {t.items.map((i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-sm bg-millet-400 shrink-0" />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 09 · QUICK ACCESS MATRIX — dense, government-portal-style grid
// ─────────────────────────────────────────────────────────────────────────
function QuickAccess() {
  const items = [
    { to: '/package-of-practices', icon: Leaf,    title: 'Package of Practices',   desc: 'Crop × state agronomy, IPM modules, harvest windows.',     tag: '9 crops' },
    { to: '/varieties',            icon: Grain,   title: 'Varieties Database',     desc: 'Searchable cultivars from ICAR, AICRP and SAUs.',          tag: '35+' },
    { to: '/nutrition',            icon: Heart,   title: 'Nutrition & Health',     desc: 'Compare millets to rice, wheat, maize. 10 panels.',        tag: 'NIN data' },
    { to: '/recipes',              icon: Beaker,  title: 'Recipes',                desc: 'Editorial-grade recipes — breakfast to drinks.',           tag: '18' },
    { to: '/processing',           icon: Factory, title: 'Processing & Tech',      desc: '50+ Eatrite products · 7 vendor categories.',              tag: 'Tariff' },
    { to: '/seed-hub',             icon: Seed,    title: 'Seed Hub',               desc: 'Live SeedNet + state corporations + 4 companies.',         tag: 'Live' },
    { to: '/resources',            icon: Doc,     title: 'Resource Library',       desc: '30 source PDFs, categorised and linked.',                  tag: '30' },
    { to: '/about',                icon: Globe,   title: 'About IIMR',             desc: 'Global Centre of Excellence on Millets.',                  tag: 'Institute' },
  ]
  return (
    <section className="py-24 bg-paper cv-section">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12" data-reveal>
          <div>
            <Eyebrow tone="forest">Quick access</Eyebrow>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-ink tracking-tight2">Jump to your chapter.</h2>
          </div>
          <div className="relative max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="search"
              placeholder="Search cultivar, recipe, source…"
              className="pl-10 pr-4 py-3 w-full text-sm rounded-full border border-stone-300 bg-paper-50 focus:outline-none focus:ring-2 focus:ring-forest-700/30 focus:border-forest-700"
              onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = `/resources?q=${encodeURIComponent(e.currentTarget.value)}` }}
            />
          </div>
        </div>
        <div className="grid gap-px bg-stone-200 rounded-3xl overflow-hidden ring-1 ring-stone-200 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {items.map(({ to, icon: Icon, title, desc, tag }) => (
            <Link key={to} to={to} className="bg-paper p-7 hover:bg-millet-50 transition group flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-forest-700/8 text-forest-700 group-hover:bg-forest-700 group-hover:text-millet-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold tabular">{tag}</span>
              </div>
              <h3 className="font-display text-xl text-ink leading-tight">{title}</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed flex-1">{desc}</p>
              <div className="mt-5 text-sm font-semibold text-forest-700 inline-flex items-center gap-1.5 opacity-70 group-hover:opacity-100">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 10 · LATEST DISPATCHES — magazine-style 3-up updates
// ─────────────────────────────────────────────────────────────────────────
function Dispatches() {
  const items = [
    { kind: 'Release',  tone: 'forest', date: 'Dec 2025', title: 'GAP Manual for Sustainable Millets Production',
      body: 'A 147-page FAO-supported manual covering 12 millet crops — agronomy, water, weed and IPM guidance, with state-specific notes.',
      to: '/resources' },
    { kind: 'Cultivar', tone: 'millet', date: '2023',     title: 'CSV 52 SS — high-juice sweet sorghum for ethanol',
      body: 'A 120-day, 16–17% Brix sweet sorghum variety with 47–50 t/ha fresh stalk yield. Recommended across Maharashtra, Telangana, Tamil Nadu and Punjab.',
      to: '/varieties' },
    { kind: 'Field',    tone: 'clay',   date: 'May 2025', title: 'Custom-hiring centres lift income 3–4×',
      body: 'New IIMR study documents primary-processing custom-hiring units across Telangana, Maharashtra, Tamil Nadu, MP, AP, Odisha, Chhattisgarh and Nagaland.',
      to: '/processing' },
  ]
  return (
    <section className="py-24 bg-paper-50 border-t border-stone-200 cv-section">
      <Container>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12" data-reveal>
          <div>
            <Eyebrow tone="forest">Latest dispatches</Eyebrow>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-ink tracking-tight2 text-balance">From the field & the institute.</h2>
          </div>
          <Link to="/resources" className="text-sm font-semibold text-forest-700 inline-flex items-center gap-1 hover:underline">
            View all dispatches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6" data-reveal="stagger">
          {items.map((i, idx) => (
            <Link key={i.title} to={i.to} className="group relative bg-paper rounded-2xl p-7 ring-1 ring-stone-200 hover:shadow-card lift">
              <div className="flex items-center justify-between text-2xs uppercase tracking-eyebrow text-stone-500 font-semibold">
                <Tag tone={i.tone}>{i.kind}</Tag>
                <span>No. {String(idx + 1).padStart(2, '0')} · {i.date}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink leading-snug text-balance group-hover:text-forest-700 transition-colors">{i.title}</h3>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">{i.body}</p>
              <Hairline className="my-5" />
              <div className="text-sm font-semibold text-forest-700 inline-flex items-center gap-1.5">
                Read source <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// 11 · CTA — heritage-pattern closing band
// ─────────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-paper py-20 cv-section">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-800 text-paper" data-reveal>
          <PageImage
            src={images.home.iymTable}
            alt=""
            className="absolute inset-0 opacity-25"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/95 via-forest-800/80 to-forest-700/40" />
          {/* heritage pattern strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-millet-400 via-clay-500 to-forest-500" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-forest-500 via-clay-500 to-millet-400" />

          <div className="relative grid lg:grid-cols-12 gap-10 p-10 lg:p-16">
            <div className="lg:col-span-8">
              <Eyebrow tone="paper" className="!text-millet-300">Closing word</Eyebrow>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl text-paper tracking-tight2 text-balance">
                Use Millet Vista as a daily working reference.
              </h2>
              <p className="mt-5 text-paper-200/90 max-w-2xl text-pretty">
                Built for farmers, extension officers, FPO operators, food-tech founders, researchers and policymakers. Field-ready POPs · sourced cultivar data · comparative nutrition · live seed-availability links.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/millets" tone="millet" size="lg">Begin with the 9 millets</Button>
                <Button to="/resources" tone="outline" size="lg" className="!text-paper !ring-paper-200/30 hover:!bg-paper/10">Open resource library</Button>
              </div>
            </div>
            <div className="lg:col-span-4 flex items-end">
              <div className="w-full rounded-2xl bg-forest-700/40 ring-1 ring-millet-400/20 p-6">
                <div className="text-2xs uppercase tracking-eyebrow text-millet-300 font-semibold">Editorial standard</div>
                <ul className="mt-4 space-y-3 text-sm text-paper-200/95">
                  <li className="flex items-start gap-2"><span className="mt-1.5 inline-block w-1.5 h-1.5 bg-millet-400 rounded-sm shrink-0" />Every data point sourced & citable.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 inline-block w-1.5 h-1.5 bg-millet-400 rounded-sm shrink-0" />No vendor endorsements.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 inline-block w-1.5 h-1.5 bg-millet-400 rounded-sm shrink-0" />Public good · educational use.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal([])
  return (
    <>
      <Masthead />
      <Hero />
      <Ticker />
      <EditorialIndex />
      <MilletBento />
      <PullQuote />
      <DataSpotlight />
      <KnowledgeLadder />
      <QuickAccess />
      <Dispatches />
      <CTA />
    </>
  )
}
