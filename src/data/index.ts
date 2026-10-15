import { ARTIFACTS } from './artifacts';
import { CIVILIZATIONS } from './civilizations';
import { ERAS, ERA_BY_ID } from './eras';
import { EVENTS } from './events';
import { PEOPLE } from './people';
import type { Entity, EntityKind } from './types';

export { ARTIFACTS, CIVILIZATIONS, ERAS, ERA_BY_ID, EVENTS, PEOPLE };
export * from './types';

/** Chiave univoca globale "tipo:id". */
export const keyOf = (e: Entity) => `${e.kind}:${e.id}`;

const ALL: Entity[] = [...EVENTS, ...ARTIFACTS, ...PEOPLE, ...CIVILIZATIONS];
export const ALL_ENTITIES = ALL;

const BY_KEY = new Map<string, Entity>(ALL.map((e) => [keyOf(e), e]));
export const getEntity = (key: string): Entity | undefined => BY_KEY.get(key);

export const KIND_LABEL: Record<EntityKind, string> = {
  event: 'Evento',
  artifact: 'Oggetto',
  person: 'Personaggio',
  civilization: 'Civiltà',
};

export const CERTAINTY_LABEL = {
  certain: 'Data documentata',
  approximate: 'Data approssimativa',
  debated: 'Cronologia discussa',
  hypothetical: 'Ipotesi — non è un fatto',
} as const;

/** "The moments that changed everything": selezione curatoriale richiesta. */
export const FEATURED_MOMENTS = ['giza', 'athens-democracy', 'vesuvius', 'printing', 'relativity', 'apollo11'];
