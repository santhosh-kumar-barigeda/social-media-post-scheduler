import type { LucideIcon } from 'lucide-react';
import type { PostStats } from '@/features/post-scheduler/types/post';

export interface PostStatsProps {
  stats?: PostStats;
  isLoading: boolean;
  /** Currently selected status filter, or `all` */
  activeStatus: string;
  onStatusSelect: (status: string) => void;
}

export interface StatItem {
  key: keyof PostStats;
  /** Status filter value this card selects */
  filter: string;
  label: string;
  icon: LucideIcon;
  cardClassName: string;
  iconClassName: string;
  ringClassName: string;
}
