// GeoHunter — Base de données France
// Chaque département : [foot, crime, temperature, natalite, population, education, cuisine, tourisme]
// Rang 1 = meilleur dans la catégorie

const DB_FRANCE = {
  categories: [
    {
      id: 'foot', label: 'Football', icon: '⚽', total: 101, color: '#22c55e',
      source: 'Ligue 1/2/National 2024-25',
      description: 'Classé selon le meilleur club du département et son niveau (Ligue 1 → régional).',
    },
    {
      id: 'crime', label: 'Criminalité', icon: '🔪', total: 101, color: '#ef4444',
      source: 'SSMSI — Interstats 2023',
      description: 'Taux de crimes et délits enregistrés pour 1 000 habitants. Rang 1 = plus de crimes.',
    },
    {
      id: 'temperature', label: 'Température', icon: '🌡️', total: 101, color: '#f59e0b',
      source: 'Météo-France — normales 1991-2020',
      description: 'Température annuelle moyenne. Rang 1 = département le plus chaud.',
    },
    {
      id: 'natalite', label: 'Natalité', icon: '👶', total: 101, color: '#ec4899',
      source: 'INSEE — État civil 2022',
      description: 'Taux de natalité (naissances pour 1 000 habitants). Rang 1 = taux le plus élevé.',
    },
    {
      id: 'population', label: 'Population', icon: '👥', total: 101, color: '#60a5fa',
      source: 'INSEE — Recensement 2021',
      description: 'Nombre total d\'habitants. Rang 1 = département le plus peuplé.',
    },
    {
      id: 'education', label: 'Éducation', icon: '🎓', total: 101, color: '#a78bfa',
      source: 'MESRI — Répertoire 2023',
      description: 'Nombre d\'établissements d\'enseignement supérieur (public et privé). Rang 1 = le plus d\'établissements.',
    },
    {
      id: 'cuisine', label: 'Gastronomie', icon: '🍽️', total: 101, color: '#fbbf24',
      source: 'Guide Michelin 2024 + réputation régionale',
      description: 'Qualité gastronomique (étoiles Michelin, spécialités, réputation). Rang 1 = meilleure cuisine.',
    },
    {
      id: 'tourisme', label: 'Tourisme', icon: '✈️', total: 101, color: '#22d3ee',
      source: 'INSEE — nuitées touristiques 2023',
      description: 'Attractivité touristique (nuitées, sites, fréquentation). Rang 1 = département le plus visité.',
    },
  ],

  departments: {
    // ── Île-de-France ────────────────────────────────────────────
    'Paris':              [1,  4,  60, 20,  2,  1,  2,  1],
    'Seine-et-Marne':     [71,  7, 68, 28, 11, 30, 65, 45],
    'Yvelines':           [70,  9, 65, 35,  8, 22, 48, 22],
    'Essonne':            [69,  6, 65, 22, 14, 20, 60, 42],
    'Hauts-de-Seine':     [73, 14, 62, 30,  6, 15, 20, 30],
    'Seine-Saint-Denis':  [34,  1, 65,  3,  5, 32, 85, 72],
    'Val-de-Marne':       [29,  5, 63, 25, 12, 28, 52, 50],
    "Val-d'Oise":         [72, 10, 65, 22, 17, 35, 60, 65],

    // ── Nord-Pas-de-Calais ───────────────────────────────────────
    'Nord':               [2,   3, 78,  5,  1,  7, 34, 20],
    'Pas-de-Calais':      [5,  11, 78,  8,  9, 28, 40, 42],

    // ── Picardie ─────────────────────────────────────────────────
    'Somme':              [25, 20, 77, 42, 58, 58, 72, 45],
    'Oise':               [47, 27, 80, 35, 43, 42, 58, 55],
    'Aisne':              [59, 68, 75, 58, 70, 75, 72, 78],

    // ── Champagne-Ardenne ────────────────────────────────────────
    'Marne':              [14, 32, 80, 45, 48, 15, 28, 35],
    'Ardennes':           [35, 66, 97, 82, 81, 82, 82, 88],
    'Aube':               [20, 72, 80, 62, 76, 68, 58, 65],
    'Haute-Marne':        [82, 82, 82, 92, 91, 91, 80, 85],

    // ── Lorraine ─────────────────────────────────────────────────
    'Moselle':            [17, 25, 86, 38, 20, 35, 55, 65],
    'Meurthe-et-Moselle': [33, 62, 84, 58, 45, 14, 52, 62],
    'Meuse':              [87, 84, 85, 90, 88, 94, 85, 82],
    'Vosges':             [64, 72, 96, 72, 75, 82, 65, 60],

    // ── Alsace ───────────────────────────────────────────────────
    'Bas-Rhin':           [10, 26, 87, 25, 21,  8, 19, 15],
    'Haut-Rhin':          [50, 52, 88, 40, 50, 45, 26, 30],

    // ── Haute-Normandie ──────────────────────────────────────────
    'Seine-Maritime':     [12, 29, 73, 30, 26, 13, 44, 35],
    'Eure':               [49, 52, 72, 50, 65, 72, 62, 72],

    // ── Basse-Normandie ──────────────────────────────────────────
    'Calvados':           [22, 40, 70, 45, 50, 16, 30, 29],
    'Manche':             [58, 63, 70, 52, 56, 58, 45, 32],
    'Orne':               [65, 78, 68, 68, 76, 78, 58, 70],

    // ── Bretagne ─────────────────────────────────────────────────
    'Ille-et-Vilaine':    [7,  22, 40, 22, 19,  6,  7, 10],
    'Finistère':          [13, 45, 38, 32, 42, 12,  8, 28],
    'Morbihan':           [15, 42, 37, 35, 46, 48, 17, 17],
    "Côtes-d'Armor":      [27, 72, 42, 40, 64, 62, 12, 32],

    // ── Pays de la Loire ─────────────────────────────────────────
    'Loire-Atlantique':   [8,  28, 34, 18, 13, 11, 13, 13],
    'Maine-et-Loire':     [19, 35, 35, 28, 32, 25, 36, 38],
    'Sarthe':             [36, 48, 68, 50, 54, 55, 55, 40],
    'Vendée':             [60, 35, 31, 30, 47, 50, 54, 26],
    'Mayenne':            [37, 78, 68, 45, 66, 65, 60, 82],

    // ── Centre-Val de Loire ──────────────────────────────────────
    'Loiret':             [39, 46, 55, 42, 44, 32, 52, 58],
    'Eure-et-Loir':       [51, 58, 72, 52, 68, 73, 62, 75],
    'Indre-et-Loire':     [41, 48, 36, 48, 55, 20, 25, 20],
    'Loir-et-Cher':       [77, 75, 47, 78, 78, 80, 55, 52],
    'Cher':               [79, 65, 50, 85, 75, 76, 68, 72],
    'Indre':              [85, 90, 50, 95, 92, 92, 85, 88],

    // ── Bourgogne ────────────────────────────────────────────────
    "Côte-d'Or":          [43, 58, 55, 62, 62, 16, 10, 18],
    'Saône-et-Loire':     [46, 65, 48, 70, 61, 60, 32, 50],
    'Yonne':              [26, 65, 58, 72, 77, 75, 35, 55],
    'Nièvre':             [88, 90, 58, 92, 89, 90, 78, 78],

    // ── Franche-Comté ────────────────────────────────────────────
    'Doubs':              [23, 70, 90, 55, 63, 55, 48, 55],
    'Jura':               [86, 85, 92, 78, 86, 85, 38, 65],
    'Haute-Saône':        [89, 88, 88, 80, 90, 90, 70, 80],
    'Territoire de Belfort': [81, 70, 89, 68, 97, 92, 70, 82],

    // ── Rhône-Alpes ──────────────────────────────────────────────
    'Rhône':              [4,  11, 32, 12,  4,  2,  1,  8],
    'Ain':                [42, 62, 34, 48, 57, 52, 14, 46],
    'Loire':              [16, 30, 33, 35, 40, 38, 42, 48],
    'Isère':              [21, 25, 53, 32, 16,  9, 20, 15],
    'Drôme':              [48, 55, 30, 45, 60, 65, 40, 42],
    'Ardèche':            [74, 60, 32, 50, 83, 77, 50, 48],
    'Savoie':             [54, 78, 93, 45, 67, 62, 13, 16],
    'Haute-Savoie':       [45, 80, 94, 38, 35, 40,  3,  4],

    // ── Auvergne ─────────────────────────────────────────────────
    'Puy-de-Dôme':        [24, 48, 46, 50, 38, 13, 42, 22],
    'Allier':             [68, 55, 46, 80, 78, 72, 68, 70],
    'Haute-Loire':        [94, 82, 44, 75, 84, 88, 58, 72],
    'Cantal':             [90, 96, 88, 92, 96, 93, 52, 72],

    // ── Limousin ─────────────────────────────────────────────────
    'Haute-Vienne':       [63, 42, 51, 68, 58, 19, 62, 70],
    'Corrèze':            [67, 78, 52, 88, 82, 80, 62, 62],
    'Creuse':             [91, 95, 62, 97,100, 96, 88, 92],

    // ── Aquitaine ────────────────────────────────────────────────
    'Gironde':            [18, 16, 23, 20,  7,  4,  5,  8],
    'Dordogne':           [84, 72, 22, 68, 74, 80, 28, 25],
    'Lot-et-Garonne':     [76, 75, 20, 68, 71, 82, 44, 62],
    'Landes':             [75, 68, 18, 55, 72, 75, 48, 38],
    'Pyrénées-Atlantiques':[30, 65, 25, 42, 53, 50, 17, 27],

    // ── Midi-Pyrénées ────────────────────────────────────────────
    'Haute-Garonne':      [6,  17, 24, 10, 10,  5, 11, 12],
    'Tarn-et-Garonne':    [83, 68, 19, 62, 78, 82, 50, 65],
    'Tarn':               [61, 62, 26, 55, 69, 72, 45, 58],
    'Aveyron':            [40, 88, 44, 65, 80, 82, 32, 55],
    'Lot':                [80, 85, 21, 80, 87, 86, 30, 40],
    'Gers':               [80, 88, 17, 70, 85, 88, 22, 60],
    'Hautes-Pyrénées':    [66, 78, 52, 65, 80, 78, 52, 32],
    'Ariège':             [78, 70, 28, 75, 95, 86, 60, 60],

    // ── Languedoc-Roussillon ─────────────────────────────────────
    'Hérault':            [9,  12, 10, 15, 15,  6, 16,  6],
    'Gard':               [31, 13, 12, 25, 52, 58, 36, 36],
    'Aude':               [55, 44, 15, 52, 77, 78, 42, 35],
    'Pyrénées-Orientales':[44, 14, 11, 22, 51, 65, 40, 24],
    'Lozère':             [95, 98, 80, 95,101, 97, 68, 70],

    // ── Provence-Alpes-Côte d'Azur ───────────────────────────────
    'Bouches-du-Rhône':   [3,   2, 13, 18,  3, 10,  6,  5],
    'Var':                [52, 42,  9, 25, 41, 48,  9,  3],
    'Alpes-Maritimes':    [11, 15,  8, 30, 18, 17,  4,  2],
    'Vaucluse':           [53, 40, 14, 38, 52, 55, 22, 20],
    'Alpes-de-Haute-Provence': [92, 78, 16, 65, 93, 88, 45, 38],
    'Hautes-Alpes':       [93, 86, 98, 72, 98, 90, 55, 30],

    // ── Poitou-Charentes ─────────────────────────────────────────
    'Charente-Maritime':  [57, 38, 28, 42, 55, 60, 35, 22],
    'Charente':           [56, 62, 30, 58, 70, 70, 38, 58],
    'Vienne':             [62, 58, 41, 60, 60, 45, 58, 68],
    'Deux-Sèvres':        [38, 73, 42, 55, 73, 72, 62, 80],

    // ── Corse ────────────────────────────────────────────────────
    'Corse-du-Sud':       [28, 72,  6, 35, 88, 72, 15,  8],
    'Haute-Corse':        [32, 65,  7, 38, 90, 76, 18, 14],

    // ── Départements d'Outre-Mer ─────────────────────────────────
    'Guadeloupe':         [97, 23,  4,  4, 38, 62, 20, 11],
    'Martinique':         [98, 24,  3,  6, 48, 58, 26, 12],
    'Guyane':             [99, 55,  2,  2, 56, 70, 78, 80],
    'La Réunion':         [100,38,  5,  8, 34, 38, 16, 10],
    'Mayotte':            [101,88,  1,  1, 54, 88, 88, 88],
  },
};

const RANKINGS_FRANCE = (() => {
  const out = DB_FRANCE.categories.map((cat, ci) => {
    return Object.entries(DB_FRANCE.departments)
      .filter(([, v]) => v[ci] !== null)
      .sort((a, b) => a[1][ci] - b[1][ci])
      .map(([name, v]) => ({ country: name, rank: v[ci] }));
  });
  return out;
})();
