import { useId } from 'react';
import type { Motif as MotifId } from '../../data/types';

/**
 * Pattern materici delle epoche, disegnati in SVG (leggeri, scalabili, senza immagini esterne).
 * sand → stone → arches → perspective → gears → circuit → lattice
 */
export function Motif({ motif, color = 'currentColor', opacity = 0.18, className }: { motif: MotifId; color?: string; opacity?: number; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const id = `m-${motif}-${uid}`;
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>{pattern(motif, id, color)}</defs>
      {motif === 'perspective' ? (
        <Perspective color={color} opacity={opacity} />
      ) : (
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
      )}
    </svg>
  );
}

function pattern(m: MotifId, id: string, c: string) {
  switch (m) {
    case 'sand':
      return (
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          {[
            [3, 5, 1.1], [17, 12, 0.7], [29, 3, 0.9], [40, 18, 1.2], [8, 25, 0.8], [22, 30, 1.3], [35, 37, 0.7], [12, 40, 1], [27, 21, 0.6], [2, 34, 0.6],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={c} />
          ))}
        </pattern>
      );
    case 'stone':
      return (
        <pattern id={id} width="120" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 0H120M0 30H120M0 60H120M40 0V30M100 0V30M10 30V60M70 30V60" stroke={c} strokeWidth="1" fill="none" />
          <path d="M8 10h10v10h-5v-5h-5z" stroke={c} strokeWidth="0.8" fill="none" opacity="0.6" />
        </pattern>
      );
    case 'arches':
      return (
        <pattern id={id} width="80" height="120" patternUnits="userSpaceOnUse">
          <path d="M8 120V55a32 32 0 0 1 32-40a32 32 0 0 1 32 40v65" stroke={c} strokeWidth="1" fill="none" />
          <path d="M20 120V62a20 26 0 0 1 20-34a20 26 0 0 1 20 34v58" stroke={c} strokeWidth="0.7" fill="none" opacity="0.7" />
          <circle cx="40" cy="48" r="6" stroke={c} strokeWidth="0.7" fill="none" />
        </pattern>
      );
    case 'gears':
      return (
        <pattern id={id} width="140" height="140" patternUnits="userSpaceOnUse">
          <Gear cx={44} cy={44} r={30} teeth={12} c={c} />
          <Gear cx={104} cy={100} r={22} teeth={9} c={c} />
          <Gear cx={118} cy={20} r={12} teeth={7} c={c} />
        </pattern>
      );
    case 'circuit':
      return (
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M0 24H30L42 36H96M24 0V18M60 36V70L72 82H96M0 70H40M40 70V96" stroke={c} strokeWidth="1" fill="none" />
          {[[30, 24], [60, 70], [40, 70], [24, 18], [72, 82]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.4" fill={c} />
          ))}
        </pattern>
      );
    case 'lattice':
      return (
        <pattern id={id} width="60" height="104" patternUnits="userSpaceOnUse">
          <path d="M30 0L60 17V52L30 69L0 52V17Z M30 69V104 M0 52L-30 69 M60 52L90 69" stroke={c} strokeWidth="0.9" fill="none" />
          <circle cx="30" cy="35" r="1.8" fill={c} />
        </pattern>
      );
    default:
      return null;
  }
}

function Gear({ cx, cy, r, teeth, c }: { cx: number; cy: number; r: number; teeth: number; c: string }) {
  const pts: string[] = [];
  const steps = teeth * 4;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.82;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return (
    <g stroke={c} strokeWidth="1" fill="none">
      <polygon points={pts.join(' ')} />
      <circle cx={cx} cy={cy} r={r * 0.32} />
      <circle cx={cx} cy={cy} r={r * 0.6} opacity="0.5" />
    </g>
  );
}

/** Griglia prospettica rinascimentale con punto di fuga centrale. */
function Perspective({ color, opacity }: { color: string; opacity: number }) {
  const lines = [];
  for (let i = 0; i <= 20; i++) {
    const x = (i / 20) * 200 - 50;
    lines.push(<line key={`r${i}`} x1="50" y1="38" x2={x} y2="100" />);
  }
  for (let j = 1; j <= 9; j++) {
    const y = 38 + 62 * Math.pow(j / 9, 1.8);
    lines.push(<line key={`h${j}`} x1="-50" y1={y} x2="150" y2={y} />);
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" opacity={opacity}>
      <g stroke={color} strokeWidth="1" className="nss">{lines}</g>
      <circle cx="50" cy="38" r="0.8" fill={color} />
    </svg>
  );
}
