import { useNavigate } from 'react-router-dom';
import { Wallet, Users, Clock, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
const benefits = [{
  icon: Users,
  title: 'Yangi mijozlar',
  desc: 'Minglab mijozlarga o\'z xizmatingizni taklif qiling.'
}, {
  icon: Wallet,
  title: "Ko'proq daromad",
  desc: 'Buyurtmalar sonini oshirib, daromadingizni ko\'paytiring.'
}, {
  icon: Clock,
  title: "O'zingiz belgilang",
  desc: 'Ish vaqtingizni va narxlaringizni o\'zingiz belgilang.'
}, {
  icon: ShieldCheck,
  title: 'Ishonchli platforma',
  desc: 'Verifikatsiya orqali mijozlar ishonchini qozoning.'
}];
export default function BecomeMasterPage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuthStore();
  return <div className="mx-auto max-w-[1100px] px-4 py-14 text-center sm:px-6">
      <h1 className="text-3xl font-extrabold text-[var(--color-navy)] sm:text-4xl">Usta sifatida ro'yxatdan o'ting</h1>
      <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted)]">O'z ustachilik xizmatlaringizni platformamizda joylashtiring va yangi mijozlarga ega bo'ling.</p>
      <Button size="lg" className="mt-6" onClick={() => navigate(user ? '/master/onboarding' : '/register/master')}>Usta sifatida boshlash</Button>

      <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(b => <div key={b.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><b.icon className="h-5 w-5" /></span>
            <p className="mt-3 font-bold text-[var(--color-navy)]">{b.title}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{b.desc}</p>
          </div>)}
      </div>
    </div>;
}
