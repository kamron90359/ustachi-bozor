import { create } from 'zustand';
import { translations } from '@/i18n/translations';
const STORAGE_KEY = 'ustachi:lang';
function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
  } catch {
    // ignore
  }
  return 'uz';
}
export const useLanguageStore = create((set, get) => ({
  lang: getInitialLang(),
  setLang: l => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {/* ignore */}
    set({
      lang: l
    });
  },
  t: key => {
    const {
      lang
    } = get();
    return translations[lang]?.[key] ?? translations.uz[key] ?? key;
  }
}));
