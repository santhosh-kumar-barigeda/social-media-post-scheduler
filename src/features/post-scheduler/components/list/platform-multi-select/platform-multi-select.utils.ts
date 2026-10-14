import { PLATFORM_OPTIONS } from '@/features/post-scheduler/constants/platforms';
import { MAX_NAMED_PLATFORMS } from './platform-multi-select.constants';
import type { PlatformMultiSelectProps } from './platform-multi-select.types';

export function getPlatformsLabel({ value }: Pick<PlatformMultiSelectProps, 'value'>): string {
  if (value.length === 0) return 'All platforms';
  if (value.length <= MAX_NAMED_PLATFORMS) {
    return PLATFORM_OPTIONS.filter(({ id }) => value.includes(id))
      .map(({ label }) => label)
      .join(', ');
  }
  return `${value.length} platforms`;
}
