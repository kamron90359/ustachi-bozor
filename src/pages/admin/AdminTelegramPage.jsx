import { Send, Users, MessageCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '@/components/shared/StatCard';
import { appConfig } from '@/config/app';
const activity = [{
  name: 'Yan',
  value: 1200
}, {
  name: 'Fev',
  value: 1850
}, {
  name: 'Mar',
  value: 2400
}, {
  name: 'Apr',
  value: 3100
}, {
  name: 'May',
  value: 3600
}, {
  name: 'Iyun',
  value: 4200
}];
export default function AdminTelegramPage() {
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Telegram Bot</h1>
        <a href={appConfig.telegramBotUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-[#229ED9] px-4 py-2 text-sm font-semibold text-white"><Send className="h-4 w-4" /> Botni ochish</a>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} value="8 451" label="Bot foydalanuvchilari" />
        <StatCard icon={MessageCircle} value="1 245" label="Jami so'rovlar" tone="warning" />
        <StatCard icon={TrendingUp} value="+18%" label="Haftalik o'sish" tone="success" />
        <StatCard icon={Send} value="236" label="Bugungi faollik" />
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-bold text-[var(--color-navy)]">Bot faolligi</h2>
        <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={activity}><XAxis dataKey="name" tick={{
              fontSize: 11
            }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="value" stroke="#229ED9" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-bold text-[var(--color-navy)]">Bot muloqot oqimi</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {['Kategoriya', 'Viloyat', 'Xizmat', 'Usta', "So'rov"].map((step, i, arr) => <div key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1.5 font-semibold text-[var(--color-primary)]">{step}</span>
              {i < arr.length - 1 && <span className="text-[var(--color-muted)]">→</span>}
            </div>)}
        </div>
        <p className="mt-3 text-xs text-[var(--color-muted)]">Bot havolasi markazlashtirilgan konfiguratsiyadan olinadi: <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5">src/config/app.ts</code></p>
      </div>
    </div>;
}
