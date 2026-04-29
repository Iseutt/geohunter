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
 *   [football, cars, gdp, immigrants, drugs, biodiversity, murders, sports]
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
    }
  ],

  /* ── Country data ──────────────────────────────────────────── */
  /*  Format: [football, cars, gdp, immigrants, drugs, biodiversity, murders, sports]  */
  countries: {

    /* ═══════ NORTH AMERICA ═══════ */
    'United States':        [16,  2,   1,   1,   2,   10,  6,   1  ],
    'Canada':               [30,  14,  11,  8,   13,  54,  60,  8  ],
    'Mexico':               [15,  7,   13,  40,  6,   6,   4,   10 ],

    /* ═══════ CENTRAL AMERICA & CARIBBEAN ═══════ */
    'Guatemala':            [68,  null,68,  null,null,31,  18,  null],
    'Honduras':             [58,  null,101, null,47,  33,  20,  null],
    'El Salvador':          [61,  null,100, null,null,70,  27,  null],
    'Costa Rica':           [59,  null,78,  null,null,27,  48,  null],
    'Panama':               [33,  null,83,  null,null,24,  46,  null],
    'Nicaragua':            [80,  null,null,null,null,39,  null,null],
    'Cuba':                 [106, null,129, null,null,73,  null,null],
    'Jamaica':              [55,  null,104, null,48,  139, 31,  38 ],
    'Dominican Republic':   [72,  null,67,  null,null,137, 33,  null],
    'Haiti':                [77,  null,124, null,null,138, 16,  null],
    'Trinidad and Tobago':  [107, null,134, null,null,140, null,null],
    'Guyana':               [null,null,149, null,null,35,  null,null],
    'Suriname':             [null,null,null,null,null,40,  null,null],
    'Barbados':             [null,null,null,null,null,null,null,null],
    'Belize':               [null,null,150, null,null,69,  null,null],

    /* ═══════ SOUTH AMERICA ═══════ */
    'Brazil':               [6,   8,   10,  43,  5,   1,   1,   9  ],
    'Argentina':            [3,   25,  27,  38,  23,  21,  26,  27 ],
    'Colombia':             [12,  40,  33,  23,  14,  4,   8,   null],
    'Venezuela':            [50,  null,76,  null,40,  11,  7,   null],
    'Chile':                [53,  null,45,  41,  44,  66,  32,  29 ],
    'Peru':                 [51,  null,46,  39,  42,  5,   22,  null],
    'Ecuador':              [23,  47,  66,  null,null,9,   11,  null],
    'Bolivia':              [52,  null,87,  null,null,14,  38,  null],
    'Paraguay':             [41,  null,93,  null,null,56,  43,  null],
    'Uruguay':              [17,  null,82,  null,null,null,null,28 ],

    /* ═══════ WESTERN EUROPE ═══════ */
    'United Kingdom':       [4,   19,  5,   5,   11,  92,  42,  3  ],
    'France':               [1,   11,  7,   4,   12,  93,  35,  2  ],
    'Germany':              [10,  6,   3,   2,   10,  94,  44,  4  ],
    'Italy':                [14,  26,  8,   13,  22,  95,  52,  6  ],
    'Spain':                [2,   9,   14,  7,   20,  71,  55,  15 ],
    'Portugal':             [5,   29,  47,  47,  45,  96,  62,  null],
    'Netherlands':          [7,   43,  18,  25,  35,  106, 65,  25 ],
    'Belgium':              [9,   31,  24,  30,  36,  105, 63,  26 ],
    'Switzerland':          [19,  null,20,  29,  null,104, 70,  22 ],
    'Austria':              [24,  38,  29,  31,  null,103, 72,  23 ],
    'Sweden':               [37,  32,  25,  33,  41,  100, 68,  16 ],
    'Norway':               [31,  null,31,  51,  null,101, 69,  21 ],
    'Denmark':              [21,  null,38,  54,  null,107, 71,  null],
    'Finland':              [69,  42,  50,  null,null,102, 73,  19 ],
    'Ireland':              [56,  null,23,  44,  null,124, 80,  null],
    'Luxembourg':           [150, null,77,  null,null,125, null,null],

    /* ═══════ SOUTHERN EUROPE ═══════ */
    'Greece':               [47,  null,52,  41,  49,  97,  78,  17 ],
    'Croatia':              [11,  null,73,  null,null,112, 82,  null],
    'Serbia':               [40,  null,75,  55,  null,111, 83,  null],
    'Albania':              [70,  null,null,null,null,115, null,null],
    'Slovenia':             [86,  39,  85,  null,null,114, 84,  null],
    'Bosnia-Herzegovina':   [73,  null,140, null,null,113, null,31 ],
    'Cyprus':               [110, null,143, null,null,127, null,null],
    'Malta':                [155, null,144, null,null,126, null,null],

    /* ═══════ EASTERN EUROPE ═══════ */
    'Poland':               [35,  21,  21,  39,  34,  99,  62,  null],
    'Czech Republic':       [38,  12,  42,  50,  46,  108, 74,  null],
    'Slovakia':             [48,  17,  62,  null,null,109, 75,  null],
    'Hungary':              [42,  28,  55,  null,null,110, 76,  35 ],
    'Romania':              [54,  23,  39,  null,48,  98,  51,  null],
    'Bulgaria':             [65,  null,64,  null,null,116, 77,  null],
    'Ukraine':              [32,  null,57,  14,  33,  117, 50,  null],
    'Belarus':              [90,  null,80,  49,  null,118, 86,  null],
    'Moldova':              [108, null,136, null,null,122, null,null],
    'Kosovo':               [104, null,137, null,null,null,null,null],
    'North Macedonia':      [95,  null,null,null,null,null,null,null],
    'Montenegro':           [105, null,null,null,null,null,null,null],

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
