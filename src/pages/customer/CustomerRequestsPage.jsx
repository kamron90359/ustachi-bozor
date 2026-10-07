import { useEffect, useState } from 'react';
import EmptyState from '@/components/shared/EmptyState';
import StatusBadge from '@/components/shared/StatusBadge';
import { TableRowSkeleton } from '@/components/shared/Skeleton';
import { useAuthStore } from '@/store/authStore';
import { orderService } from '@/services/orderService';
import { formatDate } from '@/utils/format';
export default function CustomerRequestsPage() {
  const {
    user
  } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    orderService.getOrdersForCustomer(user.id).then(o => {
      setOrders(o.filter(x => x.status === 'Yangi'));
      setLoading(false);
    });
  }, [user]);
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">So'rovlarim</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">Ustalarga yuborilgan va hali javob kutilayotgan so'rovlar</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        {loading ? Array.from({
        length: 3
      }).map((_, i) => <TableRowSkeleton key={i} />) : orders.length === 0 ? <EmptyState title="So'rovlar yo'q" description="Usta profilidan 'So'rov yuborish' tugmasini bosing." /> : <div className="divide-y divide-[var(--color-border)]">
            {orders.map(o => <div key={o.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{o.service} — {o.masterName}</p>
                  <p className="text-xs text-[var(--color-muted)]">{formatDate(o.date)}, {o.time} · {o.address}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>)}
          </div>}
      </div>
    </div>;
}
