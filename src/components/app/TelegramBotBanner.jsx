import { Send } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import TelegramButton from './TelegramButton';
import QRCodeCard from './QRCodeCard';
import { appConfig } from '@/config/app';
export default function TelegramBotBanner({
  compact
}) {
  return <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[#EAF2FF] to-white p-5 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#229ED9] text-white"><Send className="h-5 w-5" /></span>
          <h3 className="mt-3 text-xl font-extrabold text-[var(--color-navy)]">Telegram Botdan foydalaning</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Telegram orqali ustani toping, xizmat turini tanlang va so'rov yuboring — hammasi bir necha bosqichda.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <TelegramButton />
          </div>
          {!compact && <div className="mt-4">
              <QRCodeCard value={appConfig.telegramBotUrl} title="Telegram kamerasi orqali skanerlang" description="Botga tez o'tish uchun" />
            </div>}
        </div>
        {!compact && <div className="mx-auto shrink-0 pt-2 md:mx-0">
            <PhoneMockup screen="messages" className="w-[130px]" />
          </div>}
      </div>
    </div>;
}
