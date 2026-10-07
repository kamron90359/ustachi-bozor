import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { useToastStore } from '@/store/toastStore';
import { cn } from '@/utils/cn';
export default function MasterRegisterPage() {
  const [method, setMethod] = useState('phone');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setUser
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authService.registerMaster({
        firstName,
        lastName,
        phone: method === 'phone' ? phone : undefined,
        email: method === 'email' ? email : undefined
      });
      setUser(user);
      show('success', "Endi profilingizni to'ldiring");
      navigate('/master/onboarding');
    } finally {
      setLoading(false);
    }
  }
  return <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card-lg)] sm:p-8">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-xl font-extrabold text-[var(--color-navy)]">Usta sifatida ro'yxatdan o'tish</h1>
        <p className="mt-1 text-center text-sm text-[var(--color-muted)]">Avval shaxsiy ma'lumotlaringizni kiriting</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label="Ism" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <Input label="Familiya" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-1">
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors', method === 'phone' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted)]')}
            >
              <Phone className="h-3.5 w-3.5" /> Telefon
            </button>
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors', method === 'email' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted)]')}
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
          </div>
          {method === 'phone' ? (
            <Input label="Telefon" placeholder="+998 90 123 45 67" value={phone} onChange={e => setPhone(e.target.value)} required />
          ) : (
            <Input label="Email manzil" type="email" placeholder="siz@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          )}
          <Button type="submit" fullWidth loading={loading}>Davom etish</Button>
        </form>
      </div>
    </div>;
}
