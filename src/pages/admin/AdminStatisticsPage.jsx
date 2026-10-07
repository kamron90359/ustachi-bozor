import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';
const userGrowth = [{
  name: 'Yan',
  value: 1200
}, {
  name: 'Fev',
  value: 1900
}, {
  name: 'Mar',
  value: 2600
}, {
  name: 'Apr',
  value: 3400
}, {
  name: 'May',
  value: 4100
}, {
  name: 'Iyun',
  value: 5200
}];
const revenue = [{
  name: 'Yan',
  value: 12
}, {
  name: 'Fev',
  value: 19
}, {
  name: 'Mar',
  value: 15
}, {
  name: 'Apr',
  value: 26
}, {
  name: 'May',
  value: 21
}, {
  name: 'Iyun',
  value: 34
}];
export default function AdminStatisticsPage() {
  return <div className="space-y-6">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Statistika</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Foydalanuvchilar o'sishi</h2>
          <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={userGrowth}><XAxis dataKey="name" tick={{
                fontSize: 11
              }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="value" stroke="#155EEF" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-bold text-[var(--color-navy)]">Buyurtmalar hajmi (mln so'm)</h2>
          <div className="mt-4 h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenue}><XAxis dataKey="name" tick={{
                fontSize: 11
              }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Bar dataKey="value" fill="#12B76A" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>;
}
