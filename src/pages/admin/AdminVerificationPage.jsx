import { useEffect, useState } from 'react';
import { Check, X, MessageCircleQuestion, MapPin, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';
import Rating from '@/components/shared/Rating';
import EmptyState from '@/components/shared/EmptyState';
import { db } from '@/services/db';
import { notificationService } from '@/services/notificationService';
import { useToastStore } from '@/store/toastStore';
export default function AdminVerificationPage() {
  const {
    show
  } = useToastStore();
  const [pending, setPending] = useState([]);
  function load() {
    setPending(db.getMasters().filter(m => !m.verified && m.published));
  }
  useEffect(load, []);
  function verify(m, approve) {
    const list = db.getMasters().map(x => x.id === m.id ? {
      ...x,
      verified: approve
    } : x);
    db.setMasters(list);
    notificationService.push(m.userId, approve ? "Profilingiz tasdiqlandi! Endi VERIFIED belgisiga egasiz." : "Verifikatsiya so'rovingiz rad etildi.", 'system');
    show('success', approve ? 'Usta tasdiqlandi' : "So'rov rad etildi");
    load();
  }
  function requestInfo(m) {
    notificationService.push(m.userId, "Qo'shimcha ma'lumot talab qilinadi", 'system', "Verifikatsiya uchun profilingizga qo'shimcha hujjat yoki portfolio qo'shishingiz kerak.");
    show('info', "Qo'shimcha ma'lumot so'raldi");
  }
  if (pending.length === 0) return <EmptyState title="Verifikatsiya so'rovlari yo'q" />;
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Verifikatsiya markazi</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {pending.map(m => {
        const user = db.getUsers().find(u => u.id === m.userId);
        return <div key={m.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex items-center gap-3">
                <img src={m.avatar} className="h-14 w-14 rounded-xl object-cover" alt="" />
                <div>
                  <p className="font-bold text-[var(--color-navy)]">{m.firstName} {m.lastName}</p>
                  <p className="text-sm text-[var(--color-muted)]">{m.profession}</p>
                  <Rating value={m.rating} count={m.reviewCount} size={12} />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--color-muted)]">
                <p>Telefon: {user?.phone ?? '—'}</p>
                <p className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {m.experience} yillik tajriba</p>
                <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {m.region}</p>
                <p>Topshirilgan: {new Date(m.createdAt).toLocaleDateString('uz-UZ')}</p>
              </div>
              {m.portfolio.length > 0 && <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {m.portfolio.slice(0, 4).map(p => <img key={p.id} src={p.image} alt="" className="h-14 w-full rounded-lg object-cover" />)}
                </div>}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" fullWidth icon={<Check className="h-4 w-4" />} onClick={() => verify(m, true)}>Approve</Button>
                <Button size="sm" variant="outline" fullWidth icon={<X className="h-4 w-4" />} onClick={() => verify(m, false)}>Reject</Button>
                <Button size="sm" variant="ghost" fullWidth icon={<MessageCircleQuestion className="h-4 w-4" />} onClick={() => requestInfo(m)}>Ma'lumot so'rash</Button>
              </div>
            </div>;
      })}
      </div>
    </div>;
}
