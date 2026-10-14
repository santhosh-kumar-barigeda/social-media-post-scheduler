import { AlertTriangle, CalendarDays, CheckCircle2, Clock } from 'lucide-react';
import { ALL_FILTER, STATUS_STYLES } from '@/features/post-scheduler/constants/post-list';
import type { StatItem } from './post-stats.types';

export const STAT_ITEMS: StatItem[] = [
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
