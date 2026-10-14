import { PostEditErrorState } from '../../components/post-edit-error-state';
import { PostEditForm } from '../../components/post-edit-form';
import { PostEditLockedState } from '../../components/post-edit-locked-state';
import { PostEditSkeleton } from '../../components/post-edit-skeleton';
import { getPostLockReason } from '../../utils/post-list';
import { usePostEdit } from './post-edit.hooks';

export function PostEdit() {
  const { post, isLoading, isError, errorMessage, refetch } = usePostEdit();

  if (isLoading) return <PostEditSkeleton />;
  if (isError || !post) {
    return <PostEditErrorState message={errorMessage} onRetry={() => void refetch()} />;
  }

  const lockReason = getPostLockReason(post);
  if (lockReason) return <PostEditLockedState reason={lockReason} />;

  // Keyed by id so navigating between posts always starts from that post's values.
  return <PostEditForm key={post.id} post={post} />;
}
