export type ExteriorFinish = 'black-thermowood' | 'natural-thermowood' | 'smoked-brown';
export type InteriorFinish = 'nordic-light' | 'cedar-natural' | 'dark-timber';
export type GlazingType = 'panoramic-front' | 'corner-panorama' | 'privacy-glass';
export type SaunaSize = 'compact' | 'standard' | 'grand';
export type LightingPreset = 'daylight' | 'interior-warm' | 'evening';
export type HeaterType = 'electric' | 'wood-burning';

export interface SaunaConfig {
  exterior: ExteriorFinish;
  interior: InteriorFinish;
  glazing: GlazingType;
  size: SaunaSize;
  lighting: LightingPreset;
  heater: HeaterType;
  explodedProgress?: number; // 0 = assembled, 1 = fully exploded components
}

export interface SizeDimensions {
  width: number;
  height: number;
  depth: number;
  label: string;
  benchLevels: number;
  basePriceCHF: number;
}

export const SIZE_SPECS: Record<SaunaSize, SizeDimensions> = {
  compact: {
    width: 2.2,
    height: 2.25,
    depth: 2.0,
    label: 'Kompakt (2–3 Personen)',
    benchLevels: 2,
    basePriceCHF: 7990,
  },
  standard: {
    width: 2.6,
    height: 2.35,
    depth: 2.3,
    label: 'Standard (4–5 Personen)',
    benchLevels: 2,
    basePriceCHF: 10490,
  },
  grand: {
    width: 3.2,
    height: 2.45,
    depth: 2.6,
    label: 'Grand (6–8 Personen)',
    benchLevels: 2,
    basePriceCHF: 14990,
  },
};

export const EXTERIOR_OPTIONS = [
  {
    id: 'black-thermowood' as ExteriorFinish,
    name: 'Schwarz Thermoholz',
    tagline: 'Thermo-Fichte karbonisiert & geölt',
    colorHex: '#181716',
    priceDeltaCHF: 0,
    description: 'Tiefschwarze, thermisch veredelte Schweizer Gebirgsfichte mit seidenmattem Glanz und extremer Witterungsbeständigkeit.',
  },
  {
    id: 'natural-thermowood' as ExteriorFinish,
    name: 'Natur Thermoholz',
    tagline: 'Thermo-Kiefer honigfarben',
    colorHex: '#5C442D',
    priceDeltaCHF: 450,
    description: 'Warmer, karamellisierter Holzton durch sauerstofffreie Hochtemperaturbehandlung, ohne chemische Zusätze.',
  },
  {
    id: 'smoked-brown' as ExteriorFinish,
    name: 'Geräuchert Braun',
    tagline: 'Räuchereiche Optik seidenmatt',
    colorHex: '#382B22',
    priceDeltaCHF: 850,
    description: 'Architektonisches Dunkelbraun mit subtilen Schattierungen, passend zu modernem Sichtbeton und Naturstein.',
  },
];

export const INTERIOR_OPTIONS = [
  {
    id: 'nordic-light' as InteriorFinish,
    name: 'Nordic Light',
    tagline: 'Astfreie Polarespe',
    colorHex: '#DFD5C4',
    priceDeltaCHF: 0,
    description: 'Helles, harzfreies Espenholz mit samtiger Haptik. Bleibt auch bei 100°C angenehm kühl auf der Haut.',
  },
  {
    id: 'cedar-natural' as InteriorFinish,
    name: 'Natur Zeder Optik',
    tagline: 'Westkanadische Rotzeder Ausstrahlung',
    colorHex: '#9E6A4B',
    priceDeltaCHF: 1200,
    description: 'Reiche Farbnuancen von Gold bis Bernstein mit unvergleichlich beruhigendem natürlichem Holzduft.',
  },
  {
    id: 'dark-timber' as InteriorFinish,
    name: 'Dunkles Holz',
    tagline: 'Thermo-Espe dunkel getönt',
    colorHex: '#302621',
    priceDeltaCHF: 950,
    description: 'Sanftes, tiefes Halbdunkel für meditative Ruhe und intensiven Fokus auf Wärme und Ausblick.',
  },
];

