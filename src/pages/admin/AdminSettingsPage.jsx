import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToastStore } from '@/store/toastStore';
export default function AdminSettingsPage() {
  const {
    show
  } = useToastStore();
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Platforma sozlamalari</h1>
      <div className="mt-4 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <Input label="Platforma nomi" defaultValue="USTACHI.UZ" />
        <Input label="Qo'llab-quvvatlash telefoni" defaultValue="+998 71 200 00 01" />
        <Input label="Qo'llab-quvvatlash email" defaultValue="info@ustachi.uz" />
        <Button onClick={() => show('info', 'Sozlamalar saqlandi')}>Saqlash</Button>
      </div>
    </div>;
}
