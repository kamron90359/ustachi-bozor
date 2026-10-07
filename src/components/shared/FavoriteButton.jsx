import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { cn } from '@/utils/cn';
export default function FavoriteButton({
  masterId,
  className
}) {
  const {
    isFavorite,
    toggle
  } = useFavoritesStore();
  const fav = isFavorite(masterId);
  return <button type="button" aria-label={fav ? "Sevimlilardan olib tashlash" : 'Sevimliga qo\'shish'} onClick={e => {
    e.preventDefault();
    e.stopPropagation();
    toggle(masterId);
  }} className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-[var(--color-border)] transition-colors hover:bg-white focus-ring', className)}>
      <Heart className={cn('h-4 w-4', fav ? 'fill-[var(--color-error)] text-[var(--color-error)]' : 'text-[var(--color-muted)]')} />
    </button>;
}
