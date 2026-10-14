import { CheckCircle2, Clock } from 'lucide-react';
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
import type { PostEditLockedStateProps } from '../../types/post';

const CONTENT = {
  published: {
    icon: CheckCircle2,
    iconClassName: 'bg-indigo-50 text-indigo-600',
    title: 'This post is already published',
    description: "Published posts can't be edited.",
  },
  past: {
    icon: Clock,
    iconClassName: 'bg-amber-50 text-amber-600',
    title: "This post's scheduled time has passed",
    description: "Posts can't be edited once their scheduled time has passed.",
  },
};

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
