import { Smartphone, Download, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { appConfig } from '@/config/app';
import { useToastStore } from '@/store/toastStore';
import { useState } from 'react';
const downloads = [{
  name: 'Yan',
  value: 320
}, {
  name: 'Fev',
  value: 480
}, {
  name: 'Mar',
  value: 610
}, {
  name: 'Apr',
  value: 720
}, {
  name: 'May',
  value: 890
}, {
  name: 'Iyun',
  value: 1040
}];
export default function AdminMobileAppPage() {
  const {
    show
  } = useToastStore();
  const [googlePlayUrl, setGooglePlayUrl] = useState(appConfig.googlePlayUrl);
  const [appStoreUrl, setAppStoreUrl] = useState(appConfig.appStoreUrl);
  return <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Mobile App</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Download} value="12 480" label="Jami yuklab olishlar" />
        <StatCard icon={Smartphone} value="6 210" label="Faol foydalanuvchilar" tone="warning" />
        <StatCard icon={Star} value="4.7" label="O'rtacha reyting" tone="success" />
        <StatCard icon={Download} value="+9%" label="Haftalik o'sish" />
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-bold text-[var(--color-navy)]">Yuklab olishlar dinamikasi</h2>
        <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={downloads}><XAxis dataKey="name" tick={{
              fontSize: 11
            }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Bar dataKey="value" fill="#155EEF" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </div>

      <div className="max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-bold text-[var(--color-navy)]">Do'kon havolalari</h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">Bu yerda ko'rsatilgan havolalar demo maqsadida saqlanadi — production uchun <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5">src/config/app.ts</code> faylini yangilang, shunda saytdagi barcha tugmalar avtomatik yangilanadi.</p>
        <div className="mt-4 space-y-3">
          <Input label="Google Play URL" value={googlePlayUrl} onChange={e => setGooglePlayUrl(e.target.value)} />
          <Input label="App Store URL" value={appStoreUrl} onChange={e => setAppStoreUrl(e.target.value)} />
          <Button onClick={() => show('info', "Demo rejimida saqlandi (config faylida yangilang)")}>Saqlash</Button>
        </div>
      </div>
    </div>;
}
