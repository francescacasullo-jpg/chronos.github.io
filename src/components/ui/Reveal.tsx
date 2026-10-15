import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

/** Entrata progressiva coordinata: sale di poco e appare. Rispetta reduced-motion via MotionConfig. */
export function Reveal({ children, delay = 0, y = 28, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titolo monumentale con reveal per parola (mascherato).
 * L'osservatore è sul titolo stesso: le parole, nascoste dalla maschera,
 * non sarebbero mai "visibili" per l'IntersectionObserver.
 */
export function SplitTitle({ text, as = 'h2', className, delay = 0 }: { text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; delay?: number }) {
  const words = text.split(' ');
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span className="split__mask" key={i} aria-hidden="true">
          <motion.span
            className="split__word"
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

export function SectionHead({ index, kicker, title, lead }: { index: string; kicker: string; title: string; lead?: string }) {
  return (
    <header className="section-head">
      <Reveal className="section-head__meta" y={12}>
        <span className="section-head__index">{index}</span>
        <span className="section-head__rule" aria-hidden="true" />
        <span className="section-head__kicker">{kicker}</span>
      </Reveal>
      <SplitTitle text={title} className="section-head__title" />
      {lead && (
        <Reveal delay={0.15}>
          <p className="section-head__lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
