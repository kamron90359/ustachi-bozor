import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { categoryService } from '@/services/categoryService';
import { useToastStore } from '@/store/toastStore';
export default function AdminCategoriesPage() {
  const {
    show
  } = useToastStore();
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  function load() {
    categoryService.getCategories().then(setCategories);
  }
  useEffect(load, []);
  async function add() {
    await categoryService.create(name);
    show('success', "Kategoriya qo'shildi");
    setModalOpen(false);
    setName('');
    load();
  }
  async function toggle(c) {
    await categoryService.update(c.id, {
      active: !c.active
    });
    load();
  }
  async function remove(c) {
    await categoryService.remove(c.id);
    show('info', "Kategoriya o'chirildi");
    load();
  }
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Kategoriyalar</h1>
        <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setModalOpen(true)}>Kategoriya qo'shish</Button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(c => <div key={c.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-navy)]">{c.name}</p>
              <p className="text-xs text-[var(--color-muted)]">{c.masterCount ?? 0} ta usta</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge tone={c.active ? 'success' : 'neutral'}>{c.active ? 'Faol' : 'Nofaol'}</Badge>
              <button onClick={() => toggle(c)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--color-bg)]"><Pencil className="h-3.5 w-3.5" /></button>
              <button onClick={() => remove(c)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error-light)]"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>)}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Yangi kategoriya">
        <Input label="Nomi" value={name} onChange={e => setName(e.target.value)} />
        <Button fullWidth className="mt-4" disabled={!name} onClick={add}>Qo'shish</Button>
      </Modal>
    </div>;
}
