import type { Platform, Post, PostLockReason } from '../types/post';

/** Published posts and posts whose scheduled time has passed can no longer be edited or deleted. */
export function getPostLockReason(post: Post): PostLockReason | undefined {
  if (post.status === 'published') return 'published';
  if (new Date(post.scheduledAt).getTime() <= Date.now()) return 'past';
}

/** Delimited so `,x,` can match one platform without matching part of another. */
export function toPlatformsKey(platforms: Platform[]): string {
  return `,${platforms.join(',')},`;
}
