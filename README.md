# CHRONOS — The Interactive Museum of Time

> **EVERY SECOND TELLS A STORY.**

Un museo digitale interattivo dedicato alla storia dell'umanità: sette sale dalla Preistoria al Futuro ipotetico,
27 fotografie a tutto schermo da Wikimedia Commons, una scena 3D in Three.js, una timeline con transizioni cinematografiche, un gabinetto delle meraviglie,
un atlante delle civiltà, una modalità esplorazione con ricerca e filtri, e una raccolta personale persistente.

---

## Visione immediata (senza installare nulla)

Apri **`CHRONOS - apri nel browser.html`** con un doppio clic (Chrome, Edge, Firefox o Safari aggiornati).
È la build di produzione completa in un unico file e carica le fotografie dalla cartella **`images/`** che si trova accanto:
le due cose vanno tenute insieme (anche nello zip). Funzionano scena 3D, timeline, ricerca, mappa e raccolta personale.
Si rigenera con `npm run build:single` (il file viene creato in `dist-single/index.html`; copia accanto `public/images`).

## Avvio rapido (sviluppo)

Requisiti: **Node.js 20.19+ o 22.12+** (scaricabile da https://nodejs.org).

```bash
cd CHRONOS
npm install      # installa le dipendenze (una sola volta)
npm run dev      # avvia il server di sviluppo → http://localhost:5173
```

Altri comandi:

| Comando             | Cosa fa                                                    |
| ------------------- | ---------------------------------------------------------- |
| `npm run build`     | Controllo dei tipi TypeScript + build di produzione in `dist/` |
| `npm run preview`   | Serve la build di produzione → http://localhost:4173       |
| `npm test`          | Test unitari (ricerca, filtri, integrità del dataset)      |
| `npm run typecheck` | Solo controllo dei tipi                                    |

> Su Windows puoi aprire la cartella in Visual Studio Code e usare il terminale integrato (`Ctrl + ò`).
> La build in `dist/` va servita da un server (es. `npm run preview`): aprire `index.html` con doppio clic non funziona,
> perché i browser bloccano i moduli JavaScript caricati da `file://`.

---

## Stack e scelte tecniche

| Strumento | Perché |
| --- | --- |
| **React 19 + TypeScript + Vite** | Componenti tipizzati, build veloce, nessun backend necessario |
| **Three.js** | Solo per l'orologio dell'hero (caricato in modo *lazy*, chunk separato) |
| **Motion** (`motion/react`) | Reveal, transizioni tra epoche, pannelli, micro-interazioni; rispetta `prefers-reduced-motion` |
| **d3-geo + topojson + world-atlas** | Mappa SVG leggera e accessibile (dati Natural Earth, pubblico dominio) |
| **Lucide** | Icone |
| **CSS moderno** | Design token in `src/styles/tokens.css`, nessun framework CSS |

Nessun backend né database: preferiti e percorsi sono salvati in `localStorage`.

## Struttura

```
src/
├── data/                 # DATI STORICI (separati dall'interfaccia)
│   ├── types.ts          # modello dei dati (Era, Event, Artifact, Person, Civilization…)
│   ├── eras.ts           # le 7 sale, palette e materiali
│   ├── events.ts         # eventi con grado di certezza delle date
│   ├── artifacts.ts      # oggetti del Gabinetto delle Meraviglie
│   ├── people.ts         # personaggi
│   ├── civilizations.ts  # civiltà + aree indicative per la mappa
│   ├── sources.ts        # helper per i riferimenti alle fonti
│   ├── images.ts         # fotografie: percorsi, alt, punto focale, crediti
│   └── index.ts          # registro unico, etichette, selezione "Moments"
├── lib/                  # LOGICA APPLICATIVA
│   ├── search.ts         # ricerca, filtri, ordinamento
│   ├── collection.tsx    # preferiti e percorsi (context + localStorage)
│   ├── storage.ts        # accesso sicuro a localStorage
│   ├── router.ts         # router a hash con URL significativi
│   └── hooks.ts          # media query, reduced motion, rilevamento WebGL
├── components/
│   ├── hero/             # Hero fotografico, intermezzo con l'orologio Three.js, fallback SVG 2D
│   ├── timeline/         # Timeline + transizione tra epoche
│   ├── moments/          # "The moments that changed everything"
│   ├── cabinet/          # "Objects that changed the world"
│   ├── atlas/            # Atlante delle civiltà (mappa SVG)
│   ├── explore/          # Modalità esplorazione
│   ├── collection/       # "My Collection" + percorsi personali
│   ├── detail/           # Pannello di approfondimento (dialog accessibile)
│   ├── layout/           # Header, menu mobile, footer, progress, back-to-top, error boundary
│   ├── ui/               # Badge, preferiti, reveal, fonti
│   └── art/              # Photo, PhotoBand, crediti, motivi delle epoche e glifi
└── styles/               # tokens.css + global.css + cinema.css (sezioni fotografiche)
```

## URL significativi

| URL | Contenuto |
| --- | --- |
| `#/timeline/rinascimento` | Timeline aperta su un'epoca |
| `#/civilizations/maya` | Atlante con una civiltà selezionata |
| `#/item/event/vesuvius` | Scheda di dettaglio (condivisibile, funziona anche come link diretto) |
| `#/artifacts`, `#/moments`, `#/explore`, `#/collection` | Sezioni |

## Accessibilità e prestazioni

- HTML semantico, skip link, focus visibile, `aria-*` su tab, dialog, pulsanti toggle.
- Timeline navigabile con frecce, Home/End; mappa navigabile con Tab + Invio e con elenco alternativo.
- Pannello di dettaglio con focus trap, Esc, ripristino del focus.
- Il grado di certezza delle date è sempre scritto (icona + testo), mai solo colore.
- `prefers-reduced-motion`: niente transizioni tra epoche, niente sipario, orologio fermo (le lancette segnano comunque l'ora).
- WebGL assente o in errore → fallback SVG 2D dichiarato come tale.
- La scena 3D si mette in pausa quando non è visibile o la scheda è in background; densità di particelle e risoluzione ridotte su dispositivi touch.
- Three.js è caricato solo quando serve (chunk separato).

## Contenuti e fonti

Vedi [`SOURCES.md`](./SOURCES.md). In sintesi: testi divulgativi basati su conoscenze consolidate, ogni elemento ha
fonti consultabili (enciclopedie, musei, UNESCO, agenzie). Le date approssimative o discusse sono segnalate.
La sala *Futuro ipotetico* contiene esclusivamente scenari.

## Fotografie

Le sezioni principali usano **fotografie reali da Wikimedia Commons** (CC0, pubblico dominio, CC BY, CC BY-SA), salvate
in locale in `public/images/` in due ritagli (desktop e smartphone). Autore e licenza compaiono sotto ogni foto e nel
footer (*Crediti fotografici*). Elenco completo e istruzioni per sostituirle: [`IMAGES.md`](./IMAGES.md).
Personaggi e civiltà senza fotografia usano illustrazioni originali in SVG, dichiarate come tali.

## Estendere il museo

Per aggiungere un evento basta aggiungere un oggetto a `src/data/events.ts` (tipizzato): comparirà automaticamente
nella timeline, nella ricerca, nei percorsi e nelle schede. `npm test` verifica che fonti e collegamenti siano validi.
