import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { useToastStore } from '@/store/toastStore';
export default function CustomerProfilePage() {
  const {
    user,
    setUser
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);
  if (!user) return null;
  async function save() {
    setSaving(true);
    const updated = authService.updateUser(user.id, {
      firstName,
      lastName,
      phone
    });
    if (updated) setUser(updated);
    show('info', 'Profil yangilandi');
    setSaving(false);
  }
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Profil</h1>
      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-xl font-bold text-[var(--color-primary)]">{firstName[0]}</span>
        <div>
          <p className="font-bold text-[var(--color-navy)]">{firstName} {lastName}</p>
          <p className="text-sm text-[var(--color-muted)]">Mijoz</p>
        </div>
      </div>
      <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <Input label="Ism" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <Input label="Familiya" value={lastName} onChange={e => setLastName(e.target.value)} />
        <Input label="Telefon" value={phone} onChange={e => setPhone(e.target.value)} />
        <Button loading={saving} onClick={save}>Saqlash</Button>
      </div>
    </div>;
}
