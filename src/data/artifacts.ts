import type { Artifact } from './types';
import { britannica, ref, wiki } from './sources';

/**
 * "Objects that changed the world" — il Gabinetto delle Meraviglie.
 * Le immagini nel museo sono illustrazioni originali dichiarate come tali;
 * le fotografie autentiche sono consultabili presso le istituzioni citate nelle fonti.
 */
export const ARTIFACTS: Artifact[] = [
  {
    kind: 'artifact',
    id: 'hammurabi',
    title: 'Stele del Codice di Hammurabi',
    era: 'antichita',
    glyph: 'stele',
    date: { sortYear: -1754, label: 'c. 1755–1750 a.C.', certainty: 'approximate' },
    materials: 'Basalto; alta circa 2,25 m',
    location: 'Musée du Louvre, Parigi',
    summary: 'Una delle più complete raccolte di leggi dell\'antica Mesopotamia, incisa in caratteri cuneiformi.',
    context:
      "Fu portata a Susa come bottino di guerra da un re elamita nel XII secolo a.C. e fu ritrovata lì da una missione archeologica francese nel 1901–1902.",
    func: 'Monumento pubblico che presentava il re come garante della giustizia e raccoglieva sentenze e norme.',
    significance:
      "È una fonte fondamentale per conoscere la società, l'economia e il diritto babilonesi. Il rilievo in cima mostra Hammurabi davanti al dio Shamash.",
    sources: [ref('Law Code of Hammurabi, King of Babylon', 'Musée du Louvre', 'https://collections.louvre.fr/en/ark:/53355/cl010174436'), wiki('Code_of_Hammurabi')],
    related: ['event:hammurabi-code', 'civilization:mesopotamia', 'person:hammurabi'],
  },
  {
    kind: 'artifact',
    id: 'rosetta',
    title: 'Stele di Rosetta',
    era: 'antichita',
    glyph: 'tablet',
    date: { sortYear: -196, label: '196 a.C.', certainty: 'certain', note: 'Data del decreto inciso, emanato a Menfi in onore di Tolomeo V.' },
    materials: 'Granodiorite; alta circa 1,1 m',
    location: 'British Museum, Londra',
    summary: 'Frammento di stele con lo stesso decreto scritto in geroglifico, demotico e greco antico.',
    context:
      "Fu rinvenuta nel 1799 da soldati francesi presso Rashid (Rosetta), nel delta del Nilo, durante la campagna d'Egitto. Passò ai britannici con il trattato di Alessandria del 1801.",
    func: 'Decreto sacerdotale che celebrava il culto del sovrano tolemaico, da esporre nei templi.',
    significance:
      "Il testo greco, leggibile, fu una chiave decisiva per decifrare i geroglifici. Jean-François Champollion annunciò i suoi risultati nel 1822, partendo anche dal lavoro di Thomas Young.",
    sources: [ref('Everything you ever wanted to know about the Rosetta Stone', 'British Museum', 'https://www.britishmuseum.org/blog/everything-you-ever-wanted-know-about-rosetta-stone'), wiki('Rosetta_Stone')],
    related: ['civilization:egypt', 'event:giza', 'event:writing'],
  },
  {
    kind: 'artifact',
    id: 'antikythera',
    title: 'Meccanismo di Anticitera',
    era: 'antichita',
    glyph: 'mechanism',
    date: {
      sortYear: -150,
      label: 'c. II–I secolo a.C.',
      certainty: 'debated',
      note: 'La data di costruzione è discussa; il naufragio della nave che lo trasportava è collocato nel I secolo a.C.',
    },
    materials: 'Bronzo (ingranaggi), resti di una cassa in legno; sopravvivono 82 frammenti',
    location: 'Museo Archeologico Nazionale, Atene',
    summary: 'Un dispositivo a ingranaggi greco usato per calcolare posizioni astronomiche e cicli del calendario.',
    context:
      "Fu recuperato all'inizio del Novecento da un relitto scoperto da pescatori di spugne nel 1900 presso l'isola di Anticitera.",
    func:
      "Ruotando una manovella si potevano prevedere le posizioni del Sole e della Luna, le fasi lunari, le eclissi e i cicli dei giochi panellenici.",
    significance:
      "È considerato il più antico calcolatore analogico conosciuto. Nessun oggetto di simile complessità meccanica è noto per oltre un millennio dopo. Le ricostruzioni recenti si basano su tomografie a raggi X.",
    sources: [wiki('Antikythera_mechanism')],
    related: ['civilization:greece', 'event:athens-democracy'],
  },
  {
    kind: 'artifact',
    id: 'colosseum',
    title: 'Colosseo (Anfiteatro Flavio)',
    era: 'antichita',
    glyph: 'arena',
    date: { sortYear: 80, label: 'c. 70–80 d.C.', certainty: 'certain', note: 'Avviato sotto Vespasiano, inaugurato da Tito nell\'80 d.C.' },
    materials: 'Travertino, tufo, laterizio e calcestruzzo romano',
    location: 'Roma — Parco archeologico del Colosseo',
    summary: 'Il più grande anfiteatro del mondo romano, simbolo della città di Roma.',
    context:
      "Fu costruito dalla dinastia Flavia nell'area dove sorgeva il lago artificiale della Domus Aurea di Nerone.",
    func:
      "Ospitava spettacoli pubblici come combattimenti gladiatori e cacce ad animali (venationes). Le stime della capienza variano, in genere tra 50.000 e 70.000 spettatori.",
    significance:
      "Capolavoro di ingegneria e di organizzazione dei flussi di pubblico, ha influenzato l'architettura degli stadi moderni. Nei secoli fu usato anche come cava di materiali e come fortezza.",
    sources: [ref('Parco archeologico del Colosseo', 'Ministero della Cultura', 'https://colosseo.it/'), britannica('topic/Colosseum', 'Colosseum'), wiki('Colosseum')],
    related: ['civilization:rome', 'event:vesuvius'],
  },
  {
    kind: 'artifact',
    id: 'bayeux',
    title: 'Arazzo di Bayeux',
    era: 'medioevo',
    glyph: 'tapestry',
    date: { sortYear: 1075, label: 'c. 1070–1080', certainty: 'approximate', note: 'Il luogo di produzione (probabilmente l\'Inghilterra) e la committenza sono discussi.' },
    materials: 'Ricamo in lana su tela di lino; lungo circa 70 m',
    location: 'Musée de la Tapisserie de Bayeux, Normandia',
    summary: 'Un lungo ricamo che racconta per immagini la conquista normanna dell\'Inghilterra del 1066.',
    context:
      "Narra gli eventi che portarono alla battaglia di Hastings, in cui Guglielmo di Normandia sconfisse il re Aroldo II.",
    func: 'Racconto visivo celebrativo, probabilmente destinato a essere esposto in una chiesa.',
    significance:
      "Pur essendo chiamato \"arazzo\", è tecnicamente un ricamo. È una fonte preziosa su armi, navi, abiti e vita quotidiana dell'XI secolo.",
    sources: [ref('La Tapisserie de Bayeux', 'Bayeux Museum', 'https://www.bayeuxmuseum.com/'), wiki('Bayeux_Tapestry')],
    related: ['event:charlemagne', 'event:magna-carta'],
  },
  {
    kind: 'artifact',
    id: 'gutenberg-bible',
    title: 'Bibbia di Gutenberg',
    era: 'rinascimento',
    glyph: 'book',
    date: { sortYear: 1455, label: 'c. 1454–1455', certainty: 'approximate' },
    materials: 'Carta e pergamena; stampa a caratteri metallici mobili',
    location: 'Esemplari in diverse biblioteche (es. Library of Congress, British Library)',
    summary: 'Il primo grande libro stampato in Europa con caratteri mobili, detto anche "Bibbia a 42 linee".',
    context:
      "Prodotta a Magonza nella bottega di Johannes Gutenberg, in un'epoca in cui i libri erano per lo più copiati a mano.",
    func: 'Testo biblico in latino destinato soprattutto a chiese e monasteri.',
    significance:
      "Dimostrò la qualità raggiungibile con la stampa. Ne sopravvivono meno di cinquanta esemplari, molti dei quali incompleti.",
    sources: [britannica('biography/Johannes-Gutenberg', 'Johannes Gutenberg'), wiki('Gutenberg_Bible')],
    related: ['event:printing', 'person:gutenberg'],
  },
  {
    kind: 'artifact',
    id: 'galileo-telescope',
    title: 'Cannocchiale di Galileo',
    era: 'rinascimento',
    glyph: 'telescope',
    date: { sortYear: 1610, label: 'c. 1609–1610', certainty: 'approximate' },
    materials: 'Tubo in legno ricoperto di carta o pelle, lenti di vetro',
    location: 'Museo Galileo, Firenze',
    summary: 'Uno dei due cannocchiali conservati attribuiti a Galileo Galilei.',
    context:
      "Partendo da notizie su uno strumento olandese del 1608, Galileo costruì cannocchiali progressivamente più potenti.",
    func: 'Osservazione astronomica; ingrandimenti fino a circa 20 volte.',
    significance:
      "Con strumenti come questo Galileo osservò i satelliti di Giove, i rilievi della Luna e le fasi di Venere, fornendo prove contro il modello geocentrico.",
    sources: [ref('Museo Galileo — Collezioni', 'Museo Galileo', 'https://www.museogalileo.it/'), wiki('Galileo_Galilei')],
    related: ['event:sidereus', 'person:galileo', 'event:copernicus'],
  },
  {
    kind: 'artifact',
    id: 'steam-engine',
    title: 'Macchina a vapore di Watt',
    era: 'industriale',
    glyph: 'engine',
    date: { sortYear: 1777, label: 'dal 1776', certainty: 'certain', note: 'Le prime macchine Boulton & Watt entrarono in servizio nel 1776.' },
    materials: 'Ghisa, ferro, ottone e legno',
    location: 'Esemplari al Science Museum di Londra (tra cui "Old Bess", 1777)',
    summary: 'La macchina a vapore con condensatore separato, simbolo della prima rivoluzione industriale.',
    context:
      "Le macchine precedenti (tipo Newcomen) consumavano grandi quantità di carbone ed erano usate soprattutto nelle miniere.",
    func: 'Convertire il calore del vapore in lavoro meccanico: pompare acqua, poi azionare macchinari tramite moto rotatorio.',
    significance:
      "L'efficienza maggiore rese il vapore conveniente in fabbriche e mulini, contribuendo a svincolare la produzione dalla forza idraulica. L'unità di misura della potenza, il watt, porta il suo nome.",
    sources: [ref('Science Museum Group Collection', 'Science Museum Group', 'https://collection.sciencemuseumgroup.org.uk/'), wiki('Watt_steam_engine')],
    related: ['event:watt', 'event:railway', 'person:watt'],
  },
  {
    kind: 'artifact',
    id: 'telephone',
    title: 'Uno dei primi telefoni di Bell',
    era: 'industriale',
    glyph: 'phone',
    date: { sortYear: 1876, label: '1876', certainty: 'certain' },
    materials: 'Legno, metallo, elettromagnete e membrana vibrante',
    location: 'Esemplari presso lo Smithsonian (National Museum of American History)',
    summary: 'Gli apparecchi sperimentali con cui Bell e Thomas Watson trasmisero la voce attraverso un filo elettrico.',
    context:
      "Il telegrafo trasmetteva segnali codificati; la sfida era trasmettere il suono continuo della voce.",
    func: 'Convertire le vibrazioni sonore in variazioni di corrente elettrica e viceversa.',
    significance:
      "Il telefono cambiò il commercio, la vita urbana e le relazioni personali, e pose le basi delle reti di telecomunicazione.",
    sources: [ref('National Museum of American History', 'Smithsonian Institution', 'https://americanhistory.si.edu/'), wiki('Invention_of_the_telephone')],
    related: ['event:telephone', 'person:bell'],
  },
  {
    kind: 'artifact',
    id: 'a7l',
    title: 'Tuta spaziale Apollo A7L di Neil Armstrong',
    era: 'contemporanea',
    glyph: 'helmet',
    date: { sortYear: 1969, label: '1969', certainty: 'certain' },
    materials: 'Strati multipli di tessuti sintetici (nylon, neoprene, Mylar alluminizzato, Beta cloth in fibra di vetro)',
    location: 'Smithsonian National Air and Space Museum, Washington',
    summary: 'La tuta indossata da Armstrong durante la passeggiata lunare di Apollo 11.',
    context:
      "Prodotta dalla International Latex Corporation (ILC) per il programma Apollo.",
    func: 'Proteggere l\'astronauta da vuoto, sbalzi termici, radiazioni e micrometeoriti, permettendo il movimento.',
    significance:
      "Testimonianza materiale del primo allunaggio. Dopo un lungo intervento di conservazione è tornata in esposizione nel 2019, per il 50° anniversario della missione.",
    sources: [ref("Neil Armstrong's Spacesuit", 'Smithsonian National Air and Space Museum', 'https://airandspace.si.edu/'), wiki('Apollo/Skylab_A7L')],
    related: ['event:apollo11', 'person:armstrong', 'event:future-moon'],
  },
];
