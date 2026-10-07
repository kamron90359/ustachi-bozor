import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/shared/EmptyState';
import { supportService } from '@/services/supportService';
import { useAuthStore } from '@/store/authStore';
import { formatDate, timeAgo } from '@/utils/format';
import { cn } from '@/utils/cn';
const toneByStatus = {
  Yangi: 'primary',
  Ochiq: 'warning',
  Jarayonda: 'warning',
  "Hal qilindi": 'success'
};
export default function AdminSupportPage() {
  const {
    user
  } = useAuthStore();
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(null);
  const [reply, setReply] = useState('');
  function load() {
    supportService.getAll().then(list => {
      setTickets(list);
      if (!active && list[0]) setActive(list[0]);
    });
  }
  useEffect(load, []);
  async function send() {
    if (!active || !reply.trim() || !user) return;
    await supportService.reply(active.id, 'support', 'Support jamoasi', reply.trim());
    setReply('');
    const updated = await supportService.getAll();
    setTickets(updated);
    setActive(updated.find(t => t.id === active.id) ?? null);
  }
  async function changeStatus(status) {
    if (!active) return;
    await supportService.updateStatus(active.id, status);
    load();
  }
  if (tickets.length === 0) return <EmptyState title="So'rovlar yo'q" />;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Support markazi</h1>
      <div className="mt-4 grid h-[calc(100vh-200px)] grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white md:grid-cols-[300px_1fr]">
        <div className="overflow-y-auto border-r border-[var(--color-border)]">
          {tickets.map(t => <button key={t.id} onClick={() => setActive(t)} className={cn('flex w-full flex-col gap-1 border-b border-[var(--color-border)] p-3 text-left hover:bg-[var(--color-bg)]', active?.id === t.id && 'bg-[var(--color-primary-light)]')}>
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-semibold text-[var(--color-navy)]">{t.subject}</p>
                <Badge tone={toneByStatus[t.status]}>{t.status}</Badge>
              </div>
              <p className="text-xs text-[var(--color-muted)]">{t.userName} · {formatDate(t.createdAt)}</p>
            </button>)}
        </div>
        <div className="flex flex-col">
          {active && <>
              <div className="flex items-center justify-between border-b border-[var(--color-border)] p-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{active.subject}</p>
                  <p className="text-xs text-[var(--color-muted)]">{active.userName}</p>
                </div>
                <Select value={active.status} onChange={e => changeStatus(e.target.value)} className="!h-9 !w-40 !text-xs">
                  <option value="Yangi">Yangi</option>
                  <option value="Ochiq">Ochiq</option>
                  <option value="Jarayonda">Jarayonda</option>
                  <option value="Hal qilindi">Hal qilindi</option>
                </Select>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {active.messages.map(m => <div key={m.id} className={cn('max-w-[75%] rounded-2xl px-3.5 py-2 text-sm', m.authorRole === 'support' ? 'ml-auto bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg)] text-[var(--color-navy)]')}>
                    <p>{m.text}</p>
                    <p className={cn('mt-1 text-[10px]', m.authorRole === 'support' ? 'text-white/70' : 'text-[var(--color-muted)]')}>{m.authorName} · {timeAgo(m.createdAt)}</p>
                  </div>)}
              </div>
              <div className="flex items-center gap-2 border-t border-[var(--color-border)] p-3">
                <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Javob yozing..." className="h-10 flex-1 rounded-lg border border-[var(--color-border)] px-3 text-sm focus-ring" />
                <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white focus-ring" aria-label="Yuborish"><Send className="h-4 w-4" /></button>
              </div>
            </>}
        </div>
      </div>
    </div>;
}
