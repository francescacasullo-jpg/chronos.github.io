import { ERA_BY_ID } from '../../data/eras';
import type { Entity } from '../../data/types';
import { Glyph } from './Glyph';
import { Motif } from './Motif';

/**
 * Illustrazione originale e dichiarata come tale (non è una fotografia dell'oggetto).
 * Le immagini autentiche sono consultabili tramite le fonti della scheda.
 */
export function Illustration({ entity, size = 'md', showCaption = true }: { entity: Entity; size?: 'sm' | 'md' | 'lg'; showCaption?: boolean }) {
  const era = ERA_BY_ID[entity.era];
  return (
    <figure
      className={`illu illu--${size}`}
      style={{ ['--illu-accent' as string]: era.palette.accent, ['--illu-bg' as string]: era.palette.surface }}
    >
      <div className="illu__frame" role="img" aria-label={`Illustrazione stilizzata: ${entity.title}`}>
        <Motif motif={era.motif} color={era.palette.accent} opacity={0.14} className="illu__motif" />
        <div className="illu__halo" aria-hidden="true" />
        <Glyph id={entity.glyph} className="illu__glyph" />
      </div>
      {showCaption && <figcaption className="illu__cap">Illustrazione interpretativa · non fotografica</figcaption>}
    </figure>
  );
}
