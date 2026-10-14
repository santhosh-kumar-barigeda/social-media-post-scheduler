import { useState } from 'react';
import type { PreviewMediaProps } from './preview-media.types';

export function PreviewMedia({ mediaUrl, className, fallback = null }: PreviewMediaProps) {
  const [failedUrl, setFailedUrl] = useState<string>();
  const url = mediaUrl?.trim();

  if (!url || failedUrl === url) return fallback;

  return <img src={url} alt="Post media" onError={() => setFailedUrl(url)} className={className} />;
}
