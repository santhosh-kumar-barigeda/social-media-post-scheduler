import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { applyApiSimulation } from '@/shared/lib/api-simulation';
import { apiClient } from '@/shared/lib/api-client';
import type {
  CreatePostInput,
  GetPostListParams,
  Post,
  PostListPage,
  PostListResponse,
  PostStats,
  UpdatePostInput,
} from '../types/post';

export const POSTS_PER_PAGE = 10;

export async function getPostList({
  page = 1,
  perPage = POSTS_PER_PAGE,
  filters = {},
}: GetPostListParams = {}): Promise<PostListPage> {
  if ((await applyApiSimulation()) === 'empty') return { posts: [], nextPage: null, total: 0 };

  const { platforms, status, search, from, to } = filters;
  const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });
  if (status) params.set('status', status);
  if (search) params.set('q', search);
  platforms?.forEach((platform) => params.append('platform', platform));
  // The UI works with local calendar days; the API takes UTC instants.
  if (from) params.set('from', startOfDay(parseISO(from)).toISOString());
  if (to) params.set('to', endOfDay(parseISO(to)).toISOString());

  const { data } = await apiClient.get<PostListResponse>('/posts', { params });
  return { posts: data.data, nextPage: data.nextPage, total: data.total };
}

export async function getPostStats(): Promise<PostStats> {
  if ((await applyApiSimulation()) === 'empty') {
    return { total: 0, scheduled: 0, published: 0, failed: 0 };
  }

  const { data } = await apiClient.get<PostStats>('/posts/stats');
  return data;
}

export async function getPost(id: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const post: Omit<Post, 'id'> = { ...input, status: 'scheduled' };
  const { data } = await apiClient.post<Post>('/posts', post);
  return data;
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post> {
  const { data } = await apiClient.patch<Post>(`/posts/${id}`, input);
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}

/**
 * Simulated retry: 1s delay, fails 20% of the time. Does not touch the server,
 * so the caller can optimistically update the UI and roll back on rejection.
 */
export async function retryPost(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() < 0.2) {
    throw new Error('Retry failed. Please try again.');
  }

  return updatePost(id, { status: 'scheduled', errorMessage: null });
}
