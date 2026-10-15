import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getEntity } from '../data';
import { readJSON, writeJSON } from './storage';

/**
 * "MY COLLECTION": preferiti e percorsi personali, persistiti in localStorage.
 */
export interface PersonalPath {
  id: string;
  name: string;
  items: string[]; // chiavi "kind:id"; ordinate cronologicamente in visualizzazione
  createdAt: number;
}

interface CollectionState {
  favorites: string[];
  paths: PersonalPath[];
  storageOk: boolean;
  isFavorite: (key: string) => boolean;
  toggleFavorite: (key: string) => void;
  clearFavorites: () => void;
  createPath: (name: string, firstItem?: string) => string;
  renamePath: (id: string, name: string) => void;
  deletePath: (id: string) => void;
  addToPath: (id: string, key: string) => void;
  removeFromPath: (id: string, key: string) => void;
}

const FAV_KEY = 'chronos.favorites.v1';
const PATH_KEY = 'chronos.paths.v1';

const Ctx = createContext<CollectionState | null>(null);

const valid = (k: unknown): k is string => typeof k === 'string' && !!getEntity(k);

function loadPaths(): PersonalPath[] {
  const raw = readJSON<unknown>(PATH_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((p): p is PersonalPath => !!p && typeof p === 'object' && typeof (p as PersonalPath).id === 'string')
    .map((p) => ({
      id: p.id,
      name: typeof p.name === 'string' && p.name.trim() ? p.name : 'Percorso senza nome',
      items: Array.isArray(p.items) ? [...new Set(p.items.filter(valid))] : [],
      createdAt: typeof p.createdAt === 'number' ? p.createdAt : Date.now(),
    }));
}

export function sortChronologically(keys: string[]): string[] {
  return [...keys].sort((a, b) => (getEntity(a)?.date.sortYear ?? 0) - (getEntity(b)?.date.sortYear ?? 0));
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const raw = readJSON<unknown>(FAV_KEY, []);
    return Array.isArray(raw) ? [...new Set(raw.filter(valid))] : [];
  });
  const [paths, setPaths] = useState<PersonalPath[]>(loadPaths);
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => setStorageOk(writeJSON(FAV_KEY, favorites)), [favorites]);
  useEffect(() => setStorageOk(writeJSON(PATH_KEY, paths)), [paths]);

  // Sincronizza tra schede del browser
  useEffect(() => {
    const on = (e: StorageEvent) => {
      if (e.key === FAV_KEY) setFavorites(readJSON<string[]>(FAV_KEY, []).filter(valid));
      if (e.key === PATH_KEY) setPaths(loadPaths());
    };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, []);

  const toggleFavorite = useCallback(
    (key: string) => setFavorites((f) => (f.includes(key) ? f.filter((k) => k !== key) : [...f, key])),
    [],
  );

  const createPath = useCallback((name: string, firstItem?: string) => {
    const id = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    setPaths((ps) => [...ps, { id, name: name.trim() || 'Nuovo percorso', items: firstItem ? [firstItem] : [], createdAt: Date.now() }]);
    return id;
  }, []);

  const value = useMemo<CollectionState>(
    () => ({
      favorites,
      paths,
      storageOk,
      isFavorite: (k) => favorites.includes(k),
      toggleFavorite,
      clearFavorites: () => setFavorites([]),
      createPath,
      renamePath: (id, name) => setPaths((ps) => ps.map((p) => (p.id === id ? { ...p, name: name.trim() || p.name } : p))),
      deletePath: (id) => setPaths((ps) => ps.filter((p) => p.id !== id)),
      addToPath: (id, key) =>
        setPaths((ps) => ps.map((p) => (p.id === id && !p.items.includes(key) ? { ...p, items: [...p.items, key] } : p))),
      removeFromPath: (id, key) => setPaths((ps) => ps.map((p) => (p.id === id ? { ...p, items: p.items.filter((k) => k !== key) } : p))),
    }),
    [favorites, paths, storageOk, toggleFavorite, createPath],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCollection() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCollection deve essere usato dentro CollectionProvider');
  return c;
}
