import type { UseFormReturn } from 'react-hook-form';
import type { PostFormValues } from '@/features/post-scheduler/types/form';
import type { Platform } from '@/features/post-scheduler/types/post';

export interface QuickFillContentOption {
  value: string;
  label: string;
  /** Fixed text to insert; when omitted, `length` characters of sample words are generated */
  text?: string;
  length?: number;
}

export interface QuickFillPlatformOption {
  value: string;
  label: string;
  platforms: Platform[];
}

export interface QuickFillPanelProps {
  form: UseFormReturn<PostFormValues>;
}
