import type { Platform } from '@/features/post-scheduler/types/post';

export interface PostPreviewSheetProps {
  platforms: Platform[];
  content: string;
  mediaUrl?: string;
  /** Controlled open state; leave unset when using `showTrigger` */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Renders a Preview button (hidden on large screens) that opens the sheet */
  showTrigger?: boolean;
}
