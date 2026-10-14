import type { PostStatus } from '../types/post';

export const ALL_FILTER = 'all';
export const SEARCH_DEBOUNCE_MS = 300;
export const POST_STATUSES: PostStatus[] = ['scheduled', 'published', 'failed'];

/** Single source for status colors, shared by the stat cards and the post badges. */
export const STATUS_STYLES: Record<
  PostStatus,
  {
    label: string;
    badgeClassName: string;
    cardClassName: string;
    iconClassName: string;
    ringClassName: string;
  }
> = {
  scheduled: {
    label: 'Scheduled',
    badgeClassName: 'border-green-200 bg-green-50 text-green-700',
    cardClassName: 'border-green-100 bg-green-50/70',
    iconClassName: 'bg-green-100 text-green-600',
    ringClassName: 'ring-green-400',
  },
  published: {
    label: 'Published',
    badgeClassName: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    cardClassName: 'border-indigo-100 bg-indigo-50/70',
    iconClassName: 'bg-indigo-100 text-indigo-600',
    ringClassName: 'ring-indigo-400',
  },
  failed: {
    label: 'Failed',
    badgeClassName: 'border-red-200 bg-red-50 text-red-700',
    cardClassName: 'border-red-100 bg-red-50/70',
    iconClassName: 'bg-red-100 text-red-600',
    ringClassName: 'ring-red-400',
  },
};
