import { IMAGES } from '../../data/images';
import { PhotoBand } from '../art/PhotoBand';
import { ArrowUp, Search, SearchX, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useDeferredValue, useMemo, useState } from 'react';
import { ALL_ENTITIES, ERAS, KIND_LABEL, keyOf } from '../../data';
import type { EntityKind, EraId } from '../../data/types';
import { search, type SortMode } from '../../lib/search';
import { Glyph } from '../art/Glyph';
import { DateLine, EraTag, KindTag } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';

const KINDS: EntityKind[] = ['event', 'person', 'civilization', 'artifact'];
const KIND_PLURAL: Record<EntityKind, string> = { event: 'Eventi', person: 'Personaggi', civilization: 'Civiltà', artifact: 'Oggetti' };

export function Explore({ onOpen }: { onOpen: (key: string) => void }) {
  const [text, setText] = useState('');
  const [eras, setEras] = useState<EraId[]>([]);
  const [kinds, setKinds] = useState<EntityKind[]>([]);
  const [sort, setSort] = useState<SortMode>('relevance');
  const deferred = useDeferredValue(text);

  const results = useMemo(() => search(ALL_ENTITIES, { text: deferred, eras, kinds, sort }), [deferred, eras, kinds, sort]);

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const hasFilters = text || eras.length || kinds.length || sort !== 'relevance';
  const reset = () => {
    setText('');
    setEras([]);
    setKinds([]);
    setSort('relevance');
  };

  return (
    <section id="explore" className="explore" aria-labelledby="explore-title">
      <PhotoBand image={IMAGES['band:explore']} index="V" kicker="Modalità esplorazione" title="WANDER THE ARCHIVE" lead="Cerca liberamente tra eventi, personaggi, civiltà e oggetti. Filtra per epoca e tipologia, ordina per data." titleId="explore-title" align="right" />
      <div className="container">

        <form className="explore__search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="q" className="sr-only">
            Cerca nel museo
          </label>
          <Search size={20} aria-hidden="true" className="explore__icon" />
          <input
            id="q"
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cerca: Vesuvio, Galileo, Maya, stampa…"
            autoComplete="off"
            spellCheck={false}
          />
          {text && (
            <button type="button" className="icon-btn icon-btn--sm" onClick={() => setText('')} aria-label="Cancella la ricerca">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </form>

        <div className="explore__filters">
          <fieldset className="filter-group">
            <legend>Tipologia</legend>
            <div className="filter-bar">
              {KINDS.map((k) => (
                <button key={k} type="button" className={`pill ${kinds.includes(k) ? 'is-on' : ''}`} aria-pressed={kinds.includes(k)} onClick={() => setKinds((l) => toggle(l, k))}>
                  {KIND_PLURAL[k]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="filter-group">
            <legend>Epoca</legend>
            <div className="filter-bar">
              {ERAS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className={`pill ${eras.includes(e.id) ? 'is-on' : ''}`}
                  aria-pressed={eras.includes(e.id)}
                  onClick={() => setEras((l) => toggle(l, e.id))}
                  style={{ ['--pill-accent' as string]: e.palette.accent }}
                >
                  {e.index} {e.name}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="explore__tools">
            <label className="select">
              <span>Ordina</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortMode)}>
                <option value="relevance">Pertinenza</option>
                <option value="date-asc">Data: dal più antico</option>
                <option value="date-desc">Data: dal più recente</option>
                <option value="alpha">Alfabetico</option>
              </select>
            </label>
            {hasFilters ? (
              <button type="button" className="link-btn" onClick={reset}>
                Azzera filtri
              </button>
            ) : null}
            <a href="#/timeline" className="link-btn">
              <ArrowUp size={14} aria-hidden="true" /> Torna alla timeline
            </a>
          </div>
        </div>

        <p className="explore__count" role="status" aria-live="polite">
          {results.length === 0 ? 'Nessun risultato' : `${results.length} ${results.length === 1 ? 'risultato' : 'risultati'}`}
        </p>

        {results.length === 0 ? (
          <div className="empty">
            <SearchX size={36} aria-hidden="true" />
            <p className="empty__title">Nessun risultato trovato.</p>
            <p>Prova con un termine diverso, controlla l'ortografia oppure rimuovi qualche filtro.</p>
            {hasFilters && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                Azzera la ricerca
              </button>
            )}
          </div>
        ) : (
          <ul className="results">
            <AnimatePresence initial={false}>
              {results.map((r) => (
                <motion.li key={keyOf(r)} layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <article className="result">
                    <button type="button" className="result__btn" onClick={() => onOpen(keyOf(r))}>
                      <Glyph id={r.glyph} className="result__glyph" />
                      <span className="result__meta">
                        <KindTag entity={r} />
                        <EraTag era={r.era} />
                      </span>
                      <span className="result__title">{r.title}</span>
                      <DateLine entity={r} />
                      <span className="result__sum">{r.summary}</span>
                      <span className="sr-only">Apri la scheda ({KIND_LABEL[r.kind]})</span>
                    </button>
                    <FavButton itemKey={keyOf(r)} />
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  );
}
