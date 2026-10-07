import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, LogOut, LayoutDashboard, User as UserIcon, Smartphone, Send } from 'lucide-react';
import Logo from './Logo';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';
const roleHome = {
  customer: '/customer',
  master: '/master',
  admin: '/admin'
};
export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    user,
    logout
  } = useAuthStore();
  const {
    t
  } = useLanguageStore();
  const navigate = useNavigate();
  const navLinks = [{
    to: '/masters',
    label: t('nav.masters')
  }, {
    to: '/categories',
    label: t('nav.categories')
  }, {
    to: '/how-it-works',
    label: t('nav.howItWorks')
  }, {
    to: '/become-master',
    label: t('nav.becomeMaster')
  }];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open, and allow closing with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);
  return <>
    <header className={cn('sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow', scrolled ? 'border-[var(--color-border)] shadow-sm' : 'border-transparent')}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map(l => <NavLink key={l.to} to={l.to} className={({
          isActive
        }) => cn('rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-navy)]/80 transition-colors hover:bg-[var(--color-bg)] focus-ring', isActive && 'text-[var(--color-primary)]')}>
              {l.label}
            </NavLink>)}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          {!user ? <>
              <Button variant="outline" size="md" onClick={() => navigate('/login')}>{t('auth.login')}</Button>
              <Button variant="primary" size="md" onClick={() => navigate('/register')}>{t('auth.register')}</Button>
            </> : <div className="relative">
              <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] py-1.5 pl-1.5 pr-3 hover:bg-[var(--color-bg)] focus-ring">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-xs font-bold text-[var(--color-primary)]">
                  {user.firstName[0]}
                </span>
                <span className="text-sm font-semibold">{user.firstName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[var(--color-muted)]" />
              </button>
              {menuOpen && <div className="absolute right-0 top-12 w-56 rounded-xl border border-[var(--color-border)] bg-white p-1.5 shadow-lg">
                  <Link to={roleHome[user.role]} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--color-bg)]">
                    <LayoutDashboard className="h-4 w-4" /> {t('nav.dashboard')}
                  </Link>
                  <Link to={`${roleHome[user.role]}/profile`} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--color-bg)]">
                    <UserIcon className="h-4 w-4" /> {t('nav.profile')}
                  </Link>
                  <button onClick={() => {
              logout();
              setMenuOpen(false);
              navigate('/');
            }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)]">
                    <LogOut className="h-4 w-4" /> {t('nav.logout')}
                  </button>
                </div>}
            </div>}
        </div>

        {/* Mobile: notification + hamburger only */}
        <div className="flex items-center gap-1 lg:hidden">
          {user && <button className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[var(--color-bg)] focus-ring" aria-label={t('nav.notifications')}>
              <Bell className="h-5 w-5 text-[var(--color-navy)]" />
            </button>}
          <button className="flex h-10 w-10 items-center justify-center rounded-lg focus-ring" onClick={() => setOpen(true)} aria-label={t('nav.menu')}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>

    {open && createPortal(<div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] animate-slide-in-right flex-col overflow-y-auto bg-white p-5 shadow-xl" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label={t('nav.close')} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <LanguageSwitcher variant="mobile" />
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-bg)]">{t('nav.home')}</Link>
              {navLinks.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-bg)]">
                  {l.label}
                </Link>)}
            </nav>

            <div className="mt-4 flex flex-col gap-1 border-t border-[var(--color-border)] pt-4">
              <a href={appConfig.appLandingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-bg)]">
                <Smartphone className="h-4 w-4 text-[var(--color-primary)]" /> {t('nav.downloadApp')}
              </a>
              <a href={appConfig.telegramBotUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-bg)]">
                <Send className="h-4 w-4 text-[#229ED9]" /> {t('nav.telegramBot')}
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-border)] pt-6">
              {!user ? <>
                  <Button variant="outline" onClick={() => {
              setOpen(false);
              navigate('/login');
            }}>{t('auth.login')}</Button>
                  <Button variant="primary" onClick={() => {
              setOpen(false);
              navigate('/register');
            }}>{t('auth.register')}</Button>
                </> : <>
                  <Button variant="outline" icon={<LayoutDashboard className="h-4 w-4" />} onClick={() => {
              setOpen(false);
              navigate(roleHome[user.role]);
            }}>{t('nav.dashboard')}</Button>
                  <Button variant="ghost" icon={<LogOut className="h-4 w-4" />} onClick={() => {
              logout();
              setOpen(false);
              navigate('/');
            }}>{t('nav.logout')}</Button>
                </>}
            </div>
          </div>
        </div>, document.body)}
  </>;
}
