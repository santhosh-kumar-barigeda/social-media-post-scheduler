import { cn } from 'cn';
import { CalendarClock } from 'lucide-react';
import type { PreviewAvatarProps } from './preview-avatar.types';

export function PreviewAvatar({ className }: PreviewAvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-[#1d63ed] text-white',
        className,
      )}
    >
      <CalendarClock className="size-[55%]" aria-hidden />
    </span>
  );
}
