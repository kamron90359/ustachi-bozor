import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, ShoppingBag, Heart, MessageSquare, User as UserIcon, Settings, LogOut, Menu, Bell, Wrench, Image, Clock, Star, BarChart3, Users, ShieldCheck, Grid3x3, FileWarning, LifeBuoy, Crown, Send, Smartphone, CalendarDays, Home } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { cn } from '@/utils/cn';
const customerNav = [{
  to: '/customer',
  label: 'Boshqaruv paneli',
  icon: LayoutDashboard,
  end: true
}, {
  to: '/customer/requests',
  label: "So'rovlar",
  icon: ClipboardList
}, {
  to: '/customer/orders',
  label: 'Buyurtmalar',
  icon: ShoppingBag
}, {
  to: '/customer/favorites',
  label: 'Sevimli ustalar',
  icon: Heart
}, {
  to: '/customer/messages',
  label: 'Xabarlar',
  icon: MessageSquare
}, {
  to: '/customer/notifications',
  label: 'Bildirishnomalar',
  icon: Bell
}, {
  to: '/customer/profile',
  label: 'Profil',
  icon: UserIcon
}, {
  to: '/customer/settings',
  label: 'Sozlamalar',
  icon: Settings
}];
const masterNav = [{
  to: '/master',
  label: 'Boshqaruv paneli',
  icon: LayoutDashboard,
  end: true
}, {
  to: '/master/requests',
  label: "So'rovlar",
  icon: ClipboardList
}, {
  to: '/master/orders',
  label: 'Buyurtmalar',
  icon: ShoppingBag
}, {
  to: '/master/calendar',
  label: 'Kalendar',
  icon: CalendarDays
}, {
  to: '/master/services',
  label: 'Xizmatlar',
  icon: Wrench
}, {
  to: '/master/portfolio',
  label: 'Portfolio',
  icon: Image
}, {
  to: '/master/schedule',
  label: 'Ish vaqti',
  icon: Clock
}, {
  to: '/master/reviews',
  label: 'Sharhlar',
  icon: Star
}, {
  to: '/master/statistics',
  label: 'Statistika',
  icon: BarChart3
}, {
  to: '/master/messages',
  label: 'Xabarlar',
  icon: MessageSquare
}, {
  to: '/master/notifications',
  label: 'Bildirishnomalar',
  icon: Bell
}, {
  to: '/master/profile',
  label: 'Profil',
  icon: UserIcon
}, {
  to: '/master/settings',
  label: 'Sozlamalar',
  icon: Settings
}];
const adminNav = [{
  to: '/admin',
  label: 'Boshqaruv paneli',
  icon: LayoutDashboard,
  end: true
}, {
  to: '/admin/users',
  label: 'Foydalanuvchilar',
  icon: Users
}, {
  to: '/admin/masters',
  label: 'Ustalar',
  icon: Wrench
}, {
  to: '/admin/verification',
  label: 'Verifikatsiya',
  icon: ShieldCheck
}, {
  to: '/admin/orders',
  label: 'Buyurtmalar',
  icon: ShoppingBag
}, {
  to: '/admin/reports',
  label: 'Shikoyatlar',
  icon: FileWarning
}, {
  to: '/admin/categories',
  label: 'Kategoriyalar',
  icon: Grid3x3
}, {
  to: '/admin/reviews',
  label: 'Sharhlar',
  icon: Star
}, {
  to: '/admin/support',
  label: 'Support',
  icon: LifeBuoy
}, {
  to: '/admin/notifications',
  label: 'Bildirishnomalar',
  icon: Bell
}, {
  to: '/admin/statistics',
  label: 'Statistika',
  icon: BarChart3
}, {
  to: '/admin/premium',
  label: 'Premium',
  icon: Crown
}, {
  to: '/admin/telegram',
  label: 'Telegram Bot',
  icon: Send
}, {
  to: '/admin/mobile-app',
  label: 'Mobile App',
  icon: Smartphone
}, {
  to: '/admin/settings',
  label: 'Sozlamalar',
  icon: Settings
}];
const navByRole = {
  customer: customerNav,
  master: masterNav,
  admin: adminNav
};
const customerBottomNav = [{
  to: '/customer',
  label: 'Bosh sahifa',
  icon: Home,
  end: true
}, {
  to: '/customer/orders',
  label: 'Buyurtmalar',
  icon: ShoppingBag
}, {
  to: '/customer/favorites',
  label: 'Sevimlilar',
  icon: Heart
}, {
  to: '/customer/messages',
  label: 'Xabarlar',
  icon: MessageSquare
}, {
  to: '/customer/profile',
  label: 'Profil',
  icon: UserIcon
}];
const masterBottomNav = [{
  to: '/master',
  label: 'Bosh sahifa',
  icon: Home,
  end: true
}, {
  to: '/master/requests',
  label: "So'rovlar",
  icon: ClipboardList
}, {
  to: '/master/orders',
  label: 'Buyurtmalar',
  icon: ShoppingBag
}, {
  to: '/master/messages',
  label: 'Xabarlar',
  icon: MessageSquare
}, {
  to: '/master/profile',
  label: 'Profil',
  icon: UserIcon
}];
function SidebarContent({
  onNavigate
}) {
  const {
    user,
    logout
  } = useAuthStore();
  const navigate = useNavigate();
  if (!user) return null;
  const items = navByRole[user.role];
  return <div className="flex h-full flex-col">
      <div className="border-b border-[var(--color-border)] px-4 py-4">
        <Logo />
      </div>
      <div className="flex items-center gap-2.5 border-b border-[var(--color-border)] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary)]">
          {user.firstName[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--color-navy)]">{user.firstName} {user.lastName}</p>
          <p className="truncate text-xs capitalize text-[var(--color-muted)]">{user.role === 'customer' ? 'Mijoz' : user.role === 'master' ? 'Usta' : 'Super Admin'}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {items.map(item => <NavLink key={item.to} to={item.to} end={item.end} onClick={onNavigate} className={({
        isActive
      }) => cn('flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-navy)]/80 transition-colors hover:bg-[var(--color-bg)] focus-ring', isActive && 'bg-[var(--color-primary-light)] text-[var(--color-primary)]')}>
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>)}
      </nav>
      <div className="border-t border-[var(--color-border)] p-2.5">
        <button onClick={() => {
        logout();
        navigate('/');
      }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-light)] focus-ring">
          <LogOut className="h-4 w-4" /> Chiqish
        </button>
      </div>
    </div>;
}
function MobileBottomDashboardNav({
  role
}) {
  const items = role === 'customer' ? customerBottomNav : masterBottomNav;
  return <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 backdrop-blur lg:hidden" style={{
    paddingBottom: 'env(safe-area-inset-bottom)'
  }} aria-label="Asosiy navigatsiya">
      <div className="grid grid-cols-5">
        {items.map(item => <NavLink key={item.to} to={item.to} end={item.end} className={({
        isActive
      }) => cn('flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-[var(--color-muted)] transition-colors focus-ring', isActive && 'text-[var(--color-primary)]')}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>)}
      </div>
    </nav>;
}
export default function DashboardLayout() {
  const {
    user,
    loading
  } = useAuthStore();
  const {
    items,
    refresh,
    markAllRead
  } = useNotificationStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) refresh(user.id);
  }, [user, refresh]);
  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [loading, user, navigate]);
  if (loading || !user) return null;
  const unread = items.filter(n => !n.read).length;
  const hasBottomNav = user.role === 'customer' || user.role === 'master';
  const notificationsPath = `/${user.role}/notifications`;
  return <div className="flex min-h-screen bg-[var(--color-bg)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-white lg:block">
        <div className="fixed h-screen w-64">
          <SidebarContent />
        </div>
      </aside>

      {drawerOpen && <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-xl">
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-white px-4 sm:px-6">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--color-bg)] lg:hidden focus-ring" onClick={() => setDrawerOpen(true)} aria-label="Menyu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="relative">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--color-bg)] focus-ring" onClick={() => setBellOpen(v => !v)} aria-label="Bildirishnomalar">
              <Bell className="h-5 w-5 text-[var(--color-navy)]" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-[var(--color-error)]" />}
            </button>
            {bellOpen && <div className="absolute right-0 top-11 w-80 max-w-[85vw] rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                  <p className="text-sm font-semibold">Bildirishnomalar</p>
                  {unread > 0 && <button className="text-xs font-medium text-[var(--color-primary)]" onClick={() => markAllRead(user.id)}>Hammasini o'qilgan deb belgilash</button>}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {items.length === 0 ? <p className="px-4 py-6 text-center text-sm text-[var(--color-muted)]">Bildirishnomalar yo'q</p> : items.slice(0, 6).map(n => <div key={n.id} className={cn('border-b border-[var(--color-border)] px-4 py-3 text-sm last:border-0', !n.read && 'bg-[var(--color-primary-light)]/40')}>
                        <p className="font-medium text-[var(--color-navy)]">{n.title}</p>
                        {n.body && <p className="mt-0.5 text-xs text-[var(--color-muted)]">{n.body}</p>}
                      </div>)}
                </div>
                {user.role !== 'admin' && <Link to={notificationsPath} onClick={() => setBellOpen(false)} className="block border-t border-[var(--color-border)] px-4 py-2.5 text-center text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-bg)]">
                    Barchasini ko'rish
                  </Link>}
              </div>}
          </div>
        </header>
        <main className={cn('flex-1 p-4 sm:p-6 lg:p-8', hasBottomNav && 'pb-20 lg:pb-8')}>
          <Outlet />
        </main>
      </div>

      {hasBottomNav && <MobileBottomDashboardNav role={user.role} />}
    </div>;
}
