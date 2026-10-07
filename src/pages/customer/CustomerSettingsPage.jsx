import { useToastStore } from '@/store/toastStore';
import Button from '@/components/ui/Button';
export default function CustomerSettingsPage() {
  const {
    show
  } = useToastStore();
  return <div className="max-w-xl">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Sozlamalar</h1>
      <div className="mt-5 space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
        {[{
        title: 'Push bildirishnomalar',
        desc: 'Yangi buyurtma va xabarlar haqida bildirishnoma oling'
      }, {
        title: 'SMS xabarnomalar',
        desc: 'Muhim voqealar haqida SMS orqali xabardor bo\'ling'
      }, {
        title: 'Marketing xabarlari',
        desc: 'Aksiya va yangiliklar haqida ma\'lumot olish'
      }].map(s => <label key={s.title} className="flex items-center justify-between gap-4">
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
