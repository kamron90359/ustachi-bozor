import PhoneMockup from './PhoneMockup';
import GooglePlayButton from './GooglePlayButton';
import AppStoreButton from './AppStoreButton';
import QRCodeCard from './QRCodeCard';
import { appConfig } from '@/config/app';
export default function AppDownloadBanner({
  compact
}) {
  return <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary-light)] to-white p-5 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <h3 className="text-xl font-extrabold text-[var(--color-navy)]">Ilovani yuklab oling</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Ustachi.uz ilovasi bilan xizmat topish endi yanada oson va qulay!
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <GooglePlayButton />
            <AppStoreButton />
          </div>
          {!compact && <div className="mt-4">
              <QRCodeCard value={appConfig.appLandingUrl} title="QR kod bilan yuklab oling" description="Telefoningiz bilan skanerlang" />
            </div>}
        </div>
        {!compact && <div className="mx-auto flex shrink-0 items-end gap-3 pt-2 md:mx-0">
            <PhoneMockup screen="orders" tilt="left" className="hidden w-[100px] translate-y-3 opacity-90 sm:block" />
            <PhoneMockup screen="home" tilt="none" className="w-[120px]" />
            <PhoneMockup screen="search" tilt="right" className="hidden w-[100px] translate-y-3 opacity-90 sm:block" />
          </div>}
      </div>
    </div>;
}
