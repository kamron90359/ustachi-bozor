import { cn } from '@/utils/cn';
const defaultSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
export default function TimeSlotPicker({
  slots = defaultSlots,
  selected,
  onSelect,
  bookedSlots = []
}) {
  return <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
      {slots.map(t => {
      const booked = bookedSlots.includes(t);
      return <button key={t} type="button" disabled={booked} onClick={() => onSelect(t)} className={cn('rounded-lg border px-2 py-2 text-xs font-semibold transition-colors', booked ? 'cursor-not-allowed border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-muted)] line-through' : selected === t ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:border-[var(--color-primary)]')}>
            {t}
          </button>;
    })}
    </div>;
}
