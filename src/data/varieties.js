// Cultivar database. Drawn from ICAR-IIMR "Millet Cultivars for Commercialization"
// (latest releases 2008–2023) and Pearl Millet Hybrids & Varieties (AICRP).

export const varieties = [
  // ── Sorghum ───────────────────────────────────────────────────────────
  { id: 'CSV27', crop: 'sorghum', name: 'CSV 27 (SPV 1870)', type: 'Variety', use: 'Dual-purpose', year: 2012, maturity: '117 d', yieldGrain: '28–29 q/ha', yieldFodder: '190–200 q/ha', states: ['Pan-India rainfed'], traits: 'Non-senescence, non-lodging, grain mould tolerant.', breeder: 'ICAR-IIMR, Hyderabad' },
  { id: 'CSV41', crop: 'sorghum', name: 'CSV 41', type: 'Variety', use: 'Kharif grain', year: 2019, maturity: '106–110 d', yieldGrain: '31.8 q/ha', yieldFodder: '160 q/ha', states: ['AP', 'TS', 'TN', 'Rajasthan', 'Gujarat'], traits: '9.72% protein; tolerant to grain mould, shoot fly, stem borer.', breeder: 'ICAR-IIMR, Hyderabad' },
  { id: 'CSH30', crop: 'sorghum', name: 'CSH 30', type: 'Hybrid', use: 'Kharif grain', year: 2012, maturity: '103 d', yieldGrain: '43 q/ha', yieldFodder: '140 q/ha', states: ['MH', 'KA', 'MP', 'S. Gujarat', 'N. AP'], traits: 'Tan, semi-compact panicle, lodging resistant, non-shattering.', breeder: 'ICAR-IIMR, Hyderabad' },
  { id: 'CSH41', crop: 'sorghum', name: 'CSH 41 (Jaicar Gold)', type: 'Hybrid', use: 'Kharif grain', year: 2018, maturity: '105 d', yieldGrain: '47 q/ha', yieldFodder: '124 q/ha', states: ['MP', 'Rajasthan', 'Gujarat', 'MH', 'KA', 'AP', 'TS', 'TN'], traits: 'High-yielding dwarf hybrid; resistant to pests & diseases.', breeder: 'ICAR-IIMR, Hyderabad' },
  { id: 'CSH42', crop: 'sorghum', name: 'CSH 42', type: 'Hybrid', use: 'Paddy fallow / summer', year: 2021, maturity: '100–105 d', yieldGrain: '40–42 q/ha', yieldFodder: '—', states: ['KA', 'AP', 'MP', 'Gujarat'], traits: 'Early; grain-mould tolerant; rice-fallow & summer suited.', breeder: 'UAS, Dharwad' },
  { id: 'CSV29R', crop: 'sorghum', name: 'CSV 29 R (SPV 2033)', type: 'Variety', use: 'Rabi grain', year: 2012, maturity: '118 d', yieldGrain: '25.5 q/ha', yieldFodder: '67.9 q/ha', states: ['MH', 'KA', 'AP'], traits: 'Dual-purpose; charcoal-rot resistant; shoot-fly tolerant.', breeder: 'ICAR-IIMR' },
  { id: 'CSV39R', crop: 'sorghum', name: 'CSV 39 R', type: 'Variety', use: 'Rabi grain', year: 2019, maturity: '110–115 d', yieldGrain: '27 q/ha', yieldFodder: '69 q/ha', states: ['MH', 'KA', 'AP', 'Gujarat'], traits: 'Tall, non-lodging, good roti quality.', breeder: 'PDKV, Akola' },
  { id: 'CSH24MF', crop: 'sorghum', name: 'CSH 24 MF', type: 'Hybrid', use: 'Multi-cut fodder', year: 2009, maturity: '105–110 d', yieldGrain: '—', yieldFodder: '914 q/ha green · 232 q/ha dry', states: ['UK', 'UP', 'Gujarat', 'Haryana', 'Punjab', 'Delhi'], traits: 'Tall, tan, thick juicy stem.', breeder: 'GBPUAT, Pantnagar' },
  { id: 'CSV33MF', crop: 'sorghum', name: 'CSV 33 MF', type: 'Variety', use: 'Multi-cut fodder', year: 2017, maturity: '104–145 d', yieldGrain: '—', yieldFodder: '1039 q/ha green · 280 q/ha dry', states: ['All India (Zone I & II)'], traits: 'Profuse tillering, thin stem, mod. pest resistance.', breeder: 'TNAU, Coimbatore' },
  { id: 'CSH43MF', crop: 'sorghum', name: 'CSH 43 MF', type: 'Hybrid', use: 'Multi-cut fodder', year: 2020, maturity: '—', yieldGrain: '965 q/ha', yieldFodder: '219 q/ha', states: ['Haryana', 'Punjab', 'Rajasthan', 'Gujarat', 'UK', 'UP', 'MH', 'TN', 'TS', 'KA'], traits: 'Green long broad leaves, juicy stalk.', breeder: 'GBPUAT, Pantnagar' },
  { id: 'CSV32F', crop: 'sorghum', name: 'CSV 32F (SPV 2128)', type: 'Variety', use: 'Single-cut forage', year: 2015, maturity: '70 d', yieldGrain: '—', yieldFodder: '460–480 q/ha green', states: ['MH', 'TN', 'KA'], traits: 'Tolerant to anthracnose.', breeder: 'ICAR-IIMR' },
  { id: 'CSH22SS', crop: 'sorghum', name: 'CSH 22 SS', type: 'Hybrid', use: 'Sweet sorghum', year: 2005, maturity: '115–125 d', yieldGrain: '17.5 q/ha', yieldFodder: '45 q/ha stalk', states: ['MH', 'KA', 'TN', 'AP', 'MP', 'UP', 'Rajasthan', 'Gujarat'], traits: 'Non-shattering, photo-sensitive.', breeder: 'ICAR-IIMR' },
  { id: 'CSV49SS', crop: 'sorghum', name: 'CSV 49 SS (Jaicar Raseela)', type: 'Variety', use: 'Sweet sorghum', year: 2021, maturity: '121–123 d', yieldGrain: '—', yieldFodder: '43–48 t/ha stalk · 16,000–18,000 L/ha juice', states: ['MH', 'TS', 'AP', 'KA', 'TN', 'Gujarat', 'MP', 'UP', 'Punjab'], traits: 'Brix 16–17%; downy-mildew, rust, blight tolerant.', breeder: 'ICAR-IIMR' },
  { id: 'CSV43BMR', crop: 'sorghum', name: 'CSV 43 BMR (Jaicar Nutrigraze)', type: 'Variety', use: 'Brown midrib fodder', year: 2022, maturity: '75 d (green) · 110–112 d (stover)', yieldGrain: '21.9 q/ha', yieldFodder: '155–160 q/ha dry', states: ['TS', 'AP', 'KA', 'MH', 'TN', 'Gujarat', 'MP', 'Rajasthan', 'UP', 'UK', 'Haryana', 'Jharkhand'], traits: 'Low lignin, high digestibility, dual-purpose.', breeder: 'AICRP Pearl millet, Jodhpur' },
  { id: 'CSV48', crop: 'sorghum', name: 'CSV 48 (Jaicar Urja)', type: 'Variety', use: 'High biomass / energy', year: 2021, maturity: '135–140 d', yieldGrain: '—', yieldFodder: '55–60 t/ha fresh · 17–20 t/ha dry · 370 L/ha ethanol', states: ['MH', 'TS', 'Gujarat', 'MP', 'Punjab', 'UK'], traits: 'High biomass & ethanol; resistant to leaf disease & shoot pests.', breeder: 'ICAR-IIMR' },

  // ── Pearl Millet ──────────────────────────────────────────────────────
  { id: 'MPMH35', crop: 'pearl-millet', name: 'MPMH 35 (Maru Sampada)', type: 'Hybrid', use: 'Kharif grain', year: 2020, maturity: '75 d', yieldGrain: '21.9 q/ha', yieldFodder: '51.9 q/ha stover', states: ['Rajasthan', 'Gujarat', 'Haryana'], traits: 'High Fe & Zn; resistant to downy mildew, blast, smut, rust, ergot.', breeder: 'AICRP Pearl Millet, Jodhpur' },
  { id: 'HHB67Improved', crop: 'pearl-millet', name: 'HHB 67 Improved', type: 'Hybrid', use: 'Kharif arid grain', year: 2005, maturity: '63–65 d', yieldGrain: '12–15 q/ha', yieldFodder: '25 q/ha', states: ['Rajasthan', 'Haryana', 'Gujarat'], traits: 'India\'s first MAS-developed hybrid; downy mildew resistant.', breeder: 'CCSHAU, Hisar' },
  { id: 'Dhanshakti', crop: 'pearl-millet', name: 'Dhanshakti (ICTP 8203 Fe 10-2)', type: 'Variety', use: 'Biofortified grain', year: 2014, maturity: '78 d', yieldGrain: '22 q/ha', yieldFodder: '—', states: ['MH', 'Rajasthan', 'Haryana', 'Gujarat', 'AP', 'TS', 'KA', 'TN'], traits: 'High Fe (~71 ppm) & Zn (~40 ppm); biofortified.', breeder: 'ICRISAT × MPKV' },
  { id: 'GHB905', crop: 'pearl-millet', name: 'GHB 905', type: 'Hybrid', use: 'Kharif grain', year: 2017, maturity: '78–80 d', yieldGrain: '26–28 q/ha', yieldFodder: '60–70 q/ha', states: ['Rajasthan', 'Gujarat', 'Haryana'], traits: 'Bold grain; downy mildew resistant.', breeder: 'JAU, Junagadh' },
  { id: 'KBH108', crop: 'pearl-millet', name: 'KBH 108', type: 'Hybrid', use: 'Kharif grain', year: 2014, maturity: '80 d', yieldGrain: '28 q/ha', yieldFodder: '—', states: ['Rajasthan', 'Gujarat', 'Haryana', 'UP', 'MP', 'Punjab', 'Delhi'], traits: 'Bold grain, downy mildew resistant.', breeder: 'Kaveri Seeds' },
  { id: 'MPMH17', crop: 'pearl-millet', name: 'MPMH 17', type: 'Hybrid', use: 'Kharif grain', year: 2012, maturity: '78 d', yieldGrain: '32 q/ha', yieldFodder: '—', states: ['Rajasthan', 'Gujarat', 'Haryana', 'UP', 'MP', 'Punjab', 'Delhi'], traits: 'High yield, broad adaptation.', breeder: 'AICRP Pearl Millet' },
  { id: 'Nandi70', crop: 'pearl-millet', name: 'Nandi 70', type: 'Hybrid', use: 'Summer grain', year: 2018, maturity: '85 d', yieldGrain: '38 q/ha', yieldFodder: '—', states: ['Gujarat', 'Rajasthan', 'MH', 'TN'], traits: 'Bold grain; summer-irrigated; heat tolerant.', breeder: 'Nandi Seeds' },
  { id: 'CZP9802', crop: 'pearl-millet', name: 'CZP 9802', type: 'Variety', use: 'Arid grain', year: 2003, maturity: '70 d', yieldGrain: '15 q/ha', yieldFodder: '40 q/ha', states: ['Rajasthan (arid)', 'Gujarat (Kutch)'], traits: 'Drought escape; for <400 mm rainfall zone.', breeder: 'CAZRI, Jodhpur' },
  { id: 'RHB233', crop: 'pearl-millet', name: 'RHB 233', type: 'Hybrid', use: 'Kharif grain', year: 2018, maturity: '78 d', yieldGrain: '30 q/ha', yieldFodder: '60 q/ha', states: ['Rajasthan'], traits: 'High yield in normal rainfall pockets.', breeder: 'AICRP Pearl Millet' },

  // ── Finger Millet ─────────────────────────────────────────────────────
  { id: 'CFMV1', crop: 'finger-millet', name: 'CFMV 1 (FMV 1116) Indravathi', type: 'Variety', use: 'Kharif grain', year: 2020, maturity: '110–115 d', yieldGrain: '30–32 q/ha', yieldFodder: '—', states: ['AP', 'TN', 'KA', 'Puducherry', 'Odisha'], traits: 'Tolerant to leaf/neck/finger blast; mod. resistant to banded blight.', breeder: 'ARS (ANGRAU), Vizianagaram' },
  { id: 'CFMV2', crop: 'finger-millet', name: 'CFMV 2 (FMV 1118)', type: 'Variety', use: 'Kharif/Rabi grain', year: 2020, maturity: '119–121 d', yieldGrain: '29–31 q/ha', yieldFodder: '—', states: ['AP', 'Chhattisgarh', 'Gujarat', 'MH', 'Odisha'], traits: 'Suitable for rainfed kharif & irrigated rabi.', breeder: 'HMRS (NAU), Waghai' },
  { id: 'CFMV3', crop: 'finger-millet', name: 'CFMV 3 (FMV 1137 / WN 591)', type: 'Variety', use: 'Kharif/Rabi grain', year: 2021, maturity: '120–125 d', yieldGrain: '32–33 q/ha', yieldFodder: '—', states: ['AP', 'TN', 'TS', 'MH', 'Gujarat'], traits: 'Mod. resistant to leaf/finger/neck blast, foot rot, banded blight.', breeder: 'HMRS (NAU), Waghai' },
  { id: 'GPU28', crop: 'finger-millet', name: 'GPU 28', type: 'Variety', use: 'Kharif grain', year: 1996, maturity: '110–120 d', yieldGrain: '28–30 q/ha', yieldFodder: '60 q/ha', states: ['KA', 'TN', 'AP'], traits: 'Long-standing blast-tolerant variety; widely adopted.', breeder: 'UAS, Bangalore (GKVK)' },
  { id: 'GPU48', crop: 'finger-millet', name: 'GPU 48', type: 'Variety', use: 'Kharif grain', year: 1998, maturity: '110 d', yieldGrain: '32 q/ha', yieldFodder: '65 q/ha', states: ['KA', 'TN'], traits: 'Resistant to blast.', breeder: 'UAS, Bangalore (GKVK)' },
  { id: 'GPU67', crop: 'finger-millet', name: 'GPU 67', type: 'Variety', use: 'Kharif grain', year: 2010, maturity: '105 d', yieldGrain: '32 q/ha', yieldFodder: '—', states: ['KA', 'TN', 'MH'], traits: 'Short duration; blast tolerant.', breeder: 'UAS, Bangalore' },
  { id: 'VL379', crop: 'finger-millet', name: 'VL Mandua 379', type: 'Variety', use: 'Rainfed', year: 2014, maturity: '105 d', yieldGrain: '24 q/ha', yieldFodder: '—', states: ['UK', 'Jharkhand', 'Bihar'], traits: 'Blast resistant; cold-tolerant; hill ecology.', breeder: 'VPKAS, Almora' },

  // ── Foxtail Millet ────────────────────────────────────────────────────
  { id: 'SiA3088', crop: 'foxtail-millet', name: 'SiA 3088 (Suryanandi)', type: 'Variety', use: 'Kharif grain', year: 2012, maturity: '85–90 d', yieldGrain: '20–25 q/ha', yieldFodder: '—', states: ['AP', 'Bihar', 'Gujarat', 'KA', 'MP', 'TN', 'UK'], traits: 'Highly responsive to N fertilizer.', breeder: 'RARS (ANGRAU), Nandyal' },
  { id: 'SiA3156', crop: 'foxtail-millet', name: 'SiA 3156', type: 'Variety', use: 'Kharif grain', year: 2019, maturity: '88–100 d', yieldGrain: '32 q/ha', yieldFodder: '60–70 q/ha', states: ['AP', 'KA', 'MP', 'TN'], traits: 'Resistant to head & grain smut; thin plant with profuse tillering.', breeder: 'UAS, Dharwad' },
  { id: 'SiA3085', crop: 'foxtail-millet', name: 'SiA 3085', type: 'Variety', use: 'Kharif grain', year: 2010, maturity: '90 d', yieldGrain: '22 q/ha', yieldFodder: '—', states: ['AP', 'KA', 'TN', 'TS'], traits: 'Bold grain; blast tolerant.', breeder: 'RARS, Nandyal' },
  { id: 'TNAU196', crop: 'foxtail-millet', name: 'TNAU 196', type: 'Variety', use: 'Kharif grain', year: 2013, maturity: '85 d', yieldGrain: '23 q/ha', yieldFodder: '—', states: ['TN', 'KA'], traits: 'Bold grain; drought tolerant.', breeder: 'TNAU, Coimbatore' },

  // ── Kodo Millet ───────────────────────────────────────────────────────
  { id: 'TNAU86', crop: 'kodo-millet', name: 'TNAU 86', type: 'Variety', use: 'Kharif grain', year: 2014, maturity: '95–110 d', yieldGrain: '27–30 q/ha', yieldFodder: '50–60 q/ha', states: ['AP', 'Chhattisgarh', 'Gujarat', 'KA', 'MP', 'TN', 'UP'], traits: 'Resistant to head smut, sheath blight, brown spot; drought tolerant.', breeder: 'TNAU, Coimbatore' },
  { id: 'CKMV1', crop: 'kodo-millet', name: 'CKMV 1 (KMV 545)', type: 'Variety', use: 'Kharif grain', year: 2020, maturity: '106–110 d', yieldGrain: '28.1 q/ha', yieldFodder: '70 q/ha', states: ['AP', 'Chhattisgarh', 'Gujarat', 'Jharkhand', 'KA', 'MP', 'TN', 'TS'], traits: 'High protein & Fe; tolerant to pests & diseases.', breeder: 'CEM (TNAU), Athiyandal' },
  { id: 'CKMV2', crop: 'kodo-millet', name: 'CKMV 2 (KMV 551 / GAK 3)', type: 'Variety', use: 'Kharif grain', year: 2021, maturity: '105–110 d', yieldGrain: '28.8 q/ha', yieldFodder: '—', states: ['AP', 'Chhattisgarh', 'Gujarat', 'MP', 'TN'], traits: 'Tolerant to leaf/neck/finger blast; mod. resistant to leaf blight.', breeder: 'HMRS (AAU), Dahod' },
  { id: 'GPUK3', crop: 'kodo-millet', name: 'GPUK 3', type: 'Variety', use: 'Kharif grain', year: 2008, maturity: '100 d', yieldGrain: '20 q/ha', yieldFodder: '—', states: ['MP', 'KA', 'TN', 'Gujarat', 'Chhattisgarh'], traits: 'Head-smut tolerant.', breeder: 'UAS, Bangalore' },

  // ── Little Millet ─────────────────────────────────────────────────────
  { id: 'CLMV1', crop: 'little-millet', name: 'CLMV 1 (Jaicar Sama 1) — LMV 518', type: 'Variety', use: 'Kharif grain', year: 2020, maturity: '85–90 d', yieldGrain: '14–16 q/ha', yieldFodder: '—', states: ['MH', 'AP', 'TS', 'TN', 'Puducherry'], traits: 'Medium-bold seed; non-lodging; shoot-fly resistant; Fe 40–50 ppm; protein 13–14%.', breeder: 'ICAR-IIMR, Hyderabad' },
  { id: 'OLM203', crop: 'little-millet', name: 'OLM 203', type: 'Variety', use: 'Kharif grain', year: 2006, maturity: '75 d', yieldGrain: '14 q/ha', yieldFodder: '—', states: ['Odisha', 'AP', 'TN', 'KA', 'Gujarat', 'MH'], traits: 'Widely adapted.', breeder: 'OUAT, Bhubaneswar' },
  { id: 'JK8', crop: 'little-millet', name: 'JK 8', type: 'Variety', use: 'Kharif grain', year: 2002, maturity: '75–80 d', yieldGrain: '13 q/ha', yieldFodder: '—', states: ['MP', 'AP', 'KA', 'Chhattisgarh'], traits: 'Drought tolerant.', breeder: 'JNKVV, Jabalpur' },
  { id: 'Paiyur2', crop: 'little-millet', name: 'Paiyur 2', type: 'Variety', use: 'Kharif/Rabi grain', year: 2000, maturity: '75 d', yieldGrain: '15 q/ha', yieldFodder: '—', states: ['TN'], traits: 'Short-duration TN release.', breeder: 'TNAU' },

  // ── Barnyard Millet ───────────────────────────────────────────────────
  { id: 'VL207', crop: 'barnyard-millet', name: 'VL 207', type: 'Variety', use: 'Rainfed', year: 2008, maturity: '85–100 d', yieldGrain: '20–22 q/ha', yieldFodder: '30–35 q/ha', states: ['All except Gujarat & TN'], traits: 'Erect plant; purple glume; widely adapted.', breeder: 'ICAR-VPKAS, Almora' },
  { id: 'DHBM932', crop: 'barnyard-millet', name: 'DHBM 93-2', type: 'Variety', use: 'Kharif grain', year: 2016, maturity: '95–100 d', yieldGrain: '22–24 q/ha', yieldFodder: '55–65 q/ha', states: ['All except UK & HP'], traits: 'Sturdy lodging-resistant; resistant to head & grain smut.', breeder: 'UAS, Dharwad' },
  { id: 'DHBM233', crop: 'barnyard-millet', name: 'DHBM 23-3', type: 'Variety', use: 'Kharif grain', year: 2012, maturity: '85–90 d', yieldGrain: '20–25 q/ha', yieldFodder: '—', states: ['AP', 'Bihar', 'Gujarat', 'KA', 'MP', 'TN', 'UK'], traits: 'Highly N-responsive.', breeder: 'UAS, Dharwad' },
  { id: 'VL172', crop: 'barnyard-millet', name: 'VL 172', type: 'Variety', use: 'Hill rainfed', year: 1998, maturity: '90 d', yieldGrain: '18 q/ha', yieldFodder: '—', states: ['UK', 'UP', 'KA'], traits: 'Hill ecology; cool tolerant.', breeder: 'VPKAS, Almora' },

  // ── Proso Millet ──────────────────────────────────────────────────────
  { id: 'TNAU202', crop: 'proso-millet', name: 'TNAU 202', type: 'Variety', use: 'Kharif grain', year: 2017, maturity: '70–75 d', yieldGrain: '18–20 q/ha', yieldFodder: '—', states: ['AP', 'MP', 'Chhattisgarh', 'KA', 'Gujarat', 'TN', 'Bihar'], traits: 'Profuse tillering; bold grains.', breeder: 'TNAU, Coimbatore' },
  { id: 'GPUP8', crop: 'proso-millet', name: 'GPUP 8', type: 'Variety', use: 'Kharif grain', year: 2010, maturity: '65 d', yieldGrain: '18 q/ha', yieldFodder: '—', states: ['KA', 'TN'], traits: 'Short duration.', breeder: 'UAS, Bangalore' },
]

export const varietyFilters = {
  crops: [
    { value: 'all', label: 'All crops' },
    { value: 'sorghum', label: 'Sorghum' },
    { value: 'pearl-millet', label: 'Pearl millet' },
    { value: 'finger-millet', label: 'Finger millet' },
    { value: 'foxtail-millet', label: 'Foxtail millet' },
    { value: 'kodo-millet', label: 'Kodo millet' },
    { value: 'little-millet', label: 'Little millet' },
    { value: 'barnyard-millet', label: 'Barnyard millet' },
    { value: 'proso-millet', label: 'Proso millet' },
  ],
  types: [
    { value: 'all', label: 'All types' },
    { value: 'Hybrid', label: 'Hybrids' },
    { value: 'Variety', label: 'Varieties' },
  ],
  uses: [
    { value: 'all', label: 'All uses' },
    { value: 'grain', label: 'Grain' },
    { value: 'fodder', label: 'Fodder' },
    { value: 'sweet', label: 'Sweet / Energy' },
    { value: 'biofort', label: 'Biofortified' },
  ],
}
