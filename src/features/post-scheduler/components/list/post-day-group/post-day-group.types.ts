import type { PostGroup } from '@/features/post-scheduler/types/post';

export interface PostDayGroupProps {
  group: PostGroup;
  selectedId?: string;
  onSelect: (id: string) => void;
}
