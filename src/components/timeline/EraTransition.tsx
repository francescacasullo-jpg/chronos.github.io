import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Era } from '../../data/types';
import { useReducedMotion } from '../../lib/hooks';
import { Motif } from '../art/Motif';

const MATTER: Record<Era['motif'], string> = {
  sand: 'Sabbia',
  stone: 'Pietra',
  arches: 'Arco',
  perspective: 'Prospettiva',
  gears: 'Ingranaggio',
  circuit: 'Circuito',
  lattice: 'Struttura',
};

const COLS = 8;
const ROWS = 4;

/**
 * Transizione cinematografica tra le epoche (≈0,9 s, non blocca l'interazione):
 * 1. la materia dell'epoca precedente si frantuma in tessere (la sabbia diventa blocchi…)
 * 2. il motivo della nuova epoca viene svelato da una maschera direzionale
 * 3. un fascio di luce attraversa la sala e mostra il passaggio "Materia → Materia".
 */
export function EraTransition({ era, dir }: { era: Era; dir: number }) {
  const reduced = useReducedMotion();
  const prev = useRef<Era | null>(null);
  const [run, setRun] = useState<{ from: Era; to: Era; n: number } | null>(null);

  useEffect(() => {
    if (prev.current && prev.current.id !== era.id && !reduced) {
      const from = prev.current;
      setRun((r) => ({ from, to: era, n: (r?.n ?? 0) + 1 }));
      const t = window.setTimeout(() => setRun(null), 1100);
      prev.current = era;
      return () => window.clearTimeout(t);
    }
    prev.current = era;
  }, [era, reduced]);

  return (
    <AnimatePresence>
      {run && (
        <motion.div
          key={run.n}
          className="era-trans"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ ['--from' as string]: run.from.palette.accent, ['--to' as string]: run.to.palette.accent }}
        >
          {/* 1. tessere che si dissolvono */}
          <div className="era-trans__tiles">
            {Array.from({ length: COLS * ROWS }).map((_, i) => {
              const c = i % COLS;
              const r = Math.floor(i / COLS);
              const order = dir > 0 ? c : COLS - 1 - c;
              return (
                <motion.span
                  key={i}
                  className="era-trans__tile"
                  initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.2, 1, 0.6], rotate: [0, 0, (r % 2 ? 1 : -1) * 8] }}
                  transition={{ duration: 0.8, delay: order * 0.035 + r * 0.02, ease: 'easeInOut' }}
                />
              );
            })}
          </div>

          {/* 2. la nuova materia svelata da una maschera */}
          <motion.div
            className="era-trans__reveal"
            initial={{ clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0% 0 0%)', opacity: [1, 1, 0] }}
            transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1], opacity: { times: [0, 0.6, 1], duration: 1 } }}
          >
            <Motif motif={run.to.motif} color={run.to.palette.accent} opacity={0.5} />
          </motion.div>

          {/* 3. fascio di luce + didascalia */}
          <motion.div
            className="era-trans__beam"
            initial={{ x: dir > 0 ? '-30%' : '130%' }}
            animate={{ x: dir > 0 ? '130%' : '-30%' }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.p
            className="era-trans__caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 1, times: [0, 0.2, 0.75, 1] }}
          >
            {MATTER[run.from.motif]} <span>→</span> {MATTER[run.to.motif]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
