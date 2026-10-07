import { cn } from '@/utils/cn';
const variants = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-sm',
  secondary: 'bg-[var(--color-navy)] text-white hover:opacity-90',
  outline: 'bg-white text-[var(--color-navy)] border border-[var(--color-border)] hover:bg-[var(--color-bg)]',
  ghost: 'bg-transparent text-[var(--color-navy)] hover:bg-[var(--color-bg)]',
  danger: 'bg-[var(--color-error)] text-white hover:opacity-90'
};
const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
};
export default function Button({
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  fullWidth,
  className,
  children,
  disabled,
  ...rest
}) {
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 focus-ring disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap', variants[variant], sizes[size], fullWidth && 'w-full', className)} disabled={disabled || loading} {...rest}>
      {loading ? <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : icon}
      {children}
    </button>;
}
