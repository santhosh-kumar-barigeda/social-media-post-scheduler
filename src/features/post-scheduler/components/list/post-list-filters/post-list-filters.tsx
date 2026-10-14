import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { DateRangeFilter } from '../date-range-filter';
import { PlatformMultiSelect } from '../platform-multi-select';
import type { PostListFiltersProps } from './post-list-filters.types';

export function PostListFilters({
  search,
  onSearchChange,
  platforms,
  onPlatformsChange,
  dateRange,
  onDateRangeChange,
}: PostListFiltersProps) {
  return (
    <div className="@container">
      <div className="grid gap-3 @min-[32rem]:grid-cols-[minmax(0,1fr)_11rem_13rem]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search posts"
            placeholder="Search posts..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <PlatformMultiSelect value={platforms} onChange={onPlatformsChange} />
        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
      </div>
    </div>
  );
}
