import { cn } from '@/utils/cn';
const config = {
  available: {
    label: 'Hozir mavjud',
    dot: 'bg-[var(--color-success)]',
    text: 'text-[var(--color-success)]'
  },
  busy: {
    label: 'Band',
    dot: 'bg-[var(--color-warning)]',
    text: 'text-[var(--color-warning)]'
  },
  offline: {
    label: 'Offline',
    dot: 'bg-[var(--color-muted)]',
    text: 'text-[var(--color-muted)]'
  }
};
export default function AvailabilityDot({
  status,
  className
}) {
  const c = config[status];
  return <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold', c.text, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>;
}
