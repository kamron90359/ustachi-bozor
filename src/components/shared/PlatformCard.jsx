export default function PlatformCard({
  icon: Icon,
  title,
  description
}) {
  return <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-lg)]">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><Icon className="h-6 w-6" /></span>
      <p className="mt-3 font-bold text-[var(--color-navy)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
    </div>;
}
