import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ShoppingBag, CheckCircle2, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { masterService } from '@/services/masterService';
import { orderService } from '@/services/orderService';
import { formatDate } from '@/utils/format';
const chartData = [{
  name: 'Yan',
  value: 4
}, {
  name: 'Fev',
  value: 7
}, {
  name: 'Mar',
  value: 5
}, {
  name: 'Apr',
  value: 9
}, {
  name: 'May',
  value: 6
}, {
  name: 'Iyun',
  value: 11
}, {
  name: 'Iyul',
  value: 8
}];
export default function MasterDashboardPage() {
  const {
    user
  } = useAuthStore();
  const [master, setMaster] = useState(null);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(m => {
      setMaster(m);
      if (m) orderService.getOrdersForMaster(m.id).then(setOrders);
    });
  }, [user]);
  if (master === null) {
    return <EmptyState title="Profilingiz hali nashr qilinmagan" description="Mijozlarga ko'rinish uchun usta profilingizni to'ldiring." action={<Link to="/master/onboarding"><span className="text-sm font-semibold text-[var(--color-primary)]">Profilni to'ldirish</span></Link>} />;
  }
  if (!master) return null;
  const newReq = orders.filter(o => o.status === 'Yangi').length;
  const active = orders.filter(o => ['Qabul qilindi', 'Jarayonda'].includes(o.status)).length;
  const completed = orders.filter(o => o.status === 'Yakunlandi').length;
  return <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Boshqaruv paneli</h1>
        <p className="text-sm text-[var(--color-muted)]">Xush kelibsiz, {user?.firstName}!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ClipboardList} value={String(newReq)} label="Yangi so'rovlar" />
        <StatCard icon={ShoppingBag} value={String(active)} label="Faol buyurtmalar" tone="warning" />
        <StatCard icon={CheckCircle2} value={String(completed)} label="Yakunlangan buyurtmalar" tone="success" />
        <StatCard icon={Star} value={master.rating.toFixed(1)} label="Reyting" tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[var(--color-navy)]">So'nggi so'rovlar</h2>
            <Link to="/master/requests" className="text-sm font-semibold text-[var(--color-primary)]">Barchasi</Link>
          </div>
          {orders.length === 0 ? <EmptyState title="So'rovlar yo'q" /> : <div className="mt-3 divide-y divide-[var(--color-border)]">
              {orders.slice(0, 5).map(o => <div key={o.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-semibold text-[var(--color-navy)]">{o.customerName}</p>
                    <p className="text-xs text-[var(--color-muted)]">{o.service} · {formatDate(o.createdAt)}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>)}
            </div>}
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Statistika (30 kun)</h2>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{
                fontSize: 11
              }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{
                fill: '#F7F9FC'
              }} />
                <Bar dataKey="value" fill="#155EEF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>;
}
