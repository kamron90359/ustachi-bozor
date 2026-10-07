import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';
export default function AppStoreButton({
  className
}) {
  return <a href={appConfig.appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="App Store'dan yuklab olish" className={cn('flex items-center gap-2.5 rounded-xl bg-[var(--color-navy)] px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5 focus-ring', className)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M17.6 12.3c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-3.2Z" />
        <path d="M15.4 6c.6-.7 1-1.7.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.9-.5 2.5-1.2Z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-white/70">Download on the</span>
        <span className="block text-sm font-bold">App Store</span>
      </span>
    </a>;
}
