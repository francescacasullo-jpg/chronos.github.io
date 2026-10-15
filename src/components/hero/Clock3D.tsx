import { useEffect, useRef } from 'react';
import { createClockScene } from './ClockScene';

export default function Clock3D({ reducedMotion, lowPower, onError }: { reducedMotion: boolean; lowPower: boolean; onError: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let handle: { dispose(): void } | null = null;
    try {
      handle = createClockScene(ref.current, { reducedMotion, lowPower });
    } catch (err) {
      console.warn('[CHRONOS] Scena WebGL non disponibile, uso il fallback 2D.', err);
      onError();
    }
    return () => handle?.dispose();
  }, [reducedMotion, lowPower, onError]);
  return <div ref={ref} className="clock3d" />;
}
