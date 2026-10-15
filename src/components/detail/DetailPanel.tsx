import { ArrowRight, Check, Link2, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ERA_BY_ID, KIND_LABEL, getEntity, keyOf } from '../../data';
import type { Entity, EraId } from '../../data/types';
import { useCollection } from '../../lib/collection';
import { imageFor } from '../../data/images';
import { Illustration } from '../art/Illustration';
import { Photo, PhotoCredit } from '../art/Photo';
import { CertaintyBadge, EraTag } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';
import { SourceList } from '../ui/SourceList';

interface Props {
  itemKey: string | null;
  onClose: () => void;
  onOpenRelated: (key: string) => void;
  onEra: (era: EraId) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), select, input, textarea, summary, [tabindex]:not([tabindex="-1"])';

/** Pannello di approfondimento: dialog modale accessibile (focus trap, Esc, ripristino del focus). */
export function DetailPanel({ itemKey, onClose, onOpenRelated, onEra }: Props) {
  const entity = itemKey ? getEntity(itemKey) : undefined;
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = !!itemKey;

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && panelRef.current) {
        const els = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
      const r = returnFocus.current;
      if (r && document.contains(r)) r.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  // Scorri in cima quando si passa a una scheda correlata
  useEffect(() => {
    panelRef.current?.querySelector('.detail__scroll')?.scrollTo({ top: 0 });
  }, [itemKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="detail__backdrop" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            className="detail__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={entity ? { ['--d-accent' as string]: ERA_BY_ID[entity.era].palette.accent } : undefined}
          >
            <div className="detail__bar">
              <span className="detail__kind">{entity ? KIND_LABEL[entity.kind] : 'Scheda'}</span>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Chiudi la scheda (Esc)" data-autofocus>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="detail__scroll">
              {entity ? (
                <AnimatePresence mode="wait">
                  <motion.div key={itemKey} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                    <DetailBody entity={entity} onOpenRelated={onOpenRelated} onEra={onEra} />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="empty">
                  <p className="empty__title" id="detail-title">
                    Scheda non trovata
                  </p>
                  <p>Il contenuto richiesto non esiste o è stato spostato. Puoi tornare all'esplorazione del museo.</p>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
                    Torna al museo
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBody({ entity, onOpenRelated, onEra }: { entity: Entity; onOpenRelated: (k: string) => void; onEra: (era: EraId) => void }) {
  const key = keyOf(entity);
  const era = ERA_BY_ID[entity.era];
  const related = (entity.related ?? []).map(getEntity).filter((x): x is Entity => !!x);
  const photo = imageFor(key);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard non disponibile: nessuna azione */
    }
  };

  return (
    <article className="detail__body">
      {photo ? (
        <figure className="detail__photo">
          <Photo image={photo} />
          <figcaption>
            <PhotoCredit image={photo} />
          </figcaption>
        </figure>
      ) : (
        <Illustration entity={entity} size="lg" />
      )}
      <div className="detail__head">
        <EraTag era={entity.era} />
        <h2 id="detail-title" className="detail__title">
          {entity.title}
        </h2>
        <p className="detail__date">
          <span>{entity.kind === 'person' ? entity.lifespan : entity.kind === 'civilization' ? entity.period : entity.date.label}</span>
          <CertaintyBadge c={entity.date.certainty} />
        </p>
        {entity.date.note && <p className="detail__note">{entity.date.note}</p>}
        {entity.kind === 'event' && entity.hypothetical && (
          <p className="notice notice--hyp" role="note">
            <strong>Scenario ipotetico.</strong> Questa scheda descrive una possibilità discussa, non un evento storico.
          </p>
        )}
      </div>

      <div className="detail__actions">
        <FavButton itemKey={key} withLabel />
        <AddToPath itemKey={key} />
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onEra(entity.era)}>
          Vai all'epoca: {era.name} <ArrowRight size={15} aria-hidden="true" />
        </button>
        <button type="button" className="link-btn" onClick={copyLink}>
          {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Link copiato' : 'Copia link'}</span>
        </button>
      </div>

      <section className="detail__section">
        <h3 className="micro-title">Descrizione</h3>
        <p className="detail__lead">{entity.summary}</p>
        {entity.kind === 'event' && <p>{entity.explanation}</p>}
        {entity.kind === 'person' && (
          <p>
            <strong>{entity.role}.</strong> {entity.context}
          </p>
        )}
      </section>

      {entity.kind === 'event' && (
        <section className="detail__section">
          <h3 className="micro-title">Contesto storico</h3>
          <dl className="facts">
            <div>
              <dt>Luogo</dt>
              <dd>{entity.place}</dd>
            </div>
            <div>
              <dt>Contesto</dt>
              <dd>{entity.context}</dd>
            </div>
          </dl>
        </section>
      )}

      {entity.kind === 'artifact' && (
        <section className="detail__section">
          <h3 className="micro-title">Scheda dell'oggetto</h3>
          <dl className="facts">
            <div>
              <dt>Materiali e caratteristiche</dt>
              <dd>{entity.materials}</dd>
            </div>
            <div>
              <dt>Dove si trova</dt>
              <dd>{entity.location}</dd>
            </div>
            <div>
              <dt>Contesto storico</dt>
              <dd>{entity.context}</dd>
            </div>
            <div>
              <dt>Funzione</dt>
              <dd>{entity.func}</dd>
            </div>
            <div>
              <dt>Importanza</dt>
              <dd>{entity.significance}</dd>
            </div>
          </dl>
        </section>
      )}

      {entity.kind === 'civilization' && (
        <section className="detail__section">
          <h3 className="micro-title">Informazioni</h3>
          <dl className="facts">
            <div>
              <dt>Area geografica</dt>
              <dd>{entity.region}</dd>
            </div>
            <div>
              <dt>Città principali</dt>
              <dd>{entity.cities.join(' · ')}</dd>
            </div>
            <div>
              <dt>Innovazioni</dt>
              <dd>{entity.innovations.join(' · ')}</dd>
            </div>
            <div>
              <dt>Organizzazione sociale</dt>
              <dd>{entity.society}</dd>
            </div>
            <div>
              <dt>Nota sui confini</dt>
              <dd>{entity.boundaryNote}</dd>
            </div>
          </dl>
          <a className="link-btn" href={`#/civilizations/${entity.id}`}>
            Mostra sulla mappa <ArrowRight size={14} aria-hidden="true" />
          </a>
        </section>
      )}

      {related.length > 0 && (
        <section className="detail__section">
          <h3 className="micro-title">Argomenti correlati</h3>
          <ul className="related">
            {related.map((r) => (
              <li key={keyOf(r)}>
                <button type="button" className="related__btn" onClick={() => onOpenRelated(keyOf(r))}>
                  <span className="related__kind">{KIND_LABEL[r.kind]}</span>
                  <span className="related__title">{r.title}</span>
                  <span className="related__date">{r.date.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="detail__section">
        <h3 className="micro-title">Fonti consultabili</h3>
        <SourceList sources={entity.sources} />
        <p className="fine-print">
          {photo
            ? 'Fotografia da Wikimedia Commons: autore e licenza sono indicati sotto l\'immagine.'
            : "L'illustrazione è un'interpretazione grafica originale, non una fotografia."}
        </p>
      </section>
    </article>
  );
}

function AddToPath({ itemKey }: { itemKey: string }) {
  const { paths, addToPath, createPath } = useCollection();
  const [target, setTarget] = useState('');
  const [done, setDone] = useState<string | null>(null);
  const inAll = paths.filter((p) => p.items.includes(itemKey)).map((p) => p.name);

  const flash = (msg: string) => {
    setDone(msg);
    window.setTimeout(() => setDone(null), 2200);
  };

  if (paths.length === 0) {
    return (
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => {
          createPath('Il mio percorso', itemKey);
          flash('Creato "Il mio percorso"');
        }}
      >
        <Plus size={15} aria-hidden="true" /> Nuovo percorso con questa tappa
        <span className="sr-only" aria-live="polite">
          {done}
        </span>
      </button>
    );
  }

  return (
    <form
      className="add-path"
      onSubmit={(e) => {
        e.preventDefault();
        const id = target || paths[0].id;
        addToPath(id, itemKey);
        flash(`Aggiunto a "${paths.find((p) => p.id === id)?.name}"`);
      }}
    >
      <label htmlFor="add-path-sel" className="sr-only">
        Scegli il percorso
      </label>
      <select id="add-path-sel" value={target || paths[0].id} onChange={(e) => setTarget(e.target.value)}>
        {paths.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
            {p.items.includes(itemKey) ? ' ✓' : ''}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn--ghost btn--sm">
        <Plus size={15} aria-hidden="true" /> Al percorso
      </button>
      <span className="add-path__msg" aria-live="polite">
        {done ?? (inAll.length ? `Già in: ${inAll.join(', ')}` : '')}
      </span>
    </form>
  );
}
