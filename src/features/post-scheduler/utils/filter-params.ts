import { format, isValid, parseISO } from 'date-fns';
import { PLATFORM_OPTIONS } from '../constants/platforms';
import { POST_STATUSES } from '../constants/post-list';
import type { Platform, PostStatus } from '../types/post';

const DAY_KEY_FORMAT = 'yyyy-MM-dd';

/** Reads repeated `platform` URL params, dropping unknown and duplicate values. */
export function parsePlatformParams(values: string[]): Platform[] {
  return PLATFORM_OPTIONS.filter(({ id }) => values.includes(id)).map(({ id }) => id);
}

export function parseStatusParam(value: string | null): PostStatus | undefined {
  return POST_STATUSES.find((status) => status === value);
}

/** Reads a `yyyy-MM-dd` URL param as a local date, ignoring invalid values. */
export function parseDateParam(value: string | null): Date | undefined {
  if (!value) return undefined;
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

export function formatDateParam(date: Date): string {
  return format(date, DAY_KEY_FORMAT);
}
