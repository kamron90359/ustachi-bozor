import { useEffect, useState } from 'react';
import { Bell, ShoppingBag, MessageSquare, Star, Settings2, Megaphone } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { notificationService } from '@/services/notificationService';
import { timeAgo } from '@/utils/format';
import { cn } from '@/utils/cn';
const tabs = [{
  label: 'Barchasi'
}, {
  label: 'Buyurtmalar',
  types: ['order', 'request']
}, {
  label: 'Xabarlar',
  types: ['message']
}, {
  label: 'Tizim',
  types: ['system', 'promotion']
}];
const iconByType = {
  order: ShoppingBag,
  request: ShoppingBag,
  message: MessageSquare,
  review: Star,
  system: Settings2,
  promotion: Megaphone
};
export default function NotificationCenterPage() {
  const {
    user
  } = useAuthStore();
  const {
    items,
    refresh,
    markAllRead
  } = useNotificationStore();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (user) refresh(user.id);
  }, [user, refresh]);
  if (!user) return null;
  const filtered = tabs[tab].types ? items.filter(n => tabs[tab].types.includes(n.type)) : items;
  const unread = items.filter(n => !n.read).length;
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Bildirishnomalar</h1>
        {unread > 0 && <button onClick={() => markAllRead(user.id)} className="text-sm font-semibold text-[var(--color-primary)]">Barchasini o'qilgan deb belgilash</button>}
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-1">
        {tabs.map((t, i) => <button key={t.label} onClick={() => setTab(i)} className={cn('whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold', tab === i ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
            {t.label}
          </button>)}
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? <EmptyState icon={<Bell className="h-6 w-6" />} title="Bildirishnomalar yo'q" description="Yangi buyurtma, xabar va tizim bildirishnomalari shu yerda ko'rinadi." /> : <div className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            {filtered.map(n => {
          const Icon = iconByType[n.type];
          return <button key={n.id} onClick={() => {
            if (!n.read) {
              notificationService.markRead(n.id);
              refresh(user.id);
            }
          }} className={cn('flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--color-bg)]', !n.read && 'bg-[var(--color-primary-light)]/30')}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]"><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--color-navy)]">{n.title}</p>
                    {n.body && <p className="mt-0.5 text-xs text-[var(--color-muted)]">{n.body}</p>}
                    <p className="mt-1 text-[11px] text-[var(--color-muted)]">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />}
                </button>;
        })}
          </div>}
      </div>
    </div>;
}
