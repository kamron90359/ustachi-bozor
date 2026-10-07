import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, ShoppingBag, CheckCircle2, Heart } from 'lucide-react';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import MasterCard from '@/components/shared/MasterCard';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { orderService } from '@/services/orderService';
import { masterService } from '@/services/masterService';
import { formatDate, formatPrice } from '@/utils/format';
export default function CustomerDashboardPage() {
  const {
    user
  } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [recommended, setRecommended] = useState([]);
  useEffect(() => {
    if (!user) return;
    orderService.getOrdersForCustomer(user.id).then(setOrders);
    masterService.getMasters({
      pageSize: 4
    }).then(r => setRecommended(r.items));
  }, [user]);
  const newRequests = orders.filter(o => o.status === 'Yangi').length;
  const active = orders.filter(o => ['Qabul qilindi', 'Jarayonda'].includes(o.status)).length;
  const completed = orders.filter(o => o.status === 'Yakunlandi').length;
  return <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Boshqaruv paneli</h1>
        <p className="text-sm text-[var(--color-muted)]">Xush kelibsiz, {user?.firstName}!</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ClipboardList} value={String(newRequests)} label="Yangi so'rovlar" />
        <StatCard icon={ShoppingBag} value={String(active)} label="Faol buyurtmalar" tone="warning" />
        <StatCard icon={CheckCircle2} value={String(completed)} label="Yakunlangan buyurtmalar" tone="success" />
        <StatCard icon={Heart} value={String(JSON.parse(localStorage.getItem('ustachi:favorites') || '[]').length)} label="Sevimli ustalar" tone="error" />
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[var(--color-navy)]">So'nggi buyurtmalar</h2>
          <Link to="/customer/orders" className="text-sm font-semibold text-[var(--color-primary)]">Barchasi</Link>
        </div>
        {orders.length === 0 ? <EmptyState title="Hali buyurtmalar yo'q" description="Usta topib, birinchi so'rovingizni yuboring." action={<Link to="/masters"><span className="text-sm font-semibold text-[var(--color-primary)]">Ustani topish</span></Link>} /> : <div className="mt-3 divide-y divide-[var(--color-border)]">
            {orders.slice(0, 5).map(o => <div key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-semibold text-[var(--color-navy)]">{o.service}</p>
                  <p className="text-xs text-[var(--color-muted)]">{o.masterName} · {formatDate(o.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[var(--color-navy)]">{o.price ? formatPrice(o.price) : ''}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>)}
          </div>}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[var(--color-navy)]">Tavsiya etilgan ustalar</h2>
          <Link to="/masters" className="text-sm font-semibold text-[var(--color-primary)]">Barchasi</Link>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommended.map(m => <MasterCard key={m.id} master={m} />)}
        </div>
      </div>
    </div>;
}
