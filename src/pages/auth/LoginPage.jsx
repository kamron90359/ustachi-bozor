import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { useLanguageStore } from '@/store/languageStore';
const roleHome = {
  customer: '/customer',
  master: '/master',
  admin: '/admin'
};
export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const {
    t
  } = useLanguageStore();
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(identifier, password);
      show('success', `${t('login.welcome')}, ${user.firstName}!`);
      navigate(roleHome[user.role]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setLoading(false);
    }
  }
  return <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card-lg)] sm:p-8">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-xl font-extrabold text-[var(--color-navy)]">{t('login.title')}</h1>
        <p className="mt-1 text-center text-sm text-[var(--color-muted)]">{t('login.subtitle')}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label={t('login.identifier')} placeholder="customer@test.uz" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
          <Input label={t('login.password')} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <div className="flex justify-end">
            <button type="button" className="text-xs font-semibold text-[var(--color-primary)]">{t('login.forgot')}</button>
          </div>
          <Button type="submit" fullWidth icon={<LogIn className="h-4 w-4" />} loading={loading}>{t('auth.login')}</Button>
        </form>

        <div className="mt-5 rounded-xl bg-[var(--color-bg)] p-3 text-xs text-[var(--color-muted)]">
          <p className="font-semibold text-[var(--color-navy)]">{t('login.testAccounts')}</p>
          <p>{t('login.testCustomer')}: customer@test.uz</p>
          <p>{t('login.testMaster')}: master@test.uz</p>
          <p>{t('login.testAdmin')}: admin@test.uz</p>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          {t('login.noAccount')} <Link to="/register" className="font-semibold text-[var(--color-primary)]">{t('login.register')}</Link>
        </p>
      </div>
    </div>;
}
