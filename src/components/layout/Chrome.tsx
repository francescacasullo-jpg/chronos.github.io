import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

/** Indicatore di avanzamento dello scroll (colore dell'epoca attiva). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.2);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#/"
          className="to-top"
          aria-label="Torna all'inizio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileHover={{ y: -3 }}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Sipario della transizione "BEGIN YOUR JOURNEY": anelli che si espandono come un passaggio nel tempo. */
export function JourneyCurtain({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div className="curtain" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="curtain__ring"
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          <motion.p className="curtain__text" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.3em' }} transition={{ duration: 0.8 }}>
            01 — PREISTORIA
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
