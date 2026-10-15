import { useEffect, useState } from 'react';
import { ERAS } from '../data/eras';
import type { EraId } from '../data/types';

/**
 * Router minimale basato sull'hash: funziona anche aprendo la build
 * statica senza configurazione del server.
 *
 *   #/                         home
 *   #/timeline                 sezione timeline
 *   #/timeline/rinascimento    timeline su un'epoca precisa
 *   #/civilizations[/:id]      atlante (con civiltà selezionata)
 *   #/artifacts | #/moments | #/explore | #/collection
 *   #/item/:kind/:id           scheda di dettaglio (pagina condivisibile)
 */
export type SectionId = 'home' | 'timeline' | 'moments' | 'artifacts' | 'civilizations' | 'explore' | 'collection';

export interface Route {
  section: SectionId;
  era?: EraId;
  civ?: string;
  detail?: string; // "kind:id"
}

const SECTIONS: SectionId[] = ['home', 'timeline', 'moments', 'artifacts', 'civilizations', 'explore', 'collection'];
const KINDS = ['event', 'artifact', 'person', 'civilization'];

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts[0] === 'item' && parts[1] && KINDS.includes(parts[1]) && parts[2]) {
    return { section: 'home', detail: `${parts[1]}:${parts[2]}` };
  }
  const section = (SECTIONS as string[]).includes(parts[0] ?? '') ? (parts[0] as SectionId) : 'home';
  const route: Route = { section };
  if (section === 'timeline' && parts[1] && ERAS.some((e) => e.id === parts[1])) route.era = parts[1] as EraId;
  if (section === 'civilizations' && parts[1]) route.civ = parts[1];
  return route;
}

export const hrefSection = (s: SectionId, sub?: string) => (s === 'home' ? '#/' : `#/${s}${sub ? `/${sub}` : ''}`);
export const hrefItem = (key: string) => {
  const [kind, id] = key.split(':');
  return `#/item/${kind}/${id}`;
};

export function navigate(href: string) {
  if (window.location.hash === href) {
    // Forza la ri-esecuzione (es. riclic sullo stesso link di sezione)
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = href;
  }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
