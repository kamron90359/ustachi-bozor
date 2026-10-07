import { useState } from 'react';
import { Send } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { db } from '@/services/db';
import { notificationService } from '@/services/notificationService';
import { useToastStore } from '@/store/toastStore';
export default function AdminNotificationsPage() {
  const {
    show
  } = useToastStore();
  const [audience, setAudience] = useState('all');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('promotion');
  const [sending, setSending] = useState(false);
  function send() {
    setSending(true);
    const users = db.getUsers().filter(u => audience === 'all' ? u.role !== 'admin' : u.role === audience);
    notificationService.broadcast(users.map(u => u.id), title, message, type);
    show('success', `${users.length} ta foydalanuvchiga yuborildi`);
    setTitle('');
    setMessage('');
    setSending(false);
  }
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Bildirishnoma yaratish</h1>
      <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <Select label="Auditoriya" value={audience} onChange={e => setAudience(e.target.value)}>
          <option value="all">Barcha foydalanuvchilar</option>
          <option value="customer">Mijozlar</option>
          <option value="master">Ustalar</option>
        </Select>
        <Select label="Turi" value={type} onChange={e => setType(e.target.value)}>
          <option value="promotion">Aksiya / e'lon</option>
          <option value="system">Tizim</option>
        </Select>
        <Input label="Sarlavha" placeholder="Masalan: Yangi imkoniyat!" value={title} onChange={e => setTitle(e.target.value)} />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Xabar matni</label>
          <textarea rows={4} className="w-full rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 text-sm focus-ring" value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <Button fullWidth icon={<Send className="h-4 w-4" />} loading={sending} disabled={!title || !message} onClick={send}>Yuborish</Button>
      </div>
    </div>;
}
