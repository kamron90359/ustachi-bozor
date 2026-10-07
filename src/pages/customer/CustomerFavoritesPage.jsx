import { useEffect, useState } from 'react';
import MasterCard from '@/components/shared/MasterCard';
import EmptyState from '@/components/shared/EmptyState';
import { MasterCardSkeleton } from '@/components/shared/Skeleton';
import { useFavoritesStore } from '@/store/favoritesStore';
import { db } from '@/services/db';
export default function CustomerFavoritesPage() {
  const {
    favorites
  } = useFavoritesStore();
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const all = db.getMasters();
    setMasters(all.filter(m => favorites.includes(m.id)));
    setLoading(false);
  }, [favorites]);
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Sevimli ustalar</h1>
      <div className="mt-4">
        {loading ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({
          length: 3
        }).map((_, i) => <MasterCardSkeleton key={i} />)}</div> : masters.length === 0 ? <EmptyState title="Sevimli ustalar yo'q" description="Usta kartasidagi yurak belgisini bosib, sevimlilarga qo'shing." /> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{masters.map(m => <MasterCard key={m.id} master={m} />)}</div>}
      </div>
    </div>;
}
