import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ARTIFACTS, ERA_BY_ID, ERAS, keyOf } from '../../data';
import { imageFor } from '../../data/images';
import type { EraId } from '../../data/types';
import { Illustration } from '../art/Illustration';
import { Photo, PhotoCredit } from '../art/Photo';
import { CertaintyBadge } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';
import { SectionHead } from '../ui/Reveal';

const ERAS_WITH_OBJECTS = ERAS.filter((e) => ARTIFACTS.some((a) => a.era === e.id));
const SORTED = ARTIFACTS.slice().sort((a, b) => a.date.sortYear - b.date.sortYear);

/**
 * Il Gabinetto delle Meraviglie: un oggetto alla volta in una grande "vetrina" fotografica,
 * illuminata da un solo lato, con la sequenza degli altri oggetti sotto come una pellicola.
 */
export function Cabinet({ onOpen }: { onOpen: (key: string) => void }) {
  const [filter, setFilter] = useState<EraId | 'all'>('all');
  const items = useMemo(() => (filter === 'all' ? SORTED : SORTED.filter((a) => a.era === filter)), [filter]);
  const [sel, setSel] = useState(SORTED[0].id);
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!items.some((a) => a.id === sel)) setSel(items[0].id);
  }, [items, sel]);

  const idx = Math.max(0, items.findIndex((a) => a.id === sel));
  const a = items[idx];
  const era = ERA_BY_ID[a.era];
  const photo = imageFor(`artifact:${a.id}`);
  const step = (d: number) => setSel(items[(idx + d + items.length) % items.length].id);

  // Centra la miniatura attiva scorrendo solo la pellicola (mai la pagina)
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-id="${sel}"]`);
    if (strip && el) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [sel]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="artifacts" className="cabinet" aria-labelledby="cabinet-title" style={{ ['--v-accent' as string]: era.palette.accent }}>
      <div className="container">
        <div id="cabinet-title">
          <SectionHead
            index="III"
            kicker="Il Gabinetto delle Meraviglie"
            title="OBJECTS THAT CHANGED THE WORLD"
            lead="Dieci oggetti, dalla stele di Hammurabi alla tuta di Apollo 11, fotografati nei musei che li custodiscono."
          />
        </div>

        <div className="filter-bar" role="group" aria-label="Filtra gli oggetti per epoca">
          <button type="button" className={`pill ${filter === 'all' ? 'is-on' : ''}`} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            Tutti <span className="pill__count">{ARTIFACTS.length}</span>
          </button>
          {ERAS_WITH_OBJECTS.map((e) => (
            <button key={e.id} type="button" className={`pill ${filter === e.id ? 'is-on' : ''}`} aria-pressed={filter === e.id} onClick={() => setFilter(e.id)}>
              {e.name} <span className="pill__count">{ARTIFACTS.filter((x) => x.era === e.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Vetrina principale ── */}
      <div className="showcase" aria-live="polite">
        <div className="showcase__media">
          <AnimatePresence initial={false}>
            <motion.div key={a.id} className="showcase__frame" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }}>
              {photo ? <Photo image={photo} /> : <Illustration entity={a} size="lg" />}
            </motion.div>
          </AnimatePresence>
          <div className="showcase__light" aria-hidden="true" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={a.id} className="showcase__info" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.5, ease }}>
            <p className="showcase__era">
              {era.index} · {era.name}
            </p>
            <h3 className="showcase__title">{a.title}</h3>
            <p className="showcase__date">
              {a.date.label} <CertaintyBadge c={a.date.certainty} />
            </p>
            <dl className="showcase__facts">
              <div>
                <dt>Materiali</dt>
                <dd>{a.materials}</dd>
              </div>
              <div>
                <dt>Dove si trova</dt>
                <dd>{a.location}</dd>
              </div>
            </dl>
            <p className="showcase__sig">{a.significance}</p>
            <div className="showcase__actions">
              <button type="button" className="btn btn--primary btn--sm vitrine__btn" onClick={() => onOpen(keyOf(a))}>
                Apri la scheda <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              <FavButton itemKey={keyOf(a)} />
            </div>
            {photo && <PhotoCredit image={photo} className="showcase__credit" />}
          </motion.div>
        </AnimatePresence>

        <div className="showcase__nav">
          <button type="button" className="icon-btn icon-btn--glass" onClick={() => step(-1)} aria-label="Oggetto precedente">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <span className="stage__counter">
            <strong>{String(idx + 1).padStart(2, '0')}</strong> / {String(items.length).padStart(2, '0')}
          </span>
          <button type="button" className="icon-btn icon-btn--glass" onClick={() => step(1)} aria-label="Oggetto successivo">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Pellicola ── */}
      <ul className="filmstrip" ref={stripRef} aria-label="Tutti gli oggetti della selezione">
        {items.map((o, i) => {
          const img = imageFor(`artifact:${o.id}`);
          const on = o.id === a.id;
          return (
            <li key={o.id} className={`vitrine ${on ? 'is-on' : ''}`} data-id={o.id}>
              <button type="button" className="filmstrip__btn" aria-pressed={on} onClick={() => setSel(o.id)}>
                <span className="filmstrip__img">{img ? <Photo image={img} decorative small /> : <Illustration entity={o} size="sm" showCaption={false} />}</span>
                <span className="filmstrip__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="filmstrip__title">{o.title}</span>
                <span className="filmstrip__date">{o.date.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
