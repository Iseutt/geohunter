/**
 * ============================================================
 *  GEORANK — Game Database
 * ============================================================
 *
 * CATEGORY SOURCES & METHODOLOGY
 * --------------------------------
 *
 * 0. FOOTBALL — FIFA Men's World Rankings (April 2026)
 *    Source : https://football-ranking.com/fifa-world-rankings
 *             https://www.fifa.com/en/world-rankings
 *    Method : Official FIFA/Coca-Cola ranking points system.
 *             Positions 1–50 verified; 51+ estimated from known FIFA data.
 *             Rank 1 = strongest national team.
 *
 * 1. CAR MANUFACTURER — Total Motor Vehicle Production (2023/2024, OICA)
 *    Source : https://en.wikipedia.org/wiki/List_of_countries_by_motor_vehicle_production
 *             CEOWORLD Magazine (2024) · visualcapitalist.com
 *    Method : Passenger cars + commercial vehicles produced per year.
 *             Rank 1 = highest producer (China, ~30 M units).
 *
 * 2. HIGHEST GDP — IMF Nominal GDP, current USD (2024)
 *    Source : https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)
 *             IMF World Economic Outlook, April 2026
 *    Method : Nominal GDP in billions USD. Rank 1 = largest economy (USA).
 *
 * 3. NUMBER OF IMMIGRANTS — UN International Migrant Stock (2024)
 *    Source : https://en.wikipedia.org/wiki/List_of_sovereign_states_by_immigrant_and_emigrant_population
 *             UN DESA International Migrant Stock 2024
 *             IOM World Migration Report 2024
 *    Method : Total foreign-born population residing in country.
 *             Rank 1 = most immigrants (USA, ~52 M).
 *
 * 4. MOST DRUG USERS — Estimated total past-year drug users (absolute count)
 *    Source : UNODC World Drug Report 2023 (https://www.unodc.org)
 *             WorldPopulationReview drug-use data (2026)
 *             PMC / Frontiers in Public Health (2025): global drug-use disorder burden
 *    Method : UNODC prevalence rates × working-age population.
 *             Covers cannabis, opioids, cocaine, amphetamines (net, partially deduplicated).
 *             Rank 1 = most total drug users (India, est. ~50 M).
 *             Note: Figures are estimates; high uncertainty for many countries.
 *
 * 5. MOST ANIMAL DIVERSITY — Total species richness (vertebrates + vascular plants)
 *    Source : https://worldrainforests.com/03highest_biodiversity.htm
 *             Conservation International megadiverse-countries list (1998, updated)
 *             World Economic Forum / Statista biodiversity data (2024)
 *             theswiftest.com Biodiversity Index (2022)
 *    Method : Composite of amphibians, birds, fish, mammals, reptiles, vascular plants.
 *             Rank 1 = highest species count (Brazil, ~41 000+ species).
 *             Covers 239 territories.
 *
 * 6. MURDERS IN TOTAL — Intentional homicides, absolute count
 *    Source : UNODC Global Study on Homicide 2023 (https://www.unodc.org)
 *             Wikipedia – List of countries by intentional homicide rate
 *    Method : Total intentional homicides, most recent available year (2021–2024).
 *             Rank 1 = most murders (Brazil, ~40 700).
 *             (*) = estimated from rate × population where direct count unavailable.
 *
 * 7. MOST SPORTS EVENTS — Major international events hosted (all-time composite)
 *    Source : Wikipedia – List of Olympic Games host cities
 *             List of FIFA World Cup hosts · World Athletics Championships history
 *             Commonwealth Games host list · Rugby World Cup hosts
 *             Cricket World Cup (Men's ODI) host list
 *    Method : Weighted composite score per country:
 *               Summer Olympics ×3 · FIFA World Cup ×3 · Winter Olympics ×2
 *               World Athletics Championships ×1 · Commonwealth Games ×1
 *               Rugby World Cup ×1 · Cricket World Cup ×1
 *             Future confirmed hosts included (e.g. Brisbane 2032).
 *             Rank 1 = highest weighted score (USA, 26 pts).
 *             Only 38 countries have hosted at least one qualifying event.
 *
 * ============================================================
 *
 * DATA FORMAT
 *   Each country entry is an 8-element array:
 *   [football, cars, gdp, immigrants, drugs, biodiversity, murders, sports, elevation]
 *   null = no data / N/A → scores as (category.total + 1) in game.
 *
 * ============================================================
 */

