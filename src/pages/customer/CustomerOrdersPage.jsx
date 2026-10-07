import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { TableRowSkeleton } from '@/components/shared/Skeleton';
import ReviewModal from '@/components/shared/ReviewModal';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { orderService } from '@/services/orderService';
import { formatDate, formatPrice } from '@/utils/format';
import { cn } from '@/utils/cn';
const filters = [{
  label: 'Barchasi'
}, {
  label: 'Faol',
  statuses: ['Yangi', 'Qabul qilindi', 'Jarayonda']
}, {
  label: 'Yakunlangan',
  statuses: ['Yakunlandi']
}, {
  label: 'Bekor qilingan',
  statuses: ['Bekor qilindi', 'Rad etildi']
}];
export default function CustomerOrdersPage() {
  const {
    user
  } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(0);
  const [reviewOrder, setReviewOrder] = useState(null);
  function load() {
    if (!user) return;
    setLoading(true);
    orderService.getOrdersForCustomer(user.id).then(o => {
      setOrders(o);
      setLoading(false);
    });
  }
  useEffect(load, [user]);
  const filtered = filters[filter].statuses ? orders.filter(o => filters[filter].statuses.includes(o.status)) : orders;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Buyurtmalarim</h1>
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-1">
        {filters.map((f, i) => <button key={f.label} onClick={() => setFilter(i)} className={cn('whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold', filter === i ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
            {f.label}
          </button>)}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        {loading ? <>{Array.from({
          length: 4
        }).map((_, i) => <TableRowSkeleton key={i} />)}</> : filtered.length === 0 ? <EmptyState title="Buyurtmalar yo'q" /> : <>
            <div className="hidden grid-cols-6 gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-xs font-semibold text-[var(--color-muted)] lg:grid">
              <span>Usta</span><span>Xizmat</span><span>Sana</span><span>Narx</span><span>Status</span><span>Amallar</span>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {filtered.map(o => <div key={o.id} className="flex flex-col gap-2 px-4 py-3 lg:grid lg:grid-cols-6 lg:items-center lg:gap-2">
                  <span className="text-sm font-semibold text-[var(--color-navy)]">{o.masterName}</span>
                  <span className="text-sm text-[var(--color-muted)]">{o.service}</span>
                  <span className="text-sm text-[var(--color-muted)]">{formatDate(o.date)}</span>
                  <span className="text-sm font-semibold text-[var(--color-navy)]">{o.price ? formatPrice(o.price) : '-'}</span>
                  <span><StatusBadge status={o.status} /></span>
                  <span>
                    {o.status === 'Yakunlandi' && !o.reviewed && <Button size="sm" variant="outline" icon={<Star className="h-3.5 w-3.5" />} onClick={() => setReviewOrder(o)}>Baholash</Button>}
                    {o.reviewed && <span className="text-xs text-[var(--color-success)]">Baholandi</span>}
                  </span>
                </div>)}
            </div>
          </>}
      </div>

      {reviewOrder && <ReviewModal open={!!reviewOrder} onClose={() => setReviewOrder(null)} order={reviewOrder} onDone={load} />}
    </div>;
}
