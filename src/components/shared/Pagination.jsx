import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
export default function Pagination({
  page,
  totalPages,
  onChange
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({
    length: totalPages
  }, (_, i) => i + 1).slice(0, 6);
  return <nav className="flex items-center justify-center gap-1" aria-label="Sahifalash">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-navy)] disabled:opacity-40 focus-ring" aria-label="Oldingi">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map(p => <button key={p} onClick={() => onChange(p)} className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold focus-ring', p === page ? 'bg-[var(--color-primary)] text-white' : 'border border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:bg-[var(--color-bg)]')}>
          {p}
        </button>)}
      {totalPages > 6 && <span className="px-1 text-[var(--color-muted)]">...</span>}
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-navy)] disabled:opacity-40 focus-ring" aria-label="Keyingi">
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>;
}
