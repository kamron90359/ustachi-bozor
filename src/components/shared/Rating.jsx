import { Star } from 'lucide-react';
export default function Rating({
  value,
  count,
  size = 14
}) {
  return <span className="inline-flex items-center gap-1 text-sm">
      <Star size={size} className="fill-[var(--color-warning)] text-[var(--color-warning)]" />
      <span className="font-semibold text-[var(--color-navy)]">{value.toFixed(1)}</span>
      {count != null && <span className="text-[var(--color-muted)]">({count})</span>}
    </span>;
}
