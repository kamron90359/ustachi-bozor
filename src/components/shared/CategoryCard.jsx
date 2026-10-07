import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
export default function CategoryCard({
  category
}) {
  const Icon = Icons[category.icon] || Icons.Wrench;
  return <Link to={`/categories/${category.slug}`} className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-5 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-card-lg)] focus-ring">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs font-semibold leading-tight text-[var(--color-navy)]">{category.name}</span>
    </Link>;
}
