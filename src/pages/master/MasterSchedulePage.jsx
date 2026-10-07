import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
export default function MasterSchedulePage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(null);
  const [hours, setHours] = useState([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(m => {
      setMaster(m);
      if (m) setHours(m.workingHours);
    });
  }, [user]);
  async function save() {
    if (!master) return;
    setSaving(true);
    await masterService.updateMaster(master.id, {
      workingHours: hours
    });
    show('success', 'Ish vaqti saqlandi');
    setSaving(false);
  }
  if (!master) return null;
  return <div className="max-w-2xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Ish vaqti</h1>
      <div className="mt-4 space-y-2 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        {hours.map((d, i) => <div key={d.day} className="flex flex-wrap items-center gap-3 border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
            <label className="flex w-32 items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={d.working} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
            ...h,
            working: e.target.checked
          } : h))} className="h-4 w-4 accent-[var(--color-primary)]" />
              {d.day}
            </label>
            {d.working ? <>
                <input type="time" value={d.start} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
            ...h,
            start: e.target.value
          } : h))} className="rounded-lg border border-[var(--color-border)] px-2 py-1.5 text-sm" />
                <span className="text-[var(--color-muted)]">—</span>
                <input type="time" value={d.end} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
            ...h,
            end: e.target.value
          } : h))} className="rounded-lg border border-[var(--color-border)] px-2 py-1.5 text-sm" />
              </> : <span className="text-sm text-[var(--color-muted)]">Dam olish kuni</span>}
          </div>)}
        <Button loading={saving} onClick={save}>Saqlash</Button>
      </div>
    </div>;
}
