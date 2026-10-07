import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/shared/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { masterService } from '@/services/masterService';
import { formatPrice } from '@/utils/format';
export default function MasterServicesPage() {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [master, setMaster] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  function load() {
    if (!user) return;
    masterService.getMasterByUserId(user.id).then(setMaster);
  }
  useEffect(load, [user]);
  function openNew() {
    setEditing(null);
    setTitle('');
    setPrice('');
    setModalOpen(true);
  }
  function openEdit(s) {
    setEditing(s);
    setTitle(s.title);
    setPrice(String(s.price));
    setModalOpen(true);
  }
  async function save() {
    if (!master) return;
    let services;
    if (editing) {
      services = master.services.map(s => s.id === editing.id ? {
        ...s,
        title,
        price: Number(price)
      } : s);
    } else {
      services = [...master.services, {
        id: `svc-${Date.now()}`,
        title,
        price: Number(price),
        priceFrom: true,
        active: true
      }];
    }
    await masterService.updateMaster(master.id, {
      services,
      priceFrom: Math.min(...services.map(s => s.price))
    });
    show('success', 'Saqlandi');
    setModalOpen(false);
    load();
  }
  async function remove(id) {
    if (!master) return;
    const services = master.services.filter(s => s.id !== id);
    await masterService.updateMaster(master.id, {
      services
    });
    show('info', "Xizmat o'chirildi");
    load();
  }
  async function toggleActive(s) {
    if (!master) return;
    const services = master.services.map(x => x.id === s.id ? {
      ...x,
      active: !x.active
    } : x);
    await masterService.updateMaster(master.id, {
      services
    });
    load();
  }
  if (!master) return null;
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Xizmatlar</h1>
        <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={openNew}>Xizmat qo'shish</Button>
      </div>

      <div className="mt-4">
        {master.services.length === 0 ? <EmptyState title="Xizmatlar yo'q" /> : <div className="divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
            {master.services.map(s => <div key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{s.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{formatPrice(s.price)}dan</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                    <input type="checkbox" checked={s.active} onChange={() => toggleActive(s)} className="h-4 w-4 accent-[var(--color-primary)]" /> Faol
                  </label>
                  <button onClick={() => openEdit(s)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]" aria-label="Tahrirlash"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(s.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error-light)]" aria-label="O'chirish"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>)}
          </div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Xizmatni tahrirlash' : "Yangi xizmat qo'shish"}>
        <div className="space-y-4">
          <Input label="Xizmat nomi" value={title} onChange={e => setTitle(e.target.value)} />
          <Input label="Narx (so'm)" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          <Button fullWidth disabled={!title || !price} onClick={save}>Saqlash</Button>
        </div>
      </Modal>
    </div>;
}
