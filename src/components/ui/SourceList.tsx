import { ExternalLink } from 'lucide-react';
import type { SourceRef } from '../../data/types';

export function SourceList({ sources }: { sources: SourceRef[] }) {
  if (!sources.length) return <p className="muted">Fonti in corso di verifica.</p>;
  return (
    <ol className="sources">
      {sources.map((s) => (
        <li key={s.url}>
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            <span className="sources__title">{s.title}</span>
            <span className="sources__pub">{s.publisher}</span>
            <ExternalLink size={13} aria-hidden="true" />
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
