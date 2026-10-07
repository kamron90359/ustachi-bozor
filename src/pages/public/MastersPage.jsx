import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, List, Map as MapIcon, Clock, Trash2, Navigation } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import MasterCard from '@/components/shared/MasterCard';
import MapView from '@/components/shared/MapView';
import { MasterCardSkeleton } from '@/components/shared/Skeleton';
import EmptyState from '@/components/shared/EmptyState';
import Pagination from '@/components/shared/Pagination';
import { masterService } from '@/services/masterService';
import { categoryService } from '@/services/categoryService';
import { recentSearchService } from '@/services/recentSearchService';
import { regions } from '@/data/categories';
import { cn } from '@/utils/cn';
const EARTH_RADIUS_KM = 6371;

function getDistanceKm(fromLat, fromLng, toLat, toLng) {
  const toRad = value => (value * Math.PI) / 180;
  const deltaLat = toRad(toLat - fromLat);
  const deltaLng = toRad(toLng - fromLng);
  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(toRad(fromLat)) * Math.cos(toRad(toLat)) * Math.sin(deltaLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function formatDistance(distanceKm) {
  if (distanceKm == null || Number.isNaN(distanceKm)) return '';
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`; 
  return `${distanceKm.toFixed(1)} km`;
}

const FALLBACK_LOCATION = {
  lat: 41.2995,
  lng: 69.2401
};

export default function MastersPage() {
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [masters, setMasters] = useState([]);
  const [mapMasters, setMapMasters] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState('list');
  const [recent, setRecent] = useState([]);
  const [userLocation, setUserLocation] = useState(FALLBACK_LOCATION);
  const [locationStatus, setLocationStatus] = useState('idle');
  const query = params.get('q') || '';
  const category = params.get('category') || '';
  const region = params.get('region') || '';
  const sort = params.get('sort') || 'rating';
  const page = Number(params.get('page') || 1);
  const minPrice = params.get('minPrice') ? Number(params.get('minPrice')) : undefined;
  const maxPrice = params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined;
  const minRating = params.get('minRating') ? Number(params.get('minRating')) : undefined;
  const verifiedOnly = params.get('verified') === '1';
  const availableOnly = params.get('available') === '1';
  useEffect(() => {
    categoryService.getCategories().then(setCategories);
    setRecent(recentSearchService.getAll());

    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }

    setLocationStatus('checking');
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus('ready');
      },
      () => {
        setUserLocation(FALLBACK_LOCATION);
        setLocationStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, []);
  useEffect(() => {
    setLoading(true);
    const baseFilters = {
      query,
      category,
      region,
      sort: sort,
      minPrice,
      maxPrice,
      minRating,
      verifiedOnly,
      availableOnly
    };
    masterService.getMasters({
      ...baseFilters,
      page,
      pageSize: 9
    }).then(res => {
      setMasters(res.items);
      setTotal(res.total);
      setLoading(false);
    });
    masterService.getMasters({
      ...baseFilters,
      page: 1,
      pageSize: 50
    }).then(res => setMapMasters(res.items));
  }, [query, category, region, sort, page, minPrice, maxPrice, minRating, verifiedOnly, availableOnly]);
  function update(patch) {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => v ? next.set(k, v) : next.delete(k));
    if (!('page' in patch)) next.delete('page');
    setParams(next);
  }
  function runSearch(q) {
    update({
      q: q || null
    });
    if (q) {
      recentSearchService.add({
        label: region ? `${q} — ${region}` : q,
        query: q,
        region
      });
      setRecent(recentSearchService.getAll());
    }
  }
  const sortedMasters = useMemo(() => {
    return [...masters]
      .map(master => ({
        ...master,
        distanceKm: getDistanceKm(userLocation.lat, userLocation.lng, master.lat, master.lng)
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [masters, userLocation]);

  const sortedMapMasters = useMemo(() => {
    return [...mapMasters]
      .map(master => ({
        ...master,
        distanceKm: getDistanceKm(userLocation.lat, userLocation.lng, master.lat, master.lng)
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [mapMasters, userLocation]);

  const nearestMaster = sortedMasters[0];
  const totalPages = Math.max(1, Math.ceil(total / 9));
  const activeFilterCount = [category, region, minPrice, minRating, verifiedOnly, availableOnly].filter(Boolean).length;
  const FiltersPanel = <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[var(--color-navy)]">Filtrlar</p>
        {activeFilterCount > 0 && <button className="text-xs font-semibold text-[var(--color-primary)]" onClick={() => setParams(new URLSearchParams())}>Tozalash</button>}
      </div>
      <Select label="Kategoriya" value={category} onChange={e => update({
      category: e.target.value || null
    })}>
        <option value="">Barchasi</option>
        {categories.map(c => <option key={c.id} value={c.slug === category ? category : c.id}>{c.name}</option>)}
      </Select>
      <Select label="Hudud" value={region} onChange={e => update({
      region: e.target.value || null
    })}>
        <option value="">Barchasi</option>
        {regions.map(r => <option key={r} value={r}>{r}</option>)}
      </Select>
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Narx oralig'i</p>
        <input type="range" min={0} max={500000} step={10000} value={maxPrice ?? 500000} onChange={e => update({
        maxPrice: e.target.value
      })} className="w-full accent-[var(--color-primary)]" />
        <div className="flex justify-between text-xs text-[var(--color-muted)]">
          <span>0 so'm</span>
          <span>{(maxPrice ?? 500000).toLocaleString()} so'm</span>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Reyting</p>
        <div className="space-y-1.5">
          {[5, 4, 3].map(r => <label key={r} className="flex items-center gap-2 text-sm text-[var(--color-navy)]">
              <input type="checkbox" checked={minRating === r} onChange={e => update({
            minRating: e.target.checked ? String(r) : null
          })} className="h-4 w-4 accent-[var(--color-primary)]" />
              {r} dan yuqori
            </label>)}
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm text-[var(--color-navy)]">
          <input type="checkbox" checked={verifiedOnly} onChange={e => update({
          verified: e.target.checked ? '1' : null
        })} className="h-4 w-4 accent-[var(--color-primary)]" />
          Verified usta
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-navy)]">
          <input type="checkbox" checked={availableOnly} onChange={e => update({
          available: e.target.checked ? '1' : null
        })} className="h-4 w-4 accent-[var(--color-primary)]" />
          Hozir mavjud
        </label>
      </div>
    </div>;
  return <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)] sm:text-2xl">Ustalarni topish</h1>

      <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-4">
        <Input label="Xizmat nomi" placeholder="Santexnik xizmati" defaultValue={query} onKeyDown={e => e.key === 'Enter' && runSearch(e.target.value)} onBlur={e => runSearch(e.target.value)} />
        <Select label="Viloyat" value={region} onChange={e => update({
        region: e.target.value || null
      })}>
          <option value="">Barchasi</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>
        <Select label="Shahar" defaultValue=""><option value="">Barchasi</option></Select>
        <div className="flex items-end"><Button fullWidth icon={<Search className="h-4 w-4" />} onClick={() => runSearch(query)}>Qidirish</Button></div>
      </div>

      {recent.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-[var(--color-muted)]"><Clock className="h-3.5 w-3.5" /> So'nggi qidiruvlar:</span>
          {recent.map(r => <button key={r.id} onClick={() => runSearch(r.query || '')} className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-navy)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
              {r.label}
            </button>)}
          <button onClick={() => {
        recentSearchService.clear();
        setRecent([]);
      }} className="flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-error)]"><Trash2 className="h-3 w-3" /> Tozalash</button>
        </div>}

      {userLocation && nearestMaster && <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-4 py-3 text-sm text-[var(--color-navy)]">
          <Navigation className="h-4 w-4 text-[var(--color-primary)]" />
          <span>
            Sizga eng yaqin usta: <strong>{nearestMaster.firstName} {nearestMaster.lastName}</strong> ({formatDistance(nearestMaster.distanceKm)} uzoqlikda)
          </span>
        </div>}

      {locationStatus === 'denied' && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Joylashuv aniqlanmadi. Ustalar ro'yxati umumiy ko'rinishda ko'rsatilmoqda.
        </div>}

      {/* view toggle */}
      <div className="mt-5 inline-flex gap-1 rounded-xl border border-[var(--color-border)] bg-white p-1">
        <button onClick={() => setView('list')} className={cn('flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold', view === 'list' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
          <List className="h-4 w-4" /> Ro'yxat
        </button>
        <button onClick={() => setView('map')} className={cn('flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold', view === 'map' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-navy)]/70 hover:bg-[var(--color-bg)]')}>
          <MapIcon className="h-4 w-4" /> Xarita
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 lg:block h-fit sticky top-20">
          {FiltersPanel}
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">{total} ta usta topildi</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="lg:hidden" icon={<SlidersHorizontal className="h-4 w-4" />} onClick={() => setFiltersOpen(true)}>
                Filtrlar{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </Button>
              <Select value={sort} onChange={e => update({
              sort: e.target.value
            })} className="!h-9 !text-xs">
                <option value="rating">Reyting bo'yicha</option>
                <option value="price-asc">Narx: pastdan yuqoriga</option>
                <option value="price-desc">Narx: yuqoridan pastga</option>
                <option value="experience">Tajriba bo'yicha</option>
                <option value="new">Yangi</option>
                <option value="response">Tez javob beruvchi</option>
                <option value="orders">Ko'p buyurtma</option>
              </Select>
            </div>
          </div>

          {view === 'map' ? loading ? <div className="h-[420px] animate-pulse rounded-2xl bg-white sm:h-[560px]" /> : <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
                <div className="order-2 max-h-[560px] space-y-3 overflow-y-auto lg:order-1 lg:pr-1">
                 {sortedMapMasters.length === 0 ? <EmptyState title="Ustalar topilmadi" /> : sortedMapMasters.map(m => <MasterCard key={m.id} master={m} />)}
                </div>
               <MapView masters={sortedMapMasters} className="order-1 h-[300px] sm:h-[420px] lg:order-2 lg:h-[560px]" />
              </div> : loading ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({
            length: 6
          }).map((_, i) => <MasterCardSkeleton key={i} />)}
            </div> : sortedMasters.length === 0 ? <EmptyState title="Ustalar topilmadi" description="Filtrlarni o'zgartirib qayta urinib ko'ring." /> : <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sortedMasters.map(m => <MasterCard key={m.id} master={m} />)}
              </div>
              <div className="mt-8">
                <Pagination page={page} totalPages={totalPages} onChange={p => update({
              page: String(p)
            })} />
              </div>
            </>}
        </div>
      </div>

      {filtersOpen && <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-bold">Filtrlar</p>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {FiltersPanel}
            <Button fullWidth className="mt-5" onClick={() => setFiltersOpen(false)}>Natijalarni ko'rsatish</Button>
          </div>
        </div>}
    </div>;
}
