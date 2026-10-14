import type { Platform } from '@/features/post-scheduler/types/post';
import type { PlatformSelectorProps } from './platform-selector.types';

export function usePlatformSelector({
  value,
  onChange,
}: Pick<PlatformSelectorProps, 'value' | 'onChange'>) {
  function toggle(platform: Platform, checked: boolean) {
    onChange(checked ? [...value, platform] : value.filter((id) => id !== platform));
  }

  return { toggle };
}
