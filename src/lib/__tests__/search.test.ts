import { describe, expect, it } from 'vitest';
import { ALL_ENTITIES, ARTIFACTS, CIVILIZATIONS, ERAS, EVENTS, getEntity, keyOf } from '../../data';
import { normalize, search } from '../search';

const q = (text: string, extra: Partial<Parameters<typeof search>[1]> = {}) =>
  search(ALL_ENTITIES, { text, eras: [], kinds: [], sort: 'relevance', ...extra });

describe('normalize', () => {
  it('rimuove accenti e maiuscole', () => {
    expect(normalize('Età Contemporanea!')).toBe('eta contemporanea');
  });
});

describe('search', () => {
  it('trova eventi, personaggi, civiltà e oggetti', () => {
    expect(q('vesuvio')[0].id).toBe('vesuvius');
    expect(q('galileo').some((e) => e.kind === 'person')).toBe(true);
    expect(q('maya').some((e) => e.kind === 'civilization')).toBe(true);
    expect(q('rosetta').some((e) => e.kind === 'artifact')).toBe(true);
  });
  it('ignora gli accenti nella query', () => {
    expect(q('antichità').length).toEqual(q('antichita').length);
  });
  it('restituisce vuoto se non trova nulla', () => {
    expect(q('zzzzqqq')).toHaveLength(0);
  });
  it('filtra per epoca e tipologia', () => {
    const r = q('', { eras: ['rinascimento'], kinds: ['artifact'] });
    expect(r.every((e) => e.era === 'rinascimento' && e.kind === 'artifact')).toBe(true);
    expect(r).toHaveLength(ARTIFACTS.filter((a) => a.era === 'rinascimento').length);
  });
  it('ordina per data', () => {
    const r = q('', { sort: 'date-asc' });
    for (let i = 1; i < r.length; i++) expect(r[i].date.sortYear).toBeGreaterThanOrEqual(r[i - 1].date.sortYear);
  });
});

describe('integrità del dataset', () => {
  it('ha almeno 7 epoche, 8 oggetti e 7 civiltà', () => {
    expect(ERAS.length).toBeGreaterThanOrEqual(7);
    expect(ARTIFACTS.length).toBeGreaterThanOrEqual(8);
    expect(CIVILIZATIONS.length).toBeGreaterThanOrEqual(7);
  });
  it('ogni elemento ha almeno una fonte con URL https', () => {
    for (const e of ALL_ENTITIES) {
      expect(e.sources.length, keyOf(e)).toBeGreaterThan(0);
      for (const s of e.sources) expect(s.url, keyOf(e)).toMatch(/^https:\/\//);
    }
  });
  it('tutti i collegamenti correlati puntano a elementi esistenti', () => {
    for (const e of ALL_ENTITIES) for (const r of e.related ?? []) expect(getEntity(r), `${keyOf(e)} → ${r}`).toBeDefined();
  });
  it('chiavi univoche', () => {
    const keys = ALL_ENTITIES.map(keyOf);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it('gli scenari futuri sono marcati come ipotesi', () => {
    for (const e of EVENTS.filter((x) => x.era === 'futuro')) {
      expect(e.date.certainty).toBe('hypothetical');
      expect(e.hypothetical).toBe(true);
    }
  });
  it('i momenti richiesti sono presenti', () => {
    for (const id of ['giza', 'athens-democracy', 'vesuvius', 'printing', 'relativity', 'apollo11']) expect(getEntity(`event:${id}`)).toBeDefined();
  });
});
