import { useEffect, useState } from 'react';

/**
 * Fallback 2D di qualità quando WebGL non è disponibile:
 * stesso linguaggio visivo (anelli, incisioni, lancette sull'ora reale), in SVG animato.
 * Dichiarato esplicitamente come versione bidimensionale.
 */
export function ClockFallback({ reducedMotion }: { reducedMotion: boolean }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const s = now.getSeconds();
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const major = i % 5 === 0;
    const r1 = major ? 232 : 240;
    return (
      <line
        key={i}
        x1={300 + Math.sin(a) * r1}
        y1={300 - Math.cos(a) * r1}
        x2={300 + Math.sin(a) * 252}
        y2={300 - Math.cos(a) * 252}
        stroke="#F2EDE3"
        strokeWidth={major ? 3 : 1.2}
        opacity={major ? 0.9 : 0.5}
      />
    );
  });
  const star = Array.from({ length: 12 }, (_, i) => {
    const a1 = (i / 12) * Math.PI * 2;
    const a2 = ((i + 5) / 12) * Math.PI * 2;
    return <line key={i} x1={300 + Math.sin(a1) * 200} y1={300 - Math.cos(a1) * 200} x2={300 + Math.sin(a2) * 200} y2={300 - Math.cos(a2) * 200} />;
  });

  return (
    <div className="clock-fallback">
      <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false" className={reducedMotion ? '' : 'is-animated'}>
        <defs>
          <radialGradient id="cf-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#B69A63" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#090909" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cf-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E3CC97" />
            <stop offset="50%" stopColor="#B69A63" />
            <stop offset="100%" stopColor="#785B3A" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill="url(#cf-glow)" />
        <g className="cf-orbit cf-orbit--a" fill="none" stroke="#785B3A" strokeWidth="1.5">
          <ellipse cx="300" cy="300" rx="290" ry="110" />
          <circle cx="590" cy="300" r="5" fill="#B69A63" />
        </g>
        <g className="cf-orbit cf-orbit--b" fill="none" stroke="#B69A63" strokeWidth="1" opacity="0.7">
          <ellipse cx="300" cy="300" rx="120" ry="285" />
          <circle cx="300" cy="15" r="4" fill="#F2EDE3" />
        </g>
        <circle cx="300" cy="300" r="262" fill="#0F0E0C" stroke="url(#cf-gold)" strokeWidth="9" />
        <circle cx="300" cy="300" r="225" fill="none" stroke="#785B3A" strokeWidth="2" />
        <g className="cf-engrave" stroke="#B69A63" strokeWidth="1" opacity="0.45">{star}</g>
        <circle cx="300" cy="300" r="130" fill="none" stroke="url(#cf-gold)" strokeWidth="3" />
        {ticks}
        <g stroke="url(#cf-gold)" strokeLinecap="round">
          <line x1="300" y1="315" x2="300" y2="190" strokeWidth="9" transform={`rotate(${h * 30} 300 300)`} />
        </g>
        <line x1="300" y1="318" x2="300" y2="110" stroke="#F2EDE3" strokeWidth="5" strokeLinecap="round" transform={`rotate(${m * 6} 300 300)`} />
        <line x1="300" y1="325" x2="300" y2="85" stroke="#B69A63" strokeWidth="2" transform={`rotate(${s * 6} 300 300)`} />
        <circle cx="300" cy="300" r="11" fill="url(#cf-gold)" />
      </svg>
      <p className="clock-fallback__note">Visualizzazione 2D — la scena 3D richiede WebGL, non disponibile su questo dispositivo.</p>
    </div>
  );
}
