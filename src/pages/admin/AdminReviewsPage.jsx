import { useEffect, useState } from 'react';
import Rating from '@/components/shared/Rating';
import EmptyState from '@/components/shared/EmptyState';
import { reviewService } from '@/services/reviewService';
import { formatDate } from '@/utils/format';
export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    reviewService.getAll().then(setReviews);
  }, []);
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Sharhlar</h1>
      <div className="mt-4">
        {reviews.length === 0 ? <EmptyState title="Sharhlar yo'q" /> : <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
            {reviews.map(r => <div key={r.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{r.customerName}</p>
                  <p className="text-xs text-[var(--color-muted)]">{r.comment}</p>
                  <p className="mt-0.5 text-[10px] text-[var(--color-muted)]">{formatDate(r.createdAt)}</p>
                </div>
                <Rating value={r.rating} size={13} />
              </div>)}
          </div>}
      </div>
    </div>;
}
