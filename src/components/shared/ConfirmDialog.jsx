import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Tasdiqlash',
  danger
}) {
  return <Modal open={open} onClose={onClose} title={title}>
      {description && <p className="text-sm text-[var(--color-muted)]">{description}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Bekor qilish</Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={() => {
        onConfirm();
        onClose();
      }}>{confirmLabel}</Button>
      </div>
    </Modal>;
}
