import { useEffect, useState } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import StatusBadge from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { db } from '@/services/db';
import { formatDate, formatPrice } from '@/utils/format';
const statuses = ['Yangi', 'Qabul qilindi', 'Jarayonda', 'Yakunlandi', 'Bekor qilindi', 'Rad etildi'];
export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    setOrders(db.getOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);
  const filtered = orders.filter(o => (!query || `${o.customerName} ${o.masterName}`.toLowerCase().includes(query.toLowerCase())) && (!status || o.status === status));
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Barcha buyurtmalar</h1>
      <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-3">
        <Input placeholder="Mijoz yoki usta bo'yicha qidirish" value={query} onChange={e => setQuery(e.target.value)} className="sm:col-span-2" />
        <Select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Barcha statuslar</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
        {filtered.length === 0 ? <EmptyState title="Buyurtmalar topilmadi" /> : <table className="w-full text-sm">
            <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-left text-xs font-semibold text-[var(--color-muted)]"><th className="px-4 py-3">Mijoz</th><th className="px-4 py-3">Usta</th><th className="px-4 py-3">Xizmat</th><th className="px-4 py-3">Sana</th><th className="px-4 py-3">Narx</th><th className="px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map(o => <tr key={o.id}>
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{o.customerName}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{o.masterName}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{o.service}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{formatDate(o.date)}</td>
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{o.price ? formatPrice(o.price) : '-'}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                </tr>)}
            </tbody>
          </table>}
      </div>
    </div>;
}
