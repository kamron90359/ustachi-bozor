import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';
export default function GooglePlayButton({
  className
}) {
  return <a href={appConfig.googlePlayUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Play'dan yuklab olish" className={cn('flex items-center gap-2.5 rounded-xl bg-[var(--color-navy)] px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5 focus-ring', className)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.6 2.5c-.4.2-.6.6-.6 1.1v17c0 .5.2.9.6 1.1l9.9-9.6-9.9-9.6Z" fill="#00D2FF" />
        <path d="M13.5 11.1l2.9 2.8-11.1 6.4c-.3.2-.7.2-1 .1l9.2-9.3Z" fill="#00F076" />
        <path d="M13.5 11.1L4.3 1.8c.3-.1.7-.1 1 .1l11.1 6.4-2.9 2.8Z" fill="#EF3E56" />
        <path d="M16.4 13.9l3.4-1.9c.5-.3.5-1 0-1.3l-3.4-2-3 2.4 3 2.8Z" fill="#FBBC04" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-white/70">GET IT ON</span>
        <span className="block text-sm font-bold">Google Play</span>
      </span>
    </a>;
}
