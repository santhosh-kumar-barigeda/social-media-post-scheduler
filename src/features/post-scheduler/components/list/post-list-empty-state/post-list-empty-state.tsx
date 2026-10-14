import { FilterX, Inbox } from 'lucide-react';
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
import type { PostListEmptyStateProps } from './post-list-empty-state.types';

export function PostListEmptyState({ hasFilters, onClearFilters }: PostListEmptyStateProps) {
  return (
    <Empty className="rounded-xl border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">{hasFilters ? <FilterX /> : <Inbox />}</EmptyMedia>
        <EmptyTitle>{hasFilters ? 'No posts match your filters' : 'No posts yet'}</EmptyTitle>
        <EmptyDescription>
          {hasFilters
            ? 'Try a different search term, or clear the platform and status filters.'
            : 'Create your first post and it will show up in your queue.'}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {hasFilters ? (
          <Button type="button" variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        ) : (
          <Link to="/posts/create" className={buttonVariants()}>
            Create post
          </Link>
        )}
      </EmptyContent>
    </Empty>
  );
}
