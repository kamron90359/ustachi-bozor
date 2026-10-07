import Badge from '@/components/ui/Badge';
const toneMap = {
  'Yangi': 'primary',
  'Qabul qilindi': 'warning',
  'Jarayonda': 'warning',
  'Yakunlandi': 'success',
  'Bekor qilindi': 'error',
  'Rad etildi': 'error'
};
export default function StatusBadge({
  status
}) {
  return <Badge tone={toneMap[status]}>{status}</Badge>;
}
