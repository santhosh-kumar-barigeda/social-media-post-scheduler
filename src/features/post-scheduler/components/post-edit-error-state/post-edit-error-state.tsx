import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty';
import type { PostEditErrorStateProps } from '../../types/post';

export function PostEditErrorState({ message, onRetry }: PostEditErrorStateProps) {
  return (
    <Empty role="alert" className="rounded-xl border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-50 text-red-600">
          <AlertCircle />
        </EmptyMedia>
        <EmptyTitle>Couldn't load this post</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
        <Link to="/posts" className={buttonVariants({ variant: 'ghost' })}>
          Back to posts
        </Link>
      </EmptyContent>
    </Empty>
  );
}
