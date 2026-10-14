import type { DateRange } from 'react-day-picker';
import type { Platform } from '@/features/post-scheduler/types/post';

export interface PostListFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  platforms: Platform[];
  onPlatformsChange: (platforms: Platform[]) => void;
  dateRange?: DateRange;
  onDateRangeChange: (range?: DateRange) => void;
}
