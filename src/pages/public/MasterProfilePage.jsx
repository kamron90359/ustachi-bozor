import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Phone, Heart, MessageSquare, ClipboardCheck, ThumbsUp, Timer, CheckCircle2, Flag } from 'lucide-react';
import Button from '@/components/ui/Button';
import Rating from '@/components/shared/Rating';
import VerifiedBadge from '@/components/shared/VerifiedBadge';
import MasterBadges from '@/components/shared/MasterBadges';
import AvailabilityDot from '@/components/shared/AvailabilityDot';
import MapView from '@/components/shared/MapView';
import RequestModal from '@/components/shared/RequestModal';
import ReportModal from '@/components/shared/ReportModal';
import EmptyState from '@/components/shared/EmptyState';
import ErrorState from '@/components/shared/ErrorState';
import { Skeleton } from '@/components/shared/Skeleton';
import { masterService } from '@/services/masterService';
import { reviewService } from '@/services/reviewService';
import { categoryService } from '@/services/categoryService';
import { messageService } from '@/services/messageService';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToastStore } from '@/store/toastStore';
import { cn } from '@/utils/cn';
import { formatPrice, formatDate } from '@/utils/format';
const tabs = ['Asosiy', 'Xizmatlar', 'Portfolio', 'Sharhlar', 'Ish vaqti'];
export default function MasterProfilePage() {
  const {
    slug
  } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    user
  } = useAuthStore();
  const {
    isFavorite,
    toggle
  } = useFavoritesStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState(null);
  const [tab, setTab] = useState('Asosiy');
  const [modalOpen, setModalOpen] = useState(params.get('request') === '1');
  const [reportOpen, setReportOpen] = useState(false);
  useEffect(() => {
    if (!slug) return;
    masterService.getMasterBySlug(slug).then(m => {
      setMaster(m);
      if (m) {
        reviewService.getForMaster(m.id).then(setReviews);
        categoryService.getCategories().then(cats => setCategory(cats.find(c => c.id === m.categoryId) ?? null));
      }
    });
  }, [slug]);
  async function handleMessage() {
    if (!master) return;
    if (!user || user.role !== 'customer') {
      navigate('/login');
      return;
    }
    await messageService.getOrCreateConversation(user.id, `${user.firstName} ${user.lastName}`, master.id, `${master.firstName} ${master.lastName}`, master.avatar);
    navigate('/customer/messages');
  }
  if (master === undefined) {
    return <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="mt-4 h-64 w-full rounded-2xl" />
      </div>;
  }
  if (master === null) {
    return <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6"><ErrorState message="Usta topilmadi." onRetry={() => navigate('/masters')} /></div>;
  }
  const stats = [{
    icon: ClipboardCheck,
    value: String(master.orderCount),
    label: 'Buyurtmalar'
  }, {
    icon: ThumbsUp,
    value: `${master.recommendRate}%`,
    label: 'Mijozlar tavsiyasi'
  }, {
    icon: Briefcase,
    value: `${master.experience} yil`,
    label: 'Tajriba'
  }, {
    icon: Timer,
    value: `${master.responseMinutes} daqiqa`,
    label: "O'rtacha javob"
  }, {
    icon: CheckCircle2,
    value: `${master.completionRate}%`,
    label: 'Muvaffaqiyatli yakunlangan'
  }];
  return <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={master.avatar} alt={master.firstName} className="h-20 w-20 rounded-2xl object-cover" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold text-[var(--color-navy)]">{master.firstName} {master.lastName}</h1>
                {master.verified && <VerifiedBadge />}
                <MasterBadges master={master} compact />
              </div>
              <p className="text-sm text-[var(--color-muted)]">{master.profession}{category ? ` · ${category.name}` : ''}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted)]">
                <Rating value={master.rating} count={master.reviewCount} />
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {master.region}, {master.district}</span>
                <AvailabilityDot status={master.availabilityStatus} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" icon={<Heart className={cn('h-4 w-4', isFavorite(master.id) && 'fill-[var(--color-error)] text-[var(--color-error)]')} />} onClick={() => {
            toggle(master.id);
            show('info', isFavorite(master.id) ? "Sevimlilardan olib tashlandi" : "Sevimlilarga qo'shildi");
          }}>
              Sevimliga qo'shish
            </Button>
            <Button variant="outline" icon={<MessageSquare className="h-4 w-4" />} onClick={handleMessage}>Xabar yuborish</Button>
            <Button onClick={() => setModalOpen(true)}>So'rov yuborish</Button>
          </div>
        </div>

        {/* stats row */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--color-border)] pt-5 sm:grid-cols-5">
          {stats.map(s => <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <s.icon className="h-4 w-4 text-[var(--color-primary)]" />
              <p className="text-sm font-extrabold text-[var(--color-navy)]">{s.value}</p>
              <p className="text-[11px] leading-tight text-[var(--color-muted)]">{s.label}</p>
            </div>)}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-1">
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={cn('whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors', tab === t ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
            {t}
          </button>)}
      </div>

      <div className="mt-5">
        {tab === 'Asosiy' && <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <h3 className="font-bold text-[var(--color-navy)]">Usta haqida</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{master.about}</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <h3 className="font-bold text-[var(--color-navy)]">Xizmat ko'rsatish hududi</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{master.region}<br />{master.district}, {master.address}</p>
              <MapView masters={[master]} className="mt-3 h-40" />
              <p className="mt-3 flex items-center gap-2 text-xs text-[var(--color-muted)]"><Phone className="h-3.5 w-3.5" /> So'rov yuborgach telefon raqami ko'rinadi</p>
            </div>
          </div>}

        {tab === 'Xizmatlar' && <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold text-[var(--color-navy)]">Xizmatlar va narxlar</h3>
            <div className="mt-3 divide-y divide-[var(--color-border)]">
              {master.services.map(s => <div key={s.id} className="flex items-center justify-between py-3">
                  <p className="text-sm font-medium text-[var(--color-navy)]">{s.title}</p>
                  <p className="text-sm font-bold text-[var(--color-navy)]">{formatPrice(s.price)}{s.priceFrom ? 'dan' : ''}</p>
                </div>)}
            </div>
            <Button className="mt-4" onClick={() => setModalOpen(true)}>Barcha xizmatlar</Button>
          </div>}

        {tab === 'Portfolio' && <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold text-[var(--color-navy)]">Portfolio</h3>
            {master.portfolio.length === 0 ? <EmptyState title="Portfolio hali yo'q" /> : <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {master.portfolio.map(p => <img key={p.id} src={p.image} alt="" className="h-40 w-full rounded-xl object-cover" loading="lazy" />)}
              </div>}
          </div>}

        {tab === 'Sharhlar' && <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold text-[var(--color-navy)]">Sharhlar ({reviews.length})</h3>
            {reviews.length === 0 ? <EmptyState title="Hozircha sharhlar yo'q" /> : <div className="mt-3 space-y-4">
                {reviews.map(r => <div key={r.id} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[var(--color-navy)]">{r.customerName}</p>
                      <Rating value={r.rating} size={13} />
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{r.comment}</p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">{formatDate(r.createdAt)}</p>
                  </div>)}
              </div>}
          </div>}

        {tab === 'Ish vaqti' && <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold text-[var(--color-navy)]">Ish vaqti</h3>
            <div className="mt-3 divide-y divide-[var(--color-border)]">
              {master.workingHours.map(d => <div key={d.day} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-[var(--color-navy)]">{d.day}</span>
                  <span className={cn('flex items-center gap-1.5', d.working ? 'text-[var(--color-navy)]' : 'text-[var(--color-muted)]')}>
                    <Clock className="h-3.5 w-3.5" /> {d.working ? `${d.start} - ${d.end}` : 'Dam olish kuni'}
                  </span>
                </div>)}
            </div>
          </div>}
      </div>

      <div className="mt-4 text-center">
        <button onClick={() => setReportOpen(true)} className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-error)]">
          <Flag className="h-3.5 w-3.5" /> Bu profil haqida shikoyat qilish
        </button>
      </div>

      <RequestModal open={modalOpen} onClose={() => {
      setModalOpen(false);
      const n = new URLSearchParams(params);
      n.delete('request');
      setParams(n);
    }} master={master} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} targetId={master.id} targetLabel={`${master.firstName} ${master.lastName}`} />
    </div>;
}
