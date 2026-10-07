import { useEffect, useState } from 'react';
import EmptyState from '@/components/shared/EmptyState';
import StatusBadge from '@/components/shared/StatusBadge';
import Select from '@/components/ui/Select';
import { TableRowSkeleton } from '@/components/shared/Skeleton';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
import { orderService } from '@/services/orderService';
import { formatDate, formatPrice } from '@/utils/format';
const nextStatuses = {
  'Yangi': ['Yangi'],
  'Qabul qilindi': ['Qabul qilindi', 'Jarayonda', 'Bekor qilindi'],
  'Jarayonda': ['Jarayonda', 'Yakunlandi', 'Bekor qilindi'],
  'Yakunlandi': ['Yakunlandi'],
  'Bekor qilindi': ['Bekor qilindi'],
  'Rad etildi': ['Rad etildi']
};
export default function MasterOrdersPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  async function load() {
    if (!user) return;
    setLoading(true);
    const master = await masterService.getMasterByUserId(user.id);
    if (!master) {
      setLoading(false);
      return;
    }
    const list = await orderService.getOrdersForMaster(master.id);
    setOrders(list.filter(o => o.status !== 'Yangi'));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [user]);
  async function changeStatus(order, status) {
    await orderService.updateStatus(order.id, status);
    show('info', `Buyurtma holati: ${status}`);
    load();
  }
  if (loading) return <div className="rounded-2xl border border-[var(--color-border)] bg-white">{Array.from({
      length: 3
    }).map((_, i) => <TableRowSkeleton key={i} />)}</div>;
  if (orders.length === 0) return <EmptyState title="Buyurtmalar yo'q" />;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Buyurtmalar</h1>
      <div className="mt-4 divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        {orders.map(o => <div key={o.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-navy)]">{o.customerName} — {o.service}</p>
              <p className="text-xs text-[var(--color-muted)]">{formatDate(o.date)}, {o.time} · {o.price ? formatPrice(o.price) : ''}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={o.status} />
              {nextStatuses[o.status].length > 1 && <Select value={o.status} onChange={e => changeStatus(o, e.target.value)} className="!h-9 !text-xs">
                  {nextStatuses[o.status].map(s => <option key={s} value={s}>{s}</option>)}
                </Select>}
            </div>
          </div>)}
      </div>
    </div>;
}
