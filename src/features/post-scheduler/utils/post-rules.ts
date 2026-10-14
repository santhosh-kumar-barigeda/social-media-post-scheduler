import type { Post, PostLockReason } from '../types/post';

/** Published posts and posts whose scheduled time has passed can no longer be edited or deleted. */
export function getPostLockReason(post: Post): PostLockReason | undefined {
  if (post.status === 'published') return 'published';
  if (new Date(post.scheduledAt).getTime() <= Date.now()) return 'past';
}
