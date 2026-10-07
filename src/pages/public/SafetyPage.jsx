import { ShieldCheck, UserCheck, MessageSquareWarning, Lock, Eye, Phone } from 'lucide-react';
const points = [{
  icon: UserCheck,
  title: "Usta identifikatsiyasi",
  desc: "Har bir usta telefon raqami va hujjatlar orqali tekshiriladi."
}, {
  icon: ShieldCheck,
  title: "Verifikatsiya belgisi",
  desc: "Verified belgisi faqat tasdiqlangan ustalarga beriladi."
}, {
  icon: Eye,
  title: "Shaffof sharhlar",
  desc: "Faqat haqiqiy buyurtma bergan mijozlar sharh qoldira oladi."
}, {
  icon: Lock,
  title: "Xavfsiz to'lov",
  desc: "To'lovlar faqat kelishilgan holatda, naqd yoki kelajakda onlayn amalga oshiriladi."
}, {
  icon: MessageSquareWarning,
  title: "Shikoyat berish",
  desc: "Har qanday muammoda ustaga yoki mijozga shikoyat yuborishingiz mumkin."
}, {
  icon: Phone,
  title: "Doimiy yordam",
  desc: "Support jamoasi savollaringizga tez orada javob beradi."
}];
export default function SafetyPage() {
  return <div className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6">
      <h1 className="text-center text-3xl font-extrabold text-[var(--color-navy)]">Xavfsizlik</h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[var(--color-muted)]">
        USTACHI.UZ mijozlar va ustalar uchun xavfsiz va ishonchli muhit yaratishga intiladi.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {points.map(p => <div key={p.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><p.icon className="h-5 w-5" /></span>
            <p className="mt-3 font-bold text-[var(--color-navy)]">{p.title}</p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{p.desc}</p>
          </div>)}
      </div>
    </div>;
}
