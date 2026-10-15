import { ArrowLeft, ArrowRight, ChevronDown, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ARTIFACTS, CIVILIZATIONS, ERAS, EVENTS, PEOPLE, keyOf } from '../../data';
import { imageFor } from '../../data/images';
import type { EraId } from '../../data/types';
import { Glyph } from '../art/Glyph';
import { Photo, PhotoCredit } from '../art/Photo';
import { CertaintyBadge } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';
import { EraTransition } from './EraTransition';

interface Props {
  era: EraId;
  onEraChange: (era: EraId) => void;
  onOpen: (key: string) => void;
}

/**
 * Timeline cinematografica: ogni epoca apre su una fotografia a tutto schermo
 * (dissolvenza incrociata + zoom lentissimo), con il titolo monumentale sovrapposto.
 * Sotto, la "sala" con eventi, oggetti, personaggi e civiltà.
 */
export function Timeline({ era, onEraChange, onOpen }: Props) {
  const idx = ERAS.findIndex((e) => e.id === era);
  const current = ERAS[idx];
  const photo = imageFor(`era:${current.id}`);
  const [dir, setDir] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = useId();
  const prevIdx = useRef(idx);

  useEffect(() => {
    setDir(idx >= prevIdx.current ? 1 : -1);
    prevIdx.current = idx;
    setExpanded(false);
  }, [idx]);

  const go = (i: number, focus = false) => {
    const n = (i + ERAS.length) % ERAS.length;
    onEraChange(ERAS[n].id);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: ERAS.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  const content = useMemo(
    () => ({
      events: EVENTS.filter((e) => e.era === era).sort((a, b) => a.date.sortYear - b.date.sortYear),
      artifacts: ARTIFACTS.filter((a) => a.era === era),
      people: PEOPLE.filter((p) => p.era === era),
      civs: CIVILIZATIONS.filter((c) => c.era === era),
    }),
    [era],
  );

  // Precarica le fotografie delle epoche vicine per transizioni senza attese
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 760px)').matches;
    [idx - 1, idx + 1].forEach((i) => {
      const img = imageFor(`era:${ERAS[(i + ERAS.length) % ERAS.length].id}`);
      if (img) new Image().src = narrow ? img.srcMobile : img.src;
    });
  }, [idx]);

  const style = {
    ['--era-accent' as string]: current.palette.accent,
    ['--era-bg' as string]: current.palette.bg,
    ['--era-surface' as string]: current.palette.surface,
    ['--era-ink' as string]: current.palette.ink,
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="timeline" className="timeline" style={style} aria-labelledby="timeline-title">
      {/* ── Schermo cinematografico dell'epoca ── */}
      <div className="cinema">
        <div className="cinema__media" aria-hidden={photo ? undefined : true}>
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="cinema__frame"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            >
              {photo && <Photo image={photo} slowZoom />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="cinema__shade" aria-hidden="true" />
        <EraTransition era={current} dir={dir} />

        <div className="cinema__inner container">
          <header className="cinema__head">
            <p className="cinema__kicker">
              <span>I</span> Timeline storica — sette sale, dalla Preistoria al futuro
            </p>
            <h2 id="timeline-title" className="sr-only">
              A journey through time
            </h2>
            <div className="stage__controls">
              <button type="button" className="icon-btn icon-btn--glass" onClick={() => go(idx - 1)} aria-label={`Epoca precedente: ${ERAS[(idx - 1 + ERAS.length) % ERAS.length].name}`}>
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <span className="stage__counter">
                <strong>{current.index}</strong> / 07
              </span>
              <button type="button" className="icon-btn icon-btn--glass" onClick={() => go(idx + 1)} aria-label={`Epoca successiva: ${ERAS[(idx + 1) % ERAS.length].name}`}>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="cinema__title-block"
              initial={{ opacity: 0, x: 40 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 * dir }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="stage__span">
                {current.index} · {current.span}
              </p>
              <h3 className="stage__title">{current.name}</h3>
              <p className="stage__subtitle">{current.subtitle}</p>
              {current.hypothetical && (
                <p className="notice notice--hyp" role="note">
                  <strong>Sala ipotetica.</strong> I contenuti di questa sezione sono scenari futuri, non fatti storici.
                </p>
              )}
              <p className="stage__lead">{current.intro}</p>
            </motion.div>
          </AnimatePresence>

          {/* ── Il binario del tempo ── */}
          <div className="rail">
            <div className="rail__track" aria-hidden="true">
              <motion.div className="rail__fill" animate={{ scaleX: idx / (ERAS.length - 1) }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }} />
            </div>
            <div className="rail__tabs" role="tablist" aria-label="Epoche storiche">
              {ERAS.map((e, i) => {
                const active = i === idx;
                return (
                  <button
                    key={e.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`tab-${e.id}`}
                    aria-selected={active}
                    aria-controls={panelId}
                    tabIndex={active ? 0 : -1}
                    className={`rail__tab ${active ? 'is-active' : ''} ${i < idx ? 'is-past' : ''}`}
                    style={{ ['--tab-accent' as string]: e.palette.accent }}
                    onClick={() => go(i)}
                    onKeyDown={(ev) => onTabKey(ev, i)}
                  >
                    <span className="rail__node" aria-hidden="true" />
                    <span className="rail__num">{e.index}</span>
                    <span className="rail__name">{e.name}</span>
                    <span className="rail__span">{e.span}</span>
                    {e.hypothetical && <span className="rail__hyp">ipotesi</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {photo && <PhotoCredit image={photo} className="cinema__credit" />}
      </div>

      {/* ── La sala ── */}
      <div className="container">
        <div className="stage" id={panelId} role="tabpanel" aria-labelledby={`tab-${current.id}`} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="stage__body"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="stage__intro">
                <p className="stage__material">
                  <span>Materia della sala</span> {current.material}
                </p>
                <button type="button" className="btn btn--ghost" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
                  {expanded ? 'Chiudi approfondimento' : "Approfondisci l'epoca"}
                  <ChevronDown size={16} aria-hidden="true" className={expanded ? 'rot' : ''} />
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      className="stage__deep"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      {current.deepDive.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {(content.artifacts.length > 0 || content.people.length > 0 || content.civs.length > 0) && (
                  <div className="stage__links">
                    {content.artifacts.length > 0 && (
                      <div>
                        <h4 className="micro-title">Oggetti collegati</h4>
                        <ul className="chip-list">
                          {content.artifacts.map((a) => (
                            <li key={a.id}>
                              <button type="button" className="chip" onClick={() => onOpen(keyOf(a))}>
                                <Glyph id={a.glyph} className="chip__glyph" />
                                {a.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {content.people.length > 0 && (
                      <div>
                        <h4 className="micro-title">Personaggi</h4>
                        <ul className="chip-list">
                          {content.people.map((p) => (
                            <li key={p.id}>
                              <button type="button" className="chip" onClick={() => onOpen(keyOf(p))}>
                                {p.title} <span className="chip__meta">{p.lifespan}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {content.civs.length > 0 && (
                      <div>
                        <h4 className="micro-title">Civiltà</h4>
                        <ul className="chip-list">
                          {content.civs.map((c) => (
                            <li key={c.id}>
                              <a className="chip" href={`#/civilizations/${c.id}`}>
                                {c.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="stage__events">
                <h4 className="micro-title">
                  {current.hypothetical ? 'Scenari' : 'Eventi principali'} <span>({content.events.length})</span>
                </h4>
                <ol className="event-list">
                  {content.events.map((ev, i) => (
                    <motion.li
                      key={ev.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
                    >
                      <div className="event-row">
                        <button type="button" className="event-row__main" onClick={() => onOpen(keyOf(ev))}>
                          <Glyph id={ev.glyph} className="event-row__glyph" />
                          <span className="event-row__date">
                            {ev.date.label}
                            <CertaintyBadge c={ev.date.certainty} compact />
                          </span>
                          <span className="event-row__title">{ev.title}</span>
                          <span className="event-row__sum">{ev.summary}</span>
                          <span className="event-row__more">
                            Approfondisci <Plus size={14} aria-hidden="true" />
                          </span>
                        </button>
                        <FavButton itemKey={keyOf(ev)} />
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
