import { Send } from 'lucide-react';
import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';
export default function TelegramButton({
  className,
  label = "Botga o'tish"
}) {
  return <a href={appConfig.telegramBotUrl} target="_blank" rel="noopener noreferrer" className={cn('inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] focus-ring', className)}>
      <Send className="h-4 w-4" />
      {label}
    </a>;
}
