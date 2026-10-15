import { IMAGES } from '../../data/images';
import { PhotoBand } from '../art/PhotoBand';
import { Check, Pencil, Plus, Route, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { ARTIFACTS, ERAS, EVENTS, getEntity, keyOf } from '../../data';
import { sortChronologically, useCollection, type PersonalPath } from '../../lib/collection';
import { Glyph } from '../art/Glyph';
import { CertaintyBadge, EraTag, KindTag } from '../ui/Badges';

export function Collection({ onOpen }: { onOpen: (key: string) => void }) {
  const { favorites, paths, storageOk, toggleFavorite, clearFavorites, createPath } = useCollection();
  const [confirmClear, setConfirmClear] = useState(false);
  const [name, setName] = useState('');

  const favSorted = sortChronologically(favorites);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    createPath(name || `Percorso ${paths.length + 1}`);
    setName('');
  };

  return (
    <section id="collection" className="collection" aria-labelledby="collection-title">
      <PhotoBand image={IMAGES['band:collection']} index="VI" kicker="La tua raccolta" title="MY COLLECTION" lead="Salva eventi, oggetti, personaggi e civiltà, e costruisci percorsi personali ordinati cronologicamente. Tutto resta salvato in questo browser, senza account." titleId="collection-title" align="left" />
      <div className="container">

        {!storageOk && (
          <p className="notice notice--warn" role="alert">
            Il salvataggio locale non è disponibile (ad esempio in navigazione privata): la raccolta funzionerà solo fino alla chiusura della pagina.
          </p>
        )}

        <div className="collection__layout">
          {/* ── Preferiti ── */}
          <div className="col-block">
            <header className="col-block__head">
              <h3>
                Preferiti <span className="count">{favorites.length}</span>
              </h3>
              {favorites.length > 0 &&
                (confirmClear ? (
                  <span className="confirm" role="group" aria-label="Conferma svuotamento">
                    <span>Svuotare la raccolta?</span>
                    <button
                      type="button"
                      className="link-btn link-btn--danger"
                      onClick={() => {
                        clearFavorites();
                        setConfirmClear(false);
                      }}
                    >
                      Sì, svuota
                    </button>
                    <button type="button" className="link-btn" onClick={() => setConfirmClear(false)}>
                      Annulla
                    </button>
                  </span>
                ) : (
                  <button type="button" className="link-btn" onClick={() => setConfirmClear(true)}>
                    Svuota
                  </button>
                ))}
            </header>

            {favorites.length === 0 ? (
              <div className="empty empty--small">
                <p className="empty__title">La tua collezione è vuota.</p>
                <p>Usa il segnalibro accanto a un evento o a un oggetto per salvarlo qui. I preferiti restano anche dopo aver ricaricato la pagina.</p>
                <a className="btn btn--ghost btn--sm" href="#/moments">
                  Scopri i momenti chiave
                </a>
              </div>
            ) : (
              <ul className="fav-list">
                <AnimatePresence initial={false}>
                  {favSorted.map((k) => {
                    const e = getEntity(k)!;
                    return (
                      <motion.li key={k} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <button type="button" className="fav-item" onClick={() => onOpen(k)}>
                          <Glyph id={e.glyph} className="fav-item__glyph" />
                          <span className="fav-item__text">
                            <span className="fav-item__title">{e.title}</span>
                            <span className="fav-item__meta">
                              <KindTag entity={e} /> {e.date.label}
                            </span>
                          </span>
                        </button>
                        <button type="button" className="icon-btn icon-btn--sm" onClick={() => toggleFavorite(k)} aria-label={`Rimuovi ${e.title} dai preferiti`}>
                          <X size={16} aria-hidden="true" />
                        </button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {/* ── Percorsi ── */}
          <div className="col-block">
            <header className="col-block__head">
              <h3>
                Percorsi personali <span className="count">{paths.length}</span>
              </h3>
            </header>
            <form className="inline-form" onSubmit={submit}>
              <label htmlFor="new-path" className="sr-only">
                Nome del nuovo percorso
              </label>
              <input id="new-path" value={name} onChange={(e) => setName(e.target.value)} placeholder="Es. Grandi invenzioni" maxLength={60} />
              <button type="submit" className="btn btn--primary btn--sm">
                <Plus size={15} aria-hidden="true" /> Crea percorso
              </button>
            </form>

            {paths.length === 0 ? (
              <div className="empty empty--small">
                <Route size={28} aria-hidden="true" />
                <p className="empty__title">Nessun percorso ancora.</p>
                <p>Crea un percorso e aggiungi eventi e oggetti: verranno disposti automaticamente in ordine cronologico.</p>
              </div>
            ) : (
              <ul className="paths">
                {paths.map((p) => (
                  <li key={p.id}>
                    <PathCard path={p} onOpen={onOpen} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const PICKABLE = [...EVENTS, ...ARTIFACTS];

function PathCard({ path, onOpen }: { path: PersonalPath; onOpen: (key: string) => void }) {
  const { renamePath, deletePath, addToPath, removeFromPath } = useCollection();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(path.name);
  const [confirm, setConfirm] = useState(false);
  const [pick, setPick] = useState('');
  const items = sortChronologically(path.items);

  const save = (e: FormEvent) => {
    e.preventDefault();
    renamePath(path.id, draft);
    setEditing(false);
  };

  return (
    <article className="path-card" aria-label={`Percorso: ${path.name}`}>
      <header className="path-card__head">
        {editing ? (
          <form onSubmit={save} className="inline-form inline-form--tight">
            <label htmlFor={`rn-${path.id}`} className="sr-only">
              Nuovo nome del percorso
            </label>
            <input id={`rn-${path.id}`} value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={60} autoFocus />
            <button type="submit" className="icon-btn icon-btn--sm" aria-label="Salva nome">
              <Check size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--sm"
              aria-label="Annulla modifica"
              onClick={() => {
                setDraft(path.name);
                setEditing(false);
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </form>
        ) : (
          <>
            <h4 className="path-card__title">{path.name}</h4>
            <div className="path-card__tools">
              <button type="button" className="icon-btn icon-btn--sm" onClick={() => setEditing(true)} aria-label={`Rinomina ${path.name}`}>
                <Pencil size={15} aria-hidden="true" />
              </button>
              {confirm ? (
                <span className="confirm">
                  <button type="button" className="link-btn link-btn--danger" onClick={() => deletePath(path.id)}>
                    Elimina
                  </button>
                  <button type="button" className="link-btn" onClick={() => setConfirm(false)}>
                    Annulla
                  </button>
                </span>
              ) : (
                <button type="button" className="icon-btn icon-btn--sm" onClick={() => setConfirm(true)} aria-label={`Elimina il percorso ${path.name}`}>
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
      </header>

      {items.length === 0 ? (
        <p className="muted">Percorso vuoto: aggiungi la prima tappa qui sotto.</p>
      ) : (
        <ol className="path-steps">
          {items.map((k, i) => {
            const e = getEntity(k)!;
            return (
              <li key={k} className="path-step">
                <span className="path-step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <button type="button" className="path-step__btn" onClick={() => onOpen(k)}>
                  <span className="path-step__date">
                    {e.date.label} <CertaintyBadge c={e.date.certainty} compact />
                  </span>
                  <span className="path-step__title">{e.title}</span>
                  <EraTag era={e.era} />
                </button>
                <button type="button" className="icon-btn icon-btn--sm" onClick={() => removeFromPath(path.id, k)} aria-label={`Rimuovi ${e.title} dal percorso`}>
                  <X size={15} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <form
        className="inline-form inline-form--tight"
        onSubmit={(e) => {
          e.preventDefault();
          if (pick) {
            addToPath(path.id, pick);
            setPick('');
          }
        }}
      >
        <label htmlFor={`add-${path.id}`} className="sr-only">
          Aggiungi una tappa al percorso {path.name}
        </label>
        <select id={`add-${path.id}`} value={pick} onChange={(e) => setPick(e.target.value)}>
          <option value="">Aggiungi una tappa…</option>
          {ERAS.map((era) => {
            const opts = PICKABLE.filter((x) => x.era === era.id && !path.items.includes(keyOf(x)));
            if (!opts.length) return null;
            return (
              <optgroup key={era.id} label={`${era.index} ${era.name}`}>
                {opts.map((x) => (
                  <option key={keyOf(x)} value={keyOf(x)}>
                    {x.date.label} — {x.title}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
        <button type="submit" className="btn btn--ghost btn--sm" disabled={!pick}>
          Aggiungi
        </button>
      </form>
    </article>
  );
}
