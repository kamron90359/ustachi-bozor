import { NavLink } from 'react-router-dom';
import { Home, Search, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore } from '@/store/languageStore';
import { cn } from '@/utils/cn';
const roleHome = {
  customer: '/customer',
  master: '/master',
  admin: '/admin'
};
export default function MobileBottomNav() {
  const {
    user
  } = useAuthStore();
  const {
    t
  } = useLanguageStore();
  const profileTarget = user ? roleHome[user.role] : '/login';
  const items = [{
    to: '/',
    label: t('nav.home'),
    icon: Home,
    end: true
  }, {
    to: '/masters',
    label: t('nav.search'),
    icon: Search
  }, {
    to: profileTarget,
    label: t('nav.profile'),
    icon: UserIcon
  }];
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 backdrop-blur lg:hidden" style={{
    paddingBottom: 'env(safe-area-inset-bottom)'
  }} aria-label={t('nav.home')}>
      <div className="grid grid-cols-3">
        {items.map(item => <NavLink key={item.label} to={item.to} end={item.end} className={({ isActive }) => cn('flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-[var(--color-muted)] transition-colors focus-ring', isActive && 'text-[var(--color-primary)]')}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>)}
      </div>
    </nav>;
}
