import { cn } from 'cn';
import { Clock, ImageIcon, Pencil, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import type { PostListItemProps } from '../../types/post';
import { formatPostTime } from '../../utils/post-list';
import { PlatformIcon } from '../platform-icon';
import { PostStatusBadge } from '../post-status-badge';
import { usePostListItem } from './post-list-item.hooks';

export function PostListItem({ post, isSelected, onSelect }: PostListItemProps) {
  const { isRetrying, isDeleting, isDeleteOpen, setIsDeleteOpen, handleRetry, handleDelete } =
    usePostListItem(post.id);

  return (
    <li
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3 last:border-b-0',
        isSelected && 'bg-primary/5',
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(post.id)}
        aria-pressed={isSelected}
        className="flex min-w-0 flex-1 basis-64 items-center gap-3 rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {post.mediaUrl ? (
          <img
            src={post.mediaUrl}
            alt=""
            loading="lazy"
            className="size-14 shrink-0 rounded-md bg-muted object-cover"
          />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <ImageIcon className="size-5" aria-hidden />
          </span>
        )}
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="line-clamp-2 text-sm font-medium break-words">{post.content}</span>
          <span className="flex items-center gap-1.5">
            {post.platforms.map((platform) => (
              <PlatformIcon key={platform} platform={platform} className="size-5" />
            ))}
          </span>
          {post.status === 'failed' && post.errorMessage && (
            <span className="text-xs text-destructive">{post.errorMessage}</span>
          )}
        </span>
      </button>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" aria-hidden />
          <time dateTime={post.scheduledAt}>{formatPostTime(post.scheduledAt)}</time>
        </span>
        <PostStatusBadge status={post.status} />
      </div>

      <div className="flex items-center gap-1">
        {post.status === 'failed' && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
          >
            <RotateCcw className={cn('size-3.5', isRetrying && 'animate-spin')} />
            {isRetrying ? 'Retrying...' : 'Retry'}
          </Button>
        )}
        <Link
          to={`/posts/${post.id}/edit`}
          aria-label="Edit post"
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <Pencil />
        </Link>
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Delete post"
                className="text-destructive hover:text-destructive"
              />
            }
          >
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this post?</AlertDialogTitle>
              <AlertDialogDescription>
                This post will be permanently removed from your queue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
