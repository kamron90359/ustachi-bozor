import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Users, Wrench, Grid3x3, CheckCircle2, Droplet, Home as HomeIcon, ShieldCheck, MessageSquareText, BadgeDollarSign, Zap as ZapIcon, Globe, Smartphone, Send } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import CategoryCard from '@/components/shared/CategoryCard';
import MasterCard from '@/components/shared/MasterCard';
import PlatformCard from '@/components/shared/PlatformCard';
import { MasterCardSkeleton } from '@/components/shared/Skeleton';
import AppDownloadBanner from '@/components/app/AppDownloadBanner';
import TelegramBotBanner from '@/components/app/TelegramBotBanner';
import { categoryService } from '@/services/categoryService';
import { masterService } from '@/services/masterService';
import { useLanguageStore } from '@/store/languageStore';
import { regions } from '@/data/categories';
export default function HomePage() {
  const navigate = useNavigate();
  const {
    t
  } = useLanguageStore();
  const [categories, setCategories] = useState([]);
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  useEffect(() => {
    Promise.all([categoryService.getCategories(), masterService.getMasters({
      pageSize: 4
    })]).then(([cats, res]) => {
      setCategories(cats);
      setMasters(res.items);
      setLoading(false);
    });
  }, []);
  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (region) params.set('region', region);
    navigate(`/masters?${params.toString()}`);
  }
  const steps = [{
    n: '01',
    title: t('step1.title'),
    desc: t('step1.desc')
  }, {
    n: '02',
    title: t('step2.title'),
    desc: t('step2.desc')
  }, {
    n: '03',
    title: t('step3.title'),
    desc: t('step3.desc')
  }, {
    n: '04',
    title: t('step4.title'),
    desc: t('step4.desc')
  }, {
    n: '05',
    title: t('step5.title'),
    desc: t('step5.desc')
  }];
  const trustPoints = [{
    icon: ShieldCheck,
    title: t('trust.verified.title'),
    desc: t('trust.verified.desc')
  }, {
    icon: MessageSquareText,
    title: t('trust.reviews.title'),
    desc: t('trust.reviews.desc')
  }, {
    icon: BadgeDollarSign,
    title: t('trust.pricing.title'),
    desc: t('trust.pricing.desc')
  }, {
    icon: ZapIcon,
    title: t('trust.fast.title'),
    desc: t('trust.fast.desc')
  }];
  const ecosystemCards = [{
    icon: Globe,
    title: t('ecosystem.web.title'),
    desc: t('ecosystem.web.desc')
  }, {
    icon: Smartphone,
    title: t('ecosystem.app.title'),
    desc: t('ecosystem.app.desc')
  }, {
    icon: Send,
    title: t('ecosystem.telegram.title'),
    desc: t('ecosystem.telegram.desc')
  }];
  const stats = [{
    icon: Users,
    value: '10 000+',
    label: t('stats.customers')
  }, {
    icon: Wrench,
    value: '5 000+',
    label: t('stats.masters')
  }, {
    icon: Grid3x3,
    value: '50+',
    label: t('stats.categories')
  }, {
    icon: CheckCircle2,
    value: '100 000+',
    label: t('stats.completedJobs')
  }];
  return <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_0.85fr] lg:gap-10 lg:py-16 lg:px-10">
          <div>
            <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              {t('hero.title1')}<br /><span className="text-[var(--color-primary)]">{t('hero.title2')}</span>
            </h1>
            <p className="mt-3 max-w-md text-sm text-[var(--color-muted)] sm:text-base">
              {t('hero.subtitle')}
            </p>

            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card-lg)] sm:mt-8 sm:p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label={t('hero.serviceName')} placeholder={t('hero.servicePlaceholder')} value={query} onChange={e => setQuery(e.target.value)} />
                <Select label={t('hero.category')} defaultValue="">
                  <option value="">{t('hero.all')}</option>
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </Select>
                <Select label={t('hero.region')} value={region} onChange={e => setRegion(e.target.value)}>
                  <option value="">{t('hero.all')}</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </Select>
                <Select label={t('hero.district')} defaultValue="">
                  <option value="">{t('hero.all')}</option>
                </Select>
              </div>
              <Button className="mt-3" fullWidth size="lg" icon={<Search className="h-4 w-4" />} onClick={handleSearch}>
                {t('hero.searchButton')}
              </Button>
            </div>

            {/* compact stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
              {stats.map(s => <div key={s.label} className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]"><s.icon className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold leading-tight text-[var(--color-navy)]">{s.value}</p>
                    <p className="truncate text-[11px] leading-tight text-[var(--color-muted)]">{s.label}</p>
                  </div>
                </div>)}
            </div>

            <Link to="/become-master" className="mt-6 hidden items-center gap-2 text-sm font-semibold text-[var(--color-primary)] lg:inline-flex">
              {t('hero.becomeMasterLink')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative mx-auto hidden max-w-md lg:block">
            <div className="absolute -inset-6 -z-10 rounded-full bg-[var(--color-primary-light)]/60 blur-2xl" />
            <div className="overflow-hidden rounded-3xl bg-[var(--color-bg)]">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=900&auto=format&fit=crop" alt="Professional usta" className="h-[440px] w-full object-cover" loading="eager" />
            </div>
            <span className="absolute -left-6 top-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card-lg)]"><Droplet className="h-5 w-5 text-[var(--color-primary)]" /></span>
            <span className="absolute -left-2 top-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card-lg)]"><Wrench className="h-5 w-5 text-[var(--color-primary)]" /></span>
            <span className="absolute right-2 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card-lg)]"><HomeIcon className="h-5 w-5 text-[var(--color-primary)]" /></span>
            <span className="absolute -right-4 bottom-16 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card-lg)]"><ZapIcon className="h-5 w-5 text-[var(--color-primary)]" /></span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[var(--color-navy)] sm:text-xl lg:text-2xl">{t('section.popularCategories')}</h2>
          <Link to="/categories" className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">{t('section.viewAll')} <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {(loading ? Array.from({
          length: 12
        }) : categories).map((c, i) => loading ? <div key={i} className="h-[104px] animate-pulse rounded-2xl bg-white" /> : <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      {/* RECOMMENDED MASTERS */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[var(--color-navy)] sm:text-xl lg:text-2xl">{t('section.recommendedMasters')}</h2>
          <Link to="/masters" className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">{t('section.viewAll')} <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? Array.from({
          length: 4
        }).map((_, i) => <MasterCardSkeleton key={i} />) : masters.map(m => <MasterCard key={m.id} master={m} />)}
        </div>
      </section>

      {/* APP + TELEGRAM */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AppDownloadBanner />
          <TelegramBotBanner />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <h2 className="text-center text-lg font-extrabold text-[var(--color-navy)] sm:text-xl lg:text-2xl">{t('section.howItWorks')}</h2>
        <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="absolute top-6 left-0 right-0 hidden h-px bg-[var(--color-border)] lg:block" />
          {steps.map(s => <div key={s.n} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-white text-sm font-extrabold text-[var(--color-primary)]">
                {s.n}
              </span>
              <p className="mt-3 font-bold text-[var(--color-navy)]">{s.title}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{s.desc}</p>
            </div>)}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <h2 className="text-center text-lg font-extrabold text-[var(--color-navy)] sm:text-xl lg:text-2xl">{t('section.whyUstachi')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(tp => <PlatformCard key={tp.title} icon={tp.icon} title={tp.title} description={tp.desc} />)}
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <h2 className="text-center text-lg font-extrabold text-[var(--color-navy)] sm:text-xl lg:text-2xl">{t('section.ecosystem')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ecosystemCards.map(e => <PlatformCard key={e.title} icon={e.icon} title={e.title} description={e.desc} />)}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(s => <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center shadow-[var(--shadow-card)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><s.icon className="h-5 w-5" /></span>
              <p className="text-2xl font-extrabold text-[var(--color-navy)]">{s.value}</p>
              <p className="text-xs text-[var(--color-muted)]">{s.label}</p>
            </div>)}
        </div>
      </section>
    </div>;
}
