import { useState } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { languageNames, languageShort } from '@/i18n/translations';
import { cn } from '@/utils/cn';
const options = ['uz', 'ru', 'en'];
export default function LanguageSwitcher({
  variant = 'desktop'
}) {
  const {
    lang,
    setLang
  } = useLanguageStore();
  const [open, setOpen] = useState(false);
  if (variant === 'mobile') {
    return <div className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] p-1">
        {options.map(l => <button key={l} onClick={() => setLang(l)} className={cn('flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors', lang === l ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
            {languageShort[l]}
          </button>)}
      </div>;
  }
  return <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--color-navy)]/80 hover:bg-[var(--color-bg)] focus-ring" aria-label="Tilni tanlash">
        <Globe className="h-3.5 w-3.5" />
        {languageShort[lang]} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-40 rounded-xl border border-[var(--color-border)] bg-white p-1.5 shadow-lg">
            {options.map(l => <button key={l} onClick={() => {
          setLang(l);
          setOpen(false);
        }} className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-[var(--color-bg)]">
                {languageNames[l]}
                {lang === l && <Check className="h-3.5 w-3.5 text-[var(--color-primary)]" />}
              </button>)}
          </div>
        </>}
    </div>;
}
