import { PREVIEW_PLACEHOLDER } from '@/features/post-scheduler/constants/preview';
import type { HighlightedTextProps } from './highlighted-text.types';
import { TOKEN_PATTERN } from './highlighted-text.constants';

export function HighlightedText({
  text,
  placeholder = PREVIEW_PLACEHOLDER,
  highlightClassName,
}: HighlightedTextProps) {
  if (!text.trim()) return <span className="opacity-50">{placeholder}</span>;

  return text.split(TOKEN_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className={highlightClassName}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
