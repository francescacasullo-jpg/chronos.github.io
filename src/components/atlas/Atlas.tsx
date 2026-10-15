import { IMAGES } from '../../data/images';
import { PhotoBand } from '../art/PhotoBand';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import { ArrowUpRight, Info, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, type KeyboardEvent } from 'react';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import landTopo from 'world-atlas/land-110m.json';
import { CIVILIZATIONS, getEntity, keyOf } from '../../data';
import type { Civilization } from '../../data/types';
import { CertaintyBadge } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';
import { SourceList } from '../ui/SourceList';

const W = 1000;
const H = 520;

/** Geometria calcolata una sola volta (mappa statica, leggera). */
function useMap() {
  return useMemo(() => {
    const topo = landTopo as unknown as Topology<{ land: GeometryCollection }>;
    const land = feature(topo, topo.objects.land);
    const projection = geoNaturalEarth1().fitExtent(
      [
        [10, 10],
        [W - 10, H - 10],
      ],
      { type: 'MultiPoint', coordinates: [[-112, 8], [140, 8], [-112, 56], [140, 56]] },
    );
    const path = geoPath(projection);
    return { landPath: path(land) ?? '', grat: path(geoGraticule10()) ?? '', projection };
  }, []);
}

export function Atlas({ selected, onSelect, onOpen }: { selected: string; onSelect: (id: string) => void; onOpen: (key: string) => void }) {
  const { landPath, grat, projection } = useMap();
  const civ = CIVILIZATIONS.find((c) => c.id === selected) ?? CIVILIZATIONS[0];

  const shapes = useMemo(
    () =>
      CIVILIZATIONS.map((c) => {
        const [cx, cy] = projection(c.area.center) ?? [0, 0];
        const [ex] = projection([c.area.center[0] + c.area.rx, c.area.center[1]]) ?? [0, 0];
        const [, ey] = projection([c.area.center[0], c.area.center[1] + c.area.ry]) ?? [0, 0];
        return { c, cx, cy, rx: Math.abs(ex - cx), ry: Math.abs(cy - ey) };
      }),
    [projection],
  );

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <section id="civilizations" className="atlas" aria-labelledby="atlas-title">
      <PhotoBand image={IMAGES['band:atlas']} index="IV" kicker="Atlante delle civiltà" title="WHERE HISTORY TOOK PLACE" lead="Seleziona una civiltà sulla mappa o dall'elenco. Le aree evidenziate indicano il nucleo geografico: non sono confini politici, che cambiarono profondamente nel tempo." titleId="atlas-title" align="left" />
      <div className="container">

        <div className="atlas__layout">
          <div className="atlas__mapwrap">
            <svg className="atlas__map" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Mappa delle civiltà antiche">
              <path d={grat} className="atlas__grat" />
              <path d={landPath} className="atlas__land" />
              {shapes.map(({ c, cx, cy, rx, ry }) => {
                const active = c.id === civ.id;
                return (
                  <g
                    key={c.id}
                    className={`atlas__civ ${active ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={`${c.title}, ${c.date.label}`}
                    onClick={() => onSelect(c.id)}
                    onKeyDown={(e) => onKey(e, c.id)}
                  >
                    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={c.area.rotate ? `rotate(${c.area.rotate} ${cx} ${cy})` : undefined} className="atlas__area" />
                    <circle cx={cx} cy={cy} r={4} className="atlas__dot" />
                    <text x={cx} y={cy - ry - 8} className="atlas__label" textAnchor="middle">
                      {c.title}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="atlas__legend">
              <Info size={14} aria-hidden="true" /> Aree indicative · proiezione Natural Earth · dati cartografici Natural Earth (pubblico dominio)
            </p>
          </div>

          <div className="atlas__side">
            <ul className="atlas__list" aria-label="Elenco delle civiltà">
              {CIVILIZATIONS.map((c) => (
                <li key={c.id}>
                  <button type="button" className={`atlas__item ${c.id === civ.id ? 'is-active' : ''}`} aria-pressed={c.id === civ.id} onClick={() => onSelect(c.id)}>
                    <MapPin size={14} aria-hidden="true" />
                    <span>{c.title}</span>
                    <span className="atlas__item-date">{c.date.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.article
                key={civ.id}
                className="civ-card"
                aria-live="polite"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <CivDetails civ={civ} onOpen={onOpen} />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CivDetails({ civ, onOpen }: { civ: Civilization; onOpen: (key: string) => void }) {
  const related = (civ.related ?? []).map(getEntity).filter(Boolean);
  return (
    <>
      <header className="civ-card__head">
        <div>
          <h3 className="civ-card__title">{civ.title}</h3>
          <p className="civ-card__period">
            {civ.period} <CertaintyBadge c={civ.date.certainty} compact />
          </p>
        </div>
        <FavButton itemKey={keyOf(civ)} />
      </header>
      <dl className="facts">
        <div>
          <dt>Area geografica</dt>
          <dd>{civ.region}</dd>
        </div>
        <div>
          <dt>Città principali</dt>
          <dd>{civ.cities.join(' · ')}</dd>
        </div>
        <div>
          <dt>Innovazioni e conoscenze</dt>
          <dd>
            <ul className="dash-list">
              {civ.innovations.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Organizzazione sociale</dt>
          <dd>{civ.society}</dd>
        </div>
      </dl>
      <p className="notice">
        <strong>Nota sui confini.</strong> {civ.boundaryNote}
      </p>
      {related.length > 0 && (
        <div className="civ-card__rel">
          <h4 className="micro-title">Nel museo</h4>
          <ul className="chip-list">
            {related.map((r) => (
              <li key={keyOf(r!)}>
                <button type="button" className="chip" onClick={() => onOpen(keyOf(r!))}>
                  {r!.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <details className="civ-card__src">
        <summary>Fonti ({civ.sources.length})</summary>
        <SourceList sources={civ.sources} />
      </details>
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => onOpen(keyOf(civ))}>
        Scheda completa <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </>
  );
}
