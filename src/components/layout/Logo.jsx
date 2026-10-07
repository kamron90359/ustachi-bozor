import { Link } from 'react-router-dom';
import { Hammer } from 'lucide-react';
export default function Logo() {
  return <Link to="/" className="flex items-center gap-2 focus-ring rounded-lg">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
        <Hammer className="h-5 w-5" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-[var(--color-navy)]">
        USTACHI<span className="text-[var(--color-primary)]">.UZ</span>
      </span>
    </Link>;
}
