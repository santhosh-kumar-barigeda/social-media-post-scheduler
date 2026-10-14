import type { PostLockReason } from '@/features/post-scheduler/types/post';

export interface PostEditLockedStateProps {
  reason: PostLockReason;
}
