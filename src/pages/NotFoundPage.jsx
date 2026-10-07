import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';
export default function NotFoundPage() {
  return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-4 text-center">
      <Logo />
      <p className="text-7xl font-extrabold text-[var(--color-primary)]">404</p>
      <p className="text-lg font-bold text-[var(--color-navy)]">Sahifa topilmadi</p>
      <p className="max-w-sm text-sm text-[var(--color-muted)]">Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.</p>
      <Link to="/"><Button icon={<Home className="h-4 w-4" />}>Bosh sahifaga qaytish</Button></Link>
    </div>;
}
