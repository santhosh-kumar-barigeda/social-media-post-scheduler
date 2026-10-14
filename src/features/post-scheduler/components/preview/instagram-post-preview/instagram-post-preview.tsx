import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from 'lucide-react';
import { PREVIEW_ACCOUNT } from '@/features/post-scheduler/constants/preview';
import type { PlatformPostPreviewProps } from '@/features/post-scheduler/types/preview';
import { HighlightedText } from '../highlighted-text';
import { PreviewAvatar } from '../preview-avatar';
import { PreviewMedia } from '../preview-media';
import { getCaptionPreview } from './instagram-post-preview.utils';

export function InstagramPostPreview({ content, mediaUrl }: PlatformPostPreviewProps) {
  const { caption, isTruncated } = getCaptionPreview(content);

  return (
    <article className="overflow-hidden rounded-xl border bg-white text-[#262626]">
      <header className="flex items-center gap-3 px-3 py-2.5">
        <span className="rounded-full bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]">
          <PreviewAvatar className="size-8 rounded-full border-2 border-white" />
        </span>
        <span className="text-sm font-semibold">{PREVIEW_ACCOUNT.handle}</span>
        <Ellipsis className="ml-auto size-5" aria-hidden />
      </header>
      <PreviewMedia mediaUrl={mediaUrl} className="aspect-square w-full object-cover" />
      <div className="flex items-center gap-4 px-3 pt-3">
        <Heart className="size-6" aria-hidden />
        <MessageCircle className="size-6" aria-hidden />
        <Send className="size-6" aria-hidden />
        <Bookmark className="ml-auto size-6" aria-hidden />
      </div>
      <div className="px-3 pt-2 pb-3 text-sm">
        <p className="font-semibold">Be the first to like this</p>
        <p className="mt-1 break-words whitespace-pre-wrap">
          <span className="font-semibold">{PREVIEW_ACCOUNT.handle}</span>{' '}
          <HighlightedText text={caption} highlightClassName="text-[#00376b]" />
          {isTruncated && <span className="text-[#8e8e8e]">… more</span>}
        </p>
        <p className="mt-1.5 text-[10px] tracking-wide text-[#8e8e8e] uppercase">Just now</p>
      </div>
    </article>
  );
}
