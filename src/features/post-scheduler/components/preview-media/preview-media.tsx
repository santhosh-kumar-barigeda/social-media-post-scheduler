import { useState } from 'react';
import type { PreviewMediaProps } from '../../types/post';

export function PreviewMedia({ mediaUrl, className, fallback = null }: PreviewMediaProps) {
  const [failedUrl, setFailedUrl] = useState<string>();
  const url = mediaUrl?.trim();

  if (!url || failedUrl === url) return fallback;

  return <img src={url} alt="Post media" onError={() => setFailedUrl(url)} className={className} />;
}
