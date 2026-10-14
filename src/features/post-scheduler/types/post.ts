import type { InfiniteData } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
export type Platform = 'facebook' | 'instagram' | 'x' | 'tiktok';

export type PostStatus = 'scheduled' | 'published' | 'failed';

export interface Post {
  id: string;
  content: string;
  platforms: Platform[];
  mediaUrl?: string;
  /** ISO 8601 string in UTC */
  scheduledAt: string;
  status: PostStatus;
  errorMessage?: string | null;
}

export type CreatePostInput = Pick<Post, 'content' | 'platforms' | 'scheduledAt'> &
  Partial<Pick<Post, 'mediaUrl'>>;

export type UpdatePostInput = Partial<Omit<Post, 'id'>>;

export interface PostFilters {
  platform?: Platform;
  status?: PostStatus;
  search?: string;
}

export interface GetPostListParams {
  page?: number;
  perPage?: number;
  filters?: PostFilters;
}

export interface PostListPage {
  posts: Post[];
  /** `null` when there are no more pages */
  nextPage: number | null;
  total: number;
}

/** json-server v1 paginated response */
export interface JsonServerPage<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export type PostListData = InfiniteData<PostListPage, number>;

export interface UpdatePostVariables {
  id: string;
  input: UpdatePostInput;
}

export interface PlatformOption {
  id: Platform;
  label: string;
  limit: number;
}

export interface PlatformLimitStatus {
  platform: Platform;
  count: number;
  limit: number;
  isOver: boolean;
  overBy: number;
}

export interface PostFormValues {
  content: string;
  mediaUrl: string;
  platforms: Platform[];
  scheduledAt: Date | null;
}

export interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

export interface PlatformSelectorProps {
  value: Platform[];
  onChange: (platforms: Platform[]) => void;
  content: string;
  error?: string;
}

export interface SchedulePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}

export interface PlatformPostPreviewProps {
  content: string;
  mediaUrl?: string;
}

export interface SocialMediaPostPreviewProps extends PlatformPostPreviewProps {
  className?: string;
  x?: boolean;
  instagram?: boolean;
  tiktok?: boolean;
  facebook?: boolean;
}

export interface PreviewAvatarProps {
  className?: string;
}

export interface PreviewMediaProps {
  mediaUrl?: string;
  className?: string;
  /** Rendered when there is no media URL or the image fails to load */
  fallback?: ReactNode;
}

export interface HighlightedTextProps {
  text: string;
  placeholder?: string;
  highlightClassName?: string;
}

export interface PostFormProps {
  form: UseFormReturn<PostFormValues>;
  onSubmit: (values: PostFormValues) => void;
  isSubmitting?: boolean;
}

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

export interface PostPreviewSheetProps {
  platforms: Platform[];
  content: string;
  mediaUrl?: string;
}