export const GLAZING_OPTIONS = [
  {
    id: 'panoramic-front' as GlazingType,
    name: 'Panorama Front',
    tagline: '3-fach Isolierglas frontseitig',
    priceDeltaCHF: 0,
    description: 'Vollflächige rahmenintegrierte 3-fach Isolierverglasung für maximale Weitsicht und beste Dämmwerte (Ug 0.6).',
  },
  {
    id: 'corner-panorama' as GlazingType,
    name: 'Eck-Panorama',
    tagline: 'Front + Seitenflügel Ganzglas',
    priceDeltaCHF: 1850,
    description: '270°-Gefühl durch fugenlos verklebte Glasecke ohne störende Eckpfosten.',
  },
  {
    id: 'privacy-glass' as GlazingType,
    name: 'Privacy Glass',
    tagline: 'Sonnenschutz- & Sichtschutzglas',
    priceDeltaCHF: 1100,
    description: 'Von aussen blickdicht verspiegelt/getönt, von innen uneingeschränkter Panoramablick in die Schweizer Alpen.',
  },
];

export const HEATER_OPTIONS = [
  {
    id: 'electric' as HeaterType,
    name: 'Elektro-Turmofen Concept',
    tagline: '9–12 kW mit 80 kg Olivindiabas-Steinen',
    priceDeltaCHF: 0,
    description: 'Präzise digitale Steuerung via Smartphone oder Touchpanel. Grosses Steinvolumen für weiche, langanhaltende Aufgüsse.',
  },
  {
    id: 'wood-burning' as HeaterType,
    name: 'Holzofen Traditionell',
    tagline: 'Edelstahl-Ofen mit isoliertem Kaminrohr',
    priceDeltaCHF: 2400,
    description: 'Unverfälschtes Knistern und lebendiges Flammenspiel durch Glaskaminfenster. Autarker Betrieb ohne Starkstromanschluss.',
  },
];

export const LIGHTING_PRESETS = [
  { id: 'daylight' as LightingPreset, name: 'Alpenlicht', description: 'Klares Schweizer Berglicht mit weichen Schatten' },
  { id: 'interior-warm' as LightingPreset, name: 'Warmes Interieur', description: 'Indirekte LED-Beleuchtung hinter den Rückenlehnen' },
  { id: 'evening' as LightingPreset, name: 'Abenddämmerung', description: 'Mystische Abendstimmung, Sauna als leuchtender Kubus' },
];

export function calculateConfigPrice(config: SaunaConfig): number {
  const sizeSpec = SIZE_SPECS[config.size] || SIZE_SPECS.standard;
  let total = sizeSpec.basePriceCHF;

  const ext = EXTERIOR_OPTIONS.find((e) => e.id === config.exterior);
  if (ext) total += ext.priceDeltaCHF;

  const int = INTERIOR_OPTIONS.find((i) => i.id === config.interior);
  if (int) total += int.priceDeltaCHF;

  const glz = GLAZING_OPTIONS.find((g) => g.id === config.glazing);
  if (glz) total += glz.priceDeltaCHF;

  const htr = HEATER_OPTIONS.find((h) => h.id === config.heater);
  if (htr) total += htr.priceDeltaCHF;

  return total;
}

export function formatCHF(amount: number): string {
  // Swiss currency formatting: CHF 10'490
  return `CHF ${amount.toLocaleString('de-CH')}`;
}

export const DEFAULT_CONFIG: SaunaConfig = {
  exterior: 'black-thermowood',
  interior: 'nordic-light',
  glazing: 'panoramic-front',
  size: 'standard',
  lighting: 'daylight',
  heater: 'electric',
  explodedProgress: 0,
};
