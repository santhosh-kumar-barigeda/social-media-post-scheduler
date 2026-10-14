import { AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty';
import type { PostListErrorStateProps } from '../../types/post';

export function PostListErrorState({ message, onRetry }: PostListErrorStateProps) {
  return (
    <Empty role="alert" className="rounded-xl border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-50 text-red-600">
          <AlertCircle />
        </EmptyMedia>
        <EmptyTitle>Couldn't load your posts</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
