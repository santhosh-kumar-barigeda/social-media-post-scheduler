import { cn } from 'cn';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import type { PostDayGroupProps } from '../../types/post';
import { PostListItem } from '../post-list-item';
import { usePostDayGroup } from './post-day-group.hooks';

export function PostDayGroup({ group, selectedId, onSelect }: PostDayGroupProps) {
  const { isOpen, toggle } = usePostDayGroup();
  const count = group.posts.length;

  return (
    <section aria-label={group.label} className="overflow-hidden rounded-xl border bg-card">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 border-b bg-muted/30 px-4 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CalendarDays className="size-4 text-muted-foreground" aria-hidden />
        <h2 className="font-semibold">{group.label}</h2>
        {group.dateText && (
          <span className="text-sm text-muted-foreground">· {group.dateText}</span>
        )}
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          {count} {count === 1 ? 'post' : 'posts'}
        </Badge>
        <ChevronDown
          className={cn('ml-auto size-4 transition-transform', !isOpen && '-rotate-90')}
          aria-hidden
        />
      </button>
      {isOpen && (
        <ul>
          {group.posts.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              isSelected={post.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
