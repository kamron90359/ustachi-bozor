import { useEffect, useState } from 'react';
import { Ban, CheckCircle, Trash2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import EmptyState from '@/components/shared/EmptyState';
import { db } from '@/services/db';
import { useToastStore } from '@/store/toastStore';
import { formatDate } from '@/utils/format';
const roleLabel = {
  customer: 'Mijoz',
  master: 'Usta',
  admin: 'Admin'
};
export default function AdminUsersPage() {
  const {
    show
  } = useToastStore();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [toDelete, setToDelete] = useState(null);
  function load() {
    setUsers(db.getUsers());
  }
  useEffect(load, []);
  function toggleBlock(u) {
    const list = db.getUsers().map(x => x.id === u.id ? {
      ...x,
      status: x.status === 'active' ? 'blocked' : 'active'
    } : x);
    db.setUsers(list);
    show('info', u.status === 'active' ? 'Foydalanuvchi bloklandi' : 'Foydalanuvchi blokdan chiqarildi');
    load();
  }
  function remove(u) {
    db.setUsers(db.getUsers().filter(x => x.id !== u.id));
    show('info', "Foydalanuvchi o'chirildi");
    load();
  }
  const filtered = users.filter(u => (!query || `${u.firstName} ${u.lastName} ${u.phone}`.toLowerCase().includes(query.toLowerCase())) && (!role || u.role === role) && (!status || u.status === status));
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Foydalanuvchilar</h1>
      <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-3">
        <Input placeholder="Ism yoki telefon bo'yicha qidirish" value={query} onChange={e => setQuery(e.target.value)} className="sm:col-span-1" />
        <Select value={role} onChange={e => setRole(e.target.value)}><option value="">Barcha rollar</option><option value="customer">Mijoz</option><option value="master">Usta</option><option value="admin">Admin</option></Select>
        <Select value={status} onChange={e => setStatus(e.target.value)}><option value="">Barcha statuslar</option><option value="active">Faol</option><option value="blocked">Bloklangan</option></Select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
        {filtered.length === 0 ? <EmptyState title="Foydalanuvchilar topilmadi" /> : <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-left text-xs font-semibold text-[var(--color-muted)]">
                <th className="px-4 py-3">Ism</th><th className="px-4 py-3">Telefon</th><th className="px-4 py-3">Rol</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Ro'yxatdan o'tgan</th><th className="px-4 py-3">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map(u => <tr key={u.id}>
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{u.phone}</td>
                  <td className="px-4 py-3"><Badge tone="primary">{roleLabel[u.role]}</Badge></td>
                  <td className="px-4 py-3"><Badge tone={u.status === 'active' ? 'success' : 'error'}>{u.status === 'active' ? 'Faol' : 'Bloklangan'}</Badge></td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => toggleBlock(u)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]" aria-label="Bloklash">
                        {u.status === 'active' ? <Ban className="h-4 w-4 text-[var(--color-warning)]" /> : <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />}
                      </button>
                      <button onClick={() => setToDelete(u)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error-light)]" aria-label="O'chirish"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>}
      </div>

      {toDelete && <ConfirmDialog open={!!toDelete} onClose={() => setToDelete(null)} onConfirm={() => remove(toDelete)} title="Foydalanuvchini o'chirish" description={`${toDelete.firstName} ${toDelete.lastName} o'chirilsinmi?`} confirmLabel="O'chirish" danger />}
    </div>;
}