const DB = {

  /* ── Category metadata ─────────────────────────────────────── */
  categories: [
    {
      id: 'football',
      label: 'Football',
      icon: '⚽',
      total: 211,
      color: '#22c55e',
      source: 'FIFA World Rankings (April 2026)',
      description: 'Rank of the national men\'s football team (FIFA). Rank 1 = best team.'
    },
    {
      id: 'cars',
      label: 'Car Manufacturer',
      icon: '🚗',
      total: 50,
      color: '#3b82f6',
      source: 'OICA motor vehicle production 2023/24',
      description: 'Total motor vehicles produced per year. Rank 1 = most production.'
    },
    {
      id: 'gdp',
      label: 'Highest GDP',
      icon: '💰',
      total: 195,
      color: '#eab308',
      source: 'IMF Nominal GDP 2024 (current USD)',
      description: 'Nominal GDP in current USD. Rank 1 = largest economy.'
    },
    {
      id: 'immigrants',
      label: 'No. of Immigrants',
      icon: '✈️',
      total: 195,
      color: '#a855f7',
      source: 'UN International Migrant Stock 2024',
      description: 'Total foreign-born population. Rank 1 = most immigrants.'
    },
    {
      id: 'drugs',
      label: 'Most Drug Users',
      icon: '💊',
      total: 195,
      color: '#ec4899',
      source: 'UNODC World Drug Report 2023 (estimated absolute count)',
      description: 'Estimated past-year drug users (absolute). Rank 1 = most users.'
    },
    {
      id: 'biodiversity',
      label: 'Animal Diversity',
      icon: '🦁',
      total: 239,
      color: '#14b8a6',
      source: 'Total species richness (vertebrates + vascular plants)',
      description: 'Composite species count. Rank 1 = most biodiverse country.'
    },
    {
      id: 'murders',
      label: 'Murders in Total',
      icon: '🔪',
      total: 195,
      color: '#ef4444',
      source: 'UNODC Global Study on Homicide 2023',
      description: 'Total intentional homicides. Rank 1 = most murders.'
    },
    {
      id: 'sports',
      label: 'Most Sports Events',
      icon: '🏆',
      total: 211,
      color: '#f97316',
      source: 'Composite: Olympics · FIFA WC · Athletics · CWG · RWC · CricketWC',
      description: 'Weighted count of major international events hosted. Rank 1 = most.'
    },
    {
      id: 'elevation',
      label: 'Lowest Elevation',
      icon: '🌊',
      total: 171,
      color: '#06b6d4',
      source: 'Wikipedia – List of countries by average elevation',
      description: 'Mean elevation above sea level. Rank 1 = lowest/flattest country.'
    }
  ],

  /* ── Country data ──────────────────────────────────────────── */
  /*  Format: [football, cars, gdp, immigrants, drugs, biodiversity, murders, sports, elevation]  */
  countries: {

    /* ═══════ NORTH AMERICA ═══════ */
    'United States':        [16,  2,   1,   1,   2,   10,  6,   1,   129],
    'Canada':               [30,  14,  11,  8,   13,  54,  60,  8,   96 ],
    'Mexico':               [15,  7,   13,  40,  6,   6,   4,   10,  146],

    /* ═══════ CENTRAL AMERICA & CARIBBEAN ═══════ */
    'Guatemala':            [68,  null,68,  null,null,31,  18,  null,128],
    'Honduras':             [58,  null,101, null,47,  33,  20,  null,118],
    'El Salvador':          [61,  null,100, null,null,70,  27,  null,86 ],
    'Costa Rica':           [59,  null,78,  null,null,27,  48,  null,125],
    'Panama':               [33,  null,83,  null,null,24,  46,  null,63 ],
    'Nicaragua':            [80,  null,null,null,null,39,  null,null,49 ],
    'Cuba':                 [106, null,129, null,null,73,  null,null,15 ],
    'Jamaica':              [55,  null,104, null,48,  139, 31,  38,  60 ],
    'Dominican Republic':   [72,  null,67,  null,null,137, 33,  null,78 ],
    'Haiti':                [77,  null,124, null,null,138, 16,  null,92 ],
    'Trinidad and Tobago':  [107, null,134, null,null,140, null,null,10 ],
    'Guyana':               [null,null,149, null,null,35,  null,null,33 ],
    'Suriname':             [null,null,null,null,null,40,  null,null,38 ],
    'Barbados':             [null,null,null,null,null,null,null,null,26 ],
    'Belize':               [null,null,150, null,null,69,  null,null,27 ],

    /* ═══════ SOUTH AMERICA ═══════ */
    'Brazil':               [6,   8,   10,  43,  5,   1,   1,   9,   55 ],
    'Argentina':            [3,   25,  27,  38,  23,  21,  26,  27,  109],
    'Colombia':             [12,  40,  33,  23,  14,  4,   8,   null,108],
    'Venezuela':            [50,  null,76,  null,40,  11,  7,   null,88 ],
    'Chile':                [53,  null,45,  41,  44,  66,  32,  29,  165],
    'Peru':                 [51,  null,46,  39,  42,  5,   22,  null,160],
    'Ecuador':              [23,  47,  66,  null,null,9,   11,  null,148],
    'Bolivia':              [52,  null,87,  null,null,14,  38,  null,153],
    'Paraguay':             [41,  null,93,  null,null,56,  43,  null,30 ],
    'Uruguay':              [17,  null,82,  null,null,null,null,28,  16 ],

    /* ═══════ WESTERN EUROPE ═══════ */
    'United Kingdom':       [4,   19,  5,   5,   11,  92,  42,  3,   24 ],
    'France':               [1,   11,  7,   4,   12,  93,  35,  2,   66 ],
    'Germany':              [10,  6,   3,   2,   10,  94,  44,  4,   42 ],
    'Italy':                [14,  26,  8,   13,  22,  95,  52,  6,   102],
    'Spain':                [2,   9,   14,  7,   20,  71,  55,  15,  114],
    'Portugal':             [5,   29,  47,  47,  45,  96,  62,  null,65 ],
    'Netherlands':          [7,   43,  18,  25,  35,  106, 65,  25,  4  ],
    'Belgium':              [9,   31,  24,  30,  36,  105, 63,  26,  31 ],
    'Switzerland':          [19,  null,20,  29,  null,104, 70,  22,  157],
    'Austria':              [24,  38,  29,  31,  null,103, 72,  23,  138],
    'Sweden':               [37,  32,  25,  33,  41,  100, 68,  16,  54 ],
    'Norway':               [31,  null,31,  51,  null,101, 69,  21,  91 ],
    'Denmark':              [21,  null,38,  54,  null,107, 71,  null,6  ],
    'Finland':              [69,  42,  50,  null,null,102, 73,  19,  25 ],
    'Ireland':              [56,  null,23,  44,  null,124, 80,  null,18 ],
    'Luxembourg':           [150, null,77,  null,null,125, null,null,57 ],

    /* ═══════ SOUTHERN EUROPE ═══════ */
    'Greece':               [47,  null,52,  41,  49,  97,  78,  17,  98 ],
    'Croatia':              [11,  null,73,  null,null,112, 82,  null,59 ],
    'Serbia':               [40,  null,75,  55,  null,111, 83,  null,87 ],
    'Albania':              [70,  null,null,null,null,115, null,null,121],
    'Slovenia':             [86,  39,  85,  null,null,114, 84,  null,97 ],
    'Bosnia-Herzegovina':   [73,  null,140, null,null,113, null,31,  99 ],
    'Cyprus':               [110, null,143, null,null,127, null,null,13 ],
    'Malta':                [155, null,144, null,null,126, null,null,41 ],

    /* ═══════ EASTERN EUROPE ═══════ */
    'Poland':               [35,  21,  21,  39,  34,  99,  62,  null,28 ],
    'Czech Republic':       [38,  12,  42,  50,  46,  108, 74,  null,79 ],
    'Slovakia':             [48,  17,  62,  null,null,109, 75,  null,90 ],
    'Hungary':              [42,  28,  55,  null,null,110, 76,  35,  21 ],
    'Romania':              [54,  23,  39,  null,48,  98,  51,  null,75 ],
    'Bulgaria':             [65,  null,64,  null,null,116, 77,  null,93 ],
    'Ukraine':              [32,  null,57,  14,  33,  117, 50,  null,29 ],
    'Belarus':              [90,  null,80,  49,  null,118, 86,  null,23 ],
    'Moldova':              [108, null,136, null,null,122, null,null,20 ],
    'Kosovo':               [104, null,137, null,null,null,null,null,133],
    'North Macedonia':      [95,  null,null,null,null,null,null,null,124],
    'Montenegro':           [105, null,null,null,null,null,null,null,145],

    /* ═══════ BALTIC STATES ═══════ */
    'Latvia':               [100, null,95,  null,null,119, null,null],
    'Lithuania':            [107, null,79,  null,null,121, null,null],
    'Estonia':              [112, null,135, null,null,120, null,null],

    /* ═══════ CAUCASUS ═══════ */
    'Armenia':              [69,  null,103, null,null,91,  null,null],
    'Georgia':              [82,  null,141, null,null,90,  null,null],
    'Azerbaijan':           [68,  45,  90,  null,null,89,  null,null],

    /* ═══════ NORDIC / ISLANDS ═══════ */
    'Iceland':              [72,  null,102, null,null,123, null,null],
    'Faroe Islands':        [123, null,null,null,null,null,null,null],
    'Andorra':              [120, null,null,null,null,null,null,null],
    'San Marino':           [121, null,null,null,null,null,null,null],
    'Liechtenstein':        [188, null,null,null,null,null,null,null],

    /* ═══════ RUSSIA ═══════ */
    'Russia':               [36,  18,  9,   10,  7,   58,  9,   11 ],

    /* ═══════ TURKEY ═══════ */
    'Turkey':               [22,  13,  16,  12,  26,  72,  23,  null],

    /* ═══════ MIDDLE EAST ═══════ */
    'Saudi Arabia':         [78,  null,19,  3,   null,79,  null,null],
    'UAE':                  [132, null,30,  9,   null,133, null,null],
    'Qatar':                [57,  null,58,  null,null,130, null,24 ],
    'Kuwait':               [130, null,61,  21,  null,131, null,null],
    'Bahrain':              [129, null,99,  55,  null,129, null,null],
    'Oman':                 [131, null,72,  32,  null,132, null,null],
    'Jordan':               [74,  null,91,  19,  null,78,  null,null],
    'Iraq':                 [67,  null,56,  null,null,77,  39,  null],
    'Lebanon':              [93,  null,null,43,  null,135, 50,  null],
    'Syria':                [95,  null,null,null,null,136, null,null],
    'Israel':               [71,  null,26,  35,  null,134, null,null],
    'Iran':                 [20,  16,  53,  17,  18,  46,  25,  null],
    'Yemen':                [null,null,null,null,null,null,null,null],

    /* ═══════ CENTRAL ASIA ═══════ */
    'Kazakhstan':           [122, 35,  49,  34,  null,84,  null,null],
    'Uzbekistan':           [49,  27,  60,  null,null,83,  null,null],
    'Tajikistan':           [125, null,118, null,null,87,  null,null],
    'Kyrgyzstan':           [127, null,117, null,null,86,  null,null],
    'Turkmenistan':         [128, null,88,  null,null,85,  null,null],
    'Afghanistan':          [125, null,110, null,16,  82,  30,  null],
    'Mongolia':             [113, null,130, null,null,88,  null,null],

    /* ═══════ SOUTH ASIA ═══════ */
    'India':                [101, 4,   6,   15,  1,   8,   2,   20 ],
    'Pakistan':             [102, 34,  44,  16,  8,   51,  10,  33 ],
    'Bangladesh':           [103, null,37,  26,  21,  61,  19,  37 ],
    'Sri Lanka':            [104, null,81,  null,null,59,  null,34 ],
    'Nepal':                [116, null,116, null,null,48,  null,null],

    /* ═══════ EAST ASIA ═══════ */
    'China':                [91,  1,   2,   null,3,   3,   13,  13 ],
    'Japan':                [18,  3,   4,   20,  null,26,  null,5  ],
    'South Korea':          [25,  5,   15,  27,  null,145, null,12 ],
    'Taiwan':               [116, 30,  22,  46,  null,38,  null,null],
    'North Korea':          [null,null,null,null,null,144, null,null],
    'Hong Kong':            [null,null,41,  24,  null,null,null,null],

    /* ═══════ SOUTH-EAST ASIA ═══════ */
    'Vietnam':              [98,  33,  34,  57,  null,15,  null,null],
    'Thailand':             [97,  10,  32,  22,  28,  19,  null,null],
    'Myanmar':              [96,  46,  86,  null,27,  20,  28,  null],
    'Indonesia':            [99,  15,  17,  56,  9,   2,   14,  null],
    'Philippines':          [112, 36,  36,  null,null,22,  15,  null],
    'Malaysia':             [130, 20,  35,  18,  null,16,  null,36 ],
    'Singapore':            [100, null,28,  26,  null,128, null,null],
    'Cambodia':             [113, null,96,  null,null,53,  null,null],
    'Laos':                 [115, null,null,null,null,41,  null,null],

    /* ═══════ OCEANIA ═══════ */
    'Australia':            [27,  44,  12,  11,  24,  7,   null,7  ],
    'New Zealand':          [76,  null,54,  null,null,141, null,14 ],
    'Papua New Guinea':     [133, null,105, null,null,13,  null,null],
    'Fiji':                 [134, null,131, null,null,142, null,null],
    'Samoa':                [136, null,null,null,null,143, null,null],

    /* ═══════ NORTH AFRICA ═══════ */
    'Egypt':                [29,  37,  43,  6,   32,  76,  52,  null],
    'Algeria':              [28,  41,  51,  null,50,  81,  51,  null],
    'Morocco':              [8,   24,  59,  null,25,  75,  34,  null],
    'Tunisia':              [44,  null,92,  null,null,null,null,null],
    'Libya':                [93,  null,97,  null,null,80,  54,  null],
    'Sudan':                [92,  null,null,null,39,  42,  29,  null],

    /* ═══════ WEST AFRICA ═══════ */
    'Nigeria':              [26,  null,48,  42,  4,   36,  3,   null],
    'Ghana':                [60,  null,71,  null,37,  44,  41,  null],
    'Ivory Coast':          [34,  null,74,  null,43,  45,  40,  null],
    'Cameroon':             [45,  null,90,  null,38,  25,  35,  null],
    'Senegal':              [13,  null,98,  null,null,64,  47,  null],
    'Mali':                 [63,  null,109, null,null,74,  44,  null],
    'Guinea':               [65,  null,126, null,null,32,  45,  null],
    'Burkina Faso':         [64,  null,null,null,null,null,null,null],
    'Togo':                 [109, null,121, null,null,62,  null,null],
    'Benin':                [79,  null,119, null,null,68,  null,null],
    'Sierra Leone':         [87,  null,123, null,null,63,  49,  null],
    'Liberia':              [null,null,125, null,null,67,  null,null],
    'Mauritania':           [108, null,114, null,null,null,null,null],
    'Gambia':               [90,  null,128, null,null,null,null,null],
    'Cape Verde':           [62,  null,null,null,null,null,null,null],

    /* ═══════ CENTRAL AFRICA ═══════ */
    'DR Congo':             [46,  null,69,  48,  15,  17,  12,  null],
    'Congo':                [83,  null,111, null,null,43,  null,null],
    'Angola':               [67,  null,63,  null,null,29,  34,  null],
    'Gabon':                [110, null,112, null,null,50,  null,null],
    'Central African Rep.': [null,null,155, null,null,55,  null,null],
    'Chad':                 [null,null,null,null,null,null,null,null],

    /* ═══════ EAST AFRICA ═══════ */
    'South Africa':         [56,  22,  40,  28,  19,  12,  5,   18 ],
    'Kenya':                [88,  null,65,  52,  29,  23,  24,  null],
    'Ethiopia':             [89,  null,70,  45,  17,  37,  21,  null],
    'Tanzania':             [84,  null,84,  null,30,  18,  25,  null],
    'Uganda':               [85,  null,89,  36,  31,  34,  17,  null],
    'Rwanda':               [86,  null,115, null,null,null,null,null],
    'Mozambique':           [75,  null,106, null,null,30,  37,  null],
    'Zambia':               [66,  null,107, null,null,47,  36,  null],
    'Malawi':               [81,  null,122, null,null,60,  null,null],
    'Zimbabwe':             [80,  null,94,  null,null,65,  42,  null],
    'Namibia':              [82,  null,132, null,null,49,  null,null],
    'Botswana':             [null,null,133, null,null,null,null,null],
    'Madagascar':           [111, null,113, null,null,28,  null,null],
    'Somalia':              [null,null,127, null,null,57,  null,null],
    'South Sudan':          [null,null,108, null,null,52,  null,null],
    'Eritrea':              [null,null,null,null,null,null,null,null],
    'Burundi':              [null,null,null,null,null,null,null,null],
    'Niger':                [null,null,120, null,null,null,null,null],
    'Djibouti':             [null,null,null,null,null,null,null,null],
    'Comoros':              [null,null,null,null,null,null,null,null],

    /* ═══════ SOUTHERN AFRICA ═══════ */
    'Eswatini':             [null,null,null,null,null,null,null,null],
    'Lesotho':              [null,null,null,null,null,null,null,null],
  }
};

