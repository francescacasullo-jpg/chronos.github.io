import type { Era, EraId } from './types';

/**
 * Le sette sale del museo. Le periodizzazioni sono convenzionali e
 * variano per area geografica: le date indicate si riferiscono
 * principalmente alla storiografia europea e mediterranea.
 */
export const ERAS: Era[] = [
  {
    id: 'preistoria',
    index: '01',
    name: 'Preistoria',
    subtitle: 'Prima della scrittura',
    span: 'c. 3 milioni di anni fa – c. 3000 a.C.',
    intro:
      "Dalle prime comunità di cacciatori-raccoglitori alla nascita dell'agricoltura e dei primi villaggi stabili: il lunghissimo periodo in cui l'umanità impara a controllare il fuoco, a lavorare la pietra, a rappresentare il mondo e a organizzarsi in gruppi sociali sempre più complessi.",
    deepDive: [
      "Per convenzione la Preistoria termina con l'invenzione della scrittura, che in Mesopotamia e in Egitto compare intorno alla fine del IV millennio a.C. In altre regioni del mondo il passaggio avviene in tempi molto diversi.",
      "La cosiddetta \"rivoluzione neolitica\" — il passaggio graduale all'agricoltura e all'allevamento — si sviluppa in modo indipendente in diverse aree, tra cui la Mezzaluna Fertile (a partire da circa 10.000 anni fa), la Cina, la Mesoamerica e le Ande.",
      "Le datazioni di quest'epoca derivano da metodi scientifici come il radiocarbonio e sono quasi sempre approssimative: vengono riviste man mano che emergono nuovi ritrovamenti.",
    ],
    palette: { accent: '#C99A55', bg: '#110D08', surface: '#1B150E', ink: '#F2E8D6' },
    material: 'Ocra, selce e sabbia',
    motif: 'sand',
  },
  {
    id: 'antichita',
    index: '02',
    name: 'Antichità',
    subtitle: 'Egitto, Grecia e Roma',
    span: 'c. 3000 a.C. – 476 d.C.',
    intro:
      "Con la scrittura nascono gli stati, le leggi codificate, la monumentalità. Nel Mediterraneo si succedono e si intrecciano la civiltà egizia, il mondo greco e l'impero romano, che lasciano un'eredità profonda in politica, filosofia, diritto, architettura e scienza.",
    deepDive: [
      "L'Egitto faraonico attraversa quasi tremila anni di storia, dall'unificazione intorno al 3100 a.C. fino all'annessione a Roma nel 30 a.C.",
      "Nelle poleis greche, tra VI e IV secolo a.C., si sviluppano forme di partecipazione politica, il teatro, la storiografia e la filosofia. Atene sperimenta una democrazia diretta riservata ai cittadini maschi adulti.",
      "La data del 476 d.C., con la deposizione dell'ultimo imperatore d'Occidente, è una convenzione storiografica: l'Impero romano d'Oriente continuò fino al 1453.",
    ],
    palette: { accent: '#C9774E', bg: '#120B08', surface: '#1E130E', ink: '#F4E9DF' },
    material: 'Calcare, marmo e terracotta',
    motif: 'stone',
  },
  {
    id: 'medioevo',
    index: '03',
    name: 'Medioevo',
    subtitle: 'Castelli, città e commerci',
    span: '476 – 1492',
    intro:
      "Un millennio spesso semplificato come \"età buia\", in realtà ricco di trasformazioni: la nascita dei regni romano-germanici, i monasteri come centri di cultura, la rinascita delle città e dei commerci, le università, le cattedrali gotiche e gli scambi con il mondo islamico e asiatico.",
    deepDive: [
      "Gli storici distinguono generalmente un Alto Medioevo (fino a circa l'anno 1000) e un Basso Medioevo, caratterizzato da crescita demografica, espansione urbana e sviluppo di nuove istituzioni come i comuni e le università.",
      "La peste nera del 1347–1351 provocò la morte di una parte molto rilevante della popolazione europea; le stime variano, ma si collocano spesso tra un terzo e la metà degli abitanti.",
      "Il 1492 è una delle date convenzionali di fine del Medioevo; altre proposte sono il 1453 (caduta di Costantinopoli) o la diffusione della stampa.",
    ],
    palette: { accent: '#B85C5C', bg: '#120909', surface: '#1E1111', ink: '#F3E7E2' },
    material: 'Pietra, pergamena e vetro colorato',
    motif: 'arches',
  },
  {
    id: 'rinascimento',
    index: '04',
    name: 'Rinascimento',
    subtitle: 'Arte, scienza e nuove prospettive',
    span: 'c. 1400 – c. 1600',
    intro:
      "Nato nelle città italiane e poi diffuso in Europa, il Rinascimento riscopre i testi classici, rinnova arte e architettura con la prospettiva e le proporzioni, e prepara la rivoluzione scientifica: nuovi strumenti e nuove osservazioni cambiano il modo di guardare il cielo e la Terra.",
    deepDive: [
      "La stampa a caratteri mobili, diffusa in Europa dalla metà del Quattrocento, moltiplica la circolazione dei libri e delle idee.",
      "I viaggi oceanici tra fine Quattrocento e Cinquecento mettono in contatto continenti fino ad allora separati, con conseguenze profonde e spesso drammatiche per le popolazioni americane.",
      "Il termine \"Rinascimento\" è in parte una costruzione storiografica successiva: i confini cronologici variano da paese a paese.",
    ],
    palette: { accent: '#6F8FD0', bg: '#080B14', surface: '#101626', ink: '#ECEFF6' },
    material: 'Lapislazzuli, affresco e bronzo',
    motif: 'perspective',
  },
  {
    id: 'industriale',
    index: '05',
    name: 'Rivoluzione Industriale',
    subtitle: 'Macchine, fabbriche, trasformazioni',
    span: 'c. 1760 – c. 1914',
    intro:
      "A partire dalla Gran Bretagna della seconda metà del Settecento, l'uso di nuove fonti di energia e di macchine trasforma la produzione, i trasporti e la vita quotidiana. Nascono la fabbrica moderna, le ferrovie, le grandi città industriali e nuove questioni sociali legate al lavoro.",
    deepDive: [
      "Gli storici parlano spesso di una prima rivoluzione industriale (tessile, carbone, vapore) e di una seconda, dalla seconda metà dell'Ottocento (acciaio, chimica, elettricità, petrolio).",
      "Le trasformazioni portarono crescita economica ma anche condizioni di lavoro durissime, lavoro minorile e inquinamento, da cui nacquero movimenti sindacali e nuove leggi sociali.",
      "Le date di inizio e fine sono convenzionali e cambiano molto da paese a paese.",
    ],
    palette: { accent: '#9FB2BC', bg: '#0A0C0D', surface: '#141819', ink: '#EEF1F2' },
    material: 'Ferro, vapore e carbone',
    motif: 'gears',
  },
  {
    id: 'contemporanea',
    index: '06',
    name: 'Età Contemporanea',
    subtitle: 'Scienza, conflitti e reti globali',
    span: 'c. 1900 – oggi',
    intro:
      "Il Novecento e il nuovo millennio vedono rivoluzioni scientifiche (relatività, meccanica quantistica, genetica), due guerre mondiali, la decolonizzazione, l'esplorazione dello spazio e la nascita delle reti digitali che collegano miliardi di persone.",
    deepDive: [
      "Nella storiografia italiana l'età contemporanea inizia spesso con la Rivoluzione francese (1789); in questa sala ci concentriamo sulle trasformazioni scientifiche e tecnologiche dal 1900 in poi.",
      "Molte delle innovazioni di questo periodo sono il risultato del lavoro collettivo di grandi gruppi di ricerca e istituzioni, più che di singoli inventori.",
    ],
    palette: { accent: '#E0B04A', bg: '#0B0A07', surface: '#17140D', ink: '#F4EFE3' },
    material: 'Acciaio, silicio e luce',
    motif: 'circuit',
  },
  {
    id: 'futuro',
    index: '07',
    name: 'Futuro Ipotetico',
    subtitle: 'Scenari, non fatti',
    span: 'Domani — ipotesi',
    intro:
      "Questa sala non contiene storia: contiene domande. Gli scenari presentati qui sono ipotesi discusse da scienziati, agenzie e istituzioni, con livelli di incertezza molto diversi. Nessuno di essi è un fatto, e alcuni potrebbero non realizzarsi mai.",
    deepDive: [
      "Prevedere il futuro tecnologico è notoriamente difficile: molte previsioni del passato si sono rivelate errate nei tempi o nei modi.",
      "Gli scenari qui proposti sono selezionati perché collegati a progetti di ricerca reali; i loro esiti e le loro tempistiche restano incerti.",
    ],
    palette: { accent: '#8FD3E8', bg: '#05090C', surface: '#0C1519', ink: '#E8F4F8' },
    material: 'Strutture astratte e luce',
    motif: 'lattice',
    hypothetical: true,
  },
];

export const ERA_BY_ID: Record<EraId, Era> = Object.fromEntries(ERAS.map((e) => [e.id, e])) as Record<EraId, Era>;

export const eraIndex = (id: EraId) => ERAS.findIndex((e) => e.id === id);
