import {
  BadgeCheck,
  Bookmark,
  ChartNoAxesColumn,
  Ellipsis,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
} from 'lucide-react';
import { PREVIEW_ACCOUNT } from '@/features/post-scheduler/constants/preview';
import type { PlatformPostPreviewProps } from '@/features/post-scheduler/types/preview';
import { HighlightedText } from '../highlighted-text';
import { PreviewAvatar } from '../preview-avatar';
import { PreviewMedia } from '../preview-media';

export function XPostPreview({ content, mediaUrl }: PlatformPostPreviewProps) {
  return (
    <article className="flex gap-3 rounded-xl border bg-white p-4 text-[#0f1419]">
      <PreviewAvatar className="size-10 rounded-full" />
      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-1 text-[15px] leading-5">
          <span className="truncate font-bold">{PREVIEW_ACCOUNT.name}</span>
          <BadgeCheck className="size-[18px] shrink-0 fill-[#1d9bf0] text-white" aria-hidden />
          <span className="truncate text-[#536471]">@{PREVIEW_ACCOUNT.handle} · now</span>
          <Ellipsis className="ml-auto size-[18px] shrink-0 text-[#536471]" aria-hidden />
        </header>
        <p className="mt-0.5 text-[15px] leading-5 break-words whitespace-pre-wrap">
          <HighlightedText text={content} highlightClassName="text-[#1d9bf0]" />
        </p>
        <PreviewMedia
          mediaUrl={mediaUrl}
          className="mt-3 aspect-video w-full rounded-2xl border border-[#cfd9de] object-cover"
        />
        <footer className="mt-3 flex items-center justify-between text-[#536471]">
          <MessageCircle className="size-[18px]" aria-hidden />
          <Repeat2 className="size-[18px]" aria-hidden />
          <Heart className="size-[18px]" aria-hidden />
          <ChartNoAxesColumn className="size-[18px]" aria-hidden />
          <span className="flex items-center gap-3">
            <Bookmark className="size-[18px]" aria-hidden />
            <Share className="size-[18px]" aria-hidden />
          </span>
        </footer>
      </div>
    </article>
  );
}
