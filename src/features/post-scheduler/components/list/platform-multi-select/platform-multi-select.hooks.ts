import type { Platform } from '@/features/post-scheduler/types/post';
import type { PlatformMultiSelectProps } from './platform-multi-select.types';

export function usePlatformMultiSelect({ value, onChange }: PlatformMultiSelectProps) {
  function toggle(platform: Platform, checked: boolean) {
    onChange(checked ? [...value, platform] : value.filter((id) => id !== platform));
  }

  function clear() {
    onChange([]);
  }

  return { toggle, clear };
}
