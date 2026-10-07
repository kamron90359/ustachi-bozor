import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Phone, Mail, Clock, Send, ChevronDown } from 'lucide-react';
import { appConfig } from '@/config/app';
import { useLanguageStore } from '@/store/languageStore';
import GooglePlayButton from '@/components/app/GooglePlayButton';
import AppStoreButton from '@/components/app/AppStoreButton';
import { cn } from '@/utils/cn';
function InstagramIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>;
}
function FacebookIcon(props) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.5V21h3.1Z" />
    </svg>;
}
function YoutubeIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>;
}
function useFooterColumns() {
  const {
    t
  } = useLanguageStore();
  return [{
    title: t('footer.platform'),
    links: [{
      label: t('nav.masters'),
      to: '/masters'
    }, {
      label: t('nav.categories'),
      to: '/categories'
    }, {
      label: t('nav.howItWorks'),
      to: '/how-it-works'
    }, {
      label: t('nav.becomeMaster'),
      to: '/become-master'
    }]
  }, {
    title: t('footer.useful'),
    links: [{
      label: t('footer.supportCenter'),
      to: '/support'
    }, {
      label: t('footer.safety'),
      to: '/safety'
    }, {
      label: t('footer.terms'),
      to: '#'
    }, {
      label: t('footer.privacy'),
      to: '#'
    }]
  }, {
    title: t('footer.company'),
    links: [{
      label: t('footer.aboutUs'),
      to: '#'
    }, {
      label: t('footer.contactUs'),
      to: '#'
    }, {
      label: t('footer.career'),
      to: '#'
    }]
  }];
}
const socials = [{
  icon: Send,
  href: appConfig.telegramChannelUrl,
  label: 'Telegram'
}, {
  icon: InstagramIcon,
  href: appConfig.instagramUrl,
  label: 'Instagram'
}, {
  icon: FacebookIcon,
  href: appConfig.facebookUrl,
  label: 'Facebook'
}, {
  icon: YoutubeIcon,
  href: appConfig.youtubeUrl,
  label: 'YouTube'
}];
function FooterColumn({
  title,
  links
}) {
  const [open, setOpen] = useState(false);
  return <div className="border-b border-white/10 py-3 sm:border-none sm:py-0">
      <button className="flex w-full items-center justify-between text-sm font-semibold text-white/90 sm:pointer-events-none" onClick={() => setOpen(v => !v)}>
        {title}
        <ChevronDown className={cn('h-4 w-4 transition-transform sm:hidden', open && 'rotate-180')} />
      </button>
      <ul className={cn('mt-3 space-y-2 text-sm text-white/60 sm:block', !open && 'hidden sm:block')}>
        {links.map(l => <li key={l.label}>{l.to.startsWith('/') ? <Link to={l.to} className="hover:text-white">{l.label}</Link> : <a href={l.to} className="hover:text-white">{l.label}</a>}</li>)}
      </ul>
    </div>;
}
export default function Footer() {
  const {
    t
  } = useLanguageStore();
  const columns = useFooterColumns();
  return <footer className="bg-[var(--color-navy)] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5 md:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]"><Hammer className="h-5 w-5" /></span>
              <span className="text-lg font-extrabold">USTACHI<span className="text-[var(--color-primary)]">.UZ</span></span>
            </div>
            <p className="mt-4 text-sm text-white/60">{t('footer.tagline')}</p>
            <div className="mt-4 flex gap-2">
              {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-[var(--color-primary)]">
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>)}
            </div>
          </div>

          {columns.map(c => <FooterColumn key={c.title} title={c.title} links={c.links} />)}

          <div>
            <h4 className="text-sm font-semibold text-white/90">{t('footer.contact')}</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +998 71 200 00 01</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> info@ustachi.uz</li>
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {t('footer.workingHours')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-white/90">{t('footer.downloadApp')}</p>
          <div className="flex flex-wrap gap-2.5">
            <GooglePlayButton className="!bg-white/10 hover:!bg-white/20" />
            <AppStoreButton className="!bg-white/10 hover:!bg-white/20" />
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Ustachi.uz. {t('footer.rights')}
        </div>
      </div>
    </footer>;
}
