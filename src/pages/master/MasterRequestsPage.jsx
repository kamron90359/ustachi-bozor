import { useEffect, useState } from 'react';
import { Check, X, MapPin, Calendar, Phone } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import StatusBadge from '@/components/shared/StatusBadge';
import Button from '@/components/ui/Button';
import { TableRowSkeleton } from '@/components/shared/Skeleton';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
import { orderService } from '@/services/orderService';
import { formatDate } from '@/utils/format';
export default function MasterRequestsPage() {
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
    setOrders(list.filter(o => o.status === 'Yangi'));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [user]);
  async function respond(order, accept) {
    await orderService.updateStatus(order.id, accept ? 'Qabul qilindi' : 'Rad etildi');
    show('success', accept ? "So'rov qabul qilindi" : "So'rov rad etildi");
    load();
  }
  if (loading) return <div className="rounded-2xl border border-[var(--color-border)] bg-white">{Array.from({
      length: 3
    }).map((_, i) => <TableRowSkeleton key={i} />)}</div>;
  if (orders.length === 0) return <EmptyState title="Yangi so'rovlar yo'q" description="Mijozlardan yangi so'rovlar shu yerda ko'rinadi." />;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Kelgan so'rovlar</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {orders.map(o => <div key={o.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[var(--color-navy)]">{o.customerName}</p>
              <StatusBadge status={o.status} />
            </div>
            <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{o.service}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{o.description}</p>
            <div className="mt-3 space-y-1.5 text-xs text-[var(--color-muted)]">
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {o.address}</p>
              <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {formatDate(o.date)}, {o.time}</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {o.customerPhone}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" fullWidth icon={<Check className="h-4 w-4" />} onClick={() => respond(o, true)}>Qabul qilish</Button>
              <Button size="sm" fullWidth variant="outline" icon={<X className="h-4 w-4" />} onClick={() => respond(o, false)}>Rad etish</Button>
            </div>
          </div>)}
      </div>
    </div>;
}
