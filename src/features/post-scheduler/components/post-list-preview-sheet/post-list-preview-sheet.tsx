import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared/components/ui/sheet';
import type { PostListPreviewSheetProps } from '../../types/post';
import { SocialMediaPostPreview } from '../social-media-post-preview';

/** Shows the selected post's preview in a bottom sheet where the side preview card is hidden. */
export function PostListPreviewSheet({ post, open, onOpenChange }: PostListPreviewSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="[--card-spacing:--spacing(4)] data-[side=bottom]:h-[90vh]"
      >
        <SheetHeader>
          <SheetTitle>Post Preview</SheetTitle>
        </SheetHeader>
        {post && (
          <div className="min-h-0 flex-1 px-4">
            <SocialMediaPostPreview
              x={post.platforms.includes('x')}
              instagram={post.platforms.includes('instagram')}
              tiktok={post.platforms.includes('tiktok')}
              facebook={post.platforms.includes('facebook')}
              content={post.content}
              mediaUrl={post.mediaUrl}
              className="h-full min-h-0"
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
