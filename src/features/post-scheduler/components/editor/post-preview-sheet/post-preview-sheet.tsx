import { Eye } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { SocialMediaPostPreview } from '../../preview/social-media-post-preview';
import type { PostPreviewSheetProps } from './post-preview-sheet.types';

/**
 * Bottom sheet with the post preview, for screens where the side preview card is hidden.
 * Pass `showTrigger` for a built-in Preview button, or control it with `open`/`onOpenChange`.
 */
export function PostPreviewSheet({
  platforms,
  content,
  mediaUrl,
  open,
  onOpenChange,
  showTrigger,
}: PostPreviewSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger
          render={<Button type="button" variant="outline" className="h-11 px-6 lg:hidden" />}
        >
          <Eye className="size-4" />
          Preview
        </SheetTrigger>
      )}
      <SheetContent
        side="bottom"
        className="[--card-spacing:--spacing(4)] data-[side=bottom]:h-[90vh]"
      >
        <SheetHeader>
          <SheetTitle>Post Preview</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 px-4">
          <SocialMediaPostPreview
            x={platforms.includes('x')}
            instagram={platforms.includes('instagram')}
            tiktok={platforms.includes('tiktok')}
            facebook={platforms.includes('facebook')}
            content={content}
            mediaUrl={mediaUrl}
            className="h-full min-h-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
