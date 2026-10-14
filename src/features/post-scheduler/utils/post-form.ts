import { addHours, startOfHour } from 'date-fns';
import { PLATFORM_OPTIONS } from '../constants/platforms';
import type { Platform, PlatformLimitStatus, Post, PostFormValues } from '../types/post';

export function getDefaultPostFormValues(): PostFormValues {
  return {
    content: '',
    mediaUrl: '',
    platforms: [],
    scheduledAt: addHours(startOfHour(new Date()), 1),
  };
}

export function getLimitStatuses(content: string, platforms: Platform[]): PlatformLimitStatus[] {
  const count = content.length;

  return PLATFORM_OPTIONS.filter(({ id }) => platforms.includes(id)).map(({ id, limit }) => ({
    platform: id,
    count,
    limit,
    isOver: count > limit,
    overBy: Math.max(0, count - limit),
  }));
}

export function postToFormValues(post: Post): PostFormValues {
  return {
    content: post.content,
    mediaUrl: post.mediaUrl ?? '',
    platforms: post.platforms,
    scheduledAt: new Date(post.scheduledAt),
  };
}
