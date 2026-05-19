# Millet Vista

India's ICAR-IIMR aligned **Shree Anna** knowledge portal — a production-grade React + Tailwind public reference for the nine millet crops of India.

Drawn from **30+ official ICAR, AICRP, FSSAI, NIN and Government of India publications** (the source library is browsable inside the site at `/resources`).

---

## What's inside

| Route | Page |
|---|---|
| `/` | Editorial home — hero, 9-millet grid, knowledge tiers, quick access, updates |
| `/millets` | Encyclopedia of 9 millets — filter Major / Minor |
| `/millets/:slug` | Deep crop profile — overview, agronomy, cultivars, nutrition, pests, recipes |
| `/package-of-practices` | POP database — filter by crop × season |
| `/varieties` | 35+ cultivars (hybrids + OPVs), searchable table |
| `/nutrition` | Comparative nutrition table + 10 health-benefit panels + GI/GL |
| `/recipes` | Categorised millet recipes |
| `/processing` | Eatrite value-added tech + vendor directory + licensing tariff |
| `/seed-hub` | SeedNet · TNAU · AP Seeds · State corporations · 4 private companies |
| `/resources` | All 30 source documents — categorised, year-stamped, linked |
| `/about` | Portal + institute overview |

---

## Stack

- **React 18** + **Vite**
- **React Router 6** (client-side routing)
- **Tailwind CSS 3** with a custom theme (`tailwind.config.js`) — earthy editorial palette, Fraunces × Inter typography
- No external UI library — every component built in-house in `src/components/`
- All inline SVG iconography in `src/components/icons/Icons.jsx`

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build to /dist
npm run preview  # preview the production build
```

---

## Project layout

```
src/
├─ data/                    9 typed data modules
│  ├─ site.js              site meta + nav
│  ├─ millets.js           9 crops · agronomy · nutrition · varieties
│  ├─ varieties.js         35+ cultivars
│  ├─ pop.js               9 POPs (crop × season × state)
│  ├─ nutrition.js         comparative table + 10 benefits + GI
│  ├─ recipes.js           18 recipes
│  ├─ processing.js        Eatrite techs + vendors + tariff
│  ├─ seedHub.js           portals + companies + tier framework
│  └─ resources.js         30 source PDFs
├─ components/
│  ├─ layout/  TopBar · Navbar (mega-menu) · Footer
│  ├─ ui/      Container, Eyebrow, Tag, Button, Stat, SectionTitle, FilterChips, Callout, Breadcrumb …
│  └─ icons/   Custom SVG icon set
├─ pages/      Home · MilletsIndex · MilletDetail · Pop · Varieties · Nutrition · Recipes · Processing · SeedHub · Resources · About · NotFound
├─ App.jsx     router shell
└─ index.css   Tailwind layers + base typography + custom utilities
```

---

## Sources

All technical claims trace to one of the 30 documents in `/resources`. Publishers include ICAR-IIMR (Hyderabad), AICRP on Pearl Millet (Jodhpur), AICRP on Small Millets (Bangalore), FSSAI, NIN, Directorate of Millets Development (Jaipur), VPKAS (Almora), TNAU (Coimbatore), UAS (Bangalore & Dharwad) and others.

Portal aligned to — but not officially published by — ICAR-Indian Institute of Millets Research. Educational use; please cite original publications when redistributing.

---

## Editorial principles

1. **Source-cited, never invented.** Every cultivar, every nutrient value, every POP number references a public PDF.
2. **Editorial typography.** Built with the discipline of a government institute publication — restrained palette, serif × sans pairing, dense data tables.
3. **No vendor endorsement.** Equipment listings document the market; verify locally before procurement.
4. **Public-good.** Free educational reference, not a commercial product.
