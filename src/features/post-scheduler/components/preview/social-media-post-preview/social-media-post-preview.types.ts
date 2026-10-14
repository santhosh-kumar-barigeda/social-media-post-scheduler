import type { PlatformPostPreviewProps } from '@/features/post-scheduler/types/preview';

export interface SocialMediaPostPreviewProps extends PlatformPostPreviewProps {
  className?: string;
  x?: boolean;
  instagram?: boolean;
  tiktok?: boolean;
  facebook?: boolean;
}
