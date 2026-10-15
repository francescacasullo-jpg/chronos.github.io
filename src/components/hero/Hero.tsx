import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ERAS } from '../../data';
import { IMAGES } from '../../data/images';
import { useReducedMotion } from '../../lib/hooks';
import { Photo, PhotoCredit } from '../art/Photo';

const HERO = IMAGES.hero;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Apertura da film: fotografia a tutto schermo del Tempio di Poseidone a Capo Sunio,
 * zoom lentissimo, parallasse leggera e titoli che entrano in scena.
 */
export function Hero({ onBegin }: { onBegin: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero__media" style={{ y: yPhoto }} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease }}>
        <Photo image={HERO} priority slowZoom />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />
      <motion.div className="hero__dim" style={{ opacity: dim }} aria-hidden="true" />

      <motion.div className="hero__content" style={{ y: yText, opacity: fade }}>
        <motion.p className="hero__brand" initial={{ opacity: 0, letterSpacing: '0.9em' }} animate={{ opacity: 1, letterSpacing: '0.42em' }} transition={{ delay: 0.4, duration: 1.6, ease }}>
          CHRONOS
        </motion.p>
        <h1 id="hero-title" className="hero__title" aria-label="The past is never really gone.">
          {['THE PAST IS', 'NEVER REALLY', 'GONE.'].map((line, i) => (
            <span className="split__mask hero__line" key={line} aria-hidden="true">
              <motion.span className="split__word" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.7 + i * 0.16, duration: 1.3, ease }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero__sub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 1.1, ease }}>
          Explore the moments that shaped our world.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.9, ease }}>
          <button type="button" className="btn btn--primary hero__cta" onClick={onBegin}>
            <span>BEGIN YOUR JOURNEY</span>
            <span className="btn__line" aria-hidden="true" />
          </button>
        </motion.div>
      </motion.div>

      <aside className="hero__index" aria-label="Le sette sale del museo">
        <ol>
          {ERAS.map((e) => (
            <li key={e.id}>
              <a href={`#/timeline/${e.id}`}>
                <span className="hero__index-num">{e.index}</span>
                <span className="hero__index-name">{e.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </aside>

      <PhotoCredit image={HERO} className="hero__credit" />

      <a className="scroll-cue" href="#/timeline" aria-label="Scorri alla timeline">
        <span className="scroll-cue__num">00 / 07</span>
        <span className="scroll-cue__track">
          <span className="scroll-cue__dot" />
        </span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
