import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, Trash2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
import { categories, regions, districtsByRegion, defaultDistricts } from '@/data/categories';
import { cn } from '@/utils/cn';
const stepTitles = ['Shaxsiy ma\'lumot', 'Kategoriya', 'Xizmatlar', 'Narxlar', 'Joylashuv', 'Ish vaqti', 'Portfolio', 'Ko\'rib chiqish'];
const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
export default function MasterOnboardingPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profession, setProfession] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [experience, setExperience] = useState(1);
  const [about, setAbout] = useState('');
  const [services, setServices] = useState([{
    title: '',
    price: 0,
    priceFrom: true
  }]);
  const [region, setRegion] = useState(regions[0]);
  const [district, setDistrict] = useState((districtsByRegion[regions[0]] || defaultDistricts)[0]);
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState(days.map(d => ({
    day: d,
    working: d !== 'Yakshanba',
    start: '09:00',
    end: '18:00'
  })));
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const fileInputRef = useRef(null);
  if (!user) return null;
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  async function handleFilesSelected(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;
    const newImages = await Promise.all(files.map(async file => ({
      id: `pf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      image: await readFileAsDataUrl(file)
    })));
    setPortfolioImages(prev => [...prev, ...newImages]);
  }
  function removePortfolioImage(id) {
    setPortfolioImages(prev => prev.filter(p => p.id !== id));
  }
  function updateService(i, patch) {
    setServices(prev => prev.map((s, idx) => idx === i ? {
      ...s,
      ...patch
    } : s));
  }
  async function publish() {
    setPublishing(true);
    try {
      const master = await masterService.createMasterProfile(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        profession,
        categoryId,
        experience,
        about,
        region,
        district,
        address,
        services: services.filter(s => s.title).map((s, i) => ({
          ...s,
          id: `svc-${i}`,
          active: true
        })),
        portfolio: portfolioImages,
        workingHours: hours,
        priceFrom: Math.min(...services.filter(s => s.price).map(s => s.price), Infinity) || 0
      });
      await masterService.updateMaster(master.id, {
        published: true
      });
      show('success', "Profilingiz nashr qilindi!");
      navigate('/master');
    } finally {
      setPublishing(false);
    }
  }
  const canNext = [profession.trim().length > 1, !!categoryId, services.some(s => s.title && s.price > 0), services.every(s => !s.title || s.price > 0), !!region && !!district, true, true, true][step - 1];
  return <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Usta profilini yaratish</h1>

      <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
        {stepTitles.map((t, i) => <div key={t} className="flex items-center gap-1">
            <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', i + 1 <= step ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-muted)] border border-[var(--color-border)]')}>
              {i + 1 < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            {i < stepTitles.length - 1 && <span className="h-0.5 w-4 bg-[var(--color-border)]" />}
          </div>)}
      </div>
      <p className="mt-2 text-sm font-semibold text-[var(--color-muted)]">{step}. {stepTitles[step - 1]}</p>

      <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
        {step === 1 && <div className="space-y-4">
            <Input label="Kasb / mutaxassislik" placeholder="Masalan: Santexnik" value={profession} onChange={e => setProfession(e.target.value)} />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Tajriba (yil)</label>
              <input type="range" min={0} max={30} value={experience} onChange={e => setExperience(Number(e.target.value))} className="w-full accent-[var(--color-primary)]" />
              <p className="text-sm text-[var(--color-muted)]">{experience} yil</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Siz haqingizda</label>
              <textarea rows={4} className="w-full rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 text-sm focus-ring" value={about} onChange={e => setAbout(e.target.value)} placeholder="Tajribangiz, ixtisosligingiz haqida qisqacha yozing" />
            </div>
          </div>}

        {step === 2 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map(c => <button key={c.id} onClick={() => setCategoryId(c.id)} className={cn('rounded-xl border p-4 text-left text-sm font-semibold', categoryId === c.id ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]' : 'border-[var(--color-border)] text-[var(--color-navy)]')}>
                {c.name}
              </button>)}
          </div>}

        {(step === 3 || step === 4) && <div className="space-y-3">
            {services.map((s, i) => <div key={i} className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] p-3 sm:flex-row sm:items-center">
                <Input placeholder="Xizmat nomi" value={s.title} onChange={e => updateService(i, {
            title: e.target.value
          })} className="sm:flex-1" />
                <Input placeholder="Narx (so'm)" type="number" value={s.price || ''} onChange={e => updateService(i, {
            price: Number(e.target.value)
          })} className="sm:w-40" />
                <button onClick={() => setServices(prev => prev.filter((_, idx) => idx !== i))} className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error-light)]" aria-label="O'chirish">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>)}
            <Button variant="outline" size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setServices(prev => [...prev, {
          title: '',
          price: 0,
          priceFrom: true
        }])}>
              Xizmat qo'shish
            </Button>
          </div>}

        {step === 5 && <div className="space-y-4">
            <Select label="Viloyat" value={region} onChange={e => {
          setRegion(e.target.value);
          setDistrict((districtsByRegion[e.target.value] || defaultDistricts)[0]);
        }}>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </Select>
            <Select label="Tuman" value={district} onChange={e => setDistrict(e.target.value)}>
              {(districtsByRegion[region] || defaultDistricts).map(d => <option key={d} value={d}>{d}</option>)}
            </Select>
            <Input label="Manzil" placeholder="Ko'cha, uy raqami" value={address} onChange={e => setAddress(e.target.value)} />
          </div>}

        {step === 6 && <div className="space-y-2">
            {hours.map((d, i) => <div key={d.day} className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border)] p-3">
                <label className="flex w-32 items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={d.working} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
              ...h,
              working: e.target.checked
            } : h))} className="h-4 w-4 accent-[var(--color-primary)]" />
                  {d.day}
                </label>
                {d.working && <>
                    <input type="time" value={d.start} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
              ...h,
              start: e.target.value
            } : h))} className="rounded-lg border border-[var(--color-border)] px-2 py-1.5 text-sm" />
                    <span className="text-[var(--color-muted)]">—</span>
                    <input type="time" value={d.end} onChange={e => setHours(prev => prev.map((h, idx) => idx === i ? {
              ...h,
              end: e.target.value
            } : h))} className="rounded-lg border border-[var(--color-border)] px-2 py-1.5 text-sm" />
                  </>}
              </div>)}
          </div>}

        {step === 7 && <div>
            <p className="text-sm text-[var(--color-muted)]">Portfolio uchun rasmlarni kompyuteringizdan tanlab yuklang</p>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFilesSelected} />
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {portfolioImages.map(img => <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-bg)]">
                  <img src={img.image} className="h-full w-full object-cover" alt="" />
                  <button onClick={() => removePortfolioImage(img.id)} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[var(--color-error)] shadow"><Trash2 className="h-3 w-3" /></button>
                </div>)}
              <button onClick={() => fileInputRef.current?.click()} className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>}

        {step === 8 && <div className="space-y-4">
            <div className="rounded-xl bg-[var(--color-bg)] p-4 text-sm">
              <p className="font-bold text-[var(--color-navy)]">{user.firstName} {user.lastName} — {profession}</p>
              <p className="mt-1 text-[var(--color-muted)]">{categories.find(c => c.id === categoryId)?.name} · {experience} yillik tajriba</p>
              <p className="mt-1 text-[var(--color-muted)]">{region}, {district}</p>
              <p className="mt-1 text-[var(--color-muted)]">{services.filter(s => s.title).length} ta xizmat · {portfolioImages.length} ta portfolio rasm</p>
            </div>
            <p className="text-xs text-[var(--color-muted)]">Nashr qilingandan so'ng profilingiz qidiruvda ko'rina boshlaydi. Admin tomonidan tekshirilgach VERIFIED belgisi qo'shiladi.</p>
            <Button fullWidth loading={publishing} onClick={publish}>Profilni nashr qilish</Button>
          </div>}
      </div>

      {step < 8 && <div className="mt-5 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={() => setStep(s => s - 1)}>Orqaga</Button>
          <Button disabled={!canNext} onClick={() => setStep(s => s + 1)}>Davom etish</Button>
        </div>}
    </div>;
}
