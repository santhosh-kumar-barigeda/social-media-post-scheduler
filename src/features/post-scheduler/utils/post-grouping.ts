import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import type { Post, PostGroup } from '../types/post';

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
