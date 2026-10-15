/**
 * CHRONOS — modello dei dati.
 * Tutti i contenuti storici vivono in /src/data e sono separati dai componenti.
 */

export type EraId =
  | 'preistoria'
  | 'antichita'
  | 'medioevo'
  | 'rinascimento'
  | 'industriale'
  | 'contemporanea'
  | 'futuro';

/** Grado di certezza di una datazione. Mostrato sempre come testo, mai solo come colore. */
export type Certainty = 'certain' | 'approximate' | 'debated' | 'hypothetical';

export interface HistoricalDate {
  /** Anno numerico usato per l'ordinamento (negativo = a.C.). */
  sortYear: number;
  /** Etichetta leggibile, es. "c. 2560 a.C." */
  label: string;
  certainty: Certainty;
  /** Nota facoltativa sulla cronologia (es. dibattito tra studiosi). */
  note?: string;
}

export type Motif = 'sand' | 'stone' | 'arches' | 'perspective' | 'gears' | 'circuit' | 'lattice';

export interface Era {
  id: EraId;
  index: string; // "01"
  name: string;
  subtitle: string;
  span: string;
  intro: string;
  /** Approfondimento più esteso. */
  deepDive: string[];
  /** Colori dell'atmosfera dell'epoca. */
  palette: { accent: string; bg: string; surface: string; ink: string };
  material: string;
  motif: Motif;
  hypothetical?: boolean;
}

export type Glyph =
  | 'pyramid' | 'temple' | 'volcano' | 'press' | 'atom' | 'moon' | 'wheat' | 'hand' | 'tablet'
  | 'castle' | 'ship' | 'telescope' | 'engine' | 'phone' | 'plane' | 'web' | 'helmet' | 'stele'
  | 'mechanism' | 'arena' | 'book' | 'tapestry' | 'plague' | 'dome' | 'rail' | 'star' | 'rocket'
  | 'circle' | 'scroll' | 'astrolabe' | 'person' | 'map' | 'city' | 'dna' | 'chip';

export interface SourceRef {
  title: string;
  publisher: string;
  url: string;
}

interface BaseEntity {
  id: string;
  title: string;
  era: EraId;
  glyph: Glyph;
  summary: string;
  sources: SourceRef[];
  related?: string[]; // id di altre entità ("tipo:id")
}

export interface HistoricalEvent extends BaseEntity {
  kind: 'event';
  date: HistoricalDate;
  place: string;
  context: string;
  explanation: string;
  hypothetical?: boolean;
}

export interface Artifact extends BaseEntity {
  kind: 'artifact';
  date: HistoricalDate;
  materials: string;
  location: string;
  context: string;
  func: string;
  significance: string;
}

export interface Person extends BaseEntity {
  kind: 'person';
  date: HistoricalDate; // nascita o periodo di attività
  lifespan: string;
  role: string;
  context: string;
}

export interface Civilization extends BaseEntity {
  kind: 'civilization';
  date: HistoricalDate;
  period: string;
  region: string;
  cities: string[];
  innovations: string[];
  society: string;
  /** Area indicativa sulla mappa: centro [lon, lat] e raggi in gradi. */
  area: { center: [number, number]; rx: number; ry: number; rotate?: number };
  boundaryNote: string;
}

export type Entity = HistoricalEvent | Artifact | Person | Civilization;
export type EntityKind = Entity['kind'];

/** Fotografia reale con crediti e punto focale per il ritaglio responsive. */
export interface ImageAsset {
  src: string; // versione desktop
  srcMobile: string; // ritaglio verticale/leggero per smartphone
  kind: 'wide' | 'obj';
  alt: string;
  caption: string;
  /** Punto focale [x, y] in 0..1, usato per object-position. */
  focal: [number, number];
  credit: { author: string; license: string; licenseUrl: string; source: string; file: string };
}
