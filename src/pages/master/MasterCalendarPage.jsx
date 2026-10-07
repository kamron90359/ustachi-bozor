import { useEffect, useMemo, useState } from 'react';
import Calendar from '@/components/shared/Calendar';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { masterService } from '@/services/masterService';
import { orderService } from '@/services/orderService';
export default function MasterCalendarPage() {
  const {
    user
  } = useAuthStore();
  const [master, setMaster] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(new Date());
  useEffect(() => {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(m => {
      setMaster(m);
      if (m) orderService.getOrdersForMaster(m.id).then(setOrders);
    });
  }, [user]);
  const markedDates = useMemo(() => Array.from(new Set(orders.filter(o => o.status !== 'Bekor qilindi' && o.status !== 'Rad etildi').map(o => o.date))), [orders]);
  const dayOrders = orders.filter(o => o.date === selected.toISOString().slice(0, 10));
  const workingToday = master?.workingHours[(selected.getDay() + 6) % 7];
  if (!master) return <EmptyState title="Profil topilmadi" description="Avval usta profilini yarating." />;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Kalendar</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
        <Calendar selected={selected} onSelect={setSelected} markedDates={markedDates} />

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[var(--color-navy)]">{selected.toLocaleDateString('uz-UZ', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              weekday: 'long'
            })}</p>
            {workingToday && <span className="text-xs font-semibold text-[var(--color-muted)]">
                {workingToday.working ? `Ish vaqti: ${workingToday.start} - ${workingToday.end}` : 'Dam olish kuni'}
              </span>}
          </div>

          <div className="mt-4">
            {dayOrders.length === 0 ? <EmptyState title="Bu kunga buyurtma yo'q" description="Tanlangan sanada rejalashtirilgan buyurtmalar shu yerda ko'rinadi." /> : <div className="space-y-2">
                {dayOrders.map(o => <div key={o.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-navy)]">{o.time} — {o.customerName}</p>
                      <p className="text-xs text-[var(--color-muted)]">{o.service} · {o.address}</p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}
