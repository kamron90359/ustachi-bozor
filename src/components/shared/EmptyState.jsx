import { Inbox } from 'lucide-react';
export default function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-muted)]">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <p className="font-semibold text-[var(--color-navy)]">{title}</p>
      {description && <p className="max-w-sm text-sm text-[var(--color-muted)]">{description}</p>}
      {action}
    </div>;
}
