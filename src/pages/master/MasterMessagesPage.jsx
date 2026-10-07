import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { messageService } from '@/services/messageService';
import { timeAgo } from '@/utils/format';
import { cn } from '@/utils/cn';
export default function MasterMessagesPage() {
  const {
    user
  } = useAuthStore();
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    if (!user) return;
    messageService.getConversations(user.id, 'master').then(c => {
      setConversations(c);
      if (c[0]) setActive(c[0]);
    });
  }, [user]);
  useEffect(() => {
    if (active) messageService.getMessages(active.id).then(setMessages);
  }, [active]);
  async function send() {
    if (!active || !text.trim() || !user) return;
    const msg = await messageService.sendMessage(active.id, user.id, 'master', text.trim());
    setMessages(prev => [...prev, msg]);
    setText('');
  }
  if (conversations.length === 0) return <EmptyState title="Xabarlar yo'q" description="Mijozlar bilan yozishmalar shu yerda ko'rinadi." />;
  return <div className="grid h-[calc(100vh-160px)] grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white md:grid-cols-[280px_1fr]">
      <div className="overflow-y-auto border-r border-[var(--color-border)]">
        {conversations.map(c => <button key={c.id} onClick={() => setActive(c)} className={cn('flex w-full items-center gap-3 border-b border-[var(--color-border)] p-3 text-left hover:bg-[var(--color-bg)]', active?.id === c.id && 'bg-[var(--color-primary-light)]')}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary)]">{c.customerName[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--color-navy)]">{c.customerName}</p>
              <p className="truncate text-xs text-[var(--color-muted)]">{c.lastMessage || 'Suhbatni boshlang'}</p>
            </div>
          </button>)}
      </div>
      <div className="flex flex-col">
        {active && <>
            <div className="border-b border-[var(--color-border)] p-3 text-sm font-semibold text-[var(--color-navy)]">{active.customerName}</div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {messages.map(m => <div key={m.id} className={cn('max-w-[75%] rounded-2xl px-3.5 py-2 text-sm', m.senderRole === 'master' ? 'ml-auto bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg)] text-[var(--color-navy)]')}>
                  {m.text}
                  <p className={cn('mt-1 text-[10px]', m.senderRole === 'master' ? 'text-white/70' : 'text-[var(--color-muted)]')}>{timeAgo(m.createdAt)}</p>
                </div>)}
            </div>
            <div className="flex items-center gap-2 border-t border-[var(--color-border)] p-3">
              <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Xabar yozing..." className="h-10 flex-1 rounded-lg border border-[var(--color-border)] px-3 text-sm focus-ring" />
              <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white focus-ring" aria-label="Yuborish"><Send className="h-4 w-4" /></button>
            </div>
          </>}
      </div>
    </div>;
}
