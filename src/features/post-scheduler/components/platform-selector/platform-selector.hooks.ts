import type { Platform, PlatformSelectorProps } from '../../types/post';

export function usePlatformSelector({
  value,
  onChange,
}: Pick<PlatformSelectorProps, 'value' | 'onChange'>) {
  function toggle(platform: Platform, checked: boolean) {
    onChange(checked ? [...value, platform] : value.filter((id) => id !== platform));
  }

  return { toggle };
}
