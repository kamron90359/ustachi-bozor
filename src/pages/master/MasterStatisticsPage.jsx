import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import { ShoppingBag, CheckCircle2, Star, Wallet } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { masterService } from '@/services/masterService';
import { orderService } from '@/services/orderService';
import { formatPrice } from '@/utils/format';
const monthly = [{
  name: 'Fev',
  value: 3
}, {
  name: 'Mar',
  value: 6
}, {
  name: 'Apr',
  value: 4
}, {
  name: 'May',
  value: 8
}, {
  name: 'Iyun',
  value: 5
}, {
  name: 'Iyul',
  value: 9
}, {
  name: 'Avg',
  value: 7
}];
export default function MasterStatisticsPage() {
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
  if (!master) return null;
  const completed = orders.filter(o => o.status === 'Yakunlandi');
  const revenue = completed.reduce((s, o) => s + (o.price ?? 0), 0);
  const statusData = ['Yangi', 'Qabul qilindi', 'Jarayonda', 'Yakunlandi', 'Bekor qilindi'].map(s => ({
    name: s,
    value: orders.filter(o => o.status === s).length
  })).filter(d => d.value > 0);
  const colors = ['#155EEF', '#F79009', '#0B4FD1', '#12B76A', '#F04438'];
  return <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Statistika</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ShoppingBag} value={String(orders.length)} label="Jami buyurtmalar" />
        <StatCard icon={CheckCircle2} value={String(completed.length)} label="Yakunlangan" tone="success" />
        <StatCard icon={Star} value={master.rating.toFixed(1)} label="Reyting" tone="warning" />
        <StatCard icon={Wallet} value={formatPrice(revenue)} label="Jami daromad" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Oylik buyurtmalar</h2>
          <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthly}><XAxis dataKey="name" tick={{
                fontSize: 11
              }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Bar dataKey="value" fill="#155EEF" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Status bo'yicha</h2>
          <div className="mt-4 h-56">
            {statusData.length === 0 ? <p className="text-sm text-[var(--color-muted)]">Ma'lumot yo'q</p> : <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75}>
                    {statusData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                  </Pie>
                  <Legend wrapperStyle={{
                fontSize: 11
              }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>}
          </div>
        </div>
      </div>
    </div>;
}
