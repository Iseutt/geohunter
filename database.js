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
      total: 51,
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
      total: 181,
      color: '#06b6d4',
      source: 'Wikipedia – List of countries by average elevation',
      description: 'Mean elevation above sea level. Rank 1 = lowest/flattest country.'
    }
  ],

  /* ── Country data ──────────────────────────────────────────── */
  /*  Format: [football, cars, gdp, immigrants, drugs, biodiversity, murders, sports, elevation]  */
  countries: {

    /* ═══════ NORTH AMERICA ═══════ */
    'United States':           [16, 2, 1, 1, 2, 10, 6, 1, 136],
    'Canada':                  [30, 14, 11, 8, 13, 54, 60, 8, 105],
    'Mexico':                  [15, 7, 13, 40, 6, 6, 4, 10, 154],

    /* ═══════ CENTRAL AMERICA & CARIBBEAN ═══════ */
    'Guatemala':               [68, 51, 68, 88, 66, 31, 18, 39, 135],
    'Honduras':                [58, 51, 101, 130, 47, 33, 20, 39, 128],
    'El Salvador':             [61, 51, 100, 122, 117, 70, 27, 39, 93],
    'Costa Rica':              [59, 51, 78, 95, 86, 27, 48, 39, 134],
    'Panama':                  [33, 51, 83, 82, 168, 24, 46, 39, 72],
    'Nicaragua':               [80, 51, 140, 68, 67, 39, 83, 39, 57],
    'Cuba':                    [106, 51, 129, 115, 119, 73, 189, 39, 20],
    'Jamaica':                 [55, 51, 104, 66, 48, 139, 31, 38, 69],
    'Dominican Republic':      [72, 51, 67, 110, 167, 137, 33, 39, 87],
    'Haiti':                   [77, 51, 124, 116, 174, 138, 16, 39, 100],
    'Trinidad and Tobago':     [107, 51, 134, 131, 61, 140, 100, 39, 16],
    'Guyana':                  [154, 51, 149, 168, 147, 35, 131, 39, 42],
    'Suriname':                [144, 51, 158, 99, 115, 40, 146, 39, 47],
    'Barbados':                [177, 51, 161, 86, 83, 159, 84, 39, 34],
    'Belize':                  [182, 51, 150, 151, 148, 69, 127, 39, 35],

    /* ═══════ SOUTH AMERICA ═══════ */
    'Brazil':                  [6, 8, 10, 43, 5, 1, 1, 9, 63],
    'Argentina':               [3, 25, 27, 38, 23, 21, 26, 27, 118],
    'Colombia':                [12, 40, 33, 23, 14, 4, 8, 39, 117],
    'Venezuela':               [50, 51, 76, 71, 40, 11, 7, 39, 97],
    'Chile':                   [53, 51, 45, 41, 44, 66, 32, 29, 174],
    'Peru':                    [51, 51, 46, 39, 42, 5, 22, 39, 168],
    'Ecuador':                 [23, 47, 66, 177, 91, 9, 11, 39, 156],
    'Bolivia':                 [52, 51, 87, 156, 80, 14, 38, 39, 161],
    'Paraguay':                [41, 51, 93, 135, 152, 56, 43, 39, 38],
    'Uruguay':                 [17, 51, 82, 109, 77, 146, 118, 28, 22],

    /* ═══════ WESTERN EUROPE ═══════ */
    'United Kingdom':          [4, 19, 5, 5, 11, 92, 42, 3, 31],
    'France':                  [1, 11, 7, 4, 12, 93, 35, 2, 75],
    'Germany':                 [10, 6, 3, 2, 10, 94, 44, 4, 50],
    'Italy':                   [14, 26, 8, 13, 22, 95, 52, 6, 112],
    'Spain':                   [2, 9, 14, 7, 20, 71, 55, 15, 124],
    'Portugal':                [5, 29, 47, 47, 45, 96, 62, 39, 74],
    'Netherlands':             [7, 43, 18, 25, 35, 106, 65, 25, 8],
    'Belgium':                 [9, 31, 24, 30, 36, 105, 63, 26, 39],
    'Switzerland':             [19, 51, 20, 29, 134, 104, 70, 22, 165],
    'Austria':                 [24, 38, 29, 31, 80, 103, 72, 23, 145],
    'Sweden':                  [37, 32, 25, 33, 41, 100, 68, 16, 64],
    'Norway':                  [31, 51, 31, 51, 119, 101, 69, 21, 99],
    'Denmark':                 [21, 51, 38, 54, 85, 107, 71, 39, 9],
    'Finland':                 [69, 42, 50, 157, 131, 102, 73, 19, 32],
    'Ireland':                 [56, 51, 23, 44, 176, 124, 80, 39, 24],
    'Luxembourg':              [150, 51, 77, 153, 101, 125, 154, 39, 66],

    /* ═══════ SOUTHERN EUROPE ═══════ */
    'Greece':                  [47, 51, 52, 41, 49, 97, 78, 17, 107],
    'Croatia':                 [11, 51, 73, 150, 113, 112, 82, 39, 68],
    'Serbia':                  [40, 51, 75, 55, 128, 111, 83, 39, 95],
    'Albania':                 [70, 51, 121, 78, 103, 115, 122, 39, 130],
    'Slovenia':                [86, 39, 85, 101, 178, 114, 84, 39, 106],
    'Bosnia-Herzegovina':      [73, 51, 140, 157, 129, 113, 116, 31, 108],
    'Cyprus':                  [110, 51, 143, 143, 74, 127, 118, 39, 19],
    'Malta':                   [155, 51, 144, 68, 140, 126, 162, 39, 25],

    /* ═══════ EASTERN EUROPE ═══════ */
    'Poland':                  [35, 21, 21, 39, 34, 99, 62, 39, 36],
    'Czech Republic':          [38, 12, 42, 50, 46, 108, 74, 39, 88],
    'Slovakia':                [48, 17, 62, 128, 76, 109, 75, 39, 98],
    'Hungary':                 [42, 28, 55, 114, 140, 110, 76, 35, 28],
    'Romania':                 [54, 23, 39, 114, 48, 98, 51, 39, 84],
    'Bulgaria':                [65, 51, 64, 187, 161, 116, 77, 39, 101],
    'Ukraine':                 [32, 51, 57, 14, 33, 117, 50, 39, 37],
    'Belarus':                 [90, 51, 80, 49, 177, 118, 86, 39, 30],
    'Moldova':                 [108, 51, 136, 96, 127, 122, 95, 39, 27],
    'Kosovo':                  [104, 51, 137, 123, 127, 166, 169, 39, 140],
    'North Macedonia':         [95, 51, 138, 162, 152, 154, 95, 39, 133],
    'Montenegro':              [105, 51, 151, 190, 186, 148, 72, 39, 151],

    /* ═══════ BALTIC STATES ═══════ */
    'Latvia':                  [100, 51, 95, 88, 99, 119, 100, 39, 18],
    'Lithuania':               [107, 51, 79, 168, 76, 121, 158, 39, 23],
    'Estonia':                 [112, 51, 135, 157, 179, 120, 195, 39, 12],

    /* ═══════ CAUCASUS ═══════ */
    'Armenia':                 [69, 51, 103, 124, 62, 91, 89, 39, 171],
    'Georgia':                 [82, 51, 141, 128, 147, 90, 88, 39, 166],
    'Azerbaijan':              [68, 45, 90, 135, 171, 89, 100, 39, 78],

    /* ═══════ NORDIC / ISLANDS ═══════ */
    'Iceland':                 [72, 51, 102, 176, 60, 123, 127, 39, 114],
    'Faroe Islands':           [123, 51, 175, 188, 105, 163, 87, 39, 58],
    'Andorra':                 [120, 51, 166, 136, 189, 168, 110, 39, 176],
    'San Marino':              [121, 51, 185, 99, 155, 150, 195, 39, 15],
    'Liechtenstein':           [188, 51, 160, 60, 142, 162, 64, 39, 153],

    /* ═══════ RUSSIA ═══════ */
    'Russia':                  [36, 18, 9, 10, 7, 58, 9, 11, 119],

    /* ═══════ TURKEY ═══════ */
    'Turkey':                  [22, 13, 16, 12, 26, 72, 23, 39, 159],

    /* ═══════ MIDDLE EAST ═══════ */
    'Saudi Arabia':            [78, 51, 19, 3, 88, 79, 152, 39, 125],
    'UAE':                     [132, 51, 30, 9, 138, 133, 121, 39, 29],
    'Qatar':                   [57, 51, 58, 74, 121, 130, 80, 24, 7],
    'Kuwait':                  [130, 51, 61, 21, 81, 131, 184, 39, 21],
    'Bahrain':                 [129, 51, 99, 55, 77, 129, 92, 39, 5],
    'Oman':                    [131, 51, 72, 32, 92, 132, 181, 39, 61],
    'Jordan':                  [74, 51, 91, 19, 102, 78, 127, 39, 141],
    'Iraq':                    [67, 51, 56, 195, 168, 77, 39, 39, 62],
    'Lebanon':                 [93, 51, 100, 43, 114, 135, 50, 39, 162],
    'Syria':                   [95, 51, 141, 111, 139, 136, 162, 39, 111],
    'Israel':                  [71, 51, 26, 35, 155, 134, 172, 39, 110],
    'Iran':                    [20, 16, 53, 17, 18, 46, 25, 39, 163],
    'Yemen':                   [156, 51, 152, 192, 175, 149, 123, 39, 147],

    /* ═══════ CENTRAL ASIA ═══════ */
    'Kazakhstan':              [122, 35, 49, 34, 117, 84, 76, 39, 79],
    'Uzbekistan':              [49, 27, 60, 146, 65, 83, 118, 39, 96],
    'Tajikistan':              [125, 51, 118, 116, 61, 87, 78, 39, 180],
    'Kyrgyzstan':              [127, 51, 117, 75, 118, 86, 77, 39, 179],
    'Turkmenistan':            [128, 51, 88, 68, 144, 85, 78, 39, 44],
    'Afghanistan':             [125, 51, 110, 191, 16, 82, 30, 39, 175],
    'Mongolia':                [113, 51, 130, 120, 131, 88, 184, 39, 169],

    /* ═══════ SOUTH ASIA ═══════ */
    'India':                   [101, 4, 6, 15, 1, 8, 2, 20, 122],
    'Pakistan':                [102, 34, 44, 16, 8, 51, 10, 33, 143],
    'Bangladesh':              [103, 51, 37, 26, 21, 61, 19, 37, 17],
    'Sri Lanka':               [104, 51, 81, 114, 93, 59, 181, 34, 43],
    'Nepal':                   [116, 51, 116, 122, 181, 48, 164, 39, 181],

    /* ═══════ EAST ASIA ═══════ */
    'China':                   [91, 1, 2, 108, 3, 3, 13, 13, 173],
    'Japan':                   [18, 3, 4, 20, 84, 26, 84, 5, 91],
    'South Korea':             [25, 5, 15, 27, 170, 145, 150, 12, 54],
    'Taiwan':                  [116, 30, 22, 46, 168, 38, 165, 39, 160],
    'North Korea':             [110, 51, 116, 179, 73, 144, 85, 39, 92],
    'Hong Kong':               [157, 51, 41, 24, 75, 161, 146, 39, 11],

    /* ═══════ SOUTH-EAST ASIA ═══════ */
    'Vietnam':                 [98, 33, 34, 57, 87, 15, 123, 39, 81],
    'Thailand':                [97, 10, 32, 22, 28, 19, 109, 39, 55],
    'Myanmar':                 [96, 46, 86, 108, 27, 20, 28, 39, 129],
    'Indonesia':               [99, 15, 17, 56, 9, 2, 14, 39, 73],
    'Philippines':             [112, 36, 36, 174, 95, 22, 15, 39, 94],
    'Malaysia':                [130, 20, 35, 18, 168, 16, 106, 36, 85],
    'Singapore':               [100, 51, 28, 26, 131, 128, 178, 39, 6],
    'Cambodia':                [113, 51, 96, 123, 79, 53, 173, 39, 26],
    'Laos':                    [115, 51, 130, 85, 72, 41, 63, 39, 131],

    /* ═══════ OCEANIA ═══════ */
    'Australia':               [27, 44, 12, 11, 24, 7, 83, 7, 67],
    'New Zealand':             [76, 51, 54, 120, 102, 141, 164, 14, 80],
    'Papua New Guinea':        [133, 51, 105, 184, 183, 13, 114, 39, 127],
    'Fiji':                    [134, 51, 131, 162, 75, 142, 102, 39, 41],
    'Samoa':                   [136, 51, 186, 157, 60, 143, 159, 39, 59],

    /* ═══════ NORTH AFRICA ═══════ */
    'Egypt':                   [29, 37, 43, 6, 32, 76, 52, 39, 65],
    'Algeria':                 [28, 41, 51, 127, 50, 81, 51, 39, 139],
    'Morocco':                 [8, 24, 59, 176, 25, 75, 34, 39, 144],
    'Tunisia':                 [44, 51, 92, 133, 168, 171, 184, 39, 48],
    'Libya':                   [93, 51, 97, 99, 108, 80, 54, 39, 86],
    'Sudan':                   [92, 51, 104, 135, 39, 42, 29, 39, 115],

    /* ═══════ WEST AFRICA ═══════ */
    'Nigeria':                 [26, 51, 48, 42, 4, 36, 3, 39, 77],
    'Ghana':                   [60, 51, 71, 115, 37, 44, 41, 39, 40],
    'Ivory Coast':             [34, 51, 74, 74, 43, 45, 40, 39, 49],
    'Cameroon':                [45, 51, 90, 75, 38, 25, 35, 39, 126],
    'Senegal':                 [13, 51, 98, 140, 74, 64, 47, 39, 13],
    'Mali':                    [63, 51, 109, 72, 182, 74, 44, 39, 70],
    'Guinea':                  [65, 51, 126, 188, 195, 32, 45, 39, 102],
    'Burkina Faso':            [64, 51, 123, 100, 74, 164, 80, 39, 56],
    'Togo':                    [109, 51, 121, 107, 77, 62, 77, 39, 45],
    'Benin':                   [79, 51, 119, 120, 163, 68, 90, 39, 51],
    'Sierra Leone':            [87, 51, 123, 123, 70, 63, 49, 39, 53],
    'Liberia':                 [152, 51, 125, 80, 167, 67, 193, 39, 46],
    'Mauritania':              [108, 51, 114, 140, 126, 153, 140, 39, 52],
    'Gambia':                  [90, 51, 128, 121, 127, 160, 93, 39, 10],
    'Cape Verde':              [62, 51, 181, 136, 177, 156, 78, 39, 120],

    /* ═══════ CENTRAL AFRICA ═══════ */
    'DR Congo':                [46, 51, 69, 48, 15, 17, 12, 39, 132],
    'Congo':                   [83, 51, 111, 62, 177, 43, 85, 39, 90],
    'Angola':                  [67, 51, 63, 78, 114, 29, 34, 39, 155],
    'Gabon':                   [110, 51, 112, 189, 127, 50, 93, 39, 76],
    'Central African Rep.':    [129, 51, 155, 149, 77, 55, 122, 39, 123],
    'Chad':                    [178, 51, 149, 154, 132, 151, 172, 39, 113],

    /* ═══════ EAST AFRICA ═══════ */
    'South Africa':            [56, 22, 40, 28, 19, 12, 5, 18, 150],
    'Kenya':                   [88, 51, 65, 52, 29, 23, 24, 39, 137],
    'Ethiopia':                [89, 51, 70, 45, 17, 37, 21, 39, 164],
    'Tanzania':                [84, 51, 84, 137, 30, 18, 25, 39, 149],
    'Uganda':                  [85, 51, 89, 36, 31, 34, 17, 39, 152],
    'Rwanda':                  [86, 51, 115, 195, 62, 169, 136, 39, 170],
    'Mozambique':              [75, 51, 106, 86, 94, 30, 37, 39, 71],
    'Zambia':                  [66, 51, 107, 127, 89, 47, 36, 39, 157],
    'Malawi':                  [81, 51, 122, 87, 99, 60, 129, 39, 138],
    'Zimbabwe':                [80, 51, 94, 132, 113, 65, 42, 39, 146],
    'Namibia':                 [82, 51, 132, 147, 112, 49, 127, 39, 158],
    'Botswana':                [146, 51, 133, 189, 185, 155, 73, 39, 148],
    'Madagascar':              [111, 51, 113, 83, 168, 28, 130, 39, 121],
    'Somalia':                 [202, 51, 127, 71, 60, 57, 145, 39, 83],
    'South Sudan':             [167, 51, 108, 93, 127, 52, 101, 39, 109],
    'Eritrea':                 [210, 51, 179, 173, 169, 165, 62, 39, 142],
    'Burundi':                 [140, 51, 187, 88, 79, 170, 98, 39, 167],
    'Niger':                   [122, 51, 120, 69, 154, 167, 97, 39, 103],
    'Djibouti':                [192, 51, 182, 170, 92, 147, 138, 39, 89],
    'Comoros':                 [119, 51, 190, 153, 70, 157, 113, 39, 82],

    /* ═══════ SOUTHERN AFRICA ═══════ */
    'Eswatini':                [150, 51, 162, 123, 86, 158, 164, 39, 60],
    'Lesotho':                 [149, 51, 171, 99, 120, 152, 105, 39, 177],
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