import { useState } from 'react';
import { LifeBuoy, Phone, Mail, Send as SendIcon } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { supportService } from '@/services/supportService';
import { appConfig } from '@/config/app';
const faqs = [{
  q: "Ustani qanday topsam bo'ladi?",
  a: "Bosh sahifadagi qidiruv formasi yoki 'Ustani topish' bo'limi orqali kerakli kategoriya va hududni tanlab qidirishingiz mumkin."
}, {
  q: "So'rov yuborgandan keyin nima bo'ladi?",
  a: "Usta so'rovingizni ko'rib chiqib qabul qiladi yoki rad etadi. Holat haqida bildirishnoma olasiz."
}, {
  q: "Usta sifatida qanday ro'yxatdan o'taman?",
  a: "'Usta bo'lish' sahifasidan ro'yxatdan o'tib, bosqichma-bosqich profilingizni to'ldirasiz."
}, {
  q: "Shikoyat qanday yuboriladi?",
  a: "Usta profilida yoki buyurtma sahifasida shikoyat tugmasi orqali murojaat qoldirishingiz mumkin."
}];
export default function SupportPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  async function submit() {
    if (!user) {
      show('info', 'Murojaat yuborish uchun tizimga kiring');
      return;
    }
    setSending(true);
    await supportService.create(user.id, `${user.firstName} ${user.lastName}`, subject, message);
    show('success', "Murojaatingiz qabul qilindi, tez orada javob beramiz");
    setSubject('');
    setMessage('');
    setSending(false);
  }
  return <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><LifeBuoy className="h-6 w-6" /></span>
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--color-navy)]">Yordam markazi</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Savollaringiz bo'lsa, quyidan javob toping yoki bizga murojaat qoldiring.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {faqs.map(f => <details key={f.q} className="group rounded-2xl border border-[var(--color-border)] bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--color-navy)]">{f.q}</summary>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{f.a}</p>
            </details>)}
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-sm text-[var(--color-muted)]">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +998 71 200 00 01</p>
            <p className="mt-2 flex items-center gap-2"><Mail className="h-4 w-4" /> info@ustachi.uz</p>
            <a href={appConfig.telegramBotUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-[var(--color-primary)]"><SendIcon className="h-4 w-4" /> Telegram orqali yozing</a>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h3 className="font-bold text-[var(--color-navy)]">Murojaat yuborish</h3>
          <div className="mt-4 space-y-4">
            <Input label="Mavzu" placeholder="Muammoingizni qisqacha yozing" value={subject} onChange={e => setSubject(e.target.value)} />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Xabar</label>
              <textarea rows={5} className="w-full rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 text-sm focus-ring" value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <Button fullWidth disabled={!subject || !message} loading={sending} onClick={submit}>Yuborish</Button>
          </div>
        </div>
      </div>
    </div>;
}
