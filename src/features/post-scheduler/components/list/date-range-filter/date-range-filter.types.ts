import type { DateRange } from 'react-day-picker';

export interface DateRangeFilterProps {
  value?: DateRange;
  onChange: (range?: DateRange) => void;
}
