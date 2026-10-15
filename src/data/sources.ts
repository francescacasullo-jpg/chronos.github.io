import type { SourceRef } from './types';

/**
 * Helper per costruire riferimenti a fonti.
 * Gli URL sono stati scelti tra enciclopedie, musei, agenzie e istituzioni
 * culturali; vedi SOURCES.md per lo stato di verifica.
 */
export const wiki = (page: string, label?: string): SourceRef => ({
  title: label ?? page.replace(/_/g, ' '),
  publisher: 'Wikipedia (EN)',
  url: `https://en.wikipedia.org/wiki/${page}`,
});

export const wikiIt = (page: string, label?: string): SourceRef => ({
  title: label ?? page.replace(/_/g, ' '),
  publisher: 'Wikipedia (IT)',
  url: `https://it.wikipedia.org/wiki/${page}`,
});

export const britannica = (path: string, title: string): SourceRef => ({
  title,
  publisher: 'Encyclopaedia Britannica',
  url: `https://www.britannica.com/${path}`,
});

export const treccani = (path: string, title: string): SourceRef => ({
  title,
  publisher: 'Enciclopedia Treccani',
  url: `https://www.treccani.it/enciclopedia/${path}`,
});

export const unesco = (id: number, title: string): SourceRef => ({
  title,
  publisher: 'UNESCO World Heritage Centre',
  url: `https://whc.unesco.org/en/list/${id}/`,
});

export const ref = (title: string, publisher: string, url: string): SourceRef => ({ title, publisher, url });
