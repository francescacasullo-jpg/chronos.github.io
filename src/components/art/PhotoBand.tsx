import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { ImageAsset } from '../../data/types';
import { useReducedMotion } from '../../lib/hooks';
import { Reveal, SplitTitle } from '../ui/Reveal';
import { Photo, PhotoCredit } from './Photo';

interface Props {
  image: ImageAsset;
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  titleId: string;
  align?: 'left' | 'right';
}

/**
 * Apertura fotografica di sezione: immagine a tutta larghezza con titolo monumentale
 * sovrapposto, parallasse leggera e testo che entra durante lo scroll.
 */
export function PhotoBand({ image, index, kicker, title, lead, titleId, align = 'left' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-10%', '10%']);
  return (
    <div ref={ref} className={`band band--${align}`}>
      <div className="band__media">
        <motion.div className="band__parallax" style={{ y }}>
          <Photo image={image} />
        </motion.div>
      </div>
      <div className="band__shade" aria-hidden="true" />
      <div className="band__text container">
        <Reveal y={12} className="section-head__meta">
          <span className="section-head__index">{index}</span>
          <span className="section-head__rule" aria-hidden="true" />
          <span className="section-head__kicker">{kicker}</span>
        </Reveal>
        <div id={titleId}>
          <SplitTitle text={title} className="band__title" />
        </div>
        {lead && (
          <Reveal delay={0.15}>
            <p className="band__lead">{lead}</p>
          </Reveal>
        )}
      </div>
      <PhotoCredit image={image} className="band__credit" />
    </div>
  );
}
