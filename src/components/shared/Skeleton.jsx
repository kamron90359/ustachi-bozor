import { cn } from '@/utils/cn';
export function Skeleton({
  className
}) {
  return <div className={cn('animate-pulse rounded-lg bg-[var(--color-border)]/60', className)} />;
}
export function MasterCardSkeleton() {
  return <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-14 w-14 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-3/4" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>;
}
export function TableRowSkeleton() {
  return <div className="flex items-center gap-4 border-b border-[var(--color-border)] px-4 py-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-1/6" />
      <Skeleton className="h-3 w-1/6" />
    </div>;
}
