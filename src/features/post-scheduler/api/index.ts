import { apiClient } from '@/shared/lib/api-client';
import { buildPostListWhere } from './build-post-list-where';
import { applyApiSimulation } from '@/shared/lib/api-simulation';
import { toPlatformsKey } from '../utils/post-rules';
import { POST_STATUSES } from '../constants/post-list';
import type {
  CreatePostInput,
  GetPostListParams,
  JsonServerPage,
  Post,
  PostListPage,
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

  const { data } = await apiClient.get<JsonServerPage<Post>>('/posts', {
    params: {
      _page: page,
      _per_page: perPage,
      _sort: 'scheduledAt',
      _where: JSON.stringify(buildPostListWhere(filters)),
    },
  });

  return { posts: data.data, nextPage: data.next, total: data.items };
}

export async function getPost(id: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const post: Omit<Post, 'id'> = {
    ...input,
    platformsKey: toPlatformsKey(input.platforms),
    status: 'scheduled',
  };
  const { data } = await apiClient.post<Post>('/posts', post);
  return data;
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post> {
  const { data } = await apiClient.patch<Post>(`/posts/${id}`, {
    ...input,
    ...(input.platforms && { platformsKey: toPlatformsKey(input.platforms) }),
  });
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

/** Counts per status, read from json-server's `items` total on a one-item page. */
export async function getPostStats(): Promise<PostStats> {
  if ((await applyApiSimulation()) === 'empty') {
    return { total: 0, scheduled: 0, published: 0, failed: 0 };
  }

  const [scheduled, published, failed] = await Promise.all(
    POST_STATUSES.map(async (status) => {
      const { data } = await apiClient.get<JsonServerPage<Post>>('/posts', {
        params: { status, _page: 1, _per_page: 1 },
      });
      return data.items;
    }),
  );

  return { total: scheduled + published + failed, scheduled, published, failed };
}
