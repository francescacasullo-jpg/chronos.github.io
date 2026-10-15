# Fonti e affidabilità storica

## Principi editoriali

1. **Nessuna citazione inventata.** Il museo non riporta citazioni testuali attribuite a personaggi storici.
2. **Certezza delle date sempre esplicita.** Ogni data ha uno di questi stati, mostrato con icona e testo:
   - *Data documentata* — attestata da fonti coeve o documenti (es. 20 luglio 1969).
   - *Data approssimativa* — stime archeologiche o radiometriche (es. Giza, c. 2600–2500 a.C.).
   - *Cronologia discussa* — gli studiosi propongono date o interpretazioni diverse (es. il giorno dell'eruzione del Vesuvio; la datazione del Meccanismo di Anticitera).
   - *Ipotesi* — solo nella sala *Futuro ipotetico*: scenari, non fatti.
3. **Confini non immutabili.** Sulla mappa le civiltà sono rappresentate da aree indicative del nucleo geografico, con una nota sul cambiamento dei confini nel tempo.
4. **Immagini oneste.** Le fotografie provengono da Wikimedia Commons con autore e licenza verificati (vedi `IMAGES.md`). Dove manca una fotografia si usa un'illustrazione originale dichiarata come interpretativa.

## Tipologie di fonti utilizzate

- Musei: British Museum, Musée du Louvre, Musei Vaticani, Museo Galileo, Smithsonian (NASM, NMAH), Science Museum Group, Bayeux Museum, Parco archeologico del Colosseo, Parco Archeologico di Pompei.
- Istituzioni: UNESCO World Heritage Centre, NASA, CERN, IPCC, ITER Organization, British Library.
- Enciclopedie: Encyclopaedia Britannica, Wikipedia (come punto d'accesso alle bibliografie).

Le fonti di ogni elemento sono in `src/data/*.ts` (campo `sources`) e sono consultabili dall'interfaccia in ogni scheda.

## Verifica dei collegamenti

Gli URL sono stati controllati durante lo sviluppo (ottobre 2026): pagine raggiunte e argomento corrispondente,
inclusi gli ID UNESCO e la scheda del Louvre del Codice di Hammurabi. Un collegamento non verificabile
(sito del progetto di ricerca sul Meccanismo di Anticitera) è stato rimosso, e due sono stati sostituiti con
pagine verificate. I siti esterni possono cambiare nel tempo: in caso di link non più validi, aggiornare il campo
`sources` nel file dati corrispondente.

## Punti di cautela segnalati nei contenuti

- **Vesuvio, 79 d.C.**: anno certo; giorno discusso (24 agosto tradizionale vs ipotesi autunnale rafforzata da un'iscrizione scoperta nel 2018).
- **Telefono**: data del brevetto Bell certa; priorità dell'invenzione contesa (Gray, Meucci).
- **Stampa**: caratteri mobili già usati in Cina e Corea prima di Gutenberg.
- **Göbekli Tepe**: funzione del sito oggetto di dibattito.
- **Meccanismo di Anticitera**: data di costruzione discussa.
- **Arazzo di Bayeux**: luogo di produzione e committenza discussi; tecnicamente un ricamo.
- **Doppia elica del DNA**: ruolo dei dati di Rosalind Franklin e Raymond Gosling.
- **Medioevo / Rinascimento**: periodizzazioni convenzionali, variabili per area geografica.
