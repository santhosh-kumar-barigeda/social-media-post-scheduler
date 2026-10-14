import { ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { PLATFORM_OPTIONS } from '@/features/post-scheduler/constants/platforms';
import { PlatformIcon } from '../../common/platform-icon';
import { usePlatformMultiSelect } from './platform-multi-select.hooks';
import type { PlatformMultiSelectProps } from './platform-multi-select.types';
import { getPlatformsLabel } from './platform-multi-select.utils';

export function PlatformMultiSelect({ value, onChange }: PlatformMultiSelectProps) {
  const { toggle, clear } = usePlatformMultiSelect({ value, onChange });

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label="Filter by platform"
            className="h-10 w-full justify-between px-3 font-normal"
          />
        }
      >
        <span className="truncate">{getPlatformsLabel({ value })}</span>
        <ChevronDown className="size-4 shrink-0" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <ul className="flex flex-col">
          {PLATFORM_OPTIONS.map(({ id, label }) => (
            <li key={id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent">
                <Checkbox
                  checked={value.includes(id)}
                  onCheckedChange={(checked) => toggle(id, checked)}
                />
                <PlatformIcon platform={id} className="size-5" />
                <span className="text-sm">{label}</span>
              </label>
            </li>
          ))}
        </ul>
        <Button type="button" variant="ghost" size="sm" onClick={clear} disabled={!value.length}>
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
}
