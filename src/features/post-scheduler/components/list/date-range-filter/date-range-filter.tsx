import { startOfToday } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import type { DateRangeFilterProps } from './date-range-filter.types';
import { getDateRangeLabel } from './date-range-filter.utils';

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label="Filter by date"
            className="h-10 w-full justify-between px-3 font-normal"
          />
        }
      >
        <span className="flex items-center gap-2">
          <CalendarDays className="size-4" aria-hidden />
          {getDateRangeLabel({ value })}
        </span>
        <ChevronDown className="size-4" aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          defaultMonth={value?.from}
          numberOfMonths={1}
        />
        <div className="flex justify-between gap-2 border-t p-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
            Any date
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange({ from: startOfToday() })}
          >
            From today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
