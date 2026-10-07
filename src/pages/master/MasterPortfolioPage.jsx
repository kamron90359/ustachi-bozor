import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
export default function MasterPortfolioPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(null);
  const fileInputRef = useRef(null);
  function load() {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(setMaster);
  }
  useEffect(load, [user]);
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
    if (!master || files.length === 0) return;
    const newImages = await Promise.all(files.map(async file => ({
      id: `pf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      image: await readFileAsDataUrl(file)
    })));
    const portfolio = [...master.portfolio, ...newImages];
    await masterService.updateMaster(master.id, {
      portfolio
    });
    show('success', "Rasm qo'shildi");
    load();
  }
  async function removeImage(id) {
    if (!master) return;
    const portfolio = master.portfolio.filter(p => p.id !== id);
    await masterService.updateMaster(master.id, {
      portfolio
    });
    show('info', "Rasm o'chirildi");
    load();
  }
  if (!master) return null;
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Portfolio</h1>
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Rasm qo'shish</button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFilesSelected} />
      </div>
      <div className="mt-4">
        {master.portfolio.length === 0 ? <EmptyState title="Portfolio bo'sh" description="Ishlaringiz namunasini qo'shing" /> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {master.portfolio.map(p => <div key={p.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={p.image} alt="" className="h-full w-full object-cover" />
                <button onClick={() => removeImage(p.id)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[var(--color-error)] opacity-0 shadow transition-opacity group-hover:opacity-100" aria-label="O'chirish">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>)}
          </div>}
      </div>
    </div>;
}
