import type { ReactNode } from 'react';

export interface PreviewMediaProps {
  mediaUrl?: string;
  className?: string;
  /** Rendered when there is no media URL or the image fails to load */
  fallback?: ReactNode;
}
