import type { ReactElement } from 'react';
import type { Glyph as GlyphId } from '../../data/types';

/**
 * Glifi lineari originali (viewBox 200×200) usati per le illustrazioni del museo.
 * Sono interpretazioni grafiche, non riproduzioni fotografiche degli oggetti.
 */
const G: Record<GlyphId, ReactElement> = {
  pyramid: (
    <g>
      <path d="M20 160L100 40L180 160Z" />
      <path d="M100 40L120 160" />
      <path d="M60 100L140 100M40 130L160 130" opacity=".5" />
      <path d="M150 160L178 118L200 160" opacity=".6" />
      <path d="M0 160H200" />
    </g>
  ),
  temple: (
    <g>
      <path d="M25 70L100 35L175 70Z" />
      <path d="M30 70H170V80H30Z" />
      {[45, 75, 105, 135, 155].map((x) => (
        <path key={x} d={`M${x} 80V150`} />
      ))}
      <path d="M20 150H180V160H20ZM14 160H186V168H14Z" />
    </g>
  ),
  volcano: (
    <g>
      <path d="M10 165L80 70H120L190 165Z" />
      <path d="M80 70Q100 82 120 70" />
      <path d="M100 66C90 40 70 40 75 18M100 66C108 44 128 46 124 22M100 66C100 46 98 30 100 8" opacity=".75" />
      <circle cx="70" cy="22" r="6" opacity=".5" />
      <circle cx="132" cy="16" r="8" opacity=".5" />
      <path d="M0 165H200" />
    </g>
  ),
  press: (
    <g>
      <path d="M40 30H160V45H40ZM55 45V170M145 45V170" />
      <path d="M100 45V95M80 60H120" />
      <path d="M65 95H135V110H65Z" />
      <path d="M55 130H145V140H55Z" />
      <path d="M30 170H170" />
      <path d="M72 120h8M86 120h8M100 120h8M114 120h8" opacity=".6" />
    </g>
  ),
  atom: (
    <g>
      <ellipse cx="100" cy="100" rx="78" ry="28" />
      <ellipse cx="100" cy="100" rx="78" ry="28" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="78" ry="28" transform="rotate(-60 100 100)" />
      <circle cx="100" cy="100" r="8" />
      <circle cx="178" cy="100" r="3" />
    </g>
  ),
  moon: (
    <g>
      <circle cx="100" cy="90" r="62" />
      <circle cx="78" cy="70" r="12" opacity=".6" />
      <circle cx="125" cy="105" r="18" opacity=".6" />
      <circle cx="92" cy="120" r="7" opacity=".6" />
      <path d="M20 175Q100 150 180 175" />
      <path d="M96 170V150L106 155L96 160" opacity=".8" />
    </g>
  ),
  wheat: (
    <g>
      <path d="M100 185V40" />
      {[50, 70, 90, 110, 130].map((y) => (
        <g key={y}>
          <path d={`M100 ${y}Q80 ${y - 6} 76 ${y - 22}Q94 ${y - 16} 100 ${y}`} />
          <path d={`M100 ${y}Q120 ${y - 6} 124 ${y - 22}Q106 ${y - 16} 100 ${y}`} />
        </g>
      ))}
      <path d="M100 40L100 18" />
    </g>
  ),
  hand: (
    <g>
      <path d="M70 175V110L58 70Q56 60 64 60Q70 60 72 70L80 100V40Q80 30 88 30Q96 30 96 40V95V30Q96 20 104 20Q112 20 112 30V95V40Q112 32 120 32Q128 32 128 42V110L142 88Q148 80 155 85Q160 90 156 98L130 150V175" />
      <path d="M20 40L40 60M30 150L50 140M170 140L185 155M160 40L178 30" opacity=".5" />
    </g>
  ),
  tablet: (
    <g>
      <path d="M45 25H155Q162 25 162 32V170Q162 177 155 177H45Q38 177 38 170V32Q38 25 45 25Z" />
      {[45, 65, 85, 105, 125, 145].map((y, i) => (
        <g key={y} opacity={0.85}>
          {[0, 1, 2, 3, 4].map((k) => {
            const x = 52 + k * 21 + (i % 2) * 8;
            return <path key={k} d={`M${x} ${y}l10 0l-5 9z`} />;
          })}
        </g>
      ))}
    </g>
  ),
  castle: (
    <g>
      <path d="M30 170V70H50V60H60V70H70V60H80V90H120V60H130V70H140V60H150V70H170V170Z" />
      <path d="M85 170V135Q100 115 115 135V170" />
      <path d="M45 100h10v18H45ZM145 100h10v18h-10Z" opacity=".7" />
      <path d="M100 90V50L120 58L100 66" />
      <path d="M10 170H190" />
    </g>
  ),
  ship: (
    <g>
      <path d="M25 140H175L155 168H45Z" />
      <path d="M100 140V30M60 140V60M140 140V60" />
      <path d="M100 36Q130 60 100 90M100 92Q132 112 100 132M60 66Q82 86 60 108M140 66Q162 86 140 108" />
      <path d="M0 178Q25 170 50 178T100 178T150 178T200 178" opacity=".6" />
    </g>
  ),
  telescope: (
    <g>
      <path d="M30 95L150 50L158 68L38 113Z" />
      <path d="M150 50L168 43L176 61L158 68" />
      <path d="M95 92L70 175M95 92L120 175M95 92V175" />
      <circle cx="180" cy="22" r="3" />
      <circle cx="160" cy="14" r="1.6" />
      <circle cx="190" cy="40" r="1.6" />
    </g>
  ),
  engine: (
    <g>
      <path d="M30 170V90H70V170" />
      <path d="M40 90V60H60V90" />
      <path d="M50 60V30" />
      <path d="M50 30H140L170 50" />
      <circle cx="140" cy="125" r="42" />
      <circle cx="140" cy="125" r="6" />
      <path d="M140 83V167M98 125H182M110 95L170 155M170 95L110 155" opacity=".55" />
      <path d="M170 50L140 125" />
      <path d="M10 170H190" />
    </g>
  ),
  phone: (
    <g>
      <path d="M70 170H130V150H70Z" />
      <path d="M100 150V70" />
      <circle cx="100" cy="55" r="20" />
      <circle cx="100" cy="55" r="10" opacity=".6" />
      <path d="M130 160Q170 150 165 110Q160 80 130 75" />
      <path d="M135 75Q120 65 125 50h20q5 15-10 25" />
    </g>
  ),
  plane: (
    <g>
      <path d="M20 80H180M20 104H180" />
      {[40, 70, 100, 130, 160].map((x) => (
        <path key={x} d={`M${x} 80V104`} opacity=".7" />
      ))}
      <path d="M100 104L100 130M60 130H140" />
      <path d="M180 80L196 92L180 104" />
      <path d="M10 160Q60 150 110 160T200 158" opacity=".5" />
    </g>
  ),
  web: (
    <g>
      <circle cx="100" cy="100" r="70" />
      <ellipse cx="100" cy="100" rx="30" ry="70" />
      <path d="M30 100H170M42 64H158M42 136H158" />
      {[[60, 40], [150, 70], [70, 150], [140, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" />
      ))}
    </g>
  ),
  helmet: (
    <g>
      <path d="M50 110Q50 40 100 40Q150 40 150 110V125H50Z" />
      <path d="M65 110Q65 60 100 60Q135 60 135 110Z" />
      <path d="M40 125H160V150H40Z" />
      <path d="M60 150V180M140 150V180M100 150V180" opacity=".6" />
      <path d="M80 75Q90 68 100 70" opacity=".6" />
    </g>
  ),
  stele: (
    <g>
      <path d="M60 175V50Q60 20 100 20Q140 20 140 50V175Z" />
      <path d="M70 75H130" />
      <circle cx="85" cy="50" r="10" opacity=".7" />
      <path d="M108 42h16v26h-16z" opacity=".7" />
      {[90, 105, 120, 135, 150, 163].map((y) => (
        <path key={y} d={`M72 ${y}H128`} opacity=".45" />
      ))}
      <path d="M40 175H160" />
    </g>
  ),
  mechanism: (
    <g>
      <rect x="30" y="30" width="140" height="140" rx="4" />
      <circle cx="100" cy="100" r="52" />
      <circle cx="100" cy="100" r="40" opacity=".6" />
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2;
        return <path key={i} d={`M${100 + Math.cos(a) * 52} ${100 + Math.sin(a) * 52}L${100 + Math.cos(a) * 58} ${100 + Math.sin(a) * 58}`} />;
      })}
      <circle cx="100" cy="100" r="6" />
      <path d="M100 100L130 70M100 100L86 140" />
    </g>
  ),
  arena: (
    <g>
      <ellipse cx="100" cy="150" rx="90" ry="22" />
      <path d="M10 150V70Q100 40 190 70V150" />
      <path d="M10 95Q100 66 190 95M10 120Q100 92 190 120" opacity=".7" />
      {[30, 55, 80, 105, 130, 155, 175].map((x) => (
        <path key={x} d={`M${x} ${x < 100 ? 140 - (100 - x) * 0.1 : 140} q8 -14 16 0`} opacity=".7" />
      ))}
    </g>
  ),
  book: (
    <g>
      <path d="M100 50Q70 35 25 40V160Q70 155 100 170Q130 155 175 160V40Q130 35 100 50Z" />
      <path d="M100 50V170" />
      {[65, 80, 95, 110, 125, 140].map((y) => (
        <g key={y} opacity=".5">
          <path d={`M38 ${y}H88`} />
          <path d={`M112 ${y}H162`} />
        </g>
      ))}
    </g>
  ),
  tapestry: (
    <g>
      <path d="M10 60H190V140H10Z" />
      <path d="M10 75H190M10 125H190" opacity=".5" />
      <path d="M30 120V100Q35 90 45 95L60 85M80 120L90 95L100 120M95 106h-10" />
      <path d="M120 120Q130 100 150 105Q165 100 172 112" />
      <path d="M150 105V88L158 92L150 96" />
    </g>
  ),
  plague: (
    <g>
      <circle cx="100" cy="100" r="34" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 34, y1 = 100 + Math.sin(a) * 34;
        const x2 = 100 + Math.cos(a) * 56, y2 = 100 + Math.sin(a) * 56;
        return (
          <g key={i}>
            <path d={`M${x1} ${y1}L${x2} ${y2}`} />
            <circle cx={x2} cy={y2} r="4" />
          </g>
        );
      })}
      <circle cx="90" cy="92" r="6" opacity=".6" />
      <circle cx="112" cy="110" r="8" opacity=".6" />
    </g>
  ),
  dome: (
    <g>
      <path d="M40 120Q40 50 100 45Q160 50 160 120Z" />
      <path d="M100 45V30M94 30H106" />
      <path d="M70 120Q70 66 100 46M130 120Q130 66 100 46" opacity=".6" />
      <path d="M30 120H170V170H30Z" />
      {[50, 80, 110, 140].map((x) => (
        <path key={x} d={`M${x} 170V145Q${x + 7.5} 132 ${x + 15} 145V170`} opacity=".8" />
      ))}
    </g>
  ),
  rail: (
    <g>
      <path d="M30 120H130V80H150V120H170V150H30Z" />
      <path d="M45 80H115V120H45Z" />
      <path d="M60 80V50H80V80" />
      <circle cx="60" cy="158" r="14" />
      <circle cx="140" cy="158" r="14" />
      <path d="M0 175H200" />
      <path d="M70 40Q80 20 100 26Q115 10 130 22" opacity=".6" />
    </g>
  ),
  star: (
    <g>
      <circle cx="100" cy="100" r="30" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const r1 = 42, r2 = i % 2 ? 62 : 82;
        return <path key={i} d={`M${100 + Math.cos(a) * r1} ${100 + Math.sin(a) * r1}L${100 + Math.cos(a) * r2} ${100 + Math.sin(a) * r2}`} />;
      })}
      <circle cx="100" cy="100" r="12" opacity=".6" />
    </g>
  ),
  rocket: (
    <g>
      <path d="M100 20Q130 50 128 120H72Q70 50 100 20Z" />
      <circle cx="100" cy="70" r="11" />
      <path d="M72 100L50 140H74M128 100L150 140H126" />
      <path d="M85 128L100 175L115 128" opacity=".6" />
      <circle cx="30" cy="40" r="2" />
      <circle cx="170" cy="60" r="2" />
    </g>
  ),
  circle: (
    <g>
      <circle cx="100" cy="100" r="70" />
      <path d="M30 100Q65 80 100 100T170 100" />
      <path d="M38 70Q70 55 100 68T162 70M38 130Q70 115 100 128T162 130" opacity=".6" />
      <path d="M100 30V170" opacity=".4" />
    </g>
  ),
  scroll: (
    <g>
      <path d="M50 30H150V170H50Z" />
      <path d="M40 30Q40 20 50 20H160Q150 25 150 30M40 170Q40 180 50 180H160Q150 175 150 170" />
      {[50, 65, 80, 95, 110, 125, 140, 155].map((y) => (
        <path key={y} d={`M64 ${y}H136`} opacity=".45" />
      ))}
    </g>
  ),
  astrolabe: (
    <g>
      <circle cx="100" cy="105" r="70" />
      <circle cx="100" cy="105" r="55" opacity=".6" />
      <circle cx="100" cy="90" r="34" opacity=".8" />
      <path d="M30 105H170M100 35V175" opacity=".5" />
      <path d="M100 35V20M90 20H110" />
      <path d="M60 140L140 70" />
    </g>
  ),
  person: (
    <g>
      <circle cx="100" cy="70" r="30" />
      <path d="M40 175Q40 115 100 112Q160 115 160 175" />
      <path d="M100 40Q80 45 76 66" opacity=".5" />
    </g>
  ),
  map: (
    <g>
      <path d="M20 40L75 25L125 40L180 25V160L125 175L75 160L20 175Z" />
      <path d="M75 25V160M125 40V175" opacity=".6" />
    </g>
  ),
  city: (
    <g>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4].map((c) => <rect key={`${r}-${c}`} x={30 + c * 30} y={30 + r * 30} width="22" height="22" opacity={(r + c) % 3 === 0 ? 1 : 0.55} />),
      )}
    </g>
  ),
  dna: (
    <g>
      <path d="M70 15Q130 50 70 100T70 185" />
      <path d="M130 15Q70 50 130 100T130 185" />
      {[30, 50, 70, 130, 150, 170].map((y) => (
        <path key={y} d={`M80 ${y}H120`} opacity=".6" />
      ))}
    </g>
  ),
  chip: (
    <g>
      <rect x="55" y="55" width="90" height="90" />
      <rect x="75" y="75" width="50" height="50" opacity=".6" />
      {[70, 90, 110, 130].map((v) => (
        <g key={v}>
          <path d={`M${v} 55V35M${v} 145V165M55 ${v}H35M145 ${v}H165`} />
        </g>
      ))}
    </g>
  ),
};

export function Glyph({ id, className }: { id: GlyphId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {G[id]}
      </g>
    </svg>
  );
}
