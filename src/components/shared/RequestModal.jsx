import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Calendar from './Calendar';
import TimeSlotPicker from './TimeSlotPicker';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { orderService } from '@/services/orderService';
const schema = z.object({
  name: z.string().min(2, "Ismingizni kiriting"),
  phone: z.string().min(9, 'Telefon raqamini kiriting'),
  service: z.string().min(1, 'Xizmatni tanlang'),
  description: z.string().min(5, "Muammoni qisqacha yozing"),
  address: z.string().min(3, 'Manzilni kiriting'),
  date: z.string().min(1, 'Sanani tanlang'),
  time: z.string().min(1, "Vaqtni tanlang"),
  comment: z.string().optional()
});
export default function RequestModal({
  open,
  onClose,
  master
}) {
  const {
    user
  } = useAuthStore();
  const {
    show
  } = useToastStore();
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user ? `${user.firstName} ${user.lastName}` : '',
      phone: user?.phone ?? '',
      service: master.services[0]?.title ?? '',
      date: new Date().toISOString().slice(0, 10)
    }
  });
  const selectedTime = watch('time');
  async function onSubmit(data) {
    try {
      await orderService.createOrder({
        customerId: user?.id ?? 'guest',
        customerName: data.name,
        customerPhone: data.phone,
        masterId: master.id,
        masterName: `${master.firstName} ${master.lastName}`,
        service: data.service,
        description: data.description,
        address: data.address,
        date: data.date,
        time: data.time,
        comment: data.comment,
        price: master.services.find(s => s.title === data.service)?.price
      });
      setSuccess(true);
      show('success', "So'rov muvaffaqiyatli yuborildi");
    } catch {
      show('error', 'Xatolik yuz berdi');
    }
  }
  function handleClose() {
    setSuccess(false);
    onClose();
  }
  return <Modal open={open} onClose={handleClose} title="So'rov yuborish">
      {success ? <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)]">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <p className="font-bold text-[var(--color-navy)]">So'rov yuborildi!</p>
          <p className="text-sm text-[var(--color-muted)]">{master.firstName} {master.lastName} tez orada siz bilan bog'lanadi.</p>
          <Button className="mt-2" onClick={handleClose}>Yopish</Button>
        </div> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Ism" placeholder="Ismingiz" error={errors.name?.message} {...register('name')} />
          <Input label="Telefon" placeholder="+998 90 123 45 67" error={errors.phone?.message} {...register('phone')} />
          <Select label="Xizmat" error={errors.service?.message} {...register('service')}>
            {master.services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </Select>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">Muammo / ish tavsifi</label>
            <textarea rows={3} placeholder="Muammoni qisqacha tasvirlab bering" className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--color-primary)]" {...register('description')} />
            {errors.description && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.description.message}</p>}
          </div>
          <Input label="Manzil" placeholder="Toshkent shahri, Chilonzor tumani" error={errors.address?.message} {...register('address')} />
          <input type="hidden" {...register('date')} />
          <input type="hidden" {...register('time')} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">Sana</label>
            <Calendar selected={selectedDate} onSelect={d => {
          setSelectedDate(d);
          setValue('date', d.toISOString().slice(0, 10), {
            shouldValidate: true
          });
        }} />
            {errors.date && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.date.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">Vaqt</label>
            <TimeSlotPicker selected={selectedTime} onSelect={t => setValue('time', t, {
          shouldValidate: true
        })} />
            {errors.time && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.time.message}</p>}
          </div>
          <Input label="Rasm yuklash (ixtiyoriy)" type="file" accept="image/*" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">Qo'shimcha izoh (ixtiyoriy)</label>
            <textarea rows={2} className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm focus-ring focus:border-[var(--color-primary)]" {...register('comment')} />
          </div>
          <Button type="submit" fullWidth loading={isSubmitting}>So'rov yuborish</Button>
        </form>}
    </Modal>;
}
