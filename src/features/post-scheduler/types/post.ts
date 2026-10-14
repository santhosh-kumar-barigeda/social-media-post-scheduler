import type { InfiniteData } from '@tanstack/react-query';
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
