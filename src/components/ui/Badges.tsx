import { CalendarClock, CircleHelp, FlaskConical, Stamp } from 'lucide-react';
import { CERTAINTY_LABEL, ERA_BY_ID, KIND_LABEL } from '../../data';
import type { Certainty, Entity, EraId } from '../../data/types';

const ICON: Record<Certainty, typeof Stamp> = {
  certain: Stamp,
  approximate: CalendarClock,
  debated: CircleHelp,
  hypothetical: FlaskConical,
};

/** Badge di certezza: icona + testo, mai solo colore. */
export function CertaintyBadge({ c, compact }: { c: Certainty; compact?: boolean }) {
  const Icon = ICON[c];
  return (
    <span className={`badge badge--${c}`} title={CERTAINTY_LABEL[c]}>
      <Icon size={13} aria-hidden="true" />
      <span className={compact ? 'sr-only' : undefined}>{CERTAINTY_LABEL[c]}</span>
    </span>
  );
}

export function EraTag({ era }: { era: EraId }) {
  const e = ERA_BY_ID[era];
  return (
    <span className="era-tag" style={{ ['--tag' as string]: e.palette.accent }}>
      <span className="era-tag__dot" aria-hidden="true" />
      {e.index} · {e.name}
    </span>
  );
}

export function KindTag({ entity }: { entity: Entity }) {
  return <span className="kind-tag">{KIND_LABEL[entity.kind]}</span>;
}

export function DateLine({ entity }: { entity: Entity }) {
  return (
    <span className="date-line">
      <span className="date-line__label">{entity.date.label}</span>
      <CertaintyBadge c={entity.date.certainty} />
    </span>
  );
}
