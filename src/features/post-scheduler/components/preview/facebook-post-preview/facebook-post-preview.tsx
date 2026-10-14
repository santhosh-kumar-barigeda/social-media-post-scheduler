import { Ellipsis, Globe, X } from 'lucide-react';
import { PREVIEW_ACCOUNT } from '@/features/post-scheduler/constants/preview';
import type { PlatformPostPreviewProps } from '@/features/post-scheduler/types/preview';
import { HighlightedText } from '../highlighted-text';
import { PreviewAvatar } from '../preview-avatar';
import { PreviewMedia } from '../preview-media';
import { ACTIONS } from './facebook-post-preview.constants';

export function FacebookPostPreview({ content, mediaUrl }: PlatformPostPreviewProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white text-[#050505]">
      <header className="flex items-center gap-2 px-4 pt-3">
        <PreviewAvatar className="size-10 rounded-full" />
        <div className="leading-tight">
          <p className="text-[15px] font-semibold">{PREVIEW_ACCOUNT.name}</p>
          <p className="flex items-center gap-1 text-[13px] text-[#65676b]">
            Just now · <Globe className="size-3" aria-hidden />
          </p>
        </div>
        <div className="ml-auto flex gap-3 text-[#65676b]">
          <Ellipsis className="size-5" aria-hidden />
          <X className="size-5" aria-hidden />
        </div>
      </header>
      <p className="px-4 py-3 text-[15px] leading-5 break-words whitespace-pre-wrap">
        <HighlightedText text={content} highlightClassName="text-[#385898]" />
      </p>
      <PreviewMedia mediaUrl={mediaUrl} className="max-h-96 w-full object-cover" />
      <div className="mx-4 mt-1 grid grid-cols-3 border-t border-[#ced0d4] py-1 text-sm font-semibold text-[#65676b]">
        {ACTIONS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center justify-center gap-2 py-2">
            <Icon className="size-[18px]" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </article>
  );
}
