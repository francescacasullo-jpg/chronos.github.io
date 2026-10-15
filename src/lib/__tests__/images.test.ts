import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ERAS, FEATURED_MOMENTS, ARTIFACTS, getEntity } from '../../data';
import { IMAGES } from '../../data/images';

const local = (url: string) => resolve(__dirname, '../../../public', url.replace(/^.*images\//, 'images/'));

describe('fotografie', () => {
  it('ogni file referenziato esiste in public/images e non è vuoto', () => {
    for (const [k, img] of Object.entries(IMAGES)) {
      for (const u of [img.src, img.srcMobile]) {
        expect(existsSync(local(u)), `${k}: ${u}`).toBe(true);
        expect(statSync(local(u)).size, u).toBeGreaterThan(10_000);
      }
    }
  });
  it('ogni epoca, momento e oggetto ha una fotografia', () => {
    for (const e of ERAS) expect(IMAGES[`era:${e.id}`], e.id).toBeDefined();
    for (const id of FEATURED_MOMENTS) expect(IMAGES[`event:${id}`], id).toBeDefined();
    for (const a of ARTIFACTS) expect(IMAGES[`artifact:${a.id}`], a.id).toBeDefined();
  });
  it('le chiavi di entità puntano a contenuti esistenti', () => {
    for (const k of Object.keys(IMAGES)) if (/^(event|artifact):/.test(k)) expect(getEntity(k), k).toBeDefined();
  });
  it('nessuna fotografia è usata due volte', () => {
    const srcs = Object.values(IMAGES).map((i) => i.credit.source);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
  it('ogni fotografia ha alt, autore, licenza e pagina sorgente su Wikimedia Commons', () => {
    for (const [k, i] of Object.entries(IMAGES)) {
      expect(i.alt.length, k).toBeGreaterThan(10);
      expect(i.credit.license, k).toBeTruthy();
      expect(i.credit.source, k).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    }
  });
});
