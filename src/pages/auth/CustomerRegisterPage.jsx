import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Phone, Mail } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { authService } from '@/services/authService';
import { cn } from '@/utils/cn';
const stepLabels = ['Aloqa', 'Tasdiqlash', "Ma'lumotlar", 'Yakunlash'];
export default function CustomerRegisterPage() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setUser
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const contact = method === 'phone' ? phone : email;
  const step1Valid = method === 'phone' ? phone.length >= 9 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  async function finish() {
    setLoading(true);
    try {
      const user = await authService.registerCustomer({
        firstName,
        lastName,
        phone: method === 'phone' ? phone : undefined,
        email: method === 'email' ? email : undefined,
        password
      });
      setUser(user);
      show('success', 'Ro\'yxatdan muvaffaqiyatli o\'tdingiz!');
      navigate('/customer');
    } finally {
      setLoading(false);
    }
  }
  return <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card-lg)] sm:p-8">
        <div className="flex justify-center"><Logo /></div>

        <div className="mt-6 flex items-center justify-between">
          {stepLabels.map((label, i) => <div key={label} className="flex flex-1 items-center">
              <div className={cn('flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold', i + 1 <= step ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg)] text-[var(--color-muted)]')}>
                {i + 1 < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < stepLabels.length - 1 && <div className={cn('h-0.5 flex-1', i + 1 < step ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]')} />}
            </div>)}
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-[var(--color-muted)]">{stepLabels[step - 1]}</p>

        <div className="mt-6 space-y-4">
          {step === 1 && <>
              <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-1">
                <button type="button" onClick={() => setMethod('phone')} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors', method === 'phone' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted)]')}>
                  <Phone className="h-3.5 w-3.5" /> Telefon
                </button>
                <button type="button" onClick={() => setMethod('email')} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors', method === 'email' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted)]')}>
                  <Mail className="h-3.5 w-3.5" /> Email
                </button>
              </div>
              {method === 'phone' ? <Input label="Telefon raqam" placeholder="+998 90 123 45 67" value={phone} onChange={e => setPhone(e.target.value)} /> : <Input label="Email manzil" type="email" placeholder="siz@example.com" value={email} onChange={e => setEmail(e.target.value)} />}
              <Button fullWidth disabled={!step1Valid} onClick={() => setStep(2)}>Davom etish</Button>
            </>}
          {step === 2 && <>
              <p className="text-sm text-[var(--color-muted)]">{contact} manziliga yuborilgan kodni kiriting (demo: 1234)</p>
              <Input label="Tasdiqlash kodi" placeholder="1234" value={code} onChange={e => setCode(e.target.value)} />
              <Button fullWidth disabled={code.length < 4} onClick={() => setStep(3)}>Tasdiqlash</Button>
            </>}
          {step === 3 && <>
              <Input label="Ism" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <Input label="Familiya" value={lastName} onChange={e => setLastName(e.target.value)} />
              <Input label="Parol" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <Button fullWidth disabled={!firstName || !lastName || password.length < 4} onClick={() => setStep(4)}>Davom etish</Button>
            </>}
          {step === 4 && <div className="text-center">
              <p className="text-sm text-[var(--color-muted)]">Ma'lumotlaringiz tayyor. Ro'yxatdan o'tishni yakunlang.</p>
              <div className="mt-4 space-y-1 rounded-xl bg-[var(--color-bg)] p-3 text-left text-sm">
                <p><span className="text-[var(--color-muted)]">Ism:</span> {firstName} {lastName}</p>
                <p><span className="text-[var(--color-muted)]">{method === 'phone' ? 'Telefon' : 'Email'}:</span> {contact}</p>
              </div>
              <Button fullWidth className="mt-4" loading={loading} onClick={finish}>Ro'yxatdan o'tishni yakunlash</Button>
            </div>}
        </div>
      </div>
    </div>;
}
