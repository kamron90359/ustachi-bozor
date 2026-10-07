import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
export default function ErrorState({
  message = "Ma'lumotlarni yuklashda xatolik yuz berdi.",
  onRetry
}) {
  return <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--color-error-light)] bg-[var(--color-error-light)] px-6 py-14 text-center">
      <AlertTriangle className="h-8 w-8 text-[var(--color-error)]" />
      <p className="font-semibold text-[var(--color-navy)]">{message}</p>
      {onRetry && <Button variant="danger" size="sm" onClick={onRetry}>Qayta urinish</Button>}
    </div>;
}
