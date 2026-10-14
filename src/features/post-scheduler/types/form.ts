import type { Platform } from './post';

export interface PostFormValues {
  content: string;
  mediaUrl: string;
  platforms: Platform[];
  scheduledAt: Date | null;
}
