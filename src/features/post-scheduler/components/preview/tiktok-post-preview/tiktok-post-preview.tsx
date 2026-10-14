import { Music, Plus } from 'lucide-react';
import { PREVIEW_ACCOUNT } from '@/features/post-scheduler/constants/preview';
import type { PlatformPostPreviewProps } from '@/features/post-scheduler/types/preview';
import { HighlightedText } from '../highlighted-text';
import { PreviewAvatar } from '../preview-avatar';
import { PreviewMedia } from '../preview-media';
import { ACTIONS } from './tiktok-post-preview.constants';

export function TikTokPostPreview({ content, mediaUrl }: PlatformPostPreviewProps) {
  return (
    <article className="relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl bg-linear-to-b from-[#2b2b2b] to-[#0a0a0a] text-white">
      <PreviewMedia mediaUrl={mediaUrl} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />

      <div className="absolute inset-x-0 top-3 flex justify-center gap-4 text-sm">
        <span className="text-white/60">Following</span>
        <span className="border-b-2 border-white pb-0.5 font-semibold">For You</span>
      </div>

      <div className="absolute right-2 bottom-4 flex flex-col items-center gap-4">
        <span className="relative mb-2">
          <PreviewAvatar className="size-10 rounded-full border-2 border-white" />
          <span className="absolute -bottom-2 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55]">
            <Plus className="size-3" aria-hidden />
          </span>
        </span>
        {ACTIONS.map(({ icon: Icon, label }, index) => (
          <span key={index} className="flex flex-col items-center gap-0.5 text-xs font-semibold">
            <Icon className="size-7 fill-white/90" aria-hidden />
            {label}
          </span>
        ))}
      </div>

      <div className="absolute right-14 bottom-3 left-3 flex flex-col gap-1.5">
        <p className="text-sm font-bold">@{PREVIEW_ACCOUNT.handle}</p>
        <p className="line-clamp-3 text-sm break-words whitespace-pre-wrap">
          <HighlightedText text={content} highlightClassName="font-bold" />
        </p>
        <p className="flex items-center gap-1.5 text-xs">
          <Music className="size-3.5" aria-hidden />
          <span className="truncate">Original sound - {PREVIEW_ACCOUNT.handle}</span>
        </p>
      </div>
    </article>
  );
}
