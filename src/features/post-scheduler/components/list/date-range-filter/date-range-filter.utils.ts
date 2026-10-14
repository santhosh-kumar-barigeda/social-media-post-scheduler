import { format } from 'date-fns';
import { LABEL_FORMAT } from './date-range-filter.constants';
import type { DateRangeFilterProps } from './date-range-filter.types';

export function getDateRangeLabel({ value }: Pick<DateRangeFilterProps, 'value'>): string {
  if (!value?.from) return 'Any date';
  if (!value.to) return `From ${format(value.from, LABEL_FORMAT)}`;
  return `${format(value.from, 'MMM d')} – ${format(value.to, LABEL_FORMAT)}`;
}
