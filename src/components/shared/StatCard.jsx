export default function StatCard({
  icon: Icon,
  value,
  label,
  tone = 'primary'
}) {
  const toneMap = {
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    error: 'bg-[var(--color-error-light)] text-[var(--color-error)]'
  };
  return <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)]">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneMap[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xl font-extrabold text-[var(--color-navy)]">{value}</p>
        <p className="truncate text-xs text-[var(--color-muted)]">{label}</p>
      </div>
    </div>;
}
