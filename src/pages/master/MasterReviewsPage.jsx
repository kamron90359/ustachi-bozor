import { useEffect, useState } from 'react';
import Rating from '@/components/shared/Rating';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { masterService } from '@/services/masterService';
import { reviewService } from '@/services/reviewService';
import { formatDate } from '@/utils/format';
export default function MasterReviewsPage() {
  const {
    user
  } = useAuthStore();
  const [master, setMaster] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(m => {
      setMaster(m);
      if (m) reviewService.getForMaster(m.id).then(setReviews);
    });
  }, [user]);
  if (!master) return null;
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Sharhlar</h1>
        <Rating value={master.rating} count={master.reviewCount} />
      </div>
      <div className="mt-4">
        {reviews.length === 0 ? <EmptyState title="Sharhlar yo'q" /> : <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
            {reviews.map(r => <div key={r.id} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{r.customerName}</p>
                  <Rating value={r.rating} size={13} />
                </div>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{r.comment}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{formatDate(r.createdAt)}</p>
              </div>)}
          </div>}
      </div>
    </div>;
}
