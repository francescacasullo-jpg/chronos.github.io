import { useState } from 'react';
import type { ImageAsset } from '../../data/types';

interface Props {
  image: ImageAsset;
  className?: string;
  /** Prima immagine visibile: caricamento immediato e priorità alta. */
  priority?: boolean;
  /** Zoom lentissimo (disattivato con prefers-reduced-motion). */
  slowZoom?: boolean;
  /** Immagine decorativa (alt vuoto) quando il testo sovrapposto la descrive già. */
  decorative?: boolean;
  /** Usa sempre la versione leggera (miniature). */
  small?: boolean;
}

/**
 * Fotografia a pieno riquadro: <picture> con ritaglio dedicato per smartphone,
 * object-fit: cover e punto focale. Se il file non si carica, mostra un fondo neutro
 * dichiarato invece di un'immagine rotta.
 */
export function Photo({ image, className = '', priority = false, slowZoom = false, decorative = false, small = false }: Props) {
  const [failed, setFailed] = useState(false);
  const pos = `${Math.round(image.focal[0] * 100)}% ${Math.round(image.focal[1] * 100)}%`;
  return (
    <div className={`photo ${slowZoom ? 'photo--zoom' : ''} ${className}`}>
      {failed ? (
        <div className="photo__missing" role="img" aria-label={`Immagine non disponibile: ${image.alt}`}>
          <span>Immagine non disponibile</span>
        </div>
      ) : (
        <picture>
          {!small && <source media="(max-width: 760px)" srcSet={image.srcMobile} />}
          <img
            src={small ? image.srcMobile : image.src}
            alt={decorative ? '' : image.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            draggable={false}
            style={{ objectPosition: pos }}
            onError={() => setFailed(true)}
          />
        </picture>
      )}
    </div>
  );
}

/** Credito fotografico obbligatorio per le licenze CC BY / CC BY-SA. */
export function PhotoCredit({ image, className = '' }: { image: ImageAsset; className?: string }) {
  const { credit } = image;
  return (
    <p className={`photo-credit ${className}`}>
      <span className="photo-credit__cap">{image.caption}</span>
      <span className="photo-credit__by">
        Foto:{' '}
        <a href={credit.source} target="_blank" rel="noopener noreferrer">
          {credit.author || 'Wikimedia Commons'}
        </a>{' '}
        ·{' '}
        {credit.licenseUrl ? (
          <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer license">
            {credit.license}
          </a>
        ) : (
          credit.license
        )}{' '}
        · Wikimedia Commons
      </span>
    </p>
  );
}
