import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Ban } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/shared/EmptyState';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { reportService } from '@/services/reportService';
import { masterService } from '@/services/masterService';
import { useToastStore } from '@/store/toastStore';
import { formatDate } from '@/utils/format';
const toneByStatus = {
  Yangi: 'primary',
  "Ko'rib chiqilmoqda": 'warning',
  'Hal qilindi': 'success',
  'Rad etildi': 'error'
};
export default function AdminReportsPage() {
  const {
    show
  } = useToastStore();
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState('');
  const [blockTarget, setBlockTarget] = useState(null);
  function load() {
    reportService.getAll().then(setReports);
  }
  useEffect(load, []);
  async function updateStatus(r, next) {
    await reportService.updateStatus(r.id, next);
    show('info', 'Shikoyat holati yangilandi');
    load();
  }
  async function blockMaster() {
    if (!blockTarget) return;
    await masterService.updateMaster(blockTarget.targetId, {
      published: false
    });
    await reportService.updateStatus(blockTarget.id, 'Hal qilindi');
    show('success', 'Usta bloklandi va shikoyat hal qilindi');
    load();
  }
  const filtered = status ? reports.filter(r => r.status === status) : reports;
  return <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[var(--color-navy)]">Shikoyatlar</h1>
        <Select value={status} onChange={e => setStatus(e.target.value)} className="!h-9 !w-48 !text-xs">
          <option value="">Barcha statuslar</option>
          <option value="Yangi">Yangi</option>
          <option value="Ko'rib chiqilmoqda">Ko'rib chiqilmoqda</option>
          <option value="Hal qilindi">Hal qilindi</option>
          <option value="Rad etildi">Rad etildi</option>
        </Select>
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? <EmptyState title="Shikoyatlar yo'q" /> : <div className="space-y-3">
            {filtered.map(r => <div key={r.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[var(--color-navy)]">{r.reason} — {r.targetLabel}</p>
                    <p className="text-xs text-[var(--color-muted)]">{r.reporterName} tomonidan · {formatDate(r.createdAt)}</p>
                  </div>
                  <Badge tone={toneByStatus[r.status]}>{r.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{r.description}</p>
                {r.status !== 'Hal qilindi' && r.status !== 'Rad etildi' && <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" icon={<CheckCircle2 className="h-3.5 w-3.5" />} onClick={() => updateStatus(r, 'Hal qilindi')}>Hal qilindi deb belgilash</Button>
                    <Button size="sm" variant="outline" icon={<XCircle className="h-3.5 w-3.5" />} onClick={() => updateStatus(r, 'Rad etildi')}>Rad etish</Button>
                    {r.targetType === 'master' && <Button size="sm" variant="danger" icon={<Ban className="h-3.5 w-3.5" />} onClick={() => setBlockTarget(r)}>Ustani bloklash</Button>}
                  </div>}
              </div>)}
          </div>}
      </div>

      {blockTarget && <ConfirmDialog open={!!blockTarget} onClose={() => setBlockTarget(null)} onConfirm={blockMaster} title="Ustani bloklash" description={`${blockTarget.targetLabel} profilini bloklab, shikoyatni hal qilindi deb belgilaysizmi?`} confirmLabel="Bloklash" danger />}
    </div>;
}
