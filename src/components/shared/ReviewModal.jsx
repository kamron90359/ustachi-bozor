import { useState } from 'react';
import { Star } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useToastStore } from '@/store/toastStore';
import { reviewService } from '@/services/reviewService';
import { orderService } from '@/services/orderService';
import { useAuthStore } from '@/store/authStore';
export default function ReviewModal({
  open,
  onClose,
  order,
  onDone
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  async function submit() {
    if (!user) return;
    setLoading(true);
    try {
      await reviewService.create({
        masterId: order.masterId,
        customerId: user.id,
        customerName: `${user.firstName} ${user.lastName}`,
        rating,
        comment
      });
      await orderService.markReviewed(order.id);
      show('success', 'Sharh muvaffaqiyatli qoldirildi');
      onDone();
      onClose();
    } finally {
      setLoading(false);
    }
  }
  return <Modal open={open} onClose={onClose} title="Sharh qoldirish">
      <p className="text-sm text-[var(--color-muted)]">{order.masterName} — {order.service}</p>
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setRating(n)} aria-label={`${n} yulduz`}>
            <Star className={`h-7 w-7 ${n <= rating ? 'fill-[var(--color-warning)] text-[var(--color-warning)]' : 'text-[var(--color-border)]'}`} />
          </button>)}
      </div>
      <textarea rows={4} className="mt-4 w-full rounded-lg border border-[var(--color-border)] p-3 text-sm focus-ring" placeholder="Fikringizni yozing..." value={comment} onChange={e => setComment(e.target.value)} />
      <Button fullWidth className="mt-4" loading={loading} onClick={submit}>Sharhni yuborish</Button>
    </Modal>;
}
