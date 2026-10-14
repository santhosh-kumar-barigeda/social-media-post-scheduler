import { Skeleton } from '@/shared/components/ui/skeleton';
import { GROUPS } from './post-list-skeleton.constants';

export function PostListSkeleton() {
  return (
    <div className="flex flex-col gap-4" role="status" aria-label="Loading posts">
      {GROUPS.map((rows, groupIndex) => (
        <div key={groupIndex} className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b bg-muted/30 px-4 py-3">
            <Skeleton className="h-5 w-40" />
          </div>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
            >
              <Skeleton className="size-14 shrink-0" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="hidden h-5 w-20 sm:block" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
