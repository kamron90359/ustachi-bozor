import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Ban, CheckCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/shared/Rating';
import EmptyState from '@/components/shared/EmptyState';
import { db } from '@/services/db';
import { masterService } from '@/services/masterService';
import { useToastStore } from '@/store/toastStore';
import { cn } from '@/utils/cn';
const tabs = [{
  label: 'Barchasi',
  filter: () => true
}, {
  label: 'Kutilmoqda',
  filter: m => !m.verified
}, {
  label: 'Verified',
  filter: m => m.verified
}, {
  label: 'Bloklangan',
  filter: m => !m.published
}];
export default function AdminMastersPage() {
  const {
    show
  } = useToastStore();
  const [masters, setMasters] = useState([]);
  const [tab, setTab] = useState(0);
  function load() {
    setMasters(db.getMasters());
  }
  useEffect(load, []);
  async function toggleTop(m) {
    await masterService.updateMaster(m.id, {
      topMaster: !m.topMaster
    });
    show('info', m.topMaster ? "Top usta belgisi olib tashlandi" : "Top usta sifatida belgilandi");
    load();
  }
  async function toggleBlock(m) {
    await masterService.updateMaster(m.id, {
      published: !m.published
    });
    show('info', m.published ? 'Usta bloklandi' : 'Usta blokdan chiqarildi');
    load();
  }
  const filtered = masters.filter(tabs[tab].filter);
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Ustalar</h1>
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-1">
        {tabs.map((t, i) => <button key={t.label} onClick={() => setTab(i)} className={cn('whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold', tab === i ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
            {t.label}
          </button>)}
      </div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
        {filtered.length === 0 ? <EmptyState title="Ustalar yo'q" /> : <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-left text-xs font-semibold text-[var(--color-muted)]">
                <th className="px-4 py-3">Usta</th><th className="px-4 py-3">Kasb</th><th className="px-4 py-3">Reyting</th><th className="px-4 py-3">Tarif</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map(m => <tr key={m.id}>
                  <td className="flex items-center gap-2 px-4 py-3 font-medium text-[var(--color-navy)]"><img src={m.avatar} className="h-8 w-8 rounded-full object-cover" alt="" /> {m.firstName} {m.lastName}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{m.profession}</td>
                  <td className="px-4 py-3"><Rating value={m.rating} count={m.reviewCount} /></td>
                  <td className="px-4 py-3"><Badge tone={m.plan === 'top' ? 'warning' : m.plan === 'premium' ? 'primary' : 'neutral'}>{m.plan}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Badge tone={m.verified ? 'success' : 'warning'}>{m.verified ? 'Verified' : 'Kutilmoqda'}</Badge>
                      {!m.published && <Badge tone="error">Bloklangan</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/masters/${m.slug}`} className="text-xs font-semibold text-[var(--color-primary)]">Ko'rish</Link>
                      <button onClick={() => toggleTop(m)} className={cn('flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]', m.topMaster && 'text-[var(--color-warning)]')} aria-label="Top usta"><Trophy className="h-4 w-4" /></button>
                      <button onClick={() => toggleBlock(m)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]" aria-label="Bloklash">
                        {m.published ? <Ban className="h-4 w-4 text-[var(--color-error)]" /> : <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />}
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>}
      </div>
    </div>;
}
