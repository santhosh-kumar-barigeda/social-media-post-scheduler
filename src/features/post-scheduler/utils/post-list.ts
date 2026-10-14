import { format, isToday, isTomorrow, isValid, isYesterday, parseISO } from 'date-fns';
import { PLATFORM_OPTIONS } from '../constants/platforms';
import { POST_STATUSES } from '../constants/post-list';
import type { Platform, Post, PostGroup, PostStatus } from '../types/post';

const DAY_KEY_FORMAT = 'yyyy-MM-dd';
const DATE_FORMAT = 'MMM d, yyyy';

function getRelativeDayLabel(date: Date): string | null {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return null;
}

/** Groups posts by their local calendar day, keeping the incoming order. */
export function groupPostsByDay(posts: Post[]): PostGroup[] {
  const groups = new Map<string, PostGroup>();

  for (const post of posts) {
    const date = new Date(post.scheduledAt);
    const key = format(date, DAY_KEY_FORMAT);
    const existing = groups.get(key);

    if (existing) {
      existing.posts.push(post);
      continue;
    }

    const relativeLabel = getRelativeDayLabel(date);
    groups.set(key, {
      key,
      label: relativeLabel ?? format(date, 'EEE, MMM d, yyyy'),
      dateText: relativeLabel ? format(date, DATE_FORMAT) : undefined,
      posts: [post],
    });
  }

  return [...groups.values()];
}

/** Formats a UTC ISO string in the user's local time zone. */
export function formatPostTime(scheduledAt: string): string {
  return format(new Date(scheduledAt), 'h:mm a');
}

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

/** Delimited so `,x,` can match one platform without matching part of another. */
export function toPlatformsKey(platforms: Platform[]): string {
  return `,${platforms.join(',')},`;
}
