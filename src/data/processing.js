// Value-added technologies + equipment vendors + licensing tariff
// Source: IIMR NIELAN-TBI "List of Technologies for Commercialization" (Dec 2021)
// + Millet AI Advisory Resource Directory (April 2026).

export const eatriteTechs = {
  commercialized: [
    'Jowar Atta', 'Jowar rich multigrain atta', 'Finger millet atta (ragi atta)',
    'Jowar idli rawa', 'Jowar rawa (upma rawa)', 'Jowar khichidi rawa',
    'Millet rawa', 'Jowar flakes (thin)', 'Jowar flakes (thick)',
    'Finger millet flakes (thin)', 'Finger millet vermicelli', 'Jowar vermicelli',
    'Jowar pasta', 'Jowar cookies', 'Finger millet cookies',
    'Proso millet rice', 'Barnyard millet sweet puffs', 'Little millet rice',
    'Kodo millet rice', 'Barnyard millet rice', 'Foxtail millet rice',
    'Jowar instant idli mix', 'Millet instant idli mix', 'Jowar instant pongal mix',
    'Jowar instant upma mix', 'Ragi veg. soup mix', 'Jowar puffs',
    'Pearl millet puffs', 'Multi-Millet laddu', 'Jowar muruku',
  ],
  developed: [
    'Jowar Museli', 'Pearl millet flakes (thin)', 'Jowar Lassi',
    'Ragi cake', 'Ragi pizza base', 'Zinc-rich jowar pasta',
    'Iron-rich jowar pasta', 'Ragi Bread', 'Jowar bread',
    'Jeera based jowar cookies', 'Ragi muffins', 'Foxtail millet vermicelli',
    'Foxtail millet pasta', 'Jowar khakhra', 'Multi-millet bread',
    'Jowar choco-chip cookies', 'Jowar instant khichdi mix', 'Multi-millet cookies',
    'Jowar extruded snack', 'Jowar cake', 'Ragi-based energy bar',
    'Zinc-rich jowar vermicelli', 'Zinc-rich jowar cookies', 'Iron-rich jowar vermicelli',
    'Jowar muffins', 'Almond-based jowar cookies',
  ],
}

export const tariff = [
  { count: '1', rate: '₹ 50,000 / technology' },
  { count: '2 – 3', rate: '₹ 33,000 / technology' },
  { count: '4 – 5', rate: '₹ 30,000 / technology' },
  { count: '6 +', rate: '₹ 25,000 / technology' },
]

export const licensingInclusions = [
  '2-day training programme for 1–2 representatives',
  'Technology docket with full SOPs',
  'Machinery details, specifications, suppliers',
  'Nutritional profile (proximate composition)',
  '3-year MoU with model agreement',
]

export const vendors = [
  { name: 'Perfura Technologies', category: 'Post-harvest / dehulling / grading', region: 'India',
    product: 'Millet processing lines: dehullers, destoners, graders, flour systems.',
    note: 'India-based specialist in millet post-harvest machinery.',
    url: 'https://perfura.in/' },
  { name: 'Perfura — Double-stage dehuller', category: 'Dehuller (product detail)', region: 'India',
    product: 'Maps machine type to little / kodo / foxtail / proso / barnyard millet.',
    note: 'Product detail page.',
    url: 'https://www.perfura.net/millet-processing-unit.html' },
  { name: 'Abhay Engineering', category: 'Flakes line', region: 'India',
    product: 'Millet flakes cooker / flakes processing line.',
    note: 'Useful for flakes / value-added plant directory.',
    url: 'https://www.abhayengineering.com/milltes-flakes.html' },
  { name: 'KK Lifesciences', category: 'Pilot / lab flaker', region: 'India',
    product: 'Lab-scale grain / millet flaker machine.',
    note: 'Suited to R&D and pilot plants.',
    url: 'https://www.kklifesciences.net/flaker-machine.html' },
  { name: 'Kalyan Machines — Snacks line', category: 'Extruded snacks', region: 'India',
    product: 'Automatic millet snacks puff processing line.',
    note: 'Commercial snack line.',
    url: 'https://www.kalyanmachines.com/our-products/automatic-millet-snacks-puff-processing-line-machines/' },
  { name: 'Kalyan Machines — Cookies plant', category: 'Bakery / cookies', region: 'India',
    product: 'Millet cookies plant.',
    note: 'Packaged millet foods.',
    url: 'https://www.kalyanmachines.com/our-products/millet-cookies-plant/' },
  { name: 'Agrinnovate India Ltd. / CIAE', category: 'Technology transfer', region: 'India (Govt.)',
    product: 'Power-operated millet flaking machine.',
    note: 'Government commercialization entry for flaking technology.',
    url: 'https://www.agrinnovateindia.com/technology.html?id=664' },
]

export const customHiringModels = [
  { state: 'Telangana', site: 'Gangapur, Sangareddy', operator: 'Swayam Shakti Foundation', impact: 'Farmer income 3–4× via clean-grade-dehull custom hiring' },
  { state: 'Maharashtra', site: 'Parbhani · Akola · Rahuri · Kolhapur', operator: 'AICRP-Sorghum / Small Millets', impact: 'Decentralised cleaning + dehulling units at AICRP nodes' },
  { state: 'Tamil Nadu', site: 'Athiyandal · Kolli Hills', operator: 'TNAU CEM · MSSRF (NASF)', impact: 'Tribal value chain in Kolli Hills hill ecology' },
  { state: 'Madhya Pradesh', site: 'Dindori', operator: 'AICRP-SM RARS, JNKVV', impact: 'Tribal belt mini-processing' },
  { state: 'Andhra Pradesh', site: 'Vizianagaram', operator: 'AICRP-SM, ANGRAU', impact: 'AP millet farmer aggregation' },
  { state: 'Odisha', site: 'Koraput', operator: 'MSSRF (NASF)', impact: 'Long-term tribal millet value-chain' },
  { state: 'Chhattisgarh', site: 'Jagadalpur', operator: 'AICRP-DA, IGKV', impact: 'Chhattisgarh primary processing node' },
  { state: 'Nagaland', site: 'Medziphema', operator: 'SASRD, Nagaland University', impact: 'NE millet processing capacity' },
]
