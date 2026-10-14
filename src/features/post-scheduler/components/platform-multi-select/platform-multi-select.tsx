import { ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { PLATFORM_OPTIONS } from '../../constants/platforms';
import type { PlatformMultiSelectProps } from '../../types/post';
import { PlatformIcon } from '../platform-icon';
import { usePlatformMultiSelect } from './platform-multi-select.hooks';

const MAX_NAMED_PLATFORMS = 2;

function getLabel({ value }: Pick<PlatformMultiSelectProps, 'value'>): string {
  if (value.length === 0) return 'All platforms';
  if (value.length <= MAX_NAMED_PLATFORMS) {
    return PLATFORM_OPTIONS.filter(({ id }) => value.includes(id))
      .map(({ label }) => label)
      .join(', ');
  }
  return `${value.length} platforms`;
}

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
        <span className="truncate">{getLabel({ value })}</span>
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
