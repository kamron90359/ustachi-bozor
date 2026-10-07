import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';
import { cn } from '@/utils/cn';
const config = {
  success: {
    icon: CheckCircle2,
    cls: 'border-[var(--color-success)] text-[var(--color-success)]'
  },
  error: {
    icon: XCircle,
    cls: 'border-[var(--color-error)] text-[var(--color-error)]'
  },
  info: {
    icon: Info,
    cls: 'border-[var(--color-primary)] text-[var(--color-primary)]'
  },
  warning: {
    icon: AlertTriangle,
    cls: 'border-[var(--color-warning)] text-[var(--color-warning)]'
  }
};
export default function ToastContainer() {
  const {
    toasts,
    dismiss
  } = useToastStore();
  return <div className="pointer-events-none fixed top-4 right-4 left-4 z-[100] flex flex-col items-end gap-2 sm:left-auto">
      {toasts.map(t => {
      const C = config[t.type];
      const Icon = C.icon;
      return <div key={t.id} className={cn('animate-toast-in pointer-events-auto flex w-full max-w-sm items-start gap-2 rounded-xl border-l-4 bg-white px-4 py-3 shadow-lg', C.cls)}>
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="flex-1 text-sm font-medium text-[var(--color-navy)]">{t.message}</p>
            <button onClick={() => dismiss(t.id)} aria-label="Yopish" className="text-[var(--color-muted)]">
              <X className="h-4 w-4" />
            </button>
          </div>;
    })}
    </div>;
}
