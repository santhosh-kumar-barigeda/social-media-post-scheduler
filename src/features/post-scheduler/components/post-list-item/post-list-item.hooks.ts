import { useState } from 'react';
import { useDeletePost, useRetryPost } from '../../hooks';

export function usePostListItem(postId: string) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { mutate: retryPost, isPending: isRetrying } = useRetryPost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  function handleRetry() {
    retryPost(postId);
  }

  function handleDelete() {
    deletePost(postId, { onSettled: () => setIsDeleteOpen(false) });
  }

  return { isRetrying, isDeleting, isDeleteOpen, setIsDeleteOpen, handleRetry, handleDelete };
}
