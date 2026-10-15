import { lazy, Suspense, useCallback, useState } from 'react';
import { hasWebGL, useMediaQuery, useReducedMotion } from '../../lib/hooks';
import { Reveal, SplitTitle } from '../ui/Reveal';
import { ClockFallback } from './ClockFallback';

const Clock3D = lazy(() => import('./Clock3D'));

/**
 * Intermezzo scuro tra l'apertura fotografica e la timeline:
 * l'Orologio del Tempo (scena Three.js) sospeso nel buio, con il payoff del museo.
 */
export function ClockInterlude() {
  const reduced = useReducedMotion();
  const lowPower = useMediaQuery('(max-width: 760px), (pointer: coarse)');
  const [webgl, setWebgl] = useState(() => hasWebGL());
  const onError = useCallback(() => setWebgl(false), []);

  return (
    <section className="interlude" aria-labelledby="interlude-title">
      <div className="interlude__scene" aria-hidden="true">
        {webgl ? (
          <Suspense fallback={<ClockFallback reducedMotion={reduced} />}>
            <Clock3D reducedMotion={reduced} lowPower={lowPower} onError={onError} />
          </Suspense>
        ) : (
          <ClockFallback reducedMotion={reduced} />
        )}
      </div>
      <div className="interlude__text">
        <Reveal y={12}>
          <p className="interlude__kicker">L'orologio del tempo</p>
        </Reveal>
        <div id="interlude-title">
          <SplitTitle as="h2" text="EVERY SECOND TELLS A STORY." className="interlude__title" />
        </div>
        <Reveal delay={0.2}>
          <p className="interlude__lead">
            Le lancette segnano l'ora in cui stai visitando il museo. Gli anelli ruotano come le epoche che stai per attraversare: oltre cinquemila anni
            di storia scritta, preceduti da milioni di anni di preistoria.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
