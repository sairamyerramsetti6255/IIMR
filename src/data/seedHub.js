// Seed-availability layer of the IIMR Millet AI Advisory Resource Directory.

export const seedPortals = [
  {
    tier: 'Live national dashboard',
    name: 'SeedNet India — Live Availability',
    owner: 'Government of India',
    note: 'Closest official real-time multi-state seed-availability dashboard. Live stock lookup by state, crop and agency.',
    url: 'https://seednet.gov.in/SMIS/SQLReports/RptSeedAvailability.aspx',
  },
  {
    tier: 'National breeder seed',
    name: 'SeedNet India — Breeder Seed',
    owner: 'Government of India',
    note: 'Breeder seed / seed-chain planning and official notices. Use for system-intelligence rather than retail.',
    url: 'https://seednet.gov.in/',
  },
  {
    tier: 'University seed stock',
    name: 'TNAU Seed Stock Position',
    owner: 'Tamil Nadu Agricultural University',
    note: 'Direct university seed-stock + ordering information. One of the clearest institutional stock portals.',
    url: 'https://tnauseed.in/',
  },
  {
    tier: 'State corporation',
    name: 'AP State Seeds Development Corporation',
    owner: 'Government of Andhra Pradesh',
    note: 'Public-sector supply portal covering jowar & millet crops; seasonal procurement flow.',
    url: 'https://apseeds.ap.gov.in/',
  },
  {
    tier: 'State corporation · crop page',
    name: 'AP Seeds — Millets',
    owner: 'AP Seeds',
    note: 'Crop list and millet coverage on the official AP Seeds website.',
    url: 'https://apseeds.ap.gov.in/Website/Millets.aspx',
  },
  {
    tier: 'State corporation',
    name: 'Karnataka State Seeds Corporation (KSSCL)',
    owner: 'Government of Karnataka',
    note: 'Official corporation portal — variety portfolio and dealer / corporate routes. Not a real-time dashboard.',
    url: 'https://ksscl.karnataka.gov.in/cms1/public/english',
  },
  {
    tier: 'Authenticity / traceability',
    name: 'KSSOCA / SATHI',
    owner: 'Karnataka Government',
    note: 'Authenticity, traceability and seed-system governance. Useful for the seed-validation layer.',
    url: 'https://kssoca.karnataka.gov.in/',
  },
  {
    tier: 'National corporation',
    name: 'National Seeds Corporation (NSC)',
    owner: 'Government of India',
    note: 'Official entry-point to NSC services & products.',
    url: 'https://www.india.gov.in/category/agriculture-rural-environment/subcategory/resources-for-agriculture/details/website-of-national-seeds-corporation-limited',
  },
]

export const seedCompanies = [
  { name: 'Advanta — Pearl Millet', focus: 'Pearl millet hybrid portfolio', url: 'https://in.advantaseeds.com/crops/pearl-millet' },
  { name: 'Kaveri Seeds — Field Crops', focus: 'Bajra · Sorghum hybrids', url: 'https://www.kaveriseeds.in/products/field-crops/' },
  { name: 'Mahyco — Pearl Millet', focus: 'Bajra hybrid product pages', url: 'https://www.mahyco.com/mrb-2240.html' },
  { name: 'Nuziveedu Seeds', focus: 'Sorghum & pearl millet coverage', url: 'https://nuziveeduseeds.com/' },
]

export const seedTiers = [
  { id: 1, label: 'Tier 1 — Core authoritative', items: ['ICAR–IIMR POPs', 'ICAR crop pages', 'AICRP variety compendia', 'FSSAI guidance', 'Directorate of Millets Development publications'] },
  { id: 2, label: 'Tier 2 — Operational seed system', items: ['SeedNet live availability', 'TNAU seed stock', 'AP Seeds', 'State seed corporations', 'Institutional seed portals'] },
  { id: 3, label: 'Tier 3 — Commercial discovery', items: ['Private seed company portfolios', 'Equipment vendor pages', 'Dealer networks', 'Refresh frequently — portfolios change fast'] },
]
