import { Component, type ReactNode } from 'react';

/** Gestione degli errori: nessuna schermata bianca in caso di problemi imprevisti. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error('[CHRONOS]', error);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="fatal" role="alert">
        <p className="fatal__brand">CHRONOS</p>
        <h1>Qualcosa si è inceppato nel meccanismo.</h1>
        <p>Si è verificato un errore imprevisto. Ricarica la pagina per riprendere la visita.</p>
        <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
          Ricarica
        </button>
      </div>
    );
  }
}
