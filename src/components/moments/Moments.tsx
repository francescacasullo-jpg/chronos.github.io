import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ERA_BY_ID, EVENTS, FEATURED_MOMENTS, keyOf } from '../../data';
import { imageFor } from '../../data/images';
import type { HistoricalEvent } from '../../data/types';
import { useReducedMotion } from '../../lib/hooks';
import { Illustration } from '../art/Illustration';
import { Photo, PhotoCredit } from '../art/Photo';
import { DateLine, EraTag } from '../ui/Badges';
import { FavButton } from '../ui/FavButton';
import { Reveal, SectionHead } from '../ui/Reveal';

/** Lato del testo scelto in base alla composizione di ogni fotografia (per non coprire il soggetto). */
const SIDE: Record<string, 'left' | 'right'> = { giza: 'left', 'athens-democracy': 'right', vesuvius: 'right', printing: 'left', relativity: 'right', apollo11: 'left' };

const MOMENTS = FEATURED_MOMENTS.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean) as HistoricalEvent[];

interface Props {
  onOpen: (key: string) => void;
  onEra: (era: HistoricalEvent['era']) => void;
}

/**
 * "The moments that changed everything": sei capitoli a tutto schermo,
 * come le sequenze di un documentario. Il testo si alterna a sinistra e a destra.
 */
export function Moments({ onOpen, onEra }: Props) {
  return (
    <section id="moments" className="moments" aria-labelledby="moments-title">
      <div className="container moments__intro">
        <div id="moments-title">
          <SectionHead
            index="II"
            kicker="Eventi documentati"
            title="THE MOMENTS THAT CHANGED EVERYTHING"
            lead="Sei momenti selezionati dai curatori. Ogni data è accompagnata dal suo grado di certezza: documentata, approssimativa o discussa dagli studiosi."
          />
        </div>
      </div>
      <ol className="chapters">
        {MOMENTS.map((ev, i) => (
          <Chapter key={ev.id} ev={ev} i={i} onOpen={onOpen} onEra={onEra} />
        ))}
      </ol>
    </section>
  );
}

function Chapter({ ev, i, onOpen, onEra }: { ev: HistoricalEvent; i: number } & Props) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-7%', '7%']);
  const era = ERA_BY_ID[ev.era];
  const photo = imageFor(`event:${ev.id}`);
  const side = SIDE[ev.id] ?? (i % 2 === 0 ? 'left' : 'right');
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <li ref={ref} className={`chapter chapter--${side}`} style={{ ['--m-accent' as string]: era.palette.accent }}>
      <article aria-labelledby={`m-${ev.id}`}>
        <div className="chapter__media">
          <motion.div className="chapter__parallax" style={{ y }}>
            {photo ? <Photo image={photo} /> : <Illustration entity={ev} size="lg" showCaption={false} />}
          </motion.div>
        </div>
        <div className="chapter__shade" aria-hidden="true" />
        <span className="chapter__num" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>

        <motion.div
          className="chapter__text"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1, ease }}
        >
          <DateLine entity={ev} />
          <h3 id={`m-${ev.id}`} className="chapter__title">
            {ev.title}
          </h3>
          <p className="chapter__place">{ev.place}</p>
          <p className="chapter__sum">{ev.summary}</p>
          <Reveal delay={0.15} y={16}>
            <p className="chapter__ctx">
              <span className="label">Contesto</span> {ev.context}
            </p>
            {ev.date.note && <p className="chapter__note">{ev.date.note}</p>}
          </Reveal>
          <div className="chapter__actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={() => onOpen(keyOf(ev))}>
              Approfondisci <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <button type="button" className="link-btn" onClick={() => onEra(ev.era)}>
              <EraTag era={ev.era} />
              <span className="sr-only">Vai all'epoca {era.name} nella timeline</span>
            </button>
            <FavButton itemKey={keyOf(ev)} />
          </div>
        </motion.div>
        {photo && <PhotoCredit image={photo} className="chapter__credit" />}
      </article>
    </li>
  );
}
