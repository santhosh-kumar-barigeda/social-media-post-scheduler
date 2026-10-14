import { cn } from 'cn';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { PLATFORM_OPTIONS } from '../../constants/platforms';
import type { Platform, SocialMediaPostPreviewProps } from '../../types/post';
import { FacebookPostPreview } from '../facebook-post-preview';
import { InstagramPostPreview } from '../instagram-post-preview';
import { PlatformIcon } from '../platform-icon';
import { TikTokPostPreview } from '../tiktok-post-preview';
import { XPostPreview } from '../x-post-preview';

const PREVIEWS = {
  x: XPostPreview,
  instagram: InstagramPostPreview,
  tiktok: TikTokPostPreview,
  facebook: FacebookPostPreview,
};

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
