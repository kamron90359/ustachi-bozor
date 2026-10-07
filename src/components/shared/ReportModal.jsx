import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { reportService } from '@/services/reportService';
const reasons = ['Soxta profil', 'Sifatsiz xizmat', "Noto'g'ri ma'lumot", 'Nomaqbul xulq-atvor', 'Boshqa'];
export default function ReportModal({
  open,
  onClose,
  targetId,
  targetLabel
}) {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [reason, setReason] = useState('Sifatsiz xizmat');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit() {
    if (!user) {
      show('info', 'Shikoyat yuborish uchun tizimga kiring');
      return;
    }
    setLoading(true);
    await reportService.create({
      reason,
      description,
      reporterId: user.id,
      reporterName: `${user.firstName} ${user.lastName}`,
      targetType: 'master',
      targetId,
      targetLabel
    });
    show('success', 'Shikoyatingiz yuborildi, admin ko\'rib chiqadi');
    setDescription('');
    setLoading(false);
    onClose();
  }
  return <Modal open={open} onClose={onClose} title={`${targetLabel} haqida shikoyat`}>
      <div className="space-y-4">
        <Select label="Sabab" value={reason} onChange={e => setReason(e.target.value)}>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tavsif</label>
          <textarea rows={4} className="w-full rounded-lg border border-[var(--color-border)] px-3.5 py-2.5 text-sm focus-ring" value={description} onChange={e => setDescription(e.target.value)} placeholder="Muammoni batafsil yozing" />
        </div>
        <Button fullWidth disabled={!description} loading={loading} onClick={submit}>Shikoyat yuborish</Button>
      </div>
    </Modal>;
}
