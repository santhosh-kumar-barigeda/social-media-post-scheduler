import { cn } from 'cn';
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { PLATFORM_OPTIONS } from '@/features/post-scheduler/constants/platforms';
import { PlatformIcon } from '../../common/platform-icon';
import { usePlatformSelector } from './platform-selector.hooks';
import type { PlatformSelectorProps } from './platform-selector.types';
import { WARNING_RATIO } from './platform-selector.constants';

export function PlatformSelector({ value, onChange, content, error }: PlatformSelectorProps) {
  const { toggle } = usePlatformSelector({ value, onChange });

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PLATFORM_OPTIONS.map(({ id, label, limit }) => {
          const checked = value.includes(id);
          const count = content.length;
          const isOver = checked && count > limit;
          const isNearLimit = checked && !isOver && count >= limit * WARNING_RATIO;

          return (
            <label
              key={id}
              className={cn(
                'flex cursor-pointer flex-col gap-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent/50',
                checked && 'border-primary bg-primary/5',
                error && !checked && 'border-destructive/50',
              )}
            >
              <div className="flex items-start justify-between">
                <PlatformIcon platform={id} />
                <Checkbox
                  checked={checked}
                  onCheckedChange={(next) => toggle(id, next)}
                  aria-label={label}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-2">
                <p className="font-medium">{label}</p>
                <p
                  aria-live={checked ? 'polite' : undefined}
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    isNearLimit && 'text-amber-600',
                    isOver && 'font-medium text-destructive',
                  )}
                >
                  {isOver && <AlertCircle className="size-3.5" aria-hidden />}
                  {count.toLocaleString()}/{limit.toLocaleString()}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
