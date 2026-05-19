// Image paths — only files that exist under /public/images/ (PNG).
// Missing keys fall back to gradients in components.

export const images = {
  home: {
    hero: '/images/home/hero-panicle.png',
    grainFlatlay: '/images/home/grain-flatlay.png',
    iymTable: '/images/home/iym-table.png',
    processing: '/images/home/processing-mill.png',
  },
  millets: {
    indexHero: '/images/home/grain-flatlay.png',
    sorghum: '/images/millets/sorghum-hero.png',
    'pearl-millet': '/images/millets/pearl-millet-hero.png',
    'finger-millet': '/images/millets/finger-millet-hero.png',
    'foxtail-millet': '/images/millets/foxtail-millet-hero.png',
    'kodo-millet': '/images/millets/kodo-millet-hero.png',
    'little-millet': '/images/millets/little-millet-hero.png',
    'barnyard-millet': '/images/millets/barnyard-millet-hero.png',
    'proso-millet': '/images/millets/proso-millet-hero.png',
    'browntop-millet': '/images/millets/browntop-millet-hero.png',
  },
  pop: {
    hero: '/images/pop/sowing-field.png',
    ipm: '/images/pop/ipm-trap.png',
  },
  varieties: {
    hero: '/images/varieties/seed-jars.png',
    trial: '/images/varieties/trial-plots.png',
  },
  nutrition: {
    hero: '/images/nutrition/grain-comparison.png',
    ragi: '/images/nutrition/ragi-calcium.png',
    bowl: '/images/nutrition/diabetic-bowl.png',
  },
  recipes: {
    'ragi-mudde': '/images/recipes/ragi-mudde.png',
    'bajra-khichdi': '/images/recipes/bajra-khichdi.png',
    'jowar-roti': '/images/recipes/jowar-bhakri.png',
    'foxtail-pongal': '/images/recipes/foxtail-pongal.png',
    'ragi-malt': '/images/recipes/ragi-malt.png',
    'multi-energy-bar': '/images/recipes/multi-millet-bar.png',
    'samai-upma': '/images/recipes/samai-upma.png',
    'bajra-laddoo': '/images/recipes/bajra-laddoo.png',
    'kodo-idli': '/images/recipes/kodo-idli.png',
    'sanwa-khichdi': '/images/recipes/sanwa-khichdi.png',
  },
  processing: {
    hero: '/images/processing/dehuller.png',
    flakes: '/images/processing/flakes.png',
    packaging: '/images/processing/packaging.png',
  },
  seedHub: {
    hero: '/images/seedhub/seed-packets.png',
    store: '/images/seedhub/breeder-store.png',
  },
  resources: {
    hero: '/images/resources/library-shelf.png',
    documents: '/images/resources/documents.png',
  },
  about: {
    hero: '/images/about/iimr-campus.png',
    team: '/images/about/research-team.png',
  },
}

export function milletHeroImage(slug) {
  return images.millets[slug] || null
}

export function recipeImage(id) {
  return images.recipes[id] || null
}

/** Returns src if file is in our known-wired set; pages use onError fallback otherwise */
export function pageHeroImage(section, key = 'hero') {
  return images[section]?.[key] ?? null
}
