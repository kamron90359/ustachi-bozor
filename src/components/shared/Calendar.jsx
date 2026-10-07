import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
const weekDays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
const monthNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
export default function Calendar({
  selected,
  onSelect,
  markedDates = []
}) {
  const [cursor, setCursor] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));
  const firstWeekday = (cursor.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({
    length: daysInMonth
  }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1))];
  const todayKey = new Date().toDateString();
  const selectedKey = selected.toDateString();
  return <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]" aria-label="Oldingi oy"><ChevronLeft className="h-4 w-4" /></button>
        <p className="text-sm font-bold text-[var(--color-navy)]">{monthNames[cursor.getMonth()]} {cursor.getFullYear()}</p>
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]" aria-label="Keyingi oy"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[var(--color-muted)]">
        {weekDays.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
        if (!d) return <div key={i} />;
        const key = d.toDateString();
        const marked = markedDates.includes(d.toISOString().slice(0, 10));
        return <button key={i} onClick={() => onSelect(d)} className={cn('relative aspect-square rounded-lg text-xs font-medium transition-colors', key === selectedKey ? 'bg-[var(--color-primary)] text-white' : key === todayKey ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'text-[var(--color-navy)] hover:bg-[var(--color-bg)]')}>
              {d.getDate()}
              {marked && key !== selectedKey && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-warning)]" />}
            </button>;
      })}
      </div>
    </div>;
}
