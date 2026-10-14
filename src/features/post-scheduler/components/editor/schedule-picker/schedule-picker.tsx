import { format, startOfToday } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { useSchedulePicker } from './schedule-picker.hooks';
import type { SchedulePickerProps } from './schedule-picker.types';

export function SchedulePicker({ value, onChange, error }: SchedulePickerProps) {
  const { timeValue, handleDateSelect, handleTimeChange, handleTimeBlur } = useSchedulePicker({
    value,
    onChange,
  });

  return (
    <div>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              aria-invalid={Boolean(error)}
              className="h-11 w-full justify-between px-3 font-normal aria-invalid:border-destructive"
            >
              <span className="flex items-center gap-3">
                <CalendarDays className="size-4" />
                {value ? (
                  format(value, 'MMM d, yyyy  h:mm a')
                ) : (
                  <span className="text-muted-foreground">Pick a date and time</span>
                )}
              </span>
              <ChevronDown className="size-4" />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={handleDateSelect}
            defaultMonth={value ?? undefined}
            disabled={{ before: startOfToday() }}
          />
          <div className="border-t p-3">
            <Input
              type="time"
              aria-label="Time"
              value={timeValue}
              onChange={(event) => handleTimeChange(event.target.value)}
              onBlur={handleTimeBlur}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
