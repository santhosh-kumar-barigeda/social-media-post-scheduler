import { CAPTION_PREVIEW_LENGTH } from './instagram-post-preview.constants';

/** Instagram collapses long captions behind "… more". */
export function getCaptionPreview(content: string) {
  const isTruncated = content.length > CAPTION_PREVIEW_LENGTH;
  const caption = isTruncated ? content.slice(0, CAPTION_PREVIEW_LENGTH).trimEnd() : content;

  return { caption, isTruncated };
}
