import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Rating from './Rating';
import VerifiedBadge from './VerifiedBadge';
import { formatPrice } from '@/utils/format';
import { cn } from '@/utils/cn';
// Schematic, dependency-free map. Markers are positioned from each master's
// lat/lng normalized into the container's bounding box. The architecture
// (props, marker coordinates, click → mini-card) mirrors what a real map
// provider (Leaflet / Mapbox / Google Maps) integration would look like,
// so swapping in a real provider later only touches this component.
export default function MapView({
  masters,
  className
}) {
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const bounds = useMemo(() => {
    if (masters.length === 0) return {
      minLat: 41.25,
      maxLat: 41.35,
      minLng: 69.18,
      maxLng: 69.32
    };
    const lats = masters.map(m => m.lat);
    const lngs = masters.map(m => m.lng);
    const pad = 0.01;
    return {
      minLat: Math.min(...lats) - pad,
      maxLat: Math.max(...lats) + pad,
      minLng: Math.min(...lngs) - pad,
      maxLng: Math.max(...lngs) + pad
    };
  }, [masters]);
  function toPos(m) {
    const x = (m.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng || 1) * 100;
    const y = 100 - (m.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat || 1) * 100;
    return {
      left: `${Math.min(96, Math.max(4, x))}%`,
      top: `${Math.min(94, Math.max(6, y))}%`
    };
  }
  return <div className={cn('relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#E8EDF5]', className)}>
      {/* decorative schematic road grid, gives map-like texture without a real tile provider */}
      <svg className="absolute inset-0 h-full w-full opacity-70" style={{
      transform: `scale(${zoom})`,
      transition: 'transform 0.2s'
    }} preserveAspectRatio="none" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#E8EDF5" />
        {[40, 110, 180, 250, 320].map(y => <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#D6DEEA" strokeWidth="6" />)}
        {[60, 140, 210, 280, 350].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#D6DEEA" strokeWidth="6" />)}
        <path d="M0 200 Q 200 120 400 210" stroke="#CBD6E6" strokeWidth="10" fill="none" />
        <circle cx="200" cy="200" r="130" stroke="#D6DEEA" strokeWidth="3" fill="none" />
      </svg>

      <div className="absolute inset-0" style={{
      transform: `scale(${zoom})`,
      transformOrigin: 'center',
      transition: 'transform 0.2s'
    }}>
        {masters.map(m => {
        const pos = toPos(m);
        const isSelected = selected?.id === m.id;
        return <button key={m.id} style={pos} onClick={() => setSelected(m)} aria-label={`${m.firstName} ${m.lastName} — xaritada`} className={cn('absolute -translate-x-1/2 -translate-y-full transition-transform hover:z-20 hover:scale-110 focus-ring', isSelected && 'z-20 scale-110')}>
              <span className={cn('flex items-center gap-1 rounded-full border-2 px-2 py-1 text-[11px] font-bold shadow-md', isSelected ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-white bg-white text-[var(--color-navy)]')}>
                {formatPrice(m.priceFrom).replace(" so'm", '')}
              </span>
              <span className="mx-auto mt-0.5 block h-2.5 w-2.5 rotate-45 bg-[var(--color-primary)]" style={{
            display: isSelected ? 'block' : 'none'
          }} />
            </button>;
      })}
      </div>

      {/* zoom controls */}
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
        <button onClick={() => setZoom(z => Math.min(1.6, z + 0.2))} className="flex h-8 w-8 items-center justify-center hover:bg-[var(--color-bg)]" aria-label="Kattalashtirish"><Plus className="h-4 w-4" /></button>
        <div className="h-px bg-[var(--color-border)]" />
        <button onClick={() => setZoom(z => Math.max(0.8, z - 0.2))} className="flex h-8 w-8 items-center justify-center hover:bg-[var(--color-bg)]" aria-label="Kichiklashtirish"><Minus className="h-4 w-4" /></button>
      </div>

      {selected && <div className="absolute bottom-3 left-3 right-3 z-30 max-w-sm rounded-2xl border border-[var(--color-border)] bg-white p-3 shadow-[var(--shadow-card-lg)] sm:left-3 sm:right-auto">
          <button onClick={() => setSelected(null)} className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-bg)]" aria-label="Yopish">×</button>
          <div className="flex items-center gap-3 pr-5">
            <img src={selected.avatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-[var(--color-navy)]">{selected.firstName} {selected.lastName}</p>
                {selected.verified && <VerifiedBadge compact />}
              </div>
              <p className="text-xs text-[var(--color-muted)]">{selected.profession}</p>
              <Rating value={selected.rating} count={selected.reviewCount} size={12} />
            </div>
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-[var(--color-muted)]"><MapPin className="h-3 w-3" /> {selected.district}</p>
          <p className="mt-1 text-sm font-extrabold text-[var(--color-navy)]">{formatPrice(selected.priceFrom)}dan</p>
          <div className="mt-3 flex gap-2">
            <Link to={`/masters/${selected.slug}`} className="flex-1"><Button size="sm" variant="outline" fullWidth>Profilni ko'rish</Button></Link>
            <Link to={`/masters/${selected.slug}?request=1`} className="flex-1"><Button size="sm" fullWidth>So'rov yuborish</Button></Link>
          </div>
        </div>}

      {masters.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-muted)]">Xaritada ustalar topilmadi</div>}
    </div>;
}
