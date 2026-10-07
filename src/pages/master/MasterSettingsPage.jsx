import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import AvailabilityDot from '@/components/shared/AvailabilityDot';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
import { cn } from '@/utils/cn';
const options = [{
  value: 'available',
  label: 'Hozir mavjud'
}, {
  value: 'busy',
  label: 'Band'
}, {
  value: 'offline',
  label: 'Offline'
}];
export default function MasterSettingsPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(null);
  useEffect(() => {
    if (user) masterService.getMasterByUserId(user.id).then(setMaster);
  }, [user]);
  async function setStatus(status) {
    if (!master) return;
    const updated = await masterService.updateMaster(master.id, {
      availabilityStatus: status,
      available: status === 'available'
    });
    setMaster(updated);
    show('info', `Status yangilandi: ${options.find(o => o.value === status)?.label}`);
  }
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Sozlamalar</h1>
      <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        {master && <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-navy)]">Mavjudlik statusi</p>
              <AvailabilityDot status={master.availabilityStatus} />
            </div>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Mijozlar profilingizda ushbu statusni ko'radi.</p>
            <div className="mt-3 flex gap-2">
              {options.map(o => <button key={o.value} onClick={() => setStatus(o.value)} className={cn('flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors', master.availabilityStatus === o.value ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-navy)] hover:bg-[var(--color-bg)]')}>
                  {o.label}
                </button>)}
            </div>
          </div>}
        {[{
        title: 'Push bildirishnomalar',
        desc: 'Yangi so\'rov va xabarlar haqida bildirishnoma oling'
      }, {
        title: 'SMS xabarnomalar',
        desc: 'Muhim voqealar haqida SMS orqali xabardor bo\'ling'
      }].map(s => <label key={s.title} className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-navy)]">{s.title}</p>
              <p className="text-xs text-[var(--color-muted)]">{s.desc}</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-9 accent-[var(--color-primary)]" />
          </label>)}
        <Button onClick={() => show('info', 'Sozlamalar saqlandi')}>Saqlash</Button>
      </div>
    </div>;
}
