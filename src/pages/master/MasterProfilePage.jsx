import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
export default function MasterProfileSettingsPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(null);
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState(0);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(m => {
      setMaster(m);
      if (m) {
        setAbout(m.about);
        setExperience(m.experience);
      }
    });
  }, [user]);
  async function save() {
    if (!master) return;
    setSaving(true);
    await masterService.updateMaster(master.id, {
      about,
      experience
    });
    show('info', 'Profil yangilandi');
    setSaving(false);
  }
  if (!master) return <EmptyState title="Profil topilmadi" description="Avval usta profilini yarating." />;
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Profil</h1>
      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <img src={master.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover" />
        <div>
          <p className="font-bold text-[var(--color-navy)]">{master.firstName} {master.lastName}</p>
          <p className="text-sm text-[var(--color-muted)]">{master.profession}</p>
        </div>
      </div>
      <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Siz haqingizda</label>
          <textarea rows={4} className="w-full rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 text-sm focus-ring" value={about} onChange={e => setAbout(e.target.value)} />
        </div>
        <Input label="Tajriba (yil)" type="number" value={experience} onChange={e => setExperience(Number(e.target.value))} />
        <Button loading={saving} onClick={save}>Saqlash</Button>
      </div>
    </div>;
}
