import type { Post } from '@/features/post-scheduler/types/post';

export interface PostListItemProps {
  post: Post;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
