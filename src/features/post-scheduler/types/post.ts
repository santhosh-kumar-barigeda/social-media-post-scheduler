import type { InfiniteData } from '@tanstack/react-query';

export type Platform = 'facebook' | 'instagram' | 'x' | 'tiktok';

export type PostStatus = 'scheduled' | 'published' | 'failed';

export interface Post {
  id: string;
  content: string;
  platforms: Platform[];
  mediaUrl?: string | null;
  /** ISO 8601 string in UTC */
  scheduledAt: string;
  status: PostStatus;
  errorMessage?: string | null;
}

export type CreatePostInput = Pick<Post, 'content' | 'platforms' | 'scheduledAt'> &
  Partial<Pick<Post, 'mediaUrl'>>;

export type UpdatePostInput = Partial<Omit<Post, 'id'>>;

export interface PostFilters {
  /** Posts on any of these platforms; empty or missing means all */
  platforms?: Platform[];
  status?: PostStatus;
  search?: string;
  /** Local calendar day, `yyyy-MM-dd` */
  from?: string;
  /** Local calendar day, `yyyy-MM-dd` */
  to?: string;
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

/** Response of `GET /api/posts`, see docs/API_CONTRACT.md */
export interface PostListResponse {
  data: Post[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
}

export type PostListData = InfiniteData<PostListPage, number>;

export interface UpdatePostVariables {
  id: string;
  input: UpdatePostInput;
}

export interface PostStats {
  total: number;
  scheduled: number;
  published: number;
  failed: number;
}

export interface PostGroup {
  key: string;
  /** "Today", "Tomorrow", "Yesterday" or the formatted date */
  label: string;
  /** Only set when `label` is relative, e.g. "Oct 14, 2026" */
  dateText?: string;
  posts: Post[];
}

export type PostLockReason = 'published' | 'past';

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
