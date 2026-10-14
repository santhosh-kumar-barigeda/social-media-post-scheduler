import { cn } from 'cn';
import { Badge } from '@/shared/components/ui/badge';
import { STATUS_STYLES } from '@/features/post-scheduler/constants/post-list';
import type { PostStatusBadgeProps } from './post-status-badge.types';

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const { label, badgeClassName } = STATUS_STYLES[status];

  return (
    <Badge variant="outline" className={cn('font-medium', badgeClassName)}>
      {label}
    </Badge>
  );
}
