import { Link } from 'react-router';
import { ErrorState } from '@/shared/components/feedback/error-state';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { PostEditForm } from '../../components/editor/post-edit-form';
import { PostEditLockedState } from '../../components/editor/post-edit-locked-state';
import { PostEditSkeleton } from '../../components/editor/post-edit-skeleton';
import { getPostLockReason } from '../../utils/post-rules';
import { usePostEdit } from './post-edit.hooks';

export function PostEdit() {
  const { post, isLoading, isError, errorMessage, refetch } = usePostEdit();

  if (isLoading) return <PostEditSkeleton />;
  if (isError || !post) {
    return (
      <ErrorState title="Couldn't load this post" description={errorMessage}>
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Try again
        </Button>
        <Link to="/posts" className={buttonVariants({ variant: 'ghost' })}>
          Back to posts
        </Link>
      </ErrorState>
    );
  }

  const lockReason = getPostLockReason(post);
  if (lockReason) return <PostEditLockedState reason={lockReason} />;

  // Keyed by id so navigating between posts always starts from that post's values.
  return <PostEditForm key={post.id} post={post} />;
}
