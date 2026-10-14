import type { Platform } from '@/features/post-scheduler/types/post';

export interface PlatformMultiSelectProps {
  value: Platform[];
  onChange: (platforms: Platform[]) => void;
}
