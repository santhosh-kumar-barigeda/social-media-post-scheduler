import { apiClient } from '@/shared/lib/api-client';
import type {
  CreatePostInput,
  GetPostListParams,
  JsonServerPage,
  Post,
  PostListPage,
  UpdatePostInput,
} from '../types/post';

export const POSTS_PER_PAGE = 10;

/**
 * Platform filtering is done on the client: json-server cannot match a single
 * value inside the `platforms` array via query params, so a page can contain
 * fewer than `perPage` items when a platform filter is active.
 */
export async function getPostList({
  page = 1,
  perPage = POSTS_PER_PAGE,
  filters = {},
}: GetPostListParams = {}): Promise<PostListPage> {
  const { data } = await apiClient.get<JsonServerPage<Post>>('/posts', {
    params: {
      _page: page,
      _per_page: perPage,
      _sort: 'scheduledAt',
      status: filters.status,
      'content:contains': filters.search || undefined,
    },
  });

  const { platform } = filters;
  return {
    posts: platform ? data.data.filter((post) => post.platforms.includes(platform)) : data.data,
    nextPage: data.next,
    total: data.items,
  };
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
