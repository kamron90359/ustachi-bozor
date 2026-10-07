import { useEffect, useState } from 'react';
import { Users, Wrench, ShieldCheck, ShoppingBag, ClipboardList, FileWarning } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import { db } from '@/services/db';
import { categoryService } from '@/services/categoryService';
const orderTrend = [{
  name: 'Yan',
  value: 120
}, {
  name: 'Fev',
  value: 180
}, {
  name: 'Mar',
  value: 150
}, {
  name: 'Apr',
  value: 260
}, {
  name: 'May',
  value: 210
}, {
  name: 'Iyun',
  value: 340
}];
const colors = ['#155EEF', '#12B76A', '#F79009', '#F04438', '#0B4FD1', '#667085'];
export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    masters: 0,
    verified: 0,
    activeOrders: 0,
    newRequests: 0,
    reports: 0,
    pendingVerification: 0,
    blockedUsers: 0,
    tickets: 0,
    premium: 0
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const users = db.getUsers();
    const masters = db.getMasters();
    const orders = db.getOrders();
    const reports = db.getReports();
    const tickets = db.getTickets();
    setStats({
      users: users.length,
      masters: masters.length,
      verified: masters.filter(m => m.verified).length,
      activeOrders: orders.filter(o => ['Qabul qilindi', 'Jarayonda'].includes(o.status)).length,
      newRequests: orders.filter(o => o.status === 'Yangi').length,
      reports: reports.filter(r => r.status === 'Yangi' || r.status === "Ko'rib chiqilmoqda").length,
      pendingVerification: masters.filter(m => !m.verified).length,
      blockedUsers: users.filter(u => u.status === 'blocked').length,
      tickets: tickets.filter(t => t.status !== 'Hal qilindi').length,
      premium: masters.filter(m => m.plan !== 'free').length
    });
    categoryService.getCategories().then(setCategories);
  }, []);
  const pieData = categories.filter(c => (c.masterCount ?? 0) > 0).map(c => ({
    name: c.name,
    value: c.masterCount ?? 0
  }));
  return <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Admin paneli</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={Users} value={stats.users.toLocaleString()} label="Jami foydalanuvchilar" />
        <StatCard icon={Wrench} value={stats.masters.toLocaleString()} label="Jami ustalar" tone="warning" />
        <StatCard icon={ShieldCheck} value={stats.verified.toLocaleString()} label="Verified ustalar" tone="success" />
        <StatCard icon={ShoppingBag} value={stats.activeOrders.toLocaleString()} label="Faol buyurtmalar" />
        <StatCard icon={ClipboardList} value={stats.newRequests.toLocaleString()} label="Yangi so'rovlar" tone="warning" />
        <StatCard icon={FileWarning} value={stats.reports.toLocaleString()} label="Shikoyatlar" tone="error" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Buyurtmalar statistikasi</h2>
          <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={orderTrend}><XAxis dataKey="name" tick={{
                fontSize: 11
              }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="value" stroke="#155EEF" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Kategoriyalar bo'yicha</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75}>
                  {pieData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ShieldCheck} value={String(stats.pendingVerification)} label="Verifikatsiya navbatida" tone="warning" />
        <StatCard icon={Users} value={String(stats.blockedUsers)} label="Bloklangan foydalanuvchilar" tone="error" />
        <StatCard icon={ShoppingBag} value={String(stats.tickets)} label="Ochiq support ticketlar" />
        <StatCard icon={Wrench} value={String(stats.premium)} label="Premium ustalar" tone="success" />
      </div>
    </div>;
}
