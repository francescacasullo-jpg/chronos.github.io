import type { Entity, EntityKind, EraId } from '../data/types';

export type SortMode = 'relevance' | 'date-asc' | 'date-desc' | 'alpha';

export interface SearchQuery {
  text: string;
  eras: EraId[]; // vuoto = tutte
  kinds: EntityKind[]; // vuoto = tutti
  sort: SortMode;
}

/** Minuscole, senza accenti e punteggiatura superflua. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function haystack(e: Entity): { title: string; body: string } {
  const parts: string[] = [e.summary];
  switch (e.kind) {
    case 'event':
      parts.push(e.place, e.context, e.explanation, e.date.label);
      break;
    case 'artifact':
      parts.push(e.materials, e.location, e.context, e.func, e.significance);
      break;
    case 'person':
      parts.push(e.role, e.lifespan, e.context);
      break;
    case 'civilization':
      parts.push(e.region, e.period, e.society, ...e.cities, ...e.innovations);
      break;
  }
  return { title: normalize(e.title), body: normalize(parts.join(' ')) };
}

const cache = new WeakMap<Entity, { title: string; body: string }>();
const hay = (e: Entity) => {
  let h = cache.get(e);
  if (!h) cache.set(e, (h = haystack(e)));
  return h;
};

/** Punteggio: 0 = nessuna corrispondenza. Tutti i termini devono comparire. */
export function score(e: Entity, text: string): number {
  const terms = normalize(text).split(' ').filter(Boolean);
  if (terms.length === 0) return 1;
  const { title, body } = hay(e);
  let total = 0;
  for (const t of terms) {
    if (title.startsWith(t)) total += 10;
    else if (title.split(' ').some((w) => w.startsWith(t))) total += 6;
    else if (title.includes(t)) total += 4;
    else if (body.includes(t)) total += 1;
    else return 0;
  }
  return total;
}

export function search(items: Entity[], q: SearchQuery): Entity[] {
  const scored = items
    .filter((e) => (q.eras.length === 0 || q.eras.includes(e.era)) && (q.kinds.length === 0 || q.kinds.includes(e.kind)))
    .map((e) => ({ e, s: score(e, q.text) }))
    .filter((x) => x.s > 0);

  const byDate = (a: Entity, b: Entity) => a.date.sortYear - b.date.sortYear;
  switch (q.sort) {
    case 'date-asc':
      scored.sort((a, b) => byDate(a.e, b.e));
      break;
    case 'date-desc':
      scored.sort((a, b) => byDate(b.e, a.e));
      break;
    case 'alpha':
      scored.sort((a, b) => a.e.title.localeCompare(b.e.title, 'it'));
      break;
    default:
      scored.sort((a, b) => b.s - a.s || byDate(a.e, b.e));
  }
  return scored.map((x) => x.e);
}
