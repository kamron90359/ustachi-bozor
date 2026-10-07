import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import Rating from './Rating';

function formatDistance(distanceKm) {
  if (distanceKm == null || Number.isNaN(distanceKm)) return '';
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  return `${distanceKm.toFixed(1)} km`;
}
import VerifiedBadge from './VerifiedBadge';
import FavoriteButton from './FavoriteButton';
import AvailabilityDot from './AvailabilityDot';
import MasterBadges from './MasterBadges';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/utils/format';
export default function MasterCard({
  master
}) {
  return <div className="group relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-lg)]">
      <FavoriteButton masterId={master.id} className="absolute right-4 top-4 z-10" />
      <Link to={`/masters/${master.slug}`} className="flex items-center gap-3 focus-ring rounded-lg">
        <img src={master.avatar} alt={master.firstName} className="h-14 w-14 rounded-xl object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-bold text-[var(--color-navy)]">{master.firstName} {master.lastName}</p>
            {master.verified && <VerifiedBadge compact />}
          </div>
          <p className="text-sm text-[var(--color-muted)]">{master.profession}</p>
        </div>
      </Link>

      {(master.topMaster || master.fastResponder) && <div className="mt-2"><MasterBadges master={master} compact /></div>}

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
        <Rating value={master.rating} count={master.reviewCount} />
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {master.region}</span>
        {typeof master.distanceKm === 'number' && <span className="flex items-center gap-1 font-medium text-[var(--color-primary)]">{formatDistance(master.distanceKm)} uzoqlikda</span>}
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {master.experience} yillik tajriba</span>
      </div>

      <AvailabilityDot status={master.availabilityStatus} className="mt-2 w-fit" />

      {master.portfolio.length > 0 && <div className="mt-3 grid grid-cols-4 gap-1.5">
          {master.portfolio.slice(0, 4).map(p => <img key={p.id} src={p.image} alt="" className="h-12 w-full rounded-lg object-cover" loading="lazy" />)}
        </div>}

      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-sm text-[var(--color-muted)]">dan boshlab</p>
        <p className="text-base font-extrabold text-[var(--color-navy)]">{formatPrice(master.priceFrom)}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <Link to={`/masters/${master.slug}`} className="flex-1">
          <Button variant="outline" size="sm" fullWidth>Profilni ko'rish</Button>
        </Link>
        <Link to={`/masters/${master.slug}?request=1`} className="flex-1">
          <Button variant="primary" size="sm" fullWidth>So'rov yuborish</Button>
        </Link>
      </div>
    </div>;
}
