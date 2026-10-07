import { Link } from 'react-router-dom';
import { User, Wrench, ArrowRight } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { useLanguageStore } from '@/store/languageStore';
export default function RegisterChoicePage() {
  const {
    t
  } = useLanguageStore();
  return <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-2xl font-extrabold text-[var(--color-navy)]">{t('register.title')}</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{t('register.subtitle')}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link to="/register/customer" className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-lg)] focus-ring">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><User className="h-6 w-6" /></span>
            <p className="font-bold text-[var(--color-navy)]">{t('register.asCustomer')}</p>
            <p className="text-xs text-[var(--color-muted)]">{t('register.asCustomerDesc')}</p>
            <ArrowRight className="h-4 w-4 text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link to="/register/master" className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-lg)] focus-ring">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><Wrench className="h-6 w-6" /></span>
            <p className="font-bold text-[var(--color-navy)]">{t('register.asMaster')}</p>
            <p className="text-xs text-[var(--color-muted)]">{t('register.asMasterDesc')}</p>
            <ArrowRight className="h-4 w-4 text-[var(--color-primary)] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          {t('register.haveAccount')} <Link to="/login" className="font-semibold text-[var(--color-primary)]">{t('auth.login')}</Link>
        </p>
      </div>
    </div>;
}
