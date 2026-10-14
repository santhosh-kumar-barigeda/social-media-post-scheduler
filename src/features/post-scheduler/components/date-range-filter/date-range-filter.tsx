import { format, startOfToday } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import type { DateRangeFilterProps } from '../../types/post';

const LABEL_FORMAT = 'MMM d, yyyy';

function getLabel({ value }: Pick<DateRangeFilterProps, 'value'>): string {
  if (!value?.from) return 'Any date';
  if (!value.to) return `From ${format(value.from, LABEL_FORMAT)}`;
  return `${format(value.from, 'MMM d')} – ${format(value.to, LABEL_FORMAT)}`;
}

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
          {getLabel({ value })}
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
