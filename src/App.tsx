import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Atlas } from './components/atlas/Atlas';
import { Cabinet } from './components/cabinet/Cabinet';
import { Collection } from './components/collection/Collection';
import { DetailPanel } from './components/detail/DetailPanel';
import { Explore } from './components/explore/Explore';
import { ClockInterlude } from './components/hero/ClockInterlude';
import { Hero } from './components/hero/Hero';
import { BackToTop, JourneyCurtain, ScrollProgress } from './components/layout/Chrome';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Moments } from './components/moments/Moments';
import { Timeline } from './components/timeline/Timeline';
import { CIVILIZATIONS, ERA_BY_ID } from './data';
import type { EraId } from './data/types';
import { CollectionProvider } from './lib/collection';
import { useReducedMotion } from './lib/hooks';
import { hrefItem, navigate, parseHash, useHashRoute, type Route, type SectionId } from './lib/router';

const SPY: SectionId[] = ['home', 'timeline', 'moments', 'artifacts', 'civilizations', 'explore', 'collection'];

function scrollToSection(id: SectionId, smooth: boolean) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

function Museum() {
  const route = useHashRoute();
  const reduced = useReducedMotion();
  const [era, setEra] = useState<EraId>(route.era ?? 'preistoria');
  const [civ, setCiv] = useState<string>(route.civ ?? CIVILIZATIONS[0].id);
  const [active, setActive] = useState<SectionId>('home');
  const [curtain, setCurtain] = useState(false);

  const prevRoute = useRef<Route | null>(null);
  const pushedDetail = useRef(false);
  const forceScroll = useRef(false);
  const beforeDetail = useRef<Route | null>(null);

  /* ── Reazione al cambio di URL ── */
  useEffect(() => {
    const prev = prevRoute.current;
    prevRoute.current = route;
    if (route.detail) return; // la scheda si apre sopra la pagina corrente
    pushedDetail.current = false;
    if (route.era) setEra(route.era);
    if (route.civ && CIVILIZATIONS.some((c) => c.id === route.civ)) setCiv(route.civ);
    // Chiudendo una scheda si resta dove si era, salvo navigazione esplicita verso altro
    const back = beforeDetail.current ?? { section: 'home' };
    const sameAsBefore = route.section === back.section && route.era === back.era && route.civ === back.civ;
    if (prev?.detail && sameAsBefore && !forceScroll.current) return;
    forceScroll.current = false;
    const first = prev === null;
    if (first && route.section === 'home') return;
    // Al primo caricamento attende il layout prima di scorrere
    requestAnimationFrame(() => scrollToSection(route.section, !reduced && !first));
  }, [route, reduced]);

  /* ── Colore dominante dell'epoca su tutto il sito ── */
  useEffect(() => {
    const p = ERA_BY_ID[era].palette;
    document.documentElement.style.setProperty('--era-live', p.accent);
  }, [era]);

  /* ── Scroll spy per la navigazione ── */
  useEffect(() => {
    const els = SPY.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Azioni ── */
  const openDetail = useCallback((key: string) => {
    if (!parseHash(window.location.hash).detail) {
      beforeDetail.current = parseHash(window.location.hash);
      pushedDetail.current = true;
    }
    navigate(hrefItem(key));
  }, []);

  const openRelated = useCallback((key: string) => {
    window.location.replace(hrefItem(key));
  }, []);

  const closeDetail = useCallback(() => {
    if (pushedDetail.current) {
      pushedDetail.current = false;
      window.history.back();
    } else {
      window.location.replace('#/');
    }
  }, []);

  const goEra = useCallback((id: EraId) => {
    forceScroll.current = true;
    pushedDetail.current = false;
    navigate(`#/timeline/${id}`);
  }, []);

  const changeEra = useCallback((id: EraId) => {
    setEra(id);
    window.history.replaceState(null, '', `#/timeline/${id}`);
  }, []);

  const changeCiv = useCallback((id: string) => {
    setCiv(id);
    window.history.replaceState(null, '', `#/civilizations/${id}`);
  }, []);

  const begin = useCallback(() => {
    if (reduced) {
      navigate('#/timeline');
      return;
    }
    setCurtain(true);
    window.setTimeout(() => {
      scrollToSection('timeline', false);
      window.history.replaceState(null, '', '#/timeline');
      document.getElementById('timeline')?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true });
    }, 500);
    window.setTimeout(() => setCurtain(false), 1050);
  }, [reduced]);

  return (
    <>
      <ScrollProgress />
      <Header active={active} />
      <main id="main" tabIndex={-1}>
        <Hero onBegin={begin} />
        <ClockInterlude />
        <Timeline era={era} onEraChange={changeEra} onOpen={openDetail} />
        <Moments onOpen={openDetail} onEra={goEra} />
        <Cabinet onOpen={openDetail} />
        <Atlas selected={civ} onSelect={changeCiv} onOpen={openDetail} />
        <Explore onOpen={openDetail} />
        <Collection onOpen={openDetail} />
      </main>
      <Footer />
      <BackToTop />
      <JourneyCurtain active={curtain} />
      <DetailPanel itemKey={route.detail ?? null} onClose={closeDetail} onOpenRelated={openRelated} onEra={goEra} />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CollectionProvider>
        <Museum />
      </CollectionProvider>
    </MotionConfig>
  );
}
