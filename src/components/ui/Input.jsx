import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
const Input = forwardRef(({
  label,
  error,
  hint,
  className,
  id,
  ...rest
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-navy)]">
          {label}
        </label>}
      <input id={inputId} ref={ref} className={cn('h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[var(--color-navy)] placeholder:text-[var(--color-muted)] transition-colors focus-ring', error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]', className)} {...rest} />
      {hint && !error && <span className="text-xs text-[var(--color-muted)]">{hint}</span>}
      {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
    </div>;
});
Input.displayName = 'Input';
export default Input;
