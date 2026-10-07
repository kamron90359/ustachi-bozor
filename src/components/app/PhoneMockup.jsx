import { Search, Star, Bell, MapPin, Heart, Send } from 'lucide-react';
import { cn } from '@/utils/cn';
function HomeScreen() {
  return <div className="flex h-full flex-col bg-[var(--color-bg)] p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-extrabold text-[var(--color-navy)]">USTACHI<span className="text-[var(--color-primary)]">.UZ</span></span>
        <Bell className="h-3 w-3 text-[var(--color-navy)]" />
      </div>
      <div className="mt-2 rounded-lg bg-[var(--color-primary)] p-2">
        <p className="text-[8px] font-bold text-white">Ustani tez toping</p>
        <div className="mt-1.5 h-4 rounded bg-white/90" />
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1">
        {[0, 1, 2, 3].map(i => <div key={i} className="h-6 rounded-md bg-white" />)}
      </div>
      <div className="mt-2 space-y-1.5">
        {[0, 1].map(i => <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5">
            <div className="h-5 w-5 shrink-0 rounded bg-[var(--color-primary-light)]" />
            <div className="flex-1 space-y-1"><div className="h-1.5 w-3/4 rounded bg-[var(--color-border)]" /><div className="h-1.5 w-1/2 rounded bg-[var(--color-border)]" /></div>
          </div>)}
      </div>
    </div>;
}
function SearchScreen() {
  return <div className="flex h-full flex-col bg-[var(--color-bg)] p-2.5">
      <div className="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5"><Search className="h-2.5 w-2.5 text-[var(--color-muted)]" /><div className="h-1.5 w-16 rounded bg-[var(--color-border)]" /></div>
      <div className="mt-2 flex gap-1"><div className="h-4 w-8 rounded-full bg-[var(--color-primary)]" /><div className="h-4 w-8 rounded-full bg-white" /><div className="h-4 w-8 rounded-full bg-white" /></div>
      <div className="mt-2 space-y-1.5">
        {[0, 1, 2].map(i => <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5">
            <div className="h-6 w-6 shrink-0 rounded-md bg-[var(--color-primary-light)]" />
            <div className="flex-1 space-y-1"><div className="h-1.5 w-2/3 rounded bg-[var(--color-border)]" /><div className="flex items-center gap-0.5"><Star className="h-1.5 w-1.5 fill-[var(--color-warning)] text-[var(--color-warning)]" /><div className="h-1.5 w-6 rounded bg-[var(--color-border)]" /></div></div>
          </div>)}
      </div>
    </div>;
}
function ProfileScreen() {
  return <div className="flex h-full flex-col bg-[var(--color-bg)] p-2.5">
      <div className="flex items-center gap-2 rounded-lg bg-white p-2">
        <div className="h-8 w-8 rounded-full bg-[var(--color-primary-light)]" />
        <div className="space-y-1"><div className="h-1.5 w-14 rounded bg-[var(--color-navy)]/70" /><div className="flex items-center gap-0.5"><Star className="h-1.5 w-1.5 fill-[var(--color-warning)] text-[var(--color-warning)]" /><div className="h-1.5 w-8 rounded bg-[var(--color-border)]" /></div></div>
      </div>
      <div className="mt-2 flex gap-1"><div className="h-4 flex-1 rounded bg-white" /><div className="h-4 flex-1 rounded bg-[var(--color-primary)]" /></div>
      <div className="mt-2 grid grid-cols-3 gap-1">{[0, 1, 2].map(i => <div key={i} className="aspect-square rounded-md bg-white" />)}</div>
      <div className="mt-auto flex justify-center gap-3 pb-1">
        <MapPin className="h-2.5 w-2.5 text-[var(--color-muted)]" />
        <Heart className="h-2.5 w-2.5 text-[var(--color-error)]" />
      </div>
    </div>;
}
function OrdersScreen() {
  return <div className="flex h-full flex-col bg-[var(--color-bg)] p-2.5">
      <div className="text-[8px] font-bold text-[var(--color-navy)]">Buyurtmalarim</div>
      <div className="mt-2 space-y-1.5">
        {[0, 1, 2].map(i => <div key={i} className="rounded-lg bg-white p-1.5">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-12 rounded bg-[var(--color-navy)]/60" />
              <div className="h-3 w-8 rounded-full bg-[var(--color-success-light)]" />
            </div>
            <div className="mt-1 h-1.5 w-2/3 rounded bg-[var(--color-border)]" />
          </div>)}
      </div>
    </div>;
}
function MessagesScreen() {
  return <div className="flex h-full flex-col bg-[var(--color-bg)] p-2.5">
      <div className="text-[8px] font-bold text-[var(--color-navy)]">Xabarlar</div>
      <div className="mt-2 flex-1 space-y-1.5">
        <div className="ml-auto w-2/3 rounded-xl rounded-tr-sm bg-[var(--color-primary)] p-1.5"><div className="h-1.5 w-full rounded bg-white/40" /></div>
        <div className="w-2/3 rounded-xl rounded-tl-sm bg-white p-1.5"><div className="h-1.5 w-full rounded bg-[var(--color-border)]" /></div>
      </div>
      <div className="mt-1 flex items-center gap-1 rounded-full bg-white px-2 py-1"><div className="h-1.5 flex-1 rounded bg-[var(--color-border)]" /><Send className="h-2.5 w-2.5 text-[var(--color-primary)]" /></div>
    </div>;
}
const screens = {
  home: HomeScreen,
  search: SearchScreen,
  profile: ProfileScreen,
  orders: OrdersScreen,
  messages: MessagesScreen
};
export default function PhoneMockup({
  screen = 'home',
  className,
  tilt
}) {
  const ScreenComp = screens[screen];
  return <div className={cn('relative w-[150px] shrink-0 rounded-[26px] border-[6px] border-[var(--color-navy)] bg-[var(--color-navy)] shadow-xl', tilt === 'left' && '-rotate-6', tilt === 'right' && 'rotate-6', className)} style={{
    aspectRatio: '9 / 19'
  }}>
      <div className="absolute left-1/2 top-1 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-[var(--color-navy)]" />
      <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
        <ScreenComp />
      </div>
    </div>;
}
