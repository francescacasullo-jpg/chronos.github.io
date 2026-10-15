import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useCollection } from '../../lib/collection';
import { getEntity } from '../../data';

export function FavButton({ itemKey, withLabel = false }: { itemKey: string; withLabel?: boolean }) {
  const { isFavorite, toggleFavorite } = useCollection();
  const on = isFavorite(itemKey);
  const title = getEntity(itemKey)?.title ?? '';
  const label = on ? 'Rimuovi dalla collezione' : 'Aggiungi alla collezione';
  return (
    <button
      type="button"
      className={`fav ${on ? 'is-on' : ''} ${withLabel ? 'fav--label' : ''}`}
      aria-pressed={on}
      aria-label={withLabel ? undefined : `${label}: ${title}`}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(itemKey);
      }}
    >
      {on ? <BookmarkCheck size={18} aria-hidden="true" /> : <Bookmark size={18} aria-hidden="true" />}
      {withLabel && <span>{on ? 'Nella collezione' : 'Salva nella collezione'}</span>}
    </button>
  );
}
