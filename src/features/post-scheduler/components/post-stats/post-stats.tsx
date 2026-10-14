import { AlertTriangle, CalendarDays, CheckCircle2, Clock, type LucideIcon } from 'lucide-react';
import { cn } from 'cn';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ALL_FILTER, STATUS_STYLES } from '../../constants/post-list';
import type { PostStats, PostStatsProps } from '../../types/post';

const STAT_ITEMS: {
  key: keyof PostStats;
  /** Status filter value this card selects */
  filter: string;
  label: string;
  icon: LucideIcon;
  cardClassName: string;
  iconClassName: string;
  ringClassName: string;
}[] = [
  {
    key: 'total',
    filter: ALL_FILTER,
    label: 'Total Posts',
    icon: CalendarDays,
    cardClassName: 'border-blue-100 bg-blue-50/70',
    iconClassName: 'bg-blue-100 text-blue-600',
    ringClassName: 'ring-blue-400',
  },
  { key: 'scheduled', filter: 'scheduled', icon: Clock, ...STATUS_STYLES.scheduled },
  { key: 'published', filter: 'published', icon: CheckCircle2, ...STATUS_STYLES.published },
  { key: 'failed', filter: 'failed', icon: AlertTriangle, ...STATUS_STYLES.failed },
];

export function PostStats({ stats, isLoading, activeStatus, onStatusSelect }: PostStatsProps) {
  // Selecting the active status card again clears the filter.
  function handleSelect(filter: string) {
    onStatusSelect(filter === activeStatus ? ALL_FILTER : filter);
  }

  return (
    <div
      role="group"
      aria-label="Filter by status"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {STAT_ITEMS.map(
        ({ key, filter, label, icon: Icon, cardClassName, iconClassName, ringClassName }) => {
          const isActive = filter === activeStatus;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(filter)}
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-shadow outline-none hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50',
                cardClassName,
                isActive && cn('ring-2', ringClassName),
              )}
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full',
                  iconClassName,
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-xs whitespace-nowrap text-muted-foreground">{label}</span>
                <span className="text-xl leading-tight font-semibold text-[#0f1b4c]">
                  {isLoading ? <Skeleton className="mt-0.5 h-6 w-10" /> : (stats?.[key] ?? '–')}
                </span>
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}
