import type { Platform } from '@/features/post-scheduler/types/post';

export interface PlatformSelectorProps {
  value: Platform[];
  onChange: (platforms: Platform[]) => void;
  content: string;
  error?: string;
}
