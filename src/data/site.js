export const site = {
  name: 'Millet Vista',
  tagline: 'India\'s ICAR-IIMR aligned Shree Anna knowledge portal',
  publisher: 'Aligned to ICAR–Indian Institute of Millets Research (IIMR), Hyderabad',
  description:
    'A public, editorial-grade knowledge hub for India\'s nine millet crops — package of practices, cultivars, nutrition & health, recipes, processing technologies, seed availability and 30+ official sources.',
  updated: 'April 2026',
  yearsOfRecord: '1942 – 2026',
  contactEmail: 'director.millets@icar.gov.in',
  contactPhone: '+91 40 2459 9300',
  address:
    'ICAR-Indian Institute of Millets Research, Rajendranagar, Hyderabad 500 030, Telangana, India',
}

export const primaryNav = [
  {
    label: 'Millets',
    to: '/millets',
    description: 'Encyclopedia of 9 millet crops',
    children: [
      { label: 'Sorghum (Jowar)', to: '/millets/sorghum' },
      { label: 'Pearl Millet (Bajra)', to: '/millets/pearl-millet' },
      { label: 'Finger Millet (Ragi)', to: '/millets/finger-millet' },
      { label: 'Foxtail Millet (Kangni)', to: '/millets/foxtail-millet' },
      { label: 'Kodo Millet', to: '/millets/kodo-millet' },
      { label: 'Little Millet (Kutki)', to: '/millets/little-millet' },
      { label: 'Barnyard Millet (Sanwa)', to: '/millets/barnyard-millet' },
      { label: 'Proso Millet (Cheena)', to: '/millets/proso-millet' },
      { label: 'Browntop Millet', to: '/millets/browntop-millet' },
    ],
  },
  { label: 'Package of Practices', to: '/package-of-practices' },
  { label: 'Varieties', to: '/varieties' },
  { label: 'Nutrition & Health', to: '/nutrition' },
  { label: 'Recipes', to: '/recipes' },
  { label: 'Processing', to: '/processing' },
  { label: 'Seed Hub', to: '/seed-hub' },
  { label: 'Resources', to: '/resources' },
  { label: 'Ask AI', to: '/ask' },
]

export const heroStats = [
  { label: 'Area under millets', value: '17 M ha', caption: 'Pan-India, 9 crops' },
  { label: 'Annual production', value: '18 M T', caption: '~10% of food-grain basket' },
  { label: 'Pearl millet cultivars', value: '167 + 61', caption: 'Hybrids · OPVs (1942–2025)' },
  { label: 'States covered', value: '28', caption: 'All major agro-climatic zones' },
]

export const heroBadges = [
  { label: 'IYM 2023', tone: 'gold' },
  { label: 'Shree Anna', tone: 'forest' },
  { label: 'ICAR · FSSAI · GoI sources', tone: 'paper' },
]
