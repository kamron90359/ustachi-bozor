import { useEffect, useState } from 'react';
import { Crown, Check } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { db } from '@/services/db';
import { masterService } from '@/services/masterService';
import { useToastStore } from '@/store/toastStore';
const plans = [{
  id: 'free',
  name: 'Free',
  price: "Bepul",
  features: ["Standart profil", "Cheklangan portfolio", 'Oddiy qidiruv natijasi']
}, {
  id: 'premium',
  name: 'Premium',
  price: '199 000 so\'m/oy',
  features: ["Kengaytirilgan portfolio", 'Statistika paneli', "Qidiruvda yuqoriroq o'rin"]
}, {
  id: 'top',
  name: 'Top usta',
  price: "349 000 so'm/oy",
  features: ["'Top usta' belgisi", "Qidiruv boshida ko'rinadi", 'Premium + barcha imkoniyatlar']
}];
export default function AdminPremiumPage() {
  const {
    show
  } = useToastStore();
  const [masters, setMasters] = useState([]);
  function load() {
    setMasters(db.getMasters());
  }
  useEffect(load, []);
  async function setPlan(m, plan) {
    await masterService.updateMaster(m.id, {
      plan,
      topMaster: plan === 'top'
    });
    show('success', `${m.firstName} uchun ${plan} tarif faollashtirildi`);
    load();
  }
  const counts = {
    free: masters.filter(m => m.plan === 'free').length,
    premium: masters.filter(m => m.plan === 'premium').length,
    top: masters.filter(m => m.plan === 'top').length
  };
  return <div>
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Premium / Top usta</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">Monetizatsiya arxitekturasi — to'lov tizimlari (Click, Payme, Uzum, Stripe) ulanguncha admin qo'lda tarif belgilaydi.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map(p => <div key={p.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[var(--color-navy)]">{p.name}</p>
              {p.id !== 'free' && <Crown className="h-4 w-4 text-[var(--color-warning)]" />}
            </div>
            <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{p.price}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-[var(--color-muted)]">
              {p.features.map(f => <li key={f} className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[var(--color-success)]" /> {f}</li>)}
            </ul>
            <p className="mt-4 text-2xl font-extrabold text-[var(--color-navy)]">{counts[p.id]}</p>
            <p className="text-xs text-[var(--color-muted)]">faol usta</p>
          </div>)}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-left text-xs font-semibold text-[var(--color-muted)]"><th className="px-4 py-3">Usta</th><th className="px-4 py-3">Joriy tarif</th><th className="px-4 py-3">Amallar</th></tr></thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {masters.map(m => <tr key={m.id}>
                <td className="flex items-center gap-2 px-4 py-3 font-medium text-[var(--color-navy)]"><img src={m.avatar} className="h-8 w-8 rounded-full object-cover" alt="" /> {m.firstName} {m.lastName}</td>
                <td className="px-4 py-3"><Badge tone={m.plan === 'top' ? 'warning' : m.plan === 'premium' ? 'primary' : 'neutral'}>{m.plan}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {plans.map(p => <Button key={p.id} size="sm" variant={m.plan === p.id ? 'primary' : 'outline'} onClick={() => setPlan(m, p.id)}>{p.name}</Button>)}
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}
