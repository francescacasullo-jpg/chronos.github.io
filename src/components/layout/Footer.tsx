import { ERAS } from '../../data';
import { IMAGES } from '../../data/images';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand">CHRONOS</p>
            <p className="site-footer__payoff">EVERY SECOND TELLS A STORY.</p>
          </div>
          <nav aria-label="Sale del museo">
            <h2 className="micro-title">Le sale</h2>
            <ul>
              {ERAS.map((e) => (
                <li key={e.id}>
                  <a href={`#/timeline/${e.id}`}>
                    {e.index} {e.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Collegamenti rapidi">
            <h2 className="micro-title">Il museo</h2>
            <ul>
              <li><a href="#/moments">The Moments</a></li>
              <li><a href="#/artifacts">Artifacts</a></li>
              <li><a href="#/civilizations">Civilizations</a></li>
              <li><a href="#/explore">Explore</a></li>
              <li><a href="#/collection">My Collection</a></li>
            </ul>
          </nav>
          <div className="site-footer__note">
            <h2 className="micro-title">Metodo</h2>
            <p>
              I contenuti sono testi divulgativi basati su conoscenze consolidate, con riferimenti a enciclopedie, musei e istituzioni consultabili in ogni scheda. Le date
              approssimative o discusse sono sempre indicate. La sala "Futuro ipotetico" contiene scenari, non fatti.
            </p>
            <p>
              Fotografie da Wikimedia Commons ({Object.keys(IMAGES).length} immagini, licenze CC0, pubblico dominio, CC BY e CC BY-SA). Le illustrazioni
              sono interpretazioni grafiche originali. Cartografia: Natural Earth (pubblico dominio).
            </p>
          </div>
        </div>
        <details className="credits">
          <summary>Crediti fotografici</summary>
          <ol className="credits__list">
            {Object.values(IMAGES).map((img) => (
              <li key={img.src}>
                <span className="credits__cap">{img.caption}</span>
                <span className="credits__by">
                  <a href={img.credit.source} target="_blank" rel="noopener noreferrer">
                    {img.credit.file}
                  </a>{' '}
                  — {img.credit.author || 'autore non indicato'} ·{' '}
                  {img.credit.licenseUrl ? (
                    <a href={img.credit.licenseUrl} target="_blank" rel="noopener noreferrer license">
                      {img.credit.license}
                    </a>
                  ) : (
                    img.credit.license
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="credits__note">Le immagini sono state ridimensionate e ritagliate per il web. Le opere con licenza CC BY-SA restano sotto la stessa licenza.</p>
        </details>
        <div className="site-footer__bottom">
          <span>CHRONOS — The Interactive Museum of Time</span>
          <span>Progetto culturale digitale · {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
