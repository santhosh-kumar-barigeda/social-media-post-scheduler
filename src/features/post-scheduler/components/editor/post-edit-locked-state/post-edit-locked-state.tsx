import { Link } from 'react-router';
import { buttonVariants } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty';
import type { PostEditLockedStateProps } from './post-edit-locked-state.types';
import { CONTENT } from './post-edit-locked-state.constants';

export function PostEditLockedState({ reason }: PostEditLockedStateProps) {
  const { icon: Icon, iconClassName, title, description } = CONTENT[reason];

  return (
    <Empty className="rounded-xl border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className={iconClassName}>
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="/posts" className={buttonVariants({ variant: 'outline' })}>
          Back to posts
        </Link>
      </EmptyContent>
    </Empty>
  );
}
