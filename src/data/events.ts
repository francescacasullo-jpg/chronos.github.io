import type { HistoricalEvent } from './types';
import { britannica, ref, unesco, wiki } from './sources';

/**
 * Eventi del museo. Le date sono marcate con un grado di certezza:
 * - certain: data documentata
 * - approximate: datazione approssimativa (archeologica, radiocarbonio…)
 * - debated: cronologia o interpretazione discussa dagli studiosi
 * - hypothetical: scenario futuro, non un fatto storico
 */
export const EVENTS: HistoricalEvent[] = [
  /* ───────────── 01 PREISTORIA ───────────── */
  {
    kind: 'event',
    id: 'lascaux',
    title: 'Le pitture della grotta di Lascaux',
    era: 'preistoria',
    glyph: 'hand',
    date: {
      sortYear: -15000,
      label: 'c. 17.000 anni fa',
      certainty: 'approximate',
      note: 'Le datazioni si basano sul radiocarbonio e su confronti stilistici; gli studiosi propongono intervalli diversi.',
    },
    place: 'Montignac, Dordogna (Francia)',
    summary:
      'Centinaia di figure di animali dipinte e incise sulle pareti di una grotta nel Paleolitico superiore.',
    context:
      "Il Paleolitico superiore vede in Europa un'esplosione di produzione simbolica: pitture rupestri, statuette, ornamenti. Le comunità erano composte da cacciatori-raccoglitori.",
    explanation:
      "La grotta fu scoperta nel 1940. Le sue pareti mostrano cavalli, cervi, uri e altri animali realizzati con pigmenti minerali. Il significato delle immagini (rituale, narrativo, simbolico) è ancora discusso. Per proteggerle, la grotta originale è chiusa al pubblico dal 1963 e sono state realizzate repliche.",
    sources: [unesco(85, 'Prehistoric Sites and Decorated Caves of the Vézère Valley'), wiki('Lascaux')],
    related: ['event:gobekli-tepe', 'event:neolithic'],
  },
  {
    kind: 'event',
    id: 'gobekli-tepe',
    title: 'I recinti monumentali di Göbekli Tepe',
    era: 'preistoria',
    glyph: 'stele',
    date: {
      sortYear: -9500,
      label: 'c. 9500 a.C.',
      certainty: 'debated',
      note: 'Datazione al radiocarbonio; la funzione del sito (santuario o insediamento) è oggetto di dibattito.',
    },
    place: 'Anatolia sud-orientale (Turchia)',
    summary:
      'Pilastri di pietra a forma di T, decorati con rilievi di animali, eretti da comunità della fine del Paleolitico e dell\'inizio del Neolitico.',
    context:
      "Il sito si colloca nella fase di transizione verso l'agricoltura nella Mezzaluna Fertile, quando alcuni gruppi iniziano a vivere in modo più stabile.",
    explanation:
      "Gli scavi sistematici iniziarono negli anni Novanta. Il sito ha messo in discussione l'idea che l'architettura monumentale sia nata solo dopo l'agricoltura. Le interpretazioni sono state riviste più volte: oggi molti studiosi ritengono che vi fossero anche attività domestiche.",
    sources: [unesco(1572, 'Göbekli Tepe'), wiki('Göbekli_Tepe')],
    related: ['event:neolithic'],
  },
  {
    kind: 'event',
    id: 'neolithic',
    title: "La nascita dell'agricoltura nella Mezzaluna Fertile",
    era: 'preistoria',
    glyph: 'wheat',
    date: {
      sortYear: -9000,
      label: 'da c. 10.000 a.C.',
      certainty: 'approximate',
      note: 'Processo graduale durato millenni, avvenuto in modo indipendente in diverse regioni del mondo.',
    },
    place: 'Vicino Oriente (Levante, Anatolia, Mesopotamia settentrionale)',
    summary:
      'La domesticazione di cereali, legumi e animali trasforma lentamente le comunità di cacciatori-raccoglitori in società di agricoltori.',
    context:
      "Alla fine dell'ultima glaciazione, il clima più stabile favorisce in alcune aree lo sfruttamento intensivo di piante selvatiche, che vengono progressivamente coltivate.",
    explanation:
      "Il termine \"rivoluzione neolitica\" fu proposto dall'archeologo V. Gordon Childe, ma oggi si sottolinea che fu un processo lento. L'agricoltura nacque indipendentemente anche in Cina, Mesoamerica, Ande, Nuova Guinea e altre aree. Portò alla crescita demografica, ai villaggi stabili e, nel lungo periodo, alle prime città.",
    sources: [britannica('topic/Neolithic', 'Neolithic'), wiki('Neolithic_Revolution')],
    related: ['civilization:mesopotamia', 'event:writing'],
  },

  /* ───────────── 02 ANTICHITÀ ───────────── */
  {
    kind: 'event',
    id: 'writing',
    title: 'La nascita della scrittura cuneiforme',
    era: 'antichita',
    glyph: 'tablet',
    date: {
      sortYear: -3300,
      label: 'c. 3400–3100 a.C.',
      certainty: 'approximate',
      note: 'Le prime tavolette proto-cuneiformi provengono soprattutto da Uruk; la cronologia esatta è discussa.',
    },
    place: 'Uruk, Mesopotamia meridionale (Iraq)',
    summary:
      'Segni impressi su tavolette di argilla, nati per la contabilità, diventano un sistema di scrittura capace di registrare lingue diverse.',
    context:
      "Le grandi città sumeriche hanno bisogno di registrare beni, razioni e scambi amministrati dai templi e dalle istituzioni.",
    explanation:
      "La scrittura cuneiforme (dal latino cuneus, \"cuneo\") fu usata per oltre tremila anni per lingue come il sumerico e l'accadico. In Egitto una scrittura geroglifica compare in un periodo simile, e gli studiosi discutono il rapporto tra i due sistemi.",
    sources: [britannica('topic/cuneiform', 'Cuneiform'), wiki('Cuneiform')],
    related: ['civilization:mesopotamia', 'artifact:hammurabi'],
  },
  {
    kind: 'event',
    id: 'giza',
    title: 'La costruzione delle piramidi di Giza',
    era: 'antichita',
    glyph: 'pyramid',
    date: {
      sortYear: -2560,
      label: 'c. 2600–2500 a.C.',
      certainty: 'approximate',
      note: 'Le date assolute dei regni dell\'Antico Regno sono stimate e variano di alcuni decenni tra le diverse cronologie.',
    },
    place: 'Giza, presso Il Cairo (Egitto)',
    summary:
      'Durante la IV dinastia vengono costruite le piramidi di Cheope (Khufu), Chefren (Khafra) e Micerino (Menkaura).',
    context:
      "L'Antico Regno egizio è uno stato centralizzato, guidato da un sovrano considerato divino, capace di organizzare risorse e manodopera su scala enorme.",
    explanation:
      "La Grande Piramide di Cheope era alta in origine circa 146 metri e rimase per millenni la struttura più alta costruita dall'uomo. Gli scavi dei villaggi dei lavoratori indicano che fu costruita da squadre organizzate di operai, e non da schiavi come spesso si è creduto. Le tecniche esatte di sollevamento dei blocchi sono ancora discusse.",
    sources: [unesco(86, 'Memphis and its Necropolis – the Pyramid Fields from Giza to Dahshur'), britannica('topic/Pyramids-of-Giza', 'Pyramids of Giza'), wiki('Giza_pyramid_complex')],
    related: ['civilization:egypt', 'person:imhotep', 'artifact:rosetta'],
  },
  {
    kind: 'event',
    id: 'hammurabi-code',
    title: 'Il Codice di Hammurabi',
    era: 'antichita',
    glyph: 'stele',
    date: {
      sortYear: -1754,
      label: 'c. 1755–1750 a.C.',
      certainty: 'approximate',
      note: 'Datazione secondo la cosiddetta "cronologia media" della Mesopotamia.',
    },
    place: 'Babilonia, Mesopotamia',
    summary:
      'Il re babilonese Hammurabi fa incidere su stele una raccolta di circa 280 disposizioni giuridiche.',
    context:
      'Hammurabi unifica gran parte della Mesopotamia sotto il controllo di Babilonia.',
    explanation:
      "Il testo, scritto in accadico, regola commercio, famiglia, proprietà, lavoro e pene. Le pene differiscono a seconda dello status sociale. È una delle più antiche raccolte di leggi giunte quasi integre fino a noi, anche se esistevano raccolte precedenti.",
    sources: [ref('Law Code of Hammurabi, King of Babylon', 'Musée du Louvre', 'https://collections.louvre.fr/en/ark:/53355/cl010174436'), wiki('Code_of_Hammurabi')],
    related: ['artifact:hammurabi', 'civilization:mesopotamia', 'person:hammurabi'],
  },
  {
    kind: 'event',
    id: 'athens-democracy',
    title: 'La nascita della democrazia ateniese',
    era: 'antichita',
    glyph: 'temple',
    date: {
      sortYear: -508,
      label: '508/507 a.C.',
      certainty: 'certain',
      note: 'L\'anno delle riforme di Clistene è ben attestato; il significato di "nascita" della democrazia è oggetto di interpretazione.',
    },
    place: 'Atene, Grecia',
    summary:
      'Le riforme di Clistene riorganizzano i cittadini ateniesi e pongono le basi del governo popolare.',
    context:
      "Dopo la caduta della tirannide dei Pisistratidi, Atene attraversa un periodo di conflitti tra fazioni aristocratiche.",
    explanation:
      "Clistene suddivise i cittadini in dieci nuove tribù e istituì il Consiglio dei Cinquecento. L'assemblea dei cittadini (ekklesia) assunse un ruolo centrale. La democrazia ateniese era diretta, ma escludeva donne, stranieri residenti (meteci) e schiavi.",
    sources: [britannica('place/Athens', 'Athens'), wiki('Athenian_democracy')],
    related: ['civilization:greece', 'person:cleisthenes'],
  },
  {
    kind: 'event',
    id: 'vesuvius',
    title: "L'eruzione del Vesuvio",
    era: 'antichita',
    glyph: 'volcano',
    date: {
      sortYear: 79,
      label: '79 d.C.',
      certainty: 'debated',
      note: "L'anno è certo. Il giorno tradizionale è il 24 agosto, dai manoscritti di Plinio il Giovane; un'iscrizione a carboncino scoperta a Pompei nel 2018 ha rafforzato l'ipotesi di una data autunnale (ottobre).",
    },
    place: 'Campania (Italia)',
    summary:
      "L'eruzione seppellisce Pompei, Ercolano, Stabia e Oplontis sotto ceneri, lapilli e flussi piroclastici.",
    context:
      "La Campania era una regione ricca e popolosa dell'Impero romano, con ville, porti e città commerciali.",
    explanation:
      "Plinio il Giovane descrisse l'eruzione in due lettere a Tacito, nelle quali racconta anche la morte dello zio, Plinio il Vecchio. Le città sepolte, riscoperte a partire dal XVIII secolo, offrono un'immagine eccezionale della vita quotidiana romana.",
    sources: [unesco(829, 'Archaeological Areas of Pompei, Herculaneum and Torre Annunziata'), ref('Parco Archeologico di Pompei', 'Ministero della Cultura', 'https://pompeiisites.org/'), wiki('Eruption_of_Mount_Vesuvius_in_79_AD')],
    related: ['civilization:rome', 'person:pliny-younger', 'artifact:colosseum'],
  },

  /* ───────────── 03 MEDIOEVO ───────────── */
  {
    kind: 'event',
    id: 'charlemagne',
    title: 'Incoronazione di Carlo Magno',
    era: 'medioevo',
    glyph: 'castle',
    date: { sortYear: 800, label: '25 dicembre 800', certainty: 'certain' },
    place: 'Roma',
    summary:
      'Papa Leone III incorona Carlo, re dei Franchi, imperatore nella basilica di San Pietro.',
    context:
      "Il regno franco si era espanso in gran parte dell'Europa occidentale e centrale.",
    explanation:
      "L'incoronazione rinnova in Occidente il titolo imperiale e lega il potere politico all'autorità papale. Alla corte carolingia si promuove una ripresa degli studi, nota come \"rinascita carolingia\".",
    sources: [britannica('biography/Charlemagne', 'Charlemagne'), wiki('Charlemagne')],
    related: ['person:charlemagne', 'artifact:bayeux'],
  },
  {
    kind: 'event',
    id: 'magna-carta',
    title: 'La Magna Carta',
    era: 'medioevo',
    glyph: 'scroll',
    date: { sortYear: 1215, label: '15 giugno 1215', certainty: 'certain' },
    place: 'Runnymede (Inghilterra)',
    summary:
      'Re Giovanni d\'Inghilterra accetta una carta di concessioni ai baroni ribelli.',
    context:
      'Conflitti tra la corona inglese e i baroni su tasse, guerre e abusi del potere regio.',
    explanation:
      "La carta fu annullata dal papa poche settimane dopo, ma venne riemessa in versioni successive. Nei secoli è diventata un simbolo del principio che anche il sovrano è soggetto alla legge, un'interpretazione che va oltre il suo significato originario.",
    sources: [ref('Magna Carta', 'British Library', 'https://www.bl.uk/magna-carta'), wiki('Magna_Carta')],
    related: ['event:charlemagne'],
  },
  {
    kind: 'event',
    id: 'black-death',
    title: 'La peste nera',
    era: 'medioevo',
    glyph: 'plague',
    date: {
      sortYear: 1347,
      label: '1347–1351',
      certainty: 'approximate',
      note: 'Le stime sulla mortalità variano molto tra le fonti e tra le regioni.',
    },
    place: 'Europa, Asia occidentale, Nord Africa',
    summary:
      'Una pandemia di peste, causata dal batterio Yersinia pestis, colpisce l\'Europa e il Mediterraneo.',
    context:
      'Le rotte commerciali che collegano Asia, Mediterraneo ed Europa favoriscono la diffusione del contagio.',
    explanation:
      "Si stima che in Europa sia morta una quota tra un terzo e la metà della popolazione. Le conseguenze sociali ed economiche furono enormi: carenza di manodopera, rivolte, cambiamenti nella religiosità e nell'arte. Studi sul DNA antico hanno confermato il ruolo di Yersinia pestis.",
    sources: [britannica('event/Black-Death', 'Black Death'), wiki('Black_Death')],
    related: ['person:marco-polo'],
  },
  {
    kind: 'event',
    id: 'constantinople',
    title: 'La caduta di Costantinopoli',
    era: 'medioevo',
    glyph: 'dome',
    date: { sortYear: 1453, label: '29 maggio 1453', certainty: 'certain' },
    place: 'Costantinopoli (Istanbul, Turchia)',
    summary:
      "L'esercito ottomano di Maometto II conquista la capitale dell'Impero bizantino.",
    context:
      "L'Impero romano d'Oriente, erede di Roma, era ridotto a un territorio molto limitato.",
    explanation:
      "La conquista pose fine all'Impero bizantino. Costantinopoli divenne la capitale ottomana. La data è una delle più usate per segnare la fine del Medioevo.",
    sources: [britannica('event/Fall-of-Constantinople-1453', 'Fall of Constantinople'), wiki('Fall_of_Constantinople')],
    related: ['civilization:rome'],
  },

  /* ───────────── 04 RINASCIMENTO ───────────── */
  {
    kind: 'event',
    id: 'printing',
    title: 'La stampa a caratteri mobili in Europa',
    era: 'rinascimento',
    glyph: 'press',
    date: {
      sortYear: 1450,
      label: 'c. 1450–1455',
      certainty: 'approximate',
      note: 'La Bibbia di Gutenberg viene datata intorno al 1454–1455. Caratteri mobili erano già stati usati in Cina e in Corea nei secoli precedenti.',
    },
    place: 'Magonza (Germania)',
    summary:
      'Johannes Gutenberg sviluppa un sistema di stampa basato su caratteri metallici mobili, inchiostro a base oleosa e torchio.',
    context:
      "Nell'Europa del Quattrocento cresce la domanda di testi da parte di università, chiese, mercanti e lettori laici.",
    explanation:
      "La tecnica si diffuse rapidamente: entro il 1500 tipografie erano attive in molte città europee, con Venezia tra i centri principali. La stampa abbassò i costi dei libri e contribuì alla diffusione della Riforma protestante e del sapere scientifico.",
    sources: [britannica('biography/Johannes-Gutenberg', 'Johannes Gutenberg'), wiki('Printing_press')],
    related: ['artifact:gutenberg-bible', 'person:gutenberg'],
  },
  {
    kind: 'event',
    id: 'columbus',
    title: 'Il primo viaggio di Colombo nelle Americhe',
    era: 'rinascimento',
    glyph: 'ship',
    date: { sortYear: 1492, label: '12 ottobre 1492', certainty: 'certain', note: 'Data dello sbarco nelle Bahamas.' },
    place: 'Bahamas, Caraibi',
    summary:
      'La spedizione finanziata dalla corona di Castiglia raggiunge un\'isola delle Bahamas.',
    context:
      'Le potenze iberiche cercano rotte marittime verso l\'Asia.',
    explanation:
      "Il viaggio avviò contatti stabili tra Europa e Americhe (in precedenza i Norreni avevano raggiunto Terranova intorno all'anno 1000). Ne seguirono la conquista, la colonizzazione e un drastico calo delle popolazioni indigene, dovuto soprattutto a epidemie, violenza e sfruttamento.",
    sources: [britannica('biography/Christopher-Columbus', 'Christopher Columbus'), wiki('Voyages_of_Christopher_Columbus')],
    related: ['civilization:maya'],
  },
  {
    kind: 'event',
    id: 'sistine',
    title: 'La volta della Cappella Sistina',
    era: 'rinascimento',
    glyph: 'dome',
    date: { sortYear: 1508, label: '1508–1512', certainty: 'certain' },
    place: 'Città del Vaticano',
    summary:
      'Michelangelo affresca la volta della cappella su commissione di papa Giulio II.',
    context:
      'La Roma dei papi del primo Cinquecento è uno dei maggiori centri di committenza artistica.',
    explanation:
      "Le scene della Genesi, i profeti e le sibille costituiscono uno dei cicli più celebri dell'arte occidentale. Il Giudizio universale sulla parete d'altare fu dipinto più tardi, tra il 1536 e il 1541.",
    sources: [ref('Cappella Sistina', 'Musei Vaticani', 'https://www.museivaticani.va/content/museivaticani/it/collezioni/musei/cappella-sistina.html'), wiki('Sistine_Chapel_ceiling')],
    related: ['person:michelangelo', 'person:leonardo'],
  },
  {
    kind: 'event',
    id: 'copernicus',
    title: 'Copernico pubblica il De revolutionibus',
    era: 'rinascimento',
    glyph: 'astrolabe',
    date: { sortYear: 1543, label: '1543', certainty: 'certain' },
    place: 'Norimberga (Germania)',
    summary:
      'Niccolò Copernico propone un modello in cui la Terra e i pianeti ruotano attorno al Sole.',
    context:
      "Il modello geocentrico di Tolomeo dominava l'astronomia da oltre un millennio.",
    explanation:
      "Il libro fu pubblicato nell'anno della morte dell'autore. Il modello eliocentrico non fu accettato subito e richiese ulteriori prove, tra cui le osservazioni di Galileo e le leggi di Keplero.",
    sources: [britannica('biography/Nicolaus-Copernicus', 'Nicolaus Copernicus'), wiki('De_revolutionibus_orbium_coelestium')],
    related: ['event:sidereus', 'artifact:galileo-telescope'],
  },
  {
    kind: 'event',
    id: 'sidereus',
    title: 'Galileo pubblica il Sidereus Nuncius',
    era: 'rinascimento',
    glyph: 'telescope',
    date: { sortYear: 1610, label: 'marzo 1610', certainty: 'certain' },
    place: 'Venezia',
    summary:
      'Galileo descrive le osservazioni fatte con il cannocchiale: rilievi lunari, nuove stelle e quattro satelliti di Giove.',
    context:
      "Il cannocchiale era stato sviluppato nei Paesi Bassi nel 1608; Galileo ne costruì versioni migliorate.",
    explanation:
      "Le osservazioni dimostravano che non tutti i corpi celesti ruotano attorno alla Terra, offrendo argomenti a favore del modello copernicano. Le posizioni di Galileo lo portarono in seguito al processo dell'Inquisizione nel 1633.",
    sources: [ref('Museo Galileo', 'Museo Galileo – Istituto e Museo di Storia della Scienza', 'https://www.museogalileo.it/'), wiki('Sidereus_Nuncius')],
    related: ['artifact:galileo-telescope', 'person:galileo', 'event:copernicus'],
  },

  /* ───────────── 05 RIVOLUZIONE INDUSTRIALE ───────────── */
  {
    kind: 'event',
    id: 'watt',
    title: 'Il condensatore separato di James Watt',
    era: 'industriale',
    glyph: 'engine',
    date: { sortYear: 1769, label: '1769', certainty: 'certain', note: 'Anno del brevetto.' },
    place: 'Gran Bretagna',
    summary:
      'Watt brevetta un miglioramento della macchina a vapore che ne riduce drasticamente il consumo di carbone.',
    context:
      "Le macchine atmosferiche di tipo Newcomen, in uso dal 1712, erano impiegate soprattutto per pompare acqua dalle miniere.",
    explanation:
      "Separando il condensatore dal cilindro, Watt evitò di raffreddare e riscaldare il cilindro a ogni ciclo. In collaborazione con Matthew Boulton, le macchine di Watt furono poi adattate al movimento rotatorio, trovando impiego in fabbriche e mulini.",
    sources: [britannica('biography/James-Watt', 'James Watt'), wiki('Watt_steam_engine')],
    related: ['artifact:steam-engine', 'person:watt', 'event:railway'],
  },
  {
    kind: 'event',
    id: 'railway',
    title: 'La ferrovia Liverpool–Manchester',
    era: 'industriale',
    glyph: 'rail',
    date: { sortYear: 1830, label: '15 settembre 1830', certainty: 'certain' },
    place: 'Inghilterra nord-occidentale',
    summary:
      'Apre una delle prime ferrovie interurbane con servizio regolare di passeggeri e merci trainato esclusivamente da locomotive a vapore.',
    context:
      'La crescita industriale di Manchester richiede collegamenti rapidi con il porto di Liverpool.',
    explanation:
      "Alle prove di Rainhill del 1829 vinse la locomotiva Rocket di George e Robert Stephenson. Il successo della linea avviò una rapida espansione ferroviaria in Gran Bretagna e nel mondo.",
    sources: [ref('Liverpool and Manchester Railway', 'Science and Industry Museum', 'https://www.scienceandindustrymuseum.org.uk/'), wiki('Liverpool_and_Manchester_Railway')],
    related: ['event:watt', 'artifact:steam-engine'],
  },
  {
    kind: 'event',
    id: 'telephone',
    title: 'Il brevetto del telefono',
    era: 'industriale',
    glyph: 'phone',
    date: {
      sortYear: 1876,
      label: '7 marzo 1876',
      certainty: 'debated',
      note: "La data del brevetto di Bell è certa; la priorità dell'invenzione è stata contesa (tra gli altri da Elisha Gray e Antonio Meucci).",
    },
    place: 'Stati Uniti',
    summary:
      'Alexander Graham Bell ottiene il brevetto statunitense n. 174.465 per un apparato telegrafico capace di trasmettere la voce.',
    context:
      'Il telegrafo elettrico aveva già trasformato le comunicazioni a distanza; molti inventori lavoravano sulla trasmissione del suono.',
    explanation:
      "Nel 2002 la Camera dei Rappresentanti degli Stati Uniti ha approvato una risoluzione che riconosce il contributo di Antonio Meucci. Il telefono si diffuse rapidamente nelle città americane ed europee.",
    sources: [britannica('biography/Alexander-Graham-Bell', 'Alexander Graham Bell'), wiki('Invention_of_the_telephone')],
    related: ['artifact:telephone', 'person:bell'],
  },
  {
    kind: 'event',
    id: 'wright',
    title: 'Il primo volo controllato dei fratelli Wright',
    era: 'industriale',
    glyph: 'plane',
    date: { sortYear: 1903, label: '17 dicembre 1903', certainty: 'certain' },
    place: 'Kitty Hawk, Carolina del Nord (USA)',
    summary:
      'Orville e Wilbur Wright effettuano voli a motore, sostenuti e controllati con un aeroplano più pesante dell\'aria.',
    context:
      "Alla fine dell'Ottocento numerosi sperimentatori studiavano alianti e motori leggeri.",
    explanation:
      "Il primo volo, pilotato da Orville, durò circa 12 secondi e coprì circa 37 metri. Il velivolo originale, il Wright Flyer, è conservato allo Smithsonian National Air and Space Museum.",
    sources: [ref('1903 Wright Flyer', 'Smithsonian National Air and Space Museum', 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'), wiki('Wright_brothers')],
    related: ['event:apollo11'],
  },

  /* ───────────── 06 ETÀ CONTEMPORANEA ───────────── */
  {
    kind: 'event',
    id: 'relativity',
    title: 'La teoria della relatività ristretta',
    era: 'contemporanea',
    glyph: 'atom',
    date: { sortYear: 1905, label: '1905', certainty: 'certain', note: "L'articolo fu pubblicato sugli Annalen der Physik nel settembre 1905." },
    place: 'Berna (Svizzera)',
    summary:
      'Albert Einstein pubblica "Sull\'elettrodinamica dei corpi in movimento", fondando la relatività ristretta.',
    context:
      "La fisica dell'epoca faticava a conciliare la meccanica newtoniana con l'elettromagnetismo di Maxwell.",
    explanation:
      "Einstein, allora impiegato all'ufficio brevetti di Berna, postulò che le leggi della fisica sono le stesse in tutti i sistemi inerziali e che la velocità della luce nel vuoto è costante. Ne derivano la relatività della simultaneità e la dilatazione del tempo. Lo stesso anno pubblicò anche l'articolo da cui deriva la relazione E = mc².",
    sources: [britannica('science/special-relativity', 'Special relativity'), wiki('Special_relativity')],
    related: ['person:einstein', 'event:apollo11'],
  },
  {
    kind: 'event',
    id: 'apollo11',
    title: 'Il primo allunaggio umano',
    era: 'contemporanea',
    glyph: 'moon',
    date: { sortYear: 1969, label: '20 luglio 1969', certainty: 'certain', note: 'Allunaggio alle 20:17 UTC; Armstrong scese sulla superficie alcune ore dopo (21 luglio, UTC).' },
    place: 'Mare della Tranquillità, Luna',
    summary:
      'Il modulo lunare Eagle della missione Apollo 11 atterra sulla Luna con Neil Armstrong ed Edwin "Buzz" Aldrin.',
    context:
      'La corsa allo spazio tra Stati Uniti e Unione Sovietica, nel contesto della Guerra fredda.',
    explanation:
      "Michael Collins rimase in orbita lunare nel modulo di comando Columbia. Gli astronauti raccolsero campioni di suolo lunare e installarono esperimenti scientifici. Tra il 1969 e il 1972 dodici persone hanno camminato sulla Luna.",
    sources: [ref('Apollo 11', 'NASA', 'https://www.nasa.gov/mission/apollo-11/'), wiki('Apollo_11')],
    related: ['artifact:a7l', 'person:armstrong', 'event:relativity'],
  },
  {
    kind: 'event',
    id: 'dna',
    title: 'La struttura a doppia elica del DNA',
    era: 'contemporanea',
    glyph: 'dna',
    date: { sortYear: 1953, label: '1953', certainty: 'certain' },
    place: 'Cambridge e Londra (Regno Unito)',
    summary:
      'James Watson e Francis Crick pubblicano su Nature il modello a doppia elica del DNA.',
    context:
      'Si sapeva che il DNA trasporta l\'informazione genetica, ma non come fosse strutturato.',
    explanation:
      "Il modello si basava anche sui dati di diffrazione a raggi X ottenuti da Rosalind Franklin e Raymond Gosling e sul lavoro di Maurice Wilkins, i cui articoli comparvero nello stesso numero di Nature. Il contributo di Franklin è stato a lungo sottovalutato.",
    sources: [britannica('science/DNA', 'DNA'), wiki('Molecular_Structure_of_Nucleic_Acids:_A_Structure_for_Deoxyribose_Nucleic_Acid')],
    related: ['event:relativity'],
  },
  {
    kind: 'event',
    id: 'web',
    title: 'La proposta del World Wide Web',
    era: 'contemporanea',
    glyph: 'web',
    date: { sortYear: 1989, label: 'marzo 1989', certainty: 'certain' },
    place: 'CERN, Ginevra (Svizzera)',
    summary:
      'Tim Berners-Lee propone un sistema di gestione delle informazioni basato sull\'ipertesto.',
    context:
      'Internet esisteva già come rete di computer, ma mancava un modo semplice per collegare e consultare documenti.',
    explanation:
      "Nel 1990–1991 Berners-Lee sviluppò il primo browser e il primo server web. Nel 1993 il CERN rese disponibile il software del Web nel pubblico dominio, favorendone la diffusione globale.",
    sources: [ref('The birth of the Web', 'CERN', 'https://home.cern/science/computing/birth-web'), wiki('World_Wide_Web')],
    related: ['event:apollo11'],
  },

  /* ───────────── 07 FUTURO IPOTETICO ───────────── */
  {
    kind: 'event',
    id: 'future-moon',
    title: 'Ipotesi: una presenza umana stabile sulla Luna',
    era: 'futuro',
    glyph: 'rocket',
    hypothetical: true,
    date: { sortYear: 2040, label: 'Scenario — data incerta', certainty: 'hypothetical' },
    place: 'Polo sud lunare',
    summary:
      'Diverse agenzie spaziali hanno annunciato programmi per riportare esseri umani sulla Luna e studiare basi di lunga durata.',
    context:
      'Il programma Artemis della NASA e i programmi di altre agenzie mirano a un ritorno umano sulla Luna. I calendari sono stati più volte rivisti.',
    explanation:
      "SCENARIO, NON FATTO. Una presenza umana stabile richiederebbe di risolvere problemi di protezione dalle radiazioni, uso delle risorse locali (come il ghiaccio d'acqua ai poli) e costi elevati. Tempi e modalità restano incerti.",
    sources: [ref('Artemis', 'NASA', 'https://www.nasa.gov/humans-in-space/artemis/'), wiki('Artemis_program')],
    related: ['event:apollo11', 'artifact:a7l'],
  },
  {
    kind: 'event',
    id: 'future-fusion',
    title: 'Ipotesi: energia da fusione nucleare',
    era: 'futuro',
    glyph: 'star',
    hypothetical: true,
    date: { sortYear: 2060, label: 'Scenario — data incerta', certainty: 'hypothetical' },
    place: 'Globale',
    summary:
      'La fusione nucleare, il processo che alimenta le stelle, è studiata come possibile fonte di energia a basse emissioni.',
    context:
      'Progetti internazionali come ITER, in costruzione in Francia, mirano a dimostrare la fattibilità scientifica e tecnica della fusione controllata.',
    explanation:
      "SCENARIO, NON FATTO. Nonostante progressi sperimentali significativi, la produzione commerciale di elettricità da fusione non è ancora stata dimostrata. Le previsioni sui tempi variano molto e sono state spesso disattese in passato.",
    sources: [ref('ITER — What is ITER?', 'ITER Organization', 'https://www.iter.org/'), wiki('Fusion_power')],
    related: ['event:relativity'],
  },
  {
    kind: 'event',
    id: 'future-climate',
    title: 'Ipotesi: scenari climatici del XXI secolo',
    era: 'futuro',
    glyph: 'circle',
    hypothetical: true,
    date: { sortYear: 2100, label: 'Proiezioni al 2100', certainty: 'hypothetical' },
    place: 'Globale',
    summary:
      "Il Gruppo intergovernativo sul cambiamento climatico (IPCC) descrive diversi scenari di riscaldamento a seconda delle emissioni future.",
    context:
      "Le proiezioni climatiche non sono previsioni di un unico futuro, ma una gamma di possibilità che dipendono dalle scelte della società.",
    explanation:
      "SCENARIO, NON FATTO. Gli scenari IPCC (come gli SSP) collegano diversi percorsi socioeconomici a diversi livelli di riscaldamento entro il 2100. Quale scenario si avvererà dipende anche dalle politiche che verranno adottate.",
    sources: [ref('Sixth Assessment Report', 'IPCC', 'https://www.ipcc.ch/assessment-report/ar6/'), wiki('Shared_Socioeconomic_Pathways')],
    related: ['event:future-fusion'],
  },
];
