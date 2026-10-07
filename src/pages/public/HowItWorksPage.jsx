import { Search, UserCheck, Send, Hammer, Star } from 'lucide-react';
const steps = [{
  icon: Search,
  title: 'Xizmatni tanlang',
  desc: 'Kerakli xizmat yoki kategoriyani tanlang va qidiruvni boshlang.'
}, {
  icon: UserCheck,
  title: 'Ustani toping',
  desc: 'Filtr va reyting orqali eng mos ustani toping, profilini ko\'ring.'
}, {
  icon: Send,
  title: "So'rov yuboring",
  desc: "Ustaga to'g'ridan-to'g'ri so'rov yuboring va javob kuting."
}, {
  icon: Hammer,
  title: 'Ish boshlandi',
  desc: 'Kelishilgan sana va vaqtda usta ishni boshlaydi.'
}, {
  icon: Star,
  title: 'Baholang',
  desc: 'Ish tugagach, sharh qoldiring va boshqalarga yordam bering.'
}];
export default function HowItWorksPage() {
  return <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6">
      <h1 className="text-center text-3xl font-extrabold text-[var(--color-navy)]">Qanday ishlaydi?</h1>
      <p className="mt-2 text-center text-sm text-[var(--color-muted)]">Besh oddiy qadamda kerakli ustangizni toping</p>
      <div className="mt-10 space-y-4">
        {steps.map((s, i) => <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]"><s.icon className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-bold text-[var(--color-primary)]">QADAM {i + 1}</p>
              <p className="font-bold text-[var(--color-navy)]">{s.title}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{s.desc}</p>
            </div>
          </div>)}
      </div>
    </div>;
}
