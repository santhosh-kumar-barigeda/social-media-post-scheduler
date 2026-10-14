import type { Platform, PlatformMultiSelectProps } from '../../types/post';

export function usePlatformMultiSelect({ value, onChange }: PlatformMultiSelectProps) {
  function toggle(platform: Platform, checked: boolean) {
    onChange(checked ? [...value, platform] : value.filter((id) => id !== platform));
  }

  function clear() {
    onChange([]);
  }

  return { toggle, clear };
}
