import { cn } from 'cn';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { PLATFORM_OPTIONS } from '@/features/post-scheduler/constants/platforms';
import type { Platform } from '@/features/post-scheduler/types/post';
import { PlatformIcon } from '../../common/platform-icon';
import type { SocialMediaPostPreviewProps } from './social-media-post-preview.types';
import { PREVIEWS } from './social-media-post-preview.constants';

export function SocialMediaPostPreview({
  content,
  mediaUrl,
  className,
  ...selected
}: SocialMediaPostPreviewProps) {
  const platforms = PLATFORM_OPTIONS.filter(({ id }) => selected[id]);

  if (platforms.length === 0) {
    return <p className="text-sm text-muted-foreground">Select a platform to see its preview.</p>;
  }

  return (
    <ScrollArea className={cn('-mr-(--card-spacing) h-[calc(100vh-14rem)] min-h-96', className)}>
      <div className="flex flex-col gap-6 pr-(--card-spacing) pb-4">
        {platforms.map(({ id, label }) => {
          const Preview = PREVIEWS[id satisfies Platform];

          return (
            <section key={id} aria-label={`${label} preview`} className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <PlatformIcon platform={id} className="size-5" />
                {label}
              </h3>
              <Preview content={content} mediaUrl={mediaUrl} />
            </section>
          );
        })}
      </div>
    </ScrollArea>
  );
}
