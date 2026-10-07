import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
const Select = forwardRef(({
  label,
  error,
  className,
  id,
  children,
  ...rest
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-navy)]">
          {label}
        </label>}
      <div className="relative">
        <select id={selectId} ref={ref} className={cn('h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-9 text-sm text-[var(--color-navy)] transition-colors focus-ring', error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]', className)} {...rest}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
      </div>
      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
    </div>;
});
Select.displayName = 'Select';
export default Select;
