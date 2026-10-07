import { BadgeCheck } from 'lucide-react';
export default function VerifiedBadge({
  compact
}) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-light)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-primary)]">
      <BadgeCheck className="h-3.5 w-3.5" />
      {!compact && 'VERIFIED'}
    </span>;
}