/* ============================================================
 *  CATEGORY RANKING TABLES
 *  Auto-generated from DB.countries at load time.
 *
 *  RANKINGS[categoryId] → array sorted by rank ascending (rank 1 = best).
 *  Each entry: { country: string, rank: number }
 *  Countries with null for that category are excluded.
 *
 *  Example usage:
 *    RANKINGS.football[0]  // → { country: 'France', rank: 1 }
 *    RANKINGS.gdp          // → full sorted GDP table
 * ============================================================ */
const RANKINGS = (() => {
  const out = {};
  DB.categories.forEach((cat, ci) => {
    out[cat.id] = Object.entries(DB.countries)
      .filter(([, v]) => v[ci] !== null)
      .sort((a, b) => a[1][ci] - b[1][ci])
      .map(([name, v]) => ({ country: name, rank: v[ci] }));
  });
  return out;
})();

/*
 * ════════════════════════════════════════════════════════════
 *  FOOTBALL  —  FIFA Men's World Rankings (April 2026)
 *  Source: football-ranking.com · FIFA.com
 *  Positions 1–50 verified; 51+ estimated.
 * ════════════════════════════════════════════════════════════
 *  Rank  Country
 *   1    France
 *   2    Spain
 *   3    Argentina
 *   4    United Kingdom  (England's FIFA rank)
 *   5    Portugal
 *   6    Brazil
 *   7    Netherlands
 *   8    Morocco
 *   9    Belgium
 *  10    Germany
 *  11    Croatia
 *  12    Colombia
 *  13    Senegal
 *  14    Italy
 *  15    Mexico
 *  16    United States
 *  17    Uruguay
 *  18    Japan
 *  19    Switzerland
 *  20    Iran
 *  21    Denmark
 *  22    Turkey
 *  23    Ecuador
 *  24    Austria
 *  25    South Korea
 *  26    Nigeria
 *  27    Australia
 *  28    Algeria
 *  29    Egypt
 *  30    Canada
 *  31    Norway
 *  32    Ukraine
 *  33    Panama
 *  34    Ivory Coast
 *  35    Poland
 *  36    Russia
 *  37    Sweden
 *  38    Czech Republic
 *  40    Serbia
 *  41    Paraguay
 *  42    Hungary
 *  44    Tunisia
 *  45    Cameroon
 *  46    DR Congo
 *  47    Greece
 *  48    Slovakia
 *  49    Uzbekistan
 *  50    Venezuela
 *  51    Peru
 *  52    Bolivia
 *  53    Chile
 *  54    Romania
 *  55    Jamaica
 *  56    South Africa
 *  57    Qatar
 *  58    Honduras
 *  59    Costa Rica
 *  60    Ghana
 *  61    El Salvador
 *  62    Cape Verde
 *  63    Mali
 *  64    Burkina Faso
 *  65    Bulgaria
 *  66    Zambia
 *  67    Iraq / Angola  (estimated tie)
 *  68    Azerbaijan
 *  69    Armenia
 *  70    Albania
 *  71    Israel
 *  72    Iceland
 *  73    Bosnia-Herzegovina
 *  74    Jordan
 *  75    Nicaragua / Mozambique
 *  78    Saudi Arabia
 *  79    Benin
 *  80    Zimbabwe
 *  81    Malawi
 *  82    Namibia / Georgia
 *  84    Tanzania
 *  85    Uganda
 *  86    Rwanda / Slovenia
 *  87    Sierra Leone
 *  88    Kenya
 *  89    Ethiopia
 *  90    Gambia / Belarus
 *  91    China
 *  92    Sudan
 *  93    Libya / Lebanon
 *  95    Syria / North Macedonia
 *  96    Myanmar
 *  97    Thailand
 *  98    Vietnam
 *  99    Indonesia
 * 100    Singapore
 * 101    India
 * 102    Pakistan
 * 103    Bangladesh
 * 104    Sri Lanka / Kosovo
 * 105    Montenegro / Moldova
 * 106    Cuba
 * 107    Trinidad and Tobago / Lithuania
 * 108    Mauritania
 * 109    Togo
 * 110    Gabon / Cyprus
 * 111    Madagascar
 * 112    Philippines / Estonia
 * 113    Cambodia
 * 115    Laos
 * 116    Taiwan / Nepal
 * 120    Andorra / San Marino / Kazakhstan
 * 122    Kazakhstan (estimated)
 * 123    Faroe Islands
 * 125    Afghanistan / Tajikistan
 * 127    Kyrgyzstan
 * 128    Turkmenistan
 * 129    Bahrain
 * 130    Kuwait / Malaysia
 * 131    Oman
 * 132    UAE
 * 133    Papua New Guinea
 * 134    Fiji
 * 136    Samoa
 * 150    Luxembourg
 * 155    Malta
 * 188    Liechtenstein
 *
 * ════════════════════════════════════════════════════════════
 *  CAR MANUFACTURER  —  Motor vehicle production (OICA 2023/24)
 *  Source: Wikipedia (OICA) · CEOWORLD Magazine 2024
 *  Unit: total vehicles produced per year
 * ════════════════════════════════════════════════════════════
 *  Rank  Country            (approx. annual units)
 *   1    China              ~30 200 000
 *   2    United States      ~10 600 000
 *   3    Japan               ~9 000 000
 *   4    India               ~5 500 000
 *   5    South Korea         ~4 244 000
 *   6    Germany             ~4 109 000
 *   7    Mexico              ~3 500 000
 *   8    Brazil              ~2 645 000
 *   9    Spain               ~2 451 000
 *  10    Thailand            ~1 840 000
 *  11    France              ~1 464 000
 *  12    Czech Republic      ~1 453 000
 *  13    Turkey              ~1 365 000
 *  14    Canada              ~1 237 000
 *  15    Indonesia           ~1 148 000
 *  16    Iran                ~1 078 000
 *  17    Slovakia            ~1 070 000
 *  18    Russia                ~854 000
 *  19    United Kingdom        ~765 000
 *  20    Malaysia              ~748 000
 *  21    Poland                ~628 000
 *  22    South Africa          ~618 000
 *  23    Romania               ~546 000
 *  24    Morocco               ~502 000
 *  25    Argentina             ~491 000
 *  26    Italy                 ~474 000
 *  27    Uzbekistan            ~462 000
 *  28    Hungary               ~412 000
 *  29    Portugal              ~341 000
 *  30    Taiwan                ~275 000
 *  31    Belgium               ~253 000
 *  32    Sweden                ~252 000
 *  33    Vietnam               ~176 000
 *  34    Pakistan              ~190 000
 *  35    Kazakhstan            ~171 000
 *  36    Philippines           ~127 000
 *  37    Egypt                  ~90 000
 *  38    Austria                ~71 000
 *  39    Slovenia               ~61 000
 *  40    Colombia               ~35 000
 *  41    Algeria                ~30 000
 *  42    Finland                ~22 000
 *  43    Netherlands             ~7 400
 *  44    Australia               ~7 200
 *  45    Azerbaijan              ~4 300
 *  46    Myanmar                 ~2 700
 *  47    Ecuador                 ~2 700
 *
 * ════════════════════════════════════════════════════════════
 *  HIGHEST GDP  —  IMF Nominal GDP 2024 (current USD)
 *  Source: Wikipedia / IMF World Economic Outlook April 2026
 * ════════════════════════════════════════════════════════════
 *  Rank  Country             GDP (USD billions)
 *   1    United States        32 384
 *   2    China                20 852
 *   3    Germany               5 453
 *   4    Japan                 4 379
 *   5    United Kingdom        4 265
 *   6    India                 4 153
 *   7    France                3 596
 *   8    Italy                 2 738
 *   9    Russia                2 657
 *  10    Brazil                2 636
 *  11    Canada                2 507
 *  12    Australia             2 124
 *  13    Mexico                2 121
 *  14    Spain                 2 091
 *  15    South Korea           1 931
 *  16    Turkey                1 640
 *  17    Indonesia             1 540
 *  18    Netherlands           1 450
 *  19    Saudi Arabia          1 389
 *  20    Switzerland           1 147
 *  21    Poland                1 134
 *  22    Taiwan                  977
 *  23    Ireland                 779
 *  24    Belgium                 777
 *  25    Sweden                  761
 *  26    Israel                  720
 *  27    Argentina               688
 *  28    Singapore               660
 *  29    Austria                 624
 *  30    UAE                     622
 *  31    Norway                  599
 *  32    Thailand                580
 *  33    Colombia                540
 *  34    Vietnam                 527
 *  35    Malaysia                516
 *  36    Philippines             512
 *  37    Bangladesh              511
 *  38    Denmark                 504
 *  39    Romania                 481
 *  40    South Africa            480
 *  41    Hong Kong               450
 *  42    Czech Republic          433
 *  43    Egypt                   430
 *  44    Pakistan                411
 *  45    Chile                   408
 *  46    Peru                    381
 *  47    Portugal                381
 *  48    Nigeria                 377
 *  49    Kazakhstan              361
 *  50    Finland                 338
 *  51    Algeria                 317
 *  52    Greece                  308
 *  53    Iran                    300
 *  54    New Zealand             279
 *  55    Hungary                 271
 *  56    Iraq                    265
 *  57    Ukraine                 225
 *  58    Qatar                   217
 *  59    Morocco                 194
 *  60    Uzbekistan              182
 *  61    Kuwait                  173
 *  62    Slovakia                169
 *  63    Angola                  152
 *  64    Bulgaria                148
 *  65    Kenya                   147
 *  66    Ecuador                 138
 *  67    Dominican Republic      136
 *  68    Guatemala               129
 *  69    DR Congo                123
 *  70    Ethiopia                122
 *  71    Ghana                   118
 *  72    Oman                    117
 *  73    Croatia                 117
 *  74    Ivory Coast             112
 *  75    Serbia                  112
 *  76    Venezuela               111
 *  77    Luxembourg              110
 *  78    Costa Rica              110
 *  79    Lithuania               106
 *  80    Belarus                 102
 *  81    Sri Lanka                99
 *  82    Uruguay                  96
 *  83    Panama                   95
 *  84    Tanzania                  95
 *  85    Slovenia                  87
 *  86    Myanmar                   84
 *  87    Bolivia                   81
 *  88    Turkmenistan              83
 *  89    Uganda                    73
 *  90    Azerbaijan                78
 *  91    Jordan                    65
 *  92    Cameroon                  65
 *  93    Tunisia                   61
 *  94    Zimbabwe                  57
 *  95    Latvia                    54
 *  96    Cambodia                  52
 *  97    Libya                     53
 *  98    Senegal                   ~28
 *  99    Bahrain                   ~27
 * 100    El Salvador               ~27
 * 101    Honduras                  ~25
 * 102    Iceland                   ~25
 * 103    Armenia                   ~22
 * 104    Jamaica                   ~19
 * 105    Papua New Guinea          ~27
 * 106    Mozambique                ~20
 * 107    Zambia                    ~29
 * 108    South Sudan               ~13
 * 109    Mali                      ~18
 * 110    Afghanistan               ~15
 * 111    Congo                     ~14
 * 112    Gabon                     ~20
 * 113    Madagascar                ~14
 * 114    Mauritania                ~10
 * 115    Rwanda                    ~11
 * 116    Nepal                     ~40
 * 117    Kyrgyzstan                ~11
 * 118    Tajikistan                ~10
 * 119    Benin                     ~17
 * 120    Niger                     ~16
 * 121    Togo                      ~8
 * 122    Malawi                    ~15
 * 123    Sierra Leone              ~4
 * 124    Haiti                     ~20
 * 125    Liberia                   ~3
 * 126    Guinea                    ~16
 * 127    Somalia                   ~8
 * 128    Gambia                    ~2
 * 129    Cuba                      est.
 * 130    Mongolia                  ~15
 * 131    Fiji                      ~4
 * 132    Namibia                   ~13
 * 133    Botswana                  ~18
 * 134    Trinidad and Tobago       ~24
 * 135    Estonia                   ~37
 * 136    Moldova                   ~13
 * 137    Kosovo                    ~10
 * 140    Bosnia-Herzegovina        ~25
 * 141    Georgia                   ~24
 * 143    Cyprus                    ~28
 * 144    Malta                     ~18
 * 149    Guyana                    ~15
 * 150    Belize                    ~3
 * 155    Central African Rep.      ~3
 *
 * ════════════════════════════════════════════════════════════
 *  NUMBER OF IMMIGRANTS  —  UN Migrant Stock 2024
 *  Source: UN DESA · IOM World Migration Report 2024
 *  Unit: total foreign-born residents
 * ════════════════════════════════════════════════════════════
 *  Rank  Country             Immigrants
 *   1    United States       52 375 047
 *   2    Germany             17 750 084
 *   3    Saudi Arabia        13 683 841
 *   4    France              12 986 757
 *   5    United Kingdom      11 845 479
 *   6    Egypt                9 985 453
 *   7    Spain                9 510 527
 *   8    Canada               8 805 839
 *   9    UAE                  8 157 000
 *  10    Russia               7 605 774
 *  11    Australia            7 111 404
 *  12    Turkey               7 083 501
 *  13    Italy                6 553 671
 *  14    Ukraine              5 064 173
 *  15    India                4 796 255
 *  16    Pakistan             4 175 958
 *  17    Iran                 3 840 654
 *  18    Malaysia             3 806 514
 *  19    Jordan               3 480 168
 *  20    Japan                3 409 529
 *  21    Kuwait               3 323 191
 *  22    Thailand             3 179 399
 *  23    Colombia             3 063 518
 *  24    Hong Kong            3 063 318
 *  25    Netherlands          2 956 518
 *  26    Bangladesh           2 906 338
 *  27    Singapore            2 841 665
 *  28    South Korea          2 650 783
 *  29    South Africa         2 631 100
 *  30    Switzerland          2 503 840
 *  31    Belgium              2 349 032
 *  32    Oman                 2 283 366
 *  33    Sweden               2 272 158 (approx rank)
 *  34    Kazakhstan           2 089 797
 *  35    Israel               2 091 569
 *  36    Uganda               2 057 759
 *  37    Austria              2 327 064
 *  38    Argentina            1 958 039
 *  39    Peru                 1 837 219
 *  40    Poland               1 739 901
 *  41    Mexico               1 726 089
 *  42    Chile                1 538 324
 *  43    Lebanon              ~1 500 000 (est., incl. refugees)
 *  44    Nigeria              1 403 281
 *  45    Brazil               1 406 299
 *  46    Ireland              1 216 237
 *  47    Ethiopia             1 168 455
 *  48    Portugal             1 127 184
 *  49    Belarus              1 054 603
 *  50    Czech Republic       1 025 199
 *  51    Norway               1 012 404
 *  52    Kenya                  992 536
 *  53    Denmark                847 475
 *  54    Bahrain                840 202
 *  55    Serbia                 712 560
 *  56    Indonesia              445 726
 *  57    Vietnam                326 418
 *  (Countries with null have no verified estimate)
 *
 * ════════════════════════════════════════════════════════════
 *  MOST DRUG USERS  —  Estimated past-year users (absolute)
 *  Source: UNODC World Drug Report 2023
 *          Prevalence rate × working-age population
 *  Note: These are estimates; wide uncertainty for many countries.
 * ════════════════════════════════════════════════════════════
 *  Rank  Country       Est. total users
 *   1    India         ~50 000 000  (cannabis 31M + opioids 23M)
 *   2    United States ~50 000 000  (cannabis ~46M + opioids/cocaine)
 *   3    China         ~20 000 000  (low prevalence × huge population)
 *   4    Nigeria       ~17 000 000  (high cannabis use ~13% adult pop)
 *   5    Brazil        ~15 000 000
 *   6    Mexico        ~12 000 000
 *   7    Russia        ~10 000 000
 *   8    Pakistan       ~5 000 000  (heavy opioid burden)
 *   9    Indonesia      ~5 000 000
 *  10    Germany        ~5 000 000
 *  11    United Kingdom ~5 000 000
 *  12    France         ~4 500 000
 *  13    Canada         ~4 000 000
 *  14    Colombia       ~4 000 000
 *  15    DR Congo       ~3 500 000
 *  16    Afghanistan    ~3 500 000  (opium)
 *  17    Ethiopia       ~3 000 000
 *  18    Iran           ~3 000 000  (opioid crisis)
 *  19    South Africa   ~3 000 000
 *  20    Spain          ~3 000 000
 *  21    Bangladesh     ~3 000 000
 *  22    Italy          ~3 000 000
 *  23    Argentina      ~2 500 000
 *  24    Australia      ~2 500 000
 *  25    Morocco        ~2 500 000  (major cannabis producer)
 *  26    Turkey         ~2 500 000
 *  27    Myanmar        ~2 000 000  (meth epidemic, Golden Triangle)
 *  28    Thailand       ~2 500 000
 *  29    Kenya          ~2 000 000
 *  30    Tanzania       ~2 000 000
 *  31    Uganda         ~2 000 000
 *  32    Egypt          ~2 000 000
 *  33    Ukraine        ~2 000 000
 *  34    Poland         ~1 500 000
 *  35    Netherlands    ~1 200 000
 *  36    Belgium        ~1 200 000
 *  37    Ghana          ~1 500 000
 *  38    Cameroon       ~1 000 000
 *  39    Sudan          ~1 200 000
 *  40    Venezuela      ~1 500 000
 *  41    Sweden         ~1 200 000
 *  42    Peru           ~1 500 000
 *  43    Ivory Coast    ~1 000 000
 *  44    Chile          ~1 000 000
 *  45    Portugal         ~800 000
 *  46    Czech Republic   ~800 000
 *  47    Honduras         ~500 000
 *  48    Jamaica          ~400 000
 *  49    Greece           ~700 000
 *  50    Algeria          ~600 000
 *
 * ════════════════════════════════════════════════════════════
 *  MOST ANIMAL DIVERSITY  —  Total species richness
 *  Source: worldrainforests.com · Conservation International
 *          WEF biodiversity report 2024 · theswiftest.com
 *  Metric: composite of amphibians + birds + fish +
 *          mammals + reptiles + vascular plants
 * ════════════════════════════════════════════════════════════
 *  Rank  Country
 *   1    Brazil          (>41 000 species; leads in birds, fish, plants)
 *   2    Indonesia
 *   3    China
 *   4    Colombia
 *   5    Peru
 *   6    Mexico
 *   7    Australia
 *   8    India
 *   9    Ecuador
 *  10    United States
 *  11    Venezuela
 *  12    South Africa
 *  13    Papua New Guinea
 *  14    Bolivia
 *  15    Vietnam
 *  16    Malaysia
 *  17    DR Congo
 *  18    Tanzania
 *  19    Thailand
 *  20    Myanmar
 *  21    Argentina
 *  22    Philippines
 *  23    Kenya
 *  24    Panama
 *  25    Cameroon
 *  26    Japan
 *  27    Costa Rica
 *  28    Madagascar
 *  29    Angola
 *  30    Mozambique
 *  31    Guatemala
 *  32    Guinea
 *  33    Honduras
 *  34    Uganda
 *  35    Guyana
 *  36    Nigeria
 *  37    Ethiopia
 *  38    Taiwan
 *  39    Nicaragua
 *  40    Suriname
 *  41    Laos
 *  42    Sudan
 *  43    Congo
 *  44    Ghana
 *  45    Ivory Coast
 *  46    Iran
 *  47    Zambia
 *  48    Nepal
 *  49    Namibia
 *  50    Gabon
 *  51    Pakistan
 *  52    South Sudan
 *  53    Cambodia
 *  54    Canada
 *  55    Central African Rep.
 *  56    Paraguay
 *  57    Somalia
 *  58    Russia
 *  59    Sri Lanka
 *  60    Malawi
 *  61    Bangladesh
 *  62    Togo
 *  63    Sierra Leone
 *  64    Senegal
 *  65    Zimbabwe
 *  66    Chile
 *  67    Liberia
 *  68    Benin
 *  69    Belize
 *  70    El Salvador
 *  71    Spain
 *  72    Turkey
 *  73    Cuba
 *  74    Mali
 *  75    Morocco
 *  76    Egypt
 *  77    Iraq
 *  78    Jordan
 *  79    Saudi Arabia
 *  80    Libya
 *  81    Algeria
 *  82    Afghanistan
 *  83    Uzbekistan
 *  84    Kazakhstan
 *  85    Turkmenistan
 *  86    Kyrgyzstan
 *  87    Tajikistan
 *  88    Mongolia
 *  89    Azerbaijan
 *  90    Georgia
 *  91    Armenia
 *  92    United Kingdom
 *  93    France
 *  94    Germany
 *  95    Italy
 *  96    Portugal
 *  97    Greece
 *  98    Romania
 *  99    Poland
 * 100    Sweden
 * 101    Norway
 * 102    Finland
 * 103    Austria
 * 104    Switzerland
 * 105    Belgium
 * 106    Netherlands
 * 107    Denmark
 * 108    Czech Republic
 * 109    Slovakia
 * 110    Hungary
 * 111    Serbia
 * 112    Croatia
 * 113    Bosnia-Herzegovina
 * 114    Slovenia
 * 115    Albania
 * 116    Bulgaria
 * 117    Ukraine
 * 118    Belarus
 * 119    Latvia
 * 120    Estonia
 * 121    Lithuania
 * 122    Moldova
 * 123    Iceland
 * 124    Ireland
 * 125    Luxembourg
 * 126    Malta
 * 127    Cyprus
 * 128    Singapore
 * 129    Bahrain
 * 130    Qatar
 * 131    Kuwait
 * 132    Oman
 * 133    UAE
 * 134    Israel
 * 135    Lebanon
 * 136    Syria
 * 137    Dominican Republic
 * 138    Haiti
 * 139    Jamaica
 * 140    Trinidad and Tobago
 * 141    New Zealand
 * 142    Fiji
 * 143    Samoa
 * 144    North Korea
 * 145    South Korea
 *
 * ════════════════════════════════════════════════════════════
 *  MURDERS IN TOTAL  —  Intentional homicides, absolute count
 *  Source: UNODC Global Study on Homicide 2023
 *          Wikipedia – List of countries by intentional homicide rate
 *  Year:  most recent available (2021–2024). (*) = estimated.
 * ════════════════════════════════════════════════════════════
 *  Rank  Country              Homicides
 *   1    Brazil                 40 698  (2023)
 *   2    India                  40 130  (2022)
 *   3    Nigeria                35 884  (2023)
 *   4    Mexico                 32 252  (2023)
 *   5    South Africa           27 272  (2022)
 *   6    United States          19 796  (2023)
 *   7    Venezuela             ~18 000* (est.)
 *   8    Colombia               13 035  (2023)
 *   9    Russia                 11 327  (2024)
 *  10    Pakistan               10 729  (2023)
 *  11    Ecuador                 8 221  (2023)
 *  12    DR Congo               ~8 000* (est.)
 *  13    China                   7 157  (2020)
 *  14    Indonesia              ~5 600* (est.)
 *  15    Philippines             4 995  (2023)
 *  16    Haiti                   4 789  (2023)
 *  17    Uganda                  4 366  (2023)
 *  18    Guatemala               4 235  (2023)
 *  19    Bangladesh              3 830  (2018)
 *  20    Honduras               ~3 500* (est.)
 *  21    Ethiopia               ~3 000* (est.)
 *  22    Peru                    2 853  (2021)
 *  23    Turkey                  2 817
 *  24    Kenya                   2 643
 *  25    Iran                   ~2 000* (est.)
 *  26    Argentina               2 046  (2023)
 *  27    El Salvador            ~1 800* (est.; crackdown reduced rate)
 *  28    Myanmar                ~1 500* (est.)
 *  29    Sudan                  ~1 500* (est.)
 *  30    Afghanistan            ~1 500* (est.)
 *  31    Jamaica                ~1 400* (est.)
 *  32    Chile                   1 248  (2023)
 *  33    Dominican Republic      1 237  (2023)
 *  34    Angola                 ~1 200* (est.)
 *  35    France                    897  (official)
 *  36    Zambia                 ~1 000* (est.)
 *  37    Mozambique             ~1 000* (est.)
 *  38    Bolivia                ~1 000* (est.)
 *  39    Iraq                   ~1 000* (est.)
 *  40    Ivory Coast              ~800* (est.)
 *  41    Ghana                    ~800* (est.)
 *  42    Zimbabwe                 ~700* (est.)
 *  43    Paraguay                 ~800* (est.)
 *  44    Mali                     ~600* (est.)
 *  45    Guinea                   ~500* (est.)
 *  46    Panama                   ~600* (est.)
 *  47    Senegal                  ~500* (est.)
 *  48    Costa Rica               ~700* (est.)
 *  49    Sierra Leone             ~500* (est.)
 *  50    Lebanon                  ~400* (est.)
 *  51    Algeria                  ~400* (est.)
 *  52    Egypt                    ~600* (est.)
 *  54    Libya                    ~300* (est.)
 *  55    Spain                    ~400* (est.)
 *  60    Kenya — see rank 24
 *  62    Portugal / Poland        ~200* (est.)
 *  65    Netherlands              ~100* (est.)
 *  70    Switzerland              ~60*  (est.)
 *  Tanzania                    2 286  (merged above)
 *
 * ════════════════════════════════════════════════════════════
 *  MOST SPORTS EVENTS  —  Major international events hosted
 *  Source: Wikipedia – Olympic hosts · FIFA WC hosts
 *          World Athletics · Commonwealth Games · RWC · Cricket WC
 *  Scoring: Summer Olympics ×3 · FIFA WC ×3 · Winter Olympics ×2
 *           World Athletics ×1 · CWG ×1 · Rugby WC ×1 · Cricket WC ×1
 * ════════════════════════════════════════════════════════════
 *  Rank  Country          Score  Breakdown
 *   1    United States      26   5×S.Olym(15)+4×W.Olym(8)+1×WC(3)+1×Ath(1)
 *                                (incl. LA 2028, SLC 2034)
 *   2    France             24   3×S.Olym(9)+3×W.Olym(6)+2×WC(6)+1×Ath(1)+2×RWC(2)
 *                                (incl. Paris 2024)
 *   3    United Kingdom     22   3×S.Olym(9)+1×WC(3)+1×Ath(1)+1×RWC(1)+5×CricketWC(5)
 *                                +3×CWG(3)
 *   4    Germany            16   2×S.Olym(6)+1×W.Olym(2)+2×WC(6)+2×Ath(2)
 *   5    Japan              16   2×S.Olym(6)+2×W.Olym(4)+1×WC(3)+3×Ath(3)
 *   6    Italy              16   1×S.Olym(3)+3×W.Olym(6)+2×WC(6)+1×Ath(1)
 *                                (incl. Milan-Cortina 2026)
 *   7    Australia          16   2×S.Olym(6)+2×RWC(2)+2×CricketWC(2)+6×CWG(6)
 *                                (incl. Brisbane 2032)
 *   8    Canada             15   1×S.Olym(3)+2×W.Olym(4)+1×WC(3)+1×Ath(1)+4×CWG(4)
 *   9    Brazil              9   1×S.Olym(3)+2×WC(6)
 *  10    Mexico              9   1×S.Olym(3)+2×WC(6)
 *  11    Russia              9   1×S.Olym(3)+1×W.Olym(2)+1×WC(3)+1×Ath(1)
 *  12    South Korea         9   1×S.Olym(3)+1×W.Olym(2)+1×WC(3)+1×Ath(1)
 *  13    China               7   1×S.Olym(3)+1×W.Olym(2)+2×Ath(2)
 *  14    New Zealand         7   2×RWC(2)+3×CWG(3)+2×CricketWC(2)
 *  15    Spain               7   1×S.Olym(3)+1×WC(3)+1×Ath(1)
 *  16    Sweden              7   1×S.Olym(3)+1×WC(3)+1×Ath(1)
 *  17    Greece              6   2×S.Olym(6)
 *  18    South Africa        5   1×WC(3)+1×RWC(1)+1×CricketWC(1)
 *  19    Finland             5   1×S.Olym(3)+2×Ath(2)
 *  20    India               5   4×CricketWC(4)+1×CWG(1)
 *  21    Norway              4   2×W.Olym(4)
 *  22    Switzerland         4   2×W.Olym(4)
 *  23    Austria             4   2×W.Olym(4)
 *  24    Qatar               4   1×WC(3)+1×Ath(1)
 *  25    Netherlands         3   1×S.Olym(3)  [Amsterdam 1928]
 *  26    Belgium             3   1×S.Olym(3)  [Antwerp 1920]
 *  27    Argentina           3   1×WC(3)      [1978]
 *  28    Uruguay             3   1×WC(3)      [1930]
 *  29    Chile               3   1×WC(3)      [1962]
 *  30    Scotland            3   3×CWG(3)     [1970, 1986, 2014]
 *  31    Bosnia-Herzegovina  2   1×W.Olym(2)  [1984 Sarajevo]
 *  32    Wales               2   1×CWG(1)+1×CricketWC-co(1)
 *  33    Pakistan            2   2×CricketWC-co(2)  [1987, 1996]
 *  34    Sri Lanka           2   2×CricketWC-co(2)  [1996, 2011]
 *  35    Hungary             1   1×Ath(1)     [Budapest 2023]
 *  36    Malaysia            1   1×CWG(1)     [1998 Kuala Lumpur]
 *  37    Bangladesh          1   1×CricketWC-co(1) [2011]
 *  38    Jamaica             1   1×CWG(1)     [1966 Kingston]
 *  (All other countries: null — never hosted a qualifying event)
 */
